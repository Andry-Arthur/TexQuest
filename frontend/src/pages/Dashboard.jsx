import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [contestId, setContestId] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    if (!contestId) return;
    try {
      const res = await axios.get(
        "http://localhost:8080/api/contest/leaderboard",
        {
          params: { contestId },
        }
      );
      setLeaderboard(res.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [contestId]);

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          max-width: 800px;
          margin: 3rem auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #333;
        }

        .input-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .input-group input {
          padding: 0.5rem;
          font-size: 1rem;
          width: 150px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .input-group button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .input-group button:hover {
          background-color: #0056b3;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          font-size: 1rem;
        }

        li span {
          font-weight: bold;
          color: #007bff;
        }
      `}</style>

      <h2>🏆 Leaderboard</h2>

      <div className="input-group">
        <label htmlFor="contestId">Contest ID:</label>
        <input
          id="contestId"
          type="number"
          value={contestId}
          onChange={(e) => setContestId(e.target.value)}
        />
        <button onClick={fetchLeaderboard}>Refresh</button>
      </div>

      <ul>
        {leaderboard.map((entry) => (
          <li key={entry.id}>
            <span>{entry.user.name}</span> — {entry.score} point(s)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
