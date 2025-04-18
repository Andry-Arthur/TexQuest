import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Leaderboard.css";

function Leaderboard() {
  const { contestId } = useParams();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`/api/contest/leaderboard?contestId=${contestId}`);
        setEntries(res.data);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      }
    };
    fetchLeaderboard();
  }, [contestId]);

  // Helper for rank color
  const getRankStyle = (idx) => {
    if (idx === 0) return { backgroundColor: "#FFD700", color: "#000" }; // Gold
    if (idx === 1) return { backgroundColor: "#C0C0C0", color: "#000" }; // Silver
    if (idx === 2) return { backgroundColor: "#CD7F32", color: "#fff" }; // Bronze
    return { backgroundColor: "#007bff", color: "#fff" }; // Default blue
  };

  return (
    <div style={{
        padding: "2rem",
        maxWidth: "800px",
        width: "100%",
        minHeight: "80vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}>
      <h2 style={{ marginBottom: "1rem" }}>🏆 Leaderboard</h2>
      <Link to={`/contest/${contestId}`} style={{ textDecoration: "none", color: "#007bff" }}>
        ← Back to Contest
      </Link>

      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {entries.map((entry, idx) => (
          <div
            key={entry.user.id}
            style={{
              backgroundColor: "#f0f0f0",
              borderRadius: "999px",
              padding: "1rem 2rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              fontSize: "1.1rem",
              fontWeight: "500"
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                ...getRankStyle(idx)
              }}
            >
              {idx + 1}
            </div>
            <span>{entry.user.name}</span>
            <span style={{ marginLeft: "auto", fontWeight: "bold" }}>{entry.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
