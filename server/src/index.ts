import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './routes/movies';
import peopleRouter from './routes/people';
import reviewsRouter from './routes/reviews';
import authRouter from './routes/auth';
import usersRouter from './routes/users';

dotenv.config({ path: process.env.DOTENV_PATH || undefined });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/movies', moviesRouter);
app.use('/api/people', peopleRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

