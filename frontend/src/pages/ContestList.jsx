import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ContestList() {
  const [groupedContests, setGroupedContests] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/contest/all")
      .then((res) => setGroupedContests(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📅 Available Contests</h2>

      {["ongoing", "upcoming", "past"].map((group) => (
        <div key={group}>
          <h3 style={{ marginTop: "2rem" }}>{group.toUpperCase()}</h3>
          {groupedContests[group]?.length === 0 && (
            <p>No {group} contests available.</p>
          )}

          {groupedContests[group]?.map((contest) => (
            <Link
              key={contest.id}
              to={`/contest/${contest.id}`} // ✅ pass contestId in URL
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  margin: "1rem 0",
                  backgroundColor: "#f9f9f9",
                  transition: "0.2s",
                  cursor: "pointer"
                }}
              >
                <h4>{contest.name}</h4>
                <p>{contest.description}</p>
                <p>
                  <strong>🕒</strong> {new Date(contest.startTime).toLocaleString()} →{" "}
                  {new Date(contest.endTime).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ContestList;
