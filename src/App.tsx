/* eslint-disable react-hooks/immutability */
import type { Player } from "./models/Player";
import type { Server } from "./models/Server";
import type { Leaderboard } from "./models/Leaderboard";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [server, setServer] = useState<Server | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

  useEffect(() => {
    loadServer();
    loadPlayers();
    loadLeaderboard();

    const id = setInterval(() => {
      loadServer();
      loadPlayers();
      loadLeaderboard();
      console.log(server);
    }, 3000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadServer() {
    const res = await fetch("https://streamuse.app/api/server");
    setServer(await res.json());
  }

  async function loadPlayers() {
    const res = await fetch("https://streamuse.app/api/players");
    setPlayers(await res.json());
  }

  async function loadLeaderboard() {
    const res = await fetch("https://streamuse.app/api/leaderboard");
    setLeaderboard(await res.json());
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h2>Игроки онлайн ({players.length})</h2>
          {players.map((p) => (
            <div
              key={p.uuid}
              style={{ display: "flex", gap: 20, alignItems: "center" }}
            >
              <img
                width={48}
                src={`https://i.pinimg.com/474x/64/3d/67/643d67ff020ca8b411001a6b31f5c149.jpg`}
                alt={p.name}
              />
              <div>
                <p>{p.name}</p>
              </div>
              <p style={{ display: "flex", justifyContent: "center" }}>
                Ping: {p.ping}
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h2>Топ по отключению от сервера</h2>
          {[...leaderboard]
            .sort((a, b) => b.leaveCount - a.leaveCount)
            .slice(0, 1)
            .map((p) => (
              <div
                key={p.uuid}
                style={{ display: "flex", gap: 20, alignItems: "center" }}
              >
                <img
                  width={48}
                  src={`https://i.pinimg.com/474x/64/3d/67/643d67ff020ca8b411001a6b31f5c149.jpg`}
                  alt={p.name}
                />
                <div>
                  <p>{p.name}</p>
                </div>
                <p style={{ display: "flex", justifyContent: "center" }}>
                  {p.leaveCount}
                </p>
              </div>
            ))}
        </div>
      </div>

      <iframe
        src="https://streamuse.app/bluemap"
        style={{
          width: "80vh",
          height: "80vh",
          border: "none",
          flexShrink: 0,
        }}
      />
    </>
  );
}
