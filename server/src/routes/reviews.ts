import { Router } from 'express';
import pool from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const { movieId, userId, username, rating, comment } = req.body;
  if (!movieId || !userId || !username || typeof rating !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const [result] = await pool.query(
    `INSERT INTO reviews (movie_id, user_id, username, rating, comment) VALUES (?, ?, ?, ?, ?)`,
    [movieId, userId, username, rating, comment || null]
  );
  const insertId = (result as any).insertId;
  const [rows] = await pool.query(
    `SELECT id, movie_id AS movieId, user_id AS userId, username, rating, comment, created_at AS date FROM reviews WHERE id = ?`,
    [insertId]
  );
  res.status(201).json((rows as any[])[0]);
});

export default router;

