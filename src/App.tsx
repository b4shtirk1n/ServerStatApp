import { useEffect, useState } from "react";
import "./App.css";

interface Player {
  name: string;
  uuid: string;
  skin: string;
  health: number;
  x: number;
  y: number;
  z: number;
}

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadPlayers();
    const id = setInterval(loadPlayers, 3000);

    return () => clearInterval(id);
  }, []);

  async function loadPlayers() {
    const res = await fetch("/api/players");
    setPlayers(await res.json());
  }

  return (
    <>
      <div>
        <h2>Игроки онлайн ({players.length})</h2>

        {players.map((p) => (
          <div key={p.uuid}>
            <img
              src={`https://i.pinimg.com/474x/64/3d/67/643d67ff020ca8b411001a6b31f5c149.jpg`}
              alt={p.name}
            />
            <span>{p.name}</span>
            {/* <span>{p.health}</span> */}
          </div>
        ))}
      </div>
    </>
  );
}
