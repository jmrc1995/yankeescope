import React, { useEffect, useState } from "react";

interface LeaderLargeProps {
  players: Array<{
    name: string;
    home_runs: number;
    image?: string;
  }>;
}

export default function LeaderLarge({ players }: LeaderLargeProps) {
  const [leader, setLeader] = useState<LeaderLargeProps["players"][0] | null>(null);

  useEffect(() => {
    if (players.length === 0) return;
    const topHR = [...players].sort((a, b) => b.home_runs - a.home_runs)[0];
    setLeader(topHR);
  }, [players]);

  if (!leader) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6">
      <img
        src={leader.image || "/images/default.png"}
        alt={leader.name}
        className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500"
      />
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">
          {leader.name}
        </h3>
        <p className="text-xl text-indigo-600 font-semibold">
          {leader.home_runs} HR
        </p>
        <p className="text-slate-500 mt-1">Home Run Leader</p>
      </div>
    </div>
  );
}