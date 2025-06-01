import React, { useEffect, useState } from "react";

interface Player {
  id: number;
  name: string;
  position: string;
  is_pitcher: boolean;
  is_active: boolean;
}

export default function PlayerCompare() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [comparison, setComparison] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:3001/players")
      .then((res) => res.json())
      .then((data) => {
        console.log("Players:", data); // 👈 Add this
        setPlayers(data);
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
      });
  }, []);

  const handleCompare = async () => {
    const res = await fetch(
      `http://localhost:3001/players/compare?player1=${encodeURIComponent(
        player1
      )}&player2=${encodeURIComponent(player2)}`
    );
    const data = await res.json();
    setComparison(data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#f8fafc",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "2rem",
          }}
        >
          <span style={{ color: "#1e293b" }}>YankeeScope</span>{" "}
          <span role="img" aria-label="baseball">
            ⚾
          </span>
        </h1>

        <h2>Compare Yankees Players</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: 400,
            margin: "1rem auto",
          }}
        >
          <select value={player1} onChange={(e) => setPlayer1(e.target.value)}>
            <option value="">Select Player 1</option>
            {players.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <select value={player2} onChange={(e) => setPlayer2(e.target.value)}>
            <option value="">Select Player 2</option>
            {players.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCompare}
            disabled={!player1 || !player2}
            style={{
              padding: "0.75rem",
              fontWeight: "bold",
              background: "#e2e8f0",
              border: "none",
              borderRadius: "8px",
              cursor: !player1 || !player2 ? "not-allowed" : "pointer",
            }}
          >
            Compare Players
          </button>
        </div>

        {/* === Your existing comparison display remains unchanged === */}
        {comparison && (
          <div
            style={{
              marginTop: "2rem",
              background: "#f0f4f8",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
              Results:{" "}
              <strong>
                {comparison.player1.name} vs {comparison.player2.name}
              </strong>
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              {[comparison.player1, comparison.player2].map((player) => (
                <div
                  key={player.name}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #d0d7de",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    width: "260px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    textAlign: "left",
                  }}
                >
                  <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                    ⚾ {player.name}
                  </h4>
                  <p>
                    <strong>Position:</strong> {player.position}
                  </p>
                  <p>
                    <strong>Home Runs:</strong> {player.home_runs}
                  </p>
                  <p>
                    <strong>Batting Avg:</strong> {player.batting_avg}
                  </p>
                  <p>
                    <strong>OBP:</strong> {player.obp}
                  </p>
                  <p>
                    <strong>RBIs:</strong> {player.rbis}
                  </p>
                  <p>
                    <strong>Stolen Bases:</strong> {player.stolen_bases}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "2rem",
                background: "#ffffff",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid #ccc",
                fontSize: "1.1rem",
                lineHeight: "1.7",
                maxWidth: "700px",
                marginInline: "auto",
                whiteSpace: "pre-line",
                color: "#333",
              }}
            >
              {comparison.summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
