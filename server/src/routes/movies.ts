import { Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  const [rows] = await pool.query(`
    SELECT m.id, m.title, m.release_year AS releaseYear, m.duration, m.rating, m.poster,
           m.synopsis, m.box_office AS boxOffice,
           GROUP_CONCAT(DISTINCT g.name ORDER BY g.name) AS genres
    FROM movies m
    LEFT JOIN movie_genres mg ON mg.movie_id = m.id
    LEFT JOIN genres g ON g.id = mg.genre_id
    GROUP BY m.id
    ORDER BY m.id
  `);
  const movies = (rows as any[]).map(r => ({
    ...r,
    genres: r.genres ? (r.genres as string).split(',') : []
  }));
  res.json(movies);
});

router.get('/:id', async (req, res) => {
  const movieId = req.params.id;
  const conn = await pool.getConnection();
  try {
    const [movieRows] = await conn.query(
      `SELECT id, title, release_year AS releaseYear, duration, rating, poster, synopsis, box_office AS boxOffice
       FROM movies WHERE id = ?`,
      [movieId]
    );
    if ((movieRows as any[]).length === 0) return res.status(404).json({ error: 'Not found' });

    const [genreRows] = await conn.query(
      `SELECT g.name FROM genres g JOIN movie_genres mg ON mg.genre_id = g.id WHERE mg.movie_id = ? ORDER BY g.name`,
      [movieId]
    );
    const [castRows] = await conn.query(
      `SELECT p.name FROM people p JOIN movie_cast mc ON mc.person_id = p.id WHERE mc.movie_id = ? ORDER BY p.name`,
      [movieId]
    );
    const [crewRows] = await conn.query(
      `SELECT CONCAT(p.name, ' - ', mc.role) AS role FROM people p JOIN movie_crew mc ON mc.person_id = p.id WHERE mc.movie_id = ? ORDER BY p.name`,
      [movieId]
    );
    const [reviewRows] = await conn.query(
      `SELECT id, movie_id AS movieId, user_id AS userId, username, rating, comment, created_at AS date
       FROM reviews WHERE movie_id = ? ORDER BY created_at DESC`,
      [movieId]
    );

    const movie = (movieRows as any[])[0];
    movie.genres = (genreRows as any[]).map((g: any) => g.name);
    movie.cast = (castRows as any[]).map((c: any) => c.name);
    movie.crew = (crewRows as any[]).map((c: any) => c.role);
    movie.reviews = reviewRows as any[];
    res.json(movie);
  } finally {
    conn.release();
  }
});

export default router;

