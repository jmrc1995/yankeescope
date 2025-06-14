import React from "react";

interface Player {
  id: number;
  name: string;
  war?: number;
  ops?: number;
  sprintSpeed?: number;
  exitVelocity?: number;
}

interface StatLeadersRowProps {
  players: Player[];
}

const getLeader = (players: Player[], stat: keyof Player) => {
  return players.reduce((top, curr) => {
    return (curr[stat] ?? -Infinity) > (top[stat] ?? -Infinity) ? curr : top;
  }, players[0]);
};

export default function StatLeadersRow({ players }: StatLeadersRowProps) {
  const stats: { label: string; key: keyof Player }[] = [
    { label: "WAR", key: "war" },
    { label: "OPS", key: "ops" },
    { label: "Sprint Speed", key: "sprintSpeed" },
    { label: "Exit Velocity", key: "exitVelocity" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map(({ label, key }) => {
        const leader = getLeader(players, key);
        return (
          <div
            key={key as string}
            className="bg-white rounded-xl p-4 shadow-md border border-slate-200 text-center"
          >
            <h4 className="text-sm text-slate-500 font-medium mb-1">Top {label}</h4>
            <p className="text-lg font-semibold text-slate-800">{leader.name}</p>
            <p className="text-slate-600 text-sm">
              {label}: {leader[key] ?? "N/A"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
