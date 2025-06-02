import { Request, Response } from "express";
import axios from "axios";

export const getPlayerStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const playerName = req.query.name?.toString().toLowerCase().trim();

  if (!playerName) {
    res.status(400).json({ message: "Player name is required" });
    return;
  }

  try {
    const rosterRes = await axios.get(
      "https://statsapi.mlb.com/api/v1/teams/147/roster?rosterType=40Man"
    );
    const roster = rosterRes.data.roster;
    console.log(
      "Roster includes:",
      roster.map((p: any) => p.person.fullName)
    );

    const player = roster.find(
      (p: any) => p.person.fullName.toLowerCase() === playerName
    );

    if (!player) {
      res.status(404).json({ message: "Player not found on Yankees roster" });
      return;
    }

    const playerId = player.person.id;

    const currentYear = new Date().getFullYear();
    const statsRes = await axios.get(
      `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=2025`
    );

    const splits = statsRes.data.stats?.[0]?.splits;

    if (!splits || splits.length === 0) {
      res
        .status(404)
        .json({ message: "Stats not available for this player this season" });
      return;
    }

    const rawStats = splits[0].stat;

    const stats = {
      home_runs: parseInt(rawStats.homeRuns ?? "0"),
      batting_avg: parseFloat(rawStats.avg ?? "0"),
      obp: parseFloat(rawStats.obp ?? "0"),
      rbis: parseInt(rawStats.rbi ?? "0"),
      stolen_bases: parseInt(rawStats.stolenBases ?? "0"),
    };

    res.json({
      name: player.person.fullName,
      position: player.position.abbreviation,
      ...stats,
    });
  } catch (err) {
    console.error("Error fetching player stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getYankeesRoster = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const rosterRes = await axios.get(
      "https://statsapi.mlb.com/api/v1/teams/147/roster?rosterType=40Man"
    );
    const roster = rosterRes.data.roster;

    const simplifiedRoster = roster.map((p: any) => ({
      id: p.person.id,
      name: p.person.fullName,
      position: p.position.abbreviation,
    }));

    res.json(simplifiedRoster);
  } catch (err) {
    console.error("Error fetching Yankees roster:", err);
    res.status(500).json({ message: "Server error" });
  }
};
