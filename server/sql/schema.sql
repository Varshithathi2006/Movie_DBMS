-- DBMS Fundamentals & Relational Model: Core movie schema
CREATE DATABASE IF NOT EXISTS movie_app;
USE movie_app;

-- Users table for authentication and profiles
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Entity: movies
CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  release_year INT NOT NULL,
  duration INT NOT NULL,
  rating DECIMAL(3,1) NOT NULL DEFAULT 0.0,
  poster VARCHAR(512) NOT NULL,
  synopsis TEXT,
  box_office VARCHAR(50)
);

-- Entity: people
CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_year INT NOT NULL,
  photo VARCHAR(512) NOT NULL,
  bio TEXT
);

-- Atomic domain: genre name as VARCHAR
CREATE TABLE IF NOT EXISTS genres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Relationship: movie to genres (M:N)
CREATE TABLE IF NOT EXISTS movie_genres (
  movie_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- Relationship: cast (M:N)
CREATE TABLE IF NOT EXISTS movie_cast (
  movie_id INT NOT NULL,
  person_id INT NOT NULL,
  PRIMARY KEY (movie_id, person_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE
);

-- Relationship: crew (M:N) with role attribute
CREATE TABLE IF NOT EXISTS movie_crew (
  movie_id INT NOT NULL,
  person_id INT NOT NULL,
  role VARCHAR(100) NOT NULL,
  PRIMARY KEY (movie_id, person_id, role),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE
);

-- Weak entity: awards for person
CREATE TABLE IF NOT EXISTS awards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  person_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  category VARCHAR(255) NOT NULL,
  FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE
);

-- Roles of person (1:N per person)
CREATE TABLE IF NOT EXISTS person_roles (
  person_id INT NOT NULL,
  role VARCHAR(100) NOT NULL,
  PRIMARY KEY (person_id, role),
  FOREIGN KEY (person_id) REFERENCES people(id) ON DELETE CASCADE
);

-- Reviews referencing movie with derived rating
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT NOT NULL,
  user_id INT NOT NULL,
  username VARCHAR(255) NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 10),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Functional Dependencies and Normalization:
-- Tables are in 3NF/BCNF: no non-key attributes depend on part of composite keys improperly.

-- Trigger: Maintain average rating on movies from reviews (derived attribute for fast reads)
DELIMITER //
CREATE TRIGGER trg_reviews_after_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
  UPDATE movies m
  JOIN (
    SELECT movie_id, ROUND(AVG(rating), 1) AS avg_rating FROM reviews WHERE movie_id = NEW.movie_id
  ) r ON r.movie_id = m.id
  SET m.rating = r.avg_rating;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_reviews_after_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
  UPDATE movies m
  JOIN (
    SELECT movie_id, ROUND(AVG(rating), 1) AS avg_rating FROM reviews WHERE movie_id = NEW.movie_id
  ) r ON r.movie_id = m.id
  SET m.rating = r.avg_rating;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_reviews_after_delete
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
  UPDATE movies m
  JOIN (
    SELECT movie_id, ROUND(AVG(rating), 1) AS avg_rating FROM reviews WHERE movie_id = OLD.movie_id
  ) r ON r.movie_id = m.id
  SET m.rating = COALESCE(r.avg_rating, 0.0)
  WHERE m.id = OLD.movie_id;
END //
DELIMITER ;

-- Candidate keys example: prevent duplicate titles for same year
ALTER TABLE movies
  ADD CONSTRAINT unique_title_year UNIQUE (title, release_year);

