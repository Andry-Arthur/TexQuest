import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Contest() {
  const { id: contestId } = useParams(); // 👈 get contestId from URL
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch questions for the contest
  useEffect(() => {
    if (!contestId) return;
    axios.get("http://localhost:8080/api/questions", {
      params: { contestId }
    })
    .then((res) => setQuestions(res.data))
    .catch((err) => console.error("Failed to load questions:", err));
  }, [contestId]);

  const handleSubmit = async (questionId) => {
    const latex = answers[questionId] || "";
    try {
      const res = await axios.post("http://localhost:8080/api/submit", null, {
        params: {
          userId: user.id,
          questionId,
          latex,
        }
      });

      if (res.data && res.data.isCorrect) {
        setMessage("✅ Correct answer!");
      } else {
        setMessage("❌ Incorrect. Try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("⚠️ Error submitting answer.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Contest #{contestId}</h2>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} style={{ marginBottom: "2rem" }}>
            <p><strong>{q.description}</strong></p>
            <img src={q.imageUrl} alt="question" style={{ maxWidth: "400px" }} />
            <div>
              <input
                placeholder="Type your LaTeX answer"
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              />
              <button onClick={() => handleSubmit(q.id)}>Submit</button>
            </div>
          </div>
        ))
      )}

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default Contest;
