import { useEffect, useState } from 'react';

type Player = {
  id: number;
  name: string;
  position: string;
  is_pitcher: boolean;
  is_active: boolean;
};

const Players = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/players')
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error("Failed to fetch players:", err));
  }, []);

  return (
    <div>
      {players.map(player => (
        <div key={player.id}>
          <strong>{player.name}</strong> — {player.position} {player.is_pitcher && '(Pitcher)'}
        </div>
      ))}
    </div>
  );
};

export default Players;
