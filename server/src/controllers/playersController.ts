import { Request, Response } from 'express';
import { pool } from '../db/pool';

export const getAllPlayers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM players');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const comparePlayers = async (
  req: Request<{}, {}, {}, { player1?: string; player2?: string }>,
  res: Response
): Promise<void> => {
  const { player1, player2 } = req.query;

  if (!player1 || !player2) {
    res.status(400).json({ message: 'Both player1 and player2 are required' });
    return;
  }

  try {
    const result1 = await pool.query('SELECT * FROM players WHERE name ILIKE $1', [player1]);
    const result2 = await pool.query('SELECT * FROM players WHERE name ILIKE $1', [player2]);

    if (result1.rows.length === 0 || result2.rows.length === 0) {
      res.status(404).json({ message: 'One or both players not found' });
      return;
    }

    res.json({
      player1: result1.rows[0],
      player2: result2.rows[0],
    });
  } catch (err) {
    console.error('Error comparing players:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
