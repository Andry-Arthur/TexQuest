import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [contestId, setContestId] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    if (!contestId) return;
    try {
      const res = await axios.get("/api/contest/leaderboard", {
        params: { contestId }
      });
      setLeaderboard(res.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [contestId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Leaderboard</h2>

      <div>
        <label>Contest ID: </label>
        <input
          type="number"
          value={contestId}
          onChange={(e) => setContestId(e.target.value)}
        />
        <button onClick={fetchLeaderboard}>Refresh</button>
      </div>

      <ul>
        {leaderboard.map((entry) => (
          <li key={entry.id}>
            {entry.user.name} — {entry.score} point(s)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
