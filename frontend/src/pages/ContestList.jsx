import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ContestList() {
  const [contests, setContests] = useState({ ongoing: [], upcoming: [], past: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/contest/all").then((res) => {
      setContests(res.data);
    });
  }, []);

  const goToContest = (id) => {
    navigate(`/contest/${id}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>TexQuest Contests</h2>

      {["ongoing", "upcoming", "past"].map((group) => (
        <div key={group}>
          <h3>{group.charAt(0).toUpperCase() + group.slice(1)} Contests</h3>
          {contests[group].length === 0 ? (
            <p>No {group} contests.</p>
          ) : (
            <ul>
              {contests[group].map((c) => (
                <li key={c.id}>
                  Contest #{c.id} — starts {c.startTime?.split("T")[0]}
                  {group === "ongoing" && (
                    <button onClick={() => goToContest(c.id)}>Enter</button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default ContestList;
