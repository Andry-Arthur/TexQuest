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
    <div className="contest-container">
      <style>{`
        .contest-container {
          max-width: 1000px;
          margin: 3rem auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          font-size: 2rem;
          text-align: center;
          color:rgb(65, 91, 119);
          padding-left: 0.5rem;;
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 1.5rem;
          color: #444;
          margin-top: 3rem;
          border-left: 4px solid #007bff;
          padding-left: 0.5rem;
        }

        .contest-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 1.25rem;
          margin: 1rem 0;
          background-color: #fdfdfd;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .contest-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          background-color: #f1f8ff;
        }

        .contest-card h4 {
          margin: 0;
          font-size: 1.25rem;
          color: #007bff;
        }

        .contest-card p {
          margin: 0.4rem 0;
          color: #555;
        }

        .contest-link {
          text-decoration: none;
          color: inherit;
        }

        .no-contests {
          font-style: italic;
          color: #999;
          margin-top: 0.5rem;
        }
      `}</style>

      <h2>📅 Available Contests</h2>

      {["ongoing", "upcoming", "past"].map((group) => (
        <div key={group}>
          <h3>{group.toUpperCase()}</h3>

          {groupedContests[group]?.length === 0 && (
            <p className="no-contests">No {group} contests available.</p>
          )}

          {groupedContests[group]?.map((contest) => (
            <Link
              key={contest.id}
              to={`/contest/${contest.id}`}
              className="contest-link"
            >
              <div className="contest-card">
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
