/* eslint-disable react-hooks/immutability */
import type { Player } from "./models/Player";
import type { Server } from "./models/Server";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [server, setServer] = useState<Server | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    loadPlayers();
    loadServer();

    const id = setInterval(() => {
      loadServer();
      loadPlayers();
    }, 3000);

    return () => clearInterval(id);
  }, []);

  async function loadServer() {
    const res = await fetch("https://streamuse.app/api/server");
    setServer(await res.json());
  }

  async function loadPlayers() {
    const res = await fetch("https://streamuse.app/api/players");
    setPlayers(await res.json());
  }

  return (
    <>
      <div>
        <h2>Игроки онлайн ({players.length})</h2>

        {players.map((p) => (
          <div key={p.uuid}>
            <img
              width={48}
              src={`https://i.pinimg.com/474x/64/3d/67/643d67ff020ca8b411001a6b31f5c149.jpg`}
              alt={p.name}
            />
            <div>
              <p>{p.name}</p>
            </div>
            <p>Ping: {p.ping}</p>
          </div>
        ))}

        <iframe
          src="http://213.171.24.78:8100"
          style={{
            width: "80vh",
            height: "80vh",
            border: "none",
          }}
        />
      </div>
    </>
  );
}
