import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Contest({ userId }) {
  const { contestId } = useParams(); // ✅ contest ID from route
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

    if (contestId) fetchQuestions();
  }, [contestId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/api/upload", formData);
      const imageUrl = res.data;
      setUploadedImageUrl(imageUrl);
    } catch (err) {
      console.error("Image upload failed", err);
      alert("❌ Image upload failed.");
    }
  };

  const handleSubmit = async () => {
    const question = questions[currentQuestionIndex];
    if (!submittedLatex || !uploadedImageUrl) {
      alert("Please enter LaTeX and upload an image.");
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
      console.error("Submission failed", err);
      alert("❌ Submission failed.");
    }
  };

  const goToNext = () => {
    setCurrentQuestionIndex((i) => i + 1);
    setSubmittedLatex("");
    setUploadedImageUrl("");
    setSubmissionResult(null);
  };

  const goToPrevious = () => {
    setCurrentQuestionIndex((i) => i - 1);
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

  if (!questions.length) return <div>Loading contest questions...</div>;

  const question = questions[currentQuestionIndex];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>TexQuest Contest #{contestId}</h2>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => jumpToQuestion(idx)}
            style={{
              padding: "0.5rem",
              borderRadius: "6px",
              backgroundColor:
                idx === currentQuestionIndex
                  ? "#007bff"
                  : answered[q.id]
                  ? "#28a745"
                  : "#6c757d",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Q{idx + 1}
          </button>
        ))}
      </div>

      {/* Question */}
      <h3>{question.title}</h3>
      <p>{question.description}</p>
      <img
        src={question.imageUrl}
        alt="Question"
        style={{ maxWidth: "300px", border: "1px solid #ccc", marginBottom: "1rem" }}
      />

      {/* Answer */}
      <div>
        <label>Enter your LaTeX code:</label><br />
        <textarea
          value={submittedLatex}
          onChange={(e) => setSubmittedLatex(e.target.value)}
          rows={4}
          cols={50}
          placeholder="e.g. \int_0^1 x dx"
        />
        <br />
        <label>Upload your rendered LaTeX image:</label><br />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploadedImageUrl && (
          <div style={{ marginTop: "0.5rem" }}>
            <img
              src={uploadedImageUrl}
              alt="Uploaded"
              style={{ maxWidth: "200px", border: "1px solid #ccc" }}
            />
          </div>
        )}
        <br />
        <button style={{ marginTop: "1rem" }} onClick={handleSubmit}>
          Submit Answer
        </button>
      </div>

      {/* Result */}
      {submissionResult && (
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
          <h4>✅ Grading Result</h4>
          <p><strong>Score:</strong> {submissionResult.score}/100</p>
          <p><strong>Feedback:</strong> {submissionResult.feedback}</p>
        </div>
      )}

      {/* Navigation */}
      <div style={{ marginTop: "2rem" }}>
        {currentQuestionIndex > 0 && (
          <button onClick={goToPrevious}>← Previous</button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <button style={{ marginLeft: "1rem" }} onClick={goToNext}>Next →</button>
        )}
      </div>
    </div>
  );
}

export default Contest;
