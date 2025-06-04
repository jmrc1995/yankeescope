import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Player {
  id: number;
  name: string;
  position: string;
  home_runs: number;
  batting_avg: number;
  obp: number;
  war: number;
  ops?: number;
  sprintSpeed?: number;
  exitVelocity?: number;
}

interface RosterGridProps {
  players: Player[];
}

import PlayerCard from "./PlayerCard";

export default function RosterGrid({ players }: RosterGridProps) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<
    "home_runs" | "war" | "batting_avg" | "ops" | "sprintSpeed" | "exitVelocity"
  >("home_runs");

  const filtered = players
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0));

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Roster</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-xs p-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as any)}
          className="p-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="home_runs">Sort by Home Runs</option>
          <option value="war">Sort by WAR</option>
          <option value="batting_avg">Sort by Batting Avg</option>
          <option value="ops">Sort by OPS</option>
          <option value="sprintSpeed">Sort by Sprint Speed</option>
          <option value="exitVelocity">Sort by Exit Velocity</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-slate-500">No players found.</p>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
          >
            {filtered.map((player) => (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <PlayerCard player={player} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}