import { Request, Response } from 'express';
import axios from 'axios';

export const getPlayerStats = async (req: Request, res: Response): Promise<void> => {
  const playerName = req.query.name?.toString().toLowerCase().trim();

  if (!playerName) {
    res.status(400).json({ message: 'Player name is required' });
    return;
  }

  try {
    const rosterRes = await axios.get('https://statsapi.mlb.com/api/v1/teams/147/roster');
    const roster = rosterRes.data.roster;

    const player = roster.find((p: any) =>
      p.person.fullName.toLowerCase().includes(playerName)
    );

    if (!player) {
      res.status(404).json({ message: 'Player not found on Yankees roster' });
      return;
    }

    const playerId = player.person.id;

    const statsRes = await axios.get(
      `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=2024`
    );

    const stats = statsRes.data.stats[0]?.splits[0]?.stat;

    if (!stats) {
      res.status(404).json({ message: 'Stats not available for this player' });
      return;
    }

    res.json({
      name: player.person.fullName,
      position: player.position.abbreviation,
      stats,
    });
  } catch (err) {
    console.error('Error fetching player stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
