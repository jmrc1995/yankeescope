import React from "react";

interface ToggleTeamProps {
  current: "yankees" | "mlb";
  onToggle: (view: "yankees" | "mlb") => void;
}

export default function ToggleTeam({ current, onToggle }: ToggleTeamProps) {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => onToggle("yankees")}
        className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm ${
          current === "yankees"
            ? "bg-indigo-600 text-white"
            : "bg-white text-slate-600 border border-slate-300"
        }`}
      >
        My Team (Yankees)
      </button>

      <button
        onClick={() => onToggle("mlb")}
        className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm ${
          current === "mlb"
            ? "bg-indigo-600 text-white"
            : "bg-white text-slate-600 border border-slate-300"
        }`}
      >
        All MLB
      </button>
    </div>
  );
}
