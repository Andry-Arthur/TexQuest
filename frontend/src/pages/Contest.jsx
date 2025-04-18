import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Contest({ userId }) {
  const { contestId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submittedLatex, setSubmittedLatex] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [submissionResult, setSubmissionResult] = useState(null);
  const [answered, setAnswered] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/questions?contestId=${contestId}`);
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to fetch questions", err);
      }
    };
    fetchQuestions();
  }, [contestId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/api/upload", formData);
      setUploadedImageUrl(res.data);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("❌ Image upload failed.");
    }
  };

  const handleSubmit = async () => {
    const question = questions[currentQuestionIndex];

    if (!submittedLatex || !uploadedImageUrl) {
      alert("Please enter LaTeX and upload a rendered image.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("questionId", question.id);
    formData.append("submittedLatex", submittedLatex);
    formData.append("submittedImageUrl", uploadedImageUrl);

    try {
      const res = await axios.post("http://localhost:8080/api/submit", formData);
      setSubmissionResult(res.data);
      setAnswered({ ...answered, [question.id]: true });
    } catch (err) {
      console.error("Submission error", err);
      alert("❌ Submission failed.");
    }
  };

  const goToNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSubmittedLatex("");
    setUploadedImageUrl("");
    setSubmissionResult(null);
  };

  const goToPrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    setSubmittedLatex("");
    setUploadedImageUrl("");
    setSubmissionResult(null);
  };

  const jumpToQuestion = (idx) => {
    setCurrentQuestionIndex(idx);
    setSubmittedLatex("");
    setUploadedImageUrl("");
    setSubmissionResult(null);
  };

  if (questions.length === 0) return <div>Loading questions...</div>;

  const question = questions[currentQuestionIndex];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>TexQuest Contest</h2>

      {/* Question List Navigation */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => jumpToQuestion(idx)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor:
                idx === currentQuestionIndex
                  ? "#007bff"
                  : answered[q.id]
                    ? "#28a745"
                    : "#6c757d",
              color: "white",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer"
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Question Display */}
      <h4>{question.title}</h4>
      <p>{question.description}</p>
      <img
        src={question.imageUrl}
        alt="Question"
        style={{ maxWidth: "300px", marginBottom: "1rem" }}
      />

      {/* Submission Form */}
      <div>
        <label>Enter your LaTeX code:</label><br />
        <textarea
          value={submittedLatex}
          onChange={(e) => setSubmittedLatex(e.target.value)}
          rows={4}
          cols={50}
          placeholder="e.g. \int_0^1 x^2 dx"
        />

        <div style={{ marginTop: "1rem" }}>
          <label>Upload your rendered image:</label><br />
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploadedImageUrl && (
            <div style={{ marginTop: "0.5rem" }}>
              <img
                src={uploadedImageUrl}
                alt="Your submission"
                style={{ maxWidth: "200px", border: "1px solid #aaa" }}
              />
            </div>
          )}
        </div>

        <button style={{ marginTop: "1rem" }} onClick={handleSubmit}>
          Submit Answer
        </button>
      </div>

      {/* Submission Result */}
      {submissionResult && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h4>✅ Submission Graded</h4>
          <p><strong>Score:</strong> {submissionResult.score}/100</p>
          <p><strong>Feedback:</strong> {submissionResult.feedback}</p>
        </div>
      )}

      {/* Next/Previous Navigation */}
      <div style={{ marginTop: "2rem" }}>
        {currentQuestionIndex > 0 && (
          <button onClick={goToPrevious}>← Previous</button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <button onClick={goToNext} style={{ marginLeft: "1rem" }}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

export default Contest;
