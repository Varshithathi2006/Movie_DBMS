import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const conn = await pool.getConnection();
  try {
    const [existing] = await conn.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) return res.status(409).json({ error: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await conn.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );
    const id = (result as any).insertId;
    const [rows] = await conn.query(
      'SELECT id, username, email, bio, join_date AS joinDate FROM users WHERE id = ?',
      [id]
    );
    const user = (rows as any[])[0];
    user.id = String(user.id);
    return res.status(201).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    conn.release();
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Invalid payload' });
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, password_hash, bio, join_date AS joinDate FROM users WHERE email = ?',
      [email]
    );
    if ((rows as any[]).length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const record = (rows as any[])[0];
    const ok = await bcrypt.compare(password, record.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const user = {
      id: String(record.id),
      username: record.username,
      email: record.email,
      bio: record.bio,
      joinDate: record.joinDate
    };
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

