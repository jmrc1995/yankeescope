import React from "react";

interface PlayerCardProps {
  player: {
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
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-slate-800">{player.name}</h3>
        <p className="text-sm text-slate-500">Position: {player.position}</p>
      </div>
      <ul className="text-sm text-slate-600 space-y-1">
        <li>
          <strong>HR:</strong> {player.home_runs}
        </li>
        <li>
          <strong>AVG:</strong> {player.batting_avg.toFixed(3)}
        </li>
        <li>
          <strong>OBP:</strong> {player.obp.toFixed(3)}
        </li>
        <li>
          <strong>WAR:</strong> {player.war.toFixed(1)}
        </li>
        {player.ops !== undefined && (
          <li>
            <strong>OPS:</strong> {player.ops.toFixed(3)}
          </li>
        )}
        {player.sprintSpeed !== undefined && (
          <li>
            <strong>Speed:</strong> {player.sprintSpeed.toFixed(1)} ft/s
          </li>
        )}
        {player.exitVelocity !== undefined && (
          <li>
            <strong>Exit Velo:</strong> {player.exitVelocity.toFixed(1)} mph
          </li>
        )}
      </ul>
    </div>
  );
}