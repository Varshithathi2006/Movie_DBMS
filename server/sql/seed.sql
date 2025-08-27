USE movie_app;

CREATE USER 'movieapp'@'localhost' IDENTIFIED BY 'StrongPass123!';
GRANT ALL PRIVILEGES ON movie_app.* TO 'movieapp'@'localhost';
FLUSH PRIVILEGES;
-- Seed a demo user (password: password)
INSERT INTO users (id, username, email, password_hash, bio)
VALUES (1, 'demo', 'demo@example.com', '$2a$10$1EoV1q4wePf7m.xk8e861uW9c1W3C7Q0vdfT1G4y8pW0l9n5GmN5a', 'Demo user')
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO genres (name) VALUES
 ('Action'), ('Adventure'), ('Sci-Fi'), ('Drama'), ('Crime'), ('Animation'), ('Comedy'), ('Thriller')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO movies (id, title, release_year, duration, rating, poster, synopsis, box_office) VALUES
 (1,'Inception',2010,148,8.8,'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400','Dream heist film', '$836.8M'),
 (2,'The Dark Knight',2008,152,9.0,'https://images.pexels.com/photos/7991577/pexels-photo-7991577.jpeg?auto=compress&cs=tinysrgb&w=400','Batman vs Joker', '$1.005B'),
 (3,'Pulp Fiction',1994,154,8.9,'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=400','Nonlinear crime drama', '$214.2M')
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO people (id, name, birth_year, photo, bio) VALUES
 (1,'Christopher Nolan',1970,'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400','Director'),
 (2,'Leonardo DiCaprio',1974,'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400','Actor'),
 (3,'Hans Zimmer',1957,'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400','Composer')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO person_roles (person_id, role) VALUES
 (1,'Director'), (1,'Producer'), (1,'Screenwriter'),
 (2,'Actor'), (2,'Producer'),
 (3,'Composer')
ON DUPLICATE KEY UPDATE role = VALUES(role);

-- Map genres
INSERT INTO movie_genres (movie_id, genre_id)
SELECT 1, id FROM genres WHERE name IN ('Sci-Fi','Thriller','Action')
ON DUPLICATE KEY UPDATE genre_id = genre_id;

INSERT INTO movie_genres (movie_id, genre_id)
SELECT 2, id FROM genres WHERE name IN ('Action','Crime','Drama')
ON DUPLICATE KEY UPDATE genre_id = genre_id;

INSERT INTO movie_genres (movie_id, genre_id)
SELECT 3, id FROM genres WHERE name IN ('Crime','Drama')
ON DUPLICATE KEY UPDATE genre_id = genre_id;

-- Cast and Crew
INSERT INTO movie_cast (movie_id, person_id) VALUES (1,2)
ON DUPLICATE KEY UPDATE person_id = person_id;

INSERT INTO movie_crew (movie_id, person_id, role) VALUES
 (1,1,'Director'), (1,3,'Composer')
ON DUPLICATE KEY UPDATE role = role;

-- Reviews sample
INSERT INTO reviews (movie_id, user_id, username, rating, comment) VALUES
 (1,1,'demo',9,'Great movie'),
 (1,1,'demo',8,'Mind-bending')
ON DUPLICATE KEY UPDATE rating = VALUES(rating);

