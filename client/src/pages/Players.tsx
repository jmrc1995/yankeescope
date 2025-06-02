import React, { useEffect, useState } from "react";
import { generateComparisonSummary } from "../../../server/src/utils/generateComparisonSummary";

interface Player {
  id: number;
  name: string;
  position: string;
}

export default function PlayerCompare() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [comparison, setComparison] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3001/mlb/roster") // ← use your new route
      .then((res) => res.json())
      .then((data) => {
        console.log("Live roster:", data);
        setPlayers(data); // ✅ updates dropdown list
      })
      .catch((err) => {
        console.error("Error fetching roster:", err);
      });
  }, []);

  const handleCompare = async () => {
    try {
      const res1 = await fetch(
        `http://localhost:3001/mlb/player?name=${encodeURIComponent(player1)}`
      );
      const res2 = await fetch(
        `http://localhost:3001/mlb/player?name=${encodeURIComponent(player2)}`
      );

      const data1 = await res1.json();
      const data2 = await res2.json();

      if (
        !data1 ||
        !data2 ||
        data1.home_runs === undefined ||
        data2.home_runs === undefined
      ) {
        alert("Stats not available for one or both players.");
        return;
      }

      setComparison({
        player1: data1,
        player2: data2,
        summary: generateComparisonSummary(data1, data2),
      });
    } catch (err) {
      console.error("Error comparing players:", err);
      alert("Something went wrong while fetching player data.");
    }
  };

return (
  
  <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 px-6 py-12">

    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-3">
          YankeeScope <span role="img" aria-label="baseball">⚾</span>
        </h1>
        <p className="text-lg text-slate-600">
          Compare Yankees players by their performance stats
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <select
          className="p-4 rounded-xl bg-white border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        >
          <option value="">Select Player 1</option>
          {players.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>

        <select
          className="p-4 rounded-xl bg-white border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        >
          <option value="">Select Player 2</option>
          {players.map((p) => (
            <option key={p.id} value={p.name}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button
          onClick={handleCompare}
          disabled={!player1 || !player2}
          className={`px-8 py-3 font-semibold rounded-full transition-all ${
            !player1 || !player2
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
          }`}
        >
          Compare Players
        </button>
      </div>

      {comparison && (
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-center text-slate-800 mb-10">
            {comparison.player1.name} vs {comparison.player2.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[comparison.player1, comparison.player2].map((player) => (
              <div
                key={player.name}
                className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl p-6 transition duration-300"
              >
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  ⚾ {player.name}
                </h3>
                <div className="space-y-2 text-slate-700 text-lg">
                  <p><strong>Position:</strong> {player.position}</p>
                  <p><strong>Home Runs:</strong> {player.home_runs}</p>
                  <p><strong>Batting Avg:</strong> {player.batting_avg}</p>
                  <p><strong>OBP:</strong> {player.obp}</p>
                  <p><strong>RBIs:</strong> {player.rbis}</p>
                  <p><strong>Stolen Bases:</strong> {player.stolen_bases}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto bg-white text-slate-800 p-6 text-lg rounded-2xl shadow border border-slate-200 leading-relaxed">
            {comparison.summary}
          </div>
        </section>
      )}
    </div>
  </div>
);




}
