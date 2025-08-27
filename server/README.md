# Movie App Backend (Express + MySQL)

This backend provides a normalized relational schema and REST API for the React frontend.

## Setup

1. Create a MySQL database and user (or use defaults from `.env`).
2. Create `.env` in `server/` with DB credentials (see `.env.example`).
3. Load schema and seed in MySQL:

```sql
SOURCE sql/schema.sql;
SOURCE sql/seed.sql;
```

4. Install dependencies and run:

```bash
npm install
npm run dev
```

## API

- GET `/api/movies`
- GET `/api/movies/:id`
- GET `/api/people`
- GET `/api/people/:id`
- POST `/api/reviews` { movieId, userId, username, rating, comment }

## DB Topics Covered

- ER modeling with entities, relationships, and attributes
- Keys and constraints (PK, FK, UNIQUE)
- Decomposition for 1NF/2NF/3NF/BCNF via junction tables
- Relational algebra analogs in `sql/queries.sql`
- Triggers to maintain derived attributes (average rating)
