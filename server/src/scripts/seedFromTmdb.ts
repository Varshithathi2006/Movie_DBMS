import 'dotenv/config';
import axios from 'axios';
import pool from '../db';

type MovieLite = {
  id: number;
  title: string;
  release_date?: string;
  overview?: string;
  poster_path?: string;
  genre_ids?: number[];
  original_language?: string;
  vote_average?: number;
};

// Add new types for cast information
type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  birthday?: string;
  biography?: string;
};

type MovieCredits = {
  id: number;
  cast: CastMember[];
};

const TMDB_API = '62b5ad2096b5a2f7e640d5590e58c95e';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  console.error('Missing TMDB_API_KEY in environment');
  process.exit(1);
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

async function fetchDiscover(language: string, page: number, fromYear: number): Promise<MovieLite[]> {
  const params = new URLSearchParams({
    api_key: API_KEY!,
    sort_by: 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page: String(page),
    with_original_language: language,
    'primary_release_date.gte': `${fromYear}-01-01`,
  } as any);
  const url = `${TMDB_API}/discover/movie?${params.toString()}`;
  const { data } = await axios.get(url);
  return data.results as MovieLite[];
}

async function fetchGenres(language: string): Promise<Record<number, string>> {
  const params = new URLSearchParams({ api_key: API_KEY!, language });
  const url = `${TMDB_API}/genre/movie/list?${params.toString()}`;
  const { data } = await axios.get(url);
  const map: Record<number, string> = {};
  for (const g of data.genres || []) {
    map[g.id] = g.name as string;
  }
  return map;
}

async function upsertGenre(name: string): Promise<number> {
  const [existing] = await pool.query('SELECT id FROM genres WHERE name = ?', [name]);
  if ((existing as any[]).length) return (existing as any[])[0].id;
  const [res] = await pool.query('INSERT INTO genres (name) VALUES (?)', [name]);
  return (res as any).insertId;
}

async function upsertPerson(
  name: string,
  birthYear: number | null,
  photo?: string,
  bio?: string
): Promise<number> {
  const [existing] = await pool.query('SELECT id FROM people WHERE name = ?', [name]);
  if ((existing as any[]).length) return (existing as any[])[0].id;

  const [res] = await pool.query(
    'INSERT INTO people (name, birth_year, photo, bio) VALUES (?, ?, ?, ?)',
    [
      name,
      birthYear,
      photo || 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio || null,
    ]
  );
  return (res as any).insertId;
}

// Add new function to fetch movie credits
async function fetchMovieCredits(movieId: number): Promise<MovieCredits> {
  const params = new URLSearchParams({ api_key: API_KEY! });
  const url = `${TMDB_API}/movie/${movieId}/credits?${params.toString()}`;
  const { data } = await axios.get(url);
  return data;
}

// Add new function to fetch person details
async function fetchPersonDetails(personId: number): Promise<any> {
  const params = new URLSearchParams({ api_key: API_KEY! });
  const url = `${TMDB_API}/person/${personId}?${params.toString()}`;
  const { data } = await axios.get(url);
  return data;
}

// Add new function to insert movie cast
async function insertMovieCast(movieId: number, personId: number, role: string): Promise<void> {
  await pool.query(
    'INSERT IGNORE INTO movie_cast (movie_id, person_id, role) VALUES (?, ?, ?)',
    [movieId, personId, role]
  );
}

async function insertMovie(m: MovieLite): Promise<number | null> {
  if (!m.release_date) return null;
  const year = Number(m.release_date.substring(0, 4));
  const poster = m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '';

  try {
    const [res] = await pool.query(
      'INSERT INTO movies (title, release_year, duration, rating, poster, synopsis, box_office) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [m.title, year, 120, Number((m.vote_average ?? 0).toFixed?.(1) ?? 0), poster, m.overview || null, null]
    );

    const movieId = (res as any).insertId;

    // Fetch and insert cast information
    try {
      const credits = await fetchMovieCredits(m.id);
      for (const actor of credits.cast.slice(0, 80)) {
        // Get top 10 cast members
        const personDetails = await fetchPersonDetails(actor.id);
        const birthYear = personDetails.birthday
          ? new Date(personDetails.birthday).getFullYear()
          : null;

        const photo = actor.profile_path
          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
          : undefined;

        const personId = await upsertPerson(
          actor.name,
          birthYear,
          photo,
          personDetails.biography
        );

        await insertMovieCast(movieId, personId, actor.character);
        await sleep(100); // Respect API rate limits
      }
    } catch (error) {
      console.warn(`Failed to fetch cast for movie ${m.title}:`, error);
    }

    return movieId;
  } catch (e: any) {
    if (e && e.code === 'ER_DUP_ENTRY') return null;
    throw e;
  }
}

async function run() {
  const args = process.argv.slice(2).join(' ');
  const langsMatch = /--languages\s+([^\s]+)/.exec(args);
  const fromYearMatch = /--fromYear\s+(\d{4})/.exec(args);
  const perLangMatch = /--perLang\s+(\d+)/.exec(args);
  const languages = (langsMatch?.[1] || 'en,ta,te').split(',');
  const fromYear = Number(fromYearMatch?.[1] || 2015);
  const perLang = Number(perLangMatch?.[1] || 150);

  console.log(`Seeding from TMDb: langs=${languages.join(',')} fromYear=${fromYear} perLang=${perLang}`);
  for (const lang of languages) {
    const genreMap = await fetchGenres(lang);
    let added = 0;
    for (let page = 1; page <= 50 && added < perLang; page++) {
      const batch = await fetchDiscover(lang, page, fromYear);
      for (const m of batch) {
        const id = await insertMovie(m);
        if (id) {
          // map TMDb genre ids to names for this language and insert relations
          const gids = m.genre_ids || [];
          for (const gid of gids) {
            const gName = genreMap[gid];
            if (!gName) continue;
            const gId = await upsertGenre(gName);
            await pool.query('INSERT IGNORE INTO movie_genres (movie_id, genre_id) VALUES (?, ?)', [id, gId]);
          }
          added++;
        }
        if (added >= perLang) break;
      }
      await sleep(220);
    }
    console.log(`Added ~${added} movies for ${lang}`);
  }
  console.log('Done.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});


