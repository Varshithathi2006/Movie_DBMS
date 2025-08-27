import { Movie, Person } from '../types';

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    releaseYear: 2010,
    duration: 148,
    genres: ['Sci-Fi', 'Thriller', 'Action'],
    rating: 8.8,
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Elliot Page'],
    crew: ['Christopher Nolan - Director', 'Hans Zimmer - Composer', 'Wally Pfister - Cinematographer'],
    boxOffice: '$836.8M',
    reviews: []
  },
  {
    id: '2',
    title: 'The Dark Knight',
    releaseYear: 2008,
    duration: 152,
    genres: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    poster: 'https://images.pexels.com/photos/7991577/pexels-photo-7991577.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    crew: ['Christopher Nolan - Director', 'Hans Zimmer - Composer', 'Wally Pfister - Cinematographer'],
    boxOffice: '$1.005B',
    reviews: []
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    releaseYear: 1994,
    duration: 154,
    genres: ['Crime', 'Drama'],
    rating: 8.9,
    poster: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
    crew: ['Quentin Tarantino - Director', 'Quentin Tarantino - Writer'],
    boxOffice: '$214.2M',
    reviews: []
  },
  {
    id: '4',
    title: 'The Shawshank Redemption',
    releaseYear: 1994,
    duration: 142,
    genres: ['Drama'],
    rating: 9.3,
    poster: 'https://images.pexels.com/photos/8263618/pexels-photo-8263618.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
    crew: ['Frank Darabont - Director', 'Thomas Newman - Composer'],
    boxOffice: '$16.3M',
    reviews: []
  },
  {
    id: '5',
    title: 'Interstellar',
    releaseYear: 2014,
    duration: 169,
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    rating: 8.6,
    poster: 'https://images.pexels.com/photos/7991591/pexels-photo-7991591.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    crew: ['Christopher Nolan - Director', 'Hans Zimmer - Composer'],
    boxOffice: '$677.5M',
    reviews: []
  },
  {
    id: '6',
    title: 'The Godfather',
    releaseYear: 1972,
    duration: 175,
    genres: ['Crime', 'Drama'],
    rating: 9.2,
    poster: 'https://images.pexels.com/photos/8263617/pexels-photo-8263617.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall'],
    crew: ['Francis Ford Coppola - Director', 'Nino Rota - Composer'],
    boxOffice: '$246.1M',
    reviews: []
  },
  {
    id: '7',
    title: 'Parasite',
    releaseYear: 2019,
    duration: 132,
    genres: ['Comedy', 'Drama', 'Thriller'],
    rating: 8.5,
    poster: 'https://images.pexels.com/photos/7991592/pexels-photo-7991592.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    crew: ['Bong Joon-ho - Director', 'Jung Jae-il - Composer'],
    boxOffice: '$263.5M',
    reviews: []
  },
  {
    id: '8',
    title: 'Avengers: Endgame',
    releaseYear: 2019,
    duration: 181,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 8.4,
    poster: 'https://images.pexels.com/photos/8263615/pexels-photo-8263615.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos\' actions and restore balance to the universe.',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
    crew: ['Anthony Russo - Director', 'Joe Russo - Director', 'Alan Silvestri - Composer'],
    boxOffice: '$2.798B',
    reviews: []
  },
  {
    id: '9',
    title: 'Dune',
    releaseYear: 2021,
    duration: 155,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 8.0,
    poster: 'https://images.pexels.com/photos/7991595/pexels-photo-7991595.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac', 'Josh Brolin'],
    crew: ['Denis Villeneuve - Director', 'Hans Zimmer - Composer'],
    boxOffice: '$401.8M',
    reviews: []
  },
  {
    id: '10',
    title: 'Spider-Man: Into the Spider-Verse',
    releaseYear: 2018,
    duration: 117,
    genres: ['Animation', 'Action', 'Adventure'],
    rating: 8.4,
    poster: 'https://images.pexels.com/photos/8263616/pexels-photo-8263616.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat.',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld', 'Mahershala Ali'],
    crew: ['Bob Persichetti - Director', 'Peter Ramsey - Director', 'Rodney Rothman - Director'],
    boxOffice: '$384.3M',
    reviews: []
  },
  {
    id: '11',
    title: 'Mad Max: Fury Road',
    releaseYear: 2015,
    duration: 120,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 8.1,
    poster: 'https://images.pexels.com/photos/7991596/pexels-photo-7991596.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult', 'Hugh Keays-Byrne'],
    crew: ['George Miller - Director', 'Junkie XL - Composer'],
    boxOffice: '$378.9M',
    reviews: []
  },
  {
    id: '12',
    title: 'Everything Everywhere All at Once',
    releaseYear: 2022,
    duration: 139,
    genres: ['Comedy', 'Sci-Fi', 'Action'],
    rating: 7.8,
    poster: 'https://images.pexels.com/photos/8263614/pexels-photo-8263614.jpeg?auto=compress&cs=tinysrgb&w=400',
    synopsis: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what\'s important to her by connecting with the lives she could have led.',
    cast: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan', 'Jamie Lee Curtis'],
    crew: ['Daniels - Directors', 'Son Lux - Composers'],
    boxOffice: '$143.4M',
    reviews: []
  }
];

export const mockPeople: Person[] = [
  {
    id: 'christopher-nolan',
    name: 'Christopher Nolan',
    birthYear: 1970,
    photo: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Christopher Nolan is a British-American film director, producer, and screenwriter known for his distinctive narrative and visual style.',
    roles: ['Director', 'Producer', 'Screenwriter'],
    awards: [
      { name: 'Academy Award', year: 2021, category: 'Best Director' },
      { name: 'BAFTA Award', year: 2018, category: 'Best Director' },
      { name: 'Directors Guild Award', year: 2021, category: 'Outstanding Director' }
    ]
  },
  {
    id: 'leonardo-dicaprio',
    name: 'Leonardo DiCaprio',
    birthYear: 1974,
    photo: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Leonardo DiCaprio is an American actor and film producer known for his work in biographical and period films.',
    roles: ['Actor', 'Producer'],
    awards: [
      { name: 'Academy Award', year: 2016, category: 'Best Actor' },
      { name: 'Golden Globe Award', year: 2016, category: 'Best Actor' },
      { name: 'BAFTA Award', year: 2016, category: 'Best Actor' }
    ]
  },
  {
    id: 'quentin-tarantino',
    name: 'Quentin Tarantino',
    birthYear: 1963,
    photo: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Quentin Tarantino is an American film director, screenwriter, producer, and actor known for his nonlinear storylines and pop culture references.',
    roles: ['Director', 'Screenwriter', 'Producer'],
    awards: [
      { name: 'Academy Award', year: 2013, category: 'Best Original Screenplay' },
      { name: 'Palme d\'Or', year: 1994, category: 'Best Film' },
      { name: 'Golden Globe Award', year: 2013, category: 'Best Screenplay' }
    ]
  },
  {
    id: 'hans-zimmer',
    name: 'Hans Zimmer',
    birthYear: 1957,
    photo: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Hans Zimmer is a German film score composer and music producer who has scored over 150 films.',
    roles: ['Composer', 'Music Producer'],
    awards: [
      { name: 'Academy Award', year: 1995, category: 'Best Original Score' },
      { name: 'Grammy Award', year: 2021, category: 'Best Score Soundtrack' },
      { name: 'Golden Globe Award', year: 2022, category: 'Best Original Score' }
    ]
  },
  {
    id: 'martin-scorsese',
    name: 'Martin Scorsese',
    birthYear: 1942,
    photo: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Martin Scorsese is an American film director, producer, screenwriter, and actor known for his crime films.',
    roles: ['Director', 'Producer', 'Screenwriter'],
    awards: [
      { name: 'Academy Award', year: 2007, category: 'Best Director' },
      { name: 'AFI Life Achievement Award', year: 1997, category: 'Lifetime Achievement' },
      { name: 'Kennedy Center Honor', year: 2007, category: 'Lifetime Achievement' }
    ]
  },
  {
    id: 'steven-spielberg',
    name: 'Steven Spielberg',
    birthYear: 1946,
    photo: 'https://images.pexels.com/photos/1587926/pexels-photo-1587926.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Steven Spielberg is an American film director, producer, and screenwriter, widely considered one of the most influential filmmakers in history.',
    roles: ['Director', 'Producer', 'Screenwriter'],
    awards: [
      { name: 'Academy Award', year: 1994, category: 'Best Director' },
      { name: 'Academy Award', year: 1999, category: 'Best Director' },
      { name: 'AFI Life Achievement Award', year: 1995, category: 'Lifetime Achievement' }
    ]
  }
];