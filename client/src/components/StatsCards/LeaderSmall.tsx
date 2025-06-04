import React from "react";

interface LeaderSmallProps {
  players: Array<{ name: string; value: number; unit?: string }>;
  statLabel: string;
}

export default function LeaderSmall({ players, statLabel }: LeaderSmallProps) {
  if (!players || players.length === 0) return null;

  const top = [...players].filter(p => p.value !== undefined && !isNaN(p.value)).sort((a, b) => b.value - a.value)[0];
  if (!top) return null;

  const formattedValue = top.unit ? `${top.value} ${top.unit}` : top.value;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 text-center">
      <h4 className="text-slate-600 text-sm font-medium mb-1">{statLabel}</h4>
      <p className="text-xl font-bold text-indigo-700">{formattedValue}</p>
      <p className="text-xs text-slate-500 mt-1">{top.name}</p>
    </div>
  );
}