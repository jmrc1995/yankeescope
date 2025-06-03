import axios from 'axios';
import { Request, Response } from 'express';
import { pool } from '../db/pool';
import { generateComparisonSummary } from '../utils/generateComparisonSummary';

export const getYankeesStatLeaders = async (_req: Request, res: Response) => {
  try {
    const rosterRes = await axios.get(
      "https://statsapi.mlb.com/api/v1/teams/147/roster?rosterType=40Man"
    );
    const roster = rosterRes.data.roster;

    const currentYear = new Date().getFullYear();
    const playerStats = await Promise.all(
      roster.map(async (p: any) => {
        const statsRes = await axios.get(
          `https://statsapi.mlb.com/api/v1/people/${p.person.id}/stats?stats=season&season=${currentYear}`
        );
        const stats = statsRes.data.stats?.[0]?.splits?.[0]?.stat || {};

        return {
          id: p.person.id,
          name: p.person.fullName,
          position: p.position.abbreviation,
          homeRuns: parseInt(stats.homeRuns ?? "0"),
          war: parseFloat(stats.war ?? "0"),
          ops: parseFloat(stats.ops ?? "0"),
          sprintSpeed: parseFloat(stats.sprintSpeed ?? "0"),
          exitVelocity: parseFloat(stats.avgHitSpeed ?? "0"), // depends on stat availability
        };
      })
    );

    res.json(playerStats);
  } catch (err) {
    console.error("Error fetching Yankees stats:", err);
    res.status(500).json({ message: "Failed to fetch Yankees stats" });
  }
};

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
    // Fetch from your own endpoint so you reuse logic
    const [res1, res2] = await Promise.all([
      axios.get(`http://localhost:3001/mlb/player?name=${encodeURIComponent(player1)}`),
      axios.get(`http://localhost:3001/mlb/player?name=${encodeURIComponent(player2)}`)
    ]);

    const p1 = res1.data;
    const p2 = res2.data;

    const summary = generateComparisonSummary(p1, p2);

    res.json({ player1: p1, player2: p2, summary });
  } catch (err: any) {
    console.error('Error comparing players:', err?.response?.data || err.message);
    res.status(500).json({ message: 'Stats not available for one or both players' });
  }
};