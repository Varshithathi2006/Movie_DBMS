import { Router } from 'express';
import pool from '../db';

const router = Router();

router.get('/:id', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT id, username, email, bio, join_date AS joinDate FROM users WHERE id = ?',
    [req.params.id]
  );
  if ((rows as any[]).length === 0) return res.status(404).json({ error: 'Not found' });
  const user = (rows as any[])[0];
  user.id = String(user.id);
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const { username, email, bio } = req.body;
  if (!username || !email) return res.status(400).json({ error: 'Invalid payload' });
  const conn = await pool.getConnection();
  try {
    await conn.query(
      'UPDATE users SET username = ?, email = ?, bio = ? WHERE id = ?',
      [username, email, bio || null, req.params.id]
    );
    const [rows] = await conn.query(
      'SELECT id, username, email, bio, join_date AS joinDate FROM users WHERE id = ?',
      [req.params.id]
    );
    if ((rows as any[]).length === 0) return res.status(404).json({ error: 'Not found' });
    const user = (rows as any[])[0];
    user.id = String(user.id);
    res.json(user);
  } finally {
    conn.release();
  }
});

export default router;

