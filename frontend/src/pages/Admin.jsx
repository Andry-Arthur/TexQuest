import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const [contest, setContest] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [contestId, setContestId] = useState(null);
  const [question, setQuestion] = useState({
    title: "",
    description: "",
    imageUrl: "",
    correctLatex: "",
    points: 1, // ✅ default to 1
  });
  const [addedQuestions, setAddedQuestions] = useState([]);
  const navigate = useNavigate();

  const handleCreateContest = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/contest", contest);
      setContestId(res.data.id);
      alert(`✅ Contest created! ID: ${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create contest.");
    }
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!contestId) return alert("⚠️ Create a contest first!");

    try {
      const res = await axios.post(
        `/api/questions?contestId=${contestId}`,
        question
      );
      setAddedQuestions([...addedQuestions, res.data]);
      setQuestion({ title: "", description: "", imageUrl: "", correctLatex: "", points: 1 });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add question.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData);
      const imageUrl = res.data;
      setQuestion({ ...question, imageUrl });
    } catch (err) {
      console.error("Upload failed", err);
      alert("❌ Image upload failed.");
    }
  };

  const handleFinish = () => {
    alert(`✅ Contest #${contestId} finalized!`);
    navigate("/contests");
  };

  return (
    <div className="admin-container">
      <h2>Create a New Contest</h2>
      <form onSubmit={handleCreateContest}>
        <div>
          <label>Contest Name:</label>
          <input
            value={contest.name}
            onChange={(e) => setContest({ ...contest, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={contest.description}
            onChange={(e) => setContest({ ...contest, description: e.target.value })}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={contest.startTime}
            onChange={(e) => setContest({ ...contest, startTime: e.target.value })}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={contest.endTime}
            onChange={(e) => setContest({ ...contest, endTime: e.target.value })}
            required
          />
        </div>
        <button type="submit">Create Contest</button>
      </form>

      {contestId && (
        <>
          <h3>Add Questions to Contest #{contestId}</h3>
          <form onSubmit={handleAddQuestion}>
            <div>
              <label>Title:</label>
              <input
                value={question.title}
                onChange={(e) => setQuestion({ ...question, title: e.target.value })}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={question.description}
                onChange={(e) => setQuestion({ ...question, description: e.target.value })}
              />
            </div>
            <div>
              <label>Upload LaTeX Image:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {question.imageUrl && (
                <div style={{ marginTop: "0.5rem" }}>
                  <img
                    src={question.imageUrl}
                    alt="preview"
                    style={{ maxWidth: "150px", border: "1px solid #aaa" }}
                  />
                </div>
              )}
            </div>
            <div>
              <label>Correct LaTeX Code:</label>
              <input
                value={question.correctLatex}
                onChange={(e) =>
                  setQuestion({ ...question, correctLatex: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Points (minimum 1):</label>
              <input
                type="number"
                min="1"
                value={question.points}
                onChange={(e) =>
                  setQuestion({ ...question, points: parseInt(e.target.value || "1") })
                }
                required
              />
            </div>
            <button type="submit">Add Question</button>
          </form>

          {addedQuestions.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
              <h4>Added Questions:</h4>
              <ul>
                {addedQuestions.map((q, idx) => (
                  <li key={idx}>{q.title} – {q.points} pts</li>
                ))}
              </ul>
              <button style={{ marginTop: "1rem" }} onClick={handleFinish}>
                Finish & Exit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Admin;
