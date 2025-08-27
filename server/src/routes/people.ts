import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

router.get('/', async (_req: any, res: any) => {
	try {
		const [rows] = await pool.query(`
			SELECT id, name, birth_year AS birthYear, photo, bio FROM people ORDER BY name
		`);
		const people = rows as any[];
		for (const person of people) {
			const [roleRows] = await pool.query(
				`SELECT role FROM person_roles WHERE person_id = ? ORDER BY role`,
				[person.id]
			);
			person.roles = (roleRows as any[]).map(r => r.role);

			const [awardRows] = await pool.query(
				`SELECT name, year, category FROM awards WHERE person_id = ? ORDER BY year DESC, name`,
				[person.id]
			);
			person.awards = (awardRows as any[]).map(a => ({ name: a.name, year: a.year, category: a.category }));
		}
		res.json(people);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const [rows] = await pool.query(
			`SELECT id, name, birth_year AS birthYear, photo, bio FROM people WHERE id = ?`,
			[req.params.id]
		);
		if ((rows as any[]).length === 0) return res.status(404).json({ error: 'Not found' });
		const person = (rows as any[])[0];
		const [roleRows] = await pool.query(
			`SELECT role FROM person_roles WHERE person_id = ? ORDER BY role`,
			[person.id]
		);
		person.roles = (roleRows as any[]).map(r => r.role);

		const [awardRows] = await pool.query(
			`SELECT name, year, category FROM awards WHERE person_id = ? ORDER BY year DESC, name`,
			[person.id]
		);
		person.awards = (awardRows as any[]).map(a => ({ name: a.name, year: a.year, category: a.category }));
		res.json(person);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

export default router;

