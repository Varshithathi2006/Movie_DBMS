-- Relational Algebra analogs expressed in SQL

-- Projection (π title, release_year (Movies))
SELECT title, release_year FROM movies;

-- Selection (σ genre = 'Action' (Movies ⋈ Movie_Genres ⋈ Genres))
SELECT m.*
FROM movies m
JOIN movie_genres mg ON mg.movie_id = m.id
JOIN genres g ON g.id = mg.genre_id
WHERE g.name = 'Action';

-- Join (Movies ⋈ Cast ⋈ People)
SELECT m.title, p.name AS actor
FROM movies m
JOIN movie_cast mc ON mc.movie_id = m.id
JOIN people p ON p.id = mc.person_id;

-- Aggregation (γ avg(rating) by movie)
SELECT movie_id, ROUND(AVG(rating),1) AS avg_rating
FROM reviews
GROUP BY movie_id;

-- Division-style query: movies that have all of the genres in a set ('Action','Drama')
SELECT m.id, m.title
FROM movies m
JOIN movie_genres mg ON mg.movie_id = m.id
JOIN genres g ON g.id = mg.genre_id
WHERE g.name IN ('Action','Drama')
GROUP BY m.id, m.title
HAVING COUNT(DISTINCT g.name) = 2;

-- 1NF: no repeating groups, atomic columns; enforced by schema.

-- 2NF/3NF/BCNF example decomposition: movie_genres separates multi-valued genre attribute into relation.

-- Example DML: INSERT, UPDATE, DELETE
INSERT INTO reviews (movie_id, user_id, username, rating, comment)
VALUES (1, 'demo', 'demo_user', 9, 'Excellent');

UPDATE people SET bio = 'Award winning director' WHERE name = 'Christopher Nolan';

DELETE FROM reviews WHERE id = 9999;

