import React, { useEffect, useState } from "react";
import { generateComparisonSummary } from "../../../server/src/utils/generateComparisonSummary";
import judgeAnime from "../assets/aaron_judge_anime.png";
import antAnime from "../assets/anthony_volpe_anime.png"

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
            YANKEESCOPE{" "}
            <span role="img" aria-label="baseball">
              ⚾
            </span>
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
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            className="p-4 rounded-xl bg-white border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-500"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
          >
            <option value="">Select Player 2</option>
            {players.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
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
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
              {comparison.player1.name} vs {comparison.player2.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[comparison.player1, comparison.player2].map((player) => (
                <div
                  key={player.name}
                  className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl"
                >
                  {/* Show Judge anime image if it's him */}
                  {player.name === "Aaron Judge" && (
                    <img
                      src={judgeAnime}
                      alt="Aaron Judge Anime"
                      className="w-full h-60 object-contain rounded-xl mx-auto mb-4"
                    />
                  )}
                  {/* Show Volpe anime image if it's him */}
                  {player.name === "Anthony Volpe" && (
                    <img
                      src={antAnime}
                      alt="Anthony Volpe Anime"
                      className="w-full h-60 object-contain rounded-xl mx-auto mb-4"
                    />
                  )}

                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    ⚾ {player.name}
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-left">
                    <li>
                      <strong>Position:</strong> {player.position}
                    </li>
                    <li>
                      <strong>Home Runs:</strong> {player.home_runs}
                    </li>
                    <li>
                      <strong>Batting Avg:</strong> {player.batting_avg}
                    </li>
                    <li>
                      <strong>OBP:</strong> {player.obp}
                    </li>
                    <li>
                      <strong>RBIs:</strong> {player.rbis}
                    </li>
                    <li>
                      <strong>Stolen Bases:</strong> {player.stolen_bases}
                    </li>
                  </ul>
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
