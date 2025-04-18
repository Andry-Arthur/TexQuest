import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Join({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data && res.data.id) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("userId", res.data.id);
        setUser(res.data);
        navigate("/contests");
      } else {
        setError("Unexpected error during registration.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("⚠️ Email already in use.");
      } else {
        setError("Registration failed: " + (error.response?.data || error.message));
      }
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Join TexQuest</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        <button type="submit" style={{ marginTop: "1.5rem" }}>
          Join Contest
        </button>
      </form>
    </div>
  );
}

export default Join;
