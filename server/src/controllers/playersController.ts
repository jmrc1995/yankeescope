import { Request, Response } from 'express';
import { pool } from '../db/pool';

export const getAllPlayers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM players');
    res.json(result.rows);
  } catch (err) {
  console.error('Error fetching players:', err); // ✅ Add this
  res.status(500).json({ message: 'Server error' });
}

};
