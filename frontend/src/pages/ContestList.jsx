import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ContestList.css";

function ContestList() {
  const [groupedContests, setGroupedContests] = useState({
    ongoing: [],
    upcoming: [],
    past: [],
  });

  useEffect(() => {
    axios
      .get("/api/contest/all-flat")
      .then((res) => {
        const now = new Date();
        const upcoming = [];
        const ongoing = [];
        const past = [];

        res.data.forEach((contest) => {
          const start = new Date(contest.startTime);
          const end = new Date(contest.endTime);

          if (end < now) {
            past.push(contest);
          } else if (start > now) {
            upcoming.push(contest);
          } else {
            ongoing.push(contest);
          }
        });

        setGroupedContests({ upcoming, ongoing, past });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container" style={{ padding: "2rem" }}>
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
              to={`/contest/${contest.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
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
                  <strong>🕒</strong>{" "}
                  {new Date(contest.startTime).toLocaleString()} →{" "}
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
