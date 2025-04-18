import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Join() {
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
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data && res.data.id) {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("userName", res.data.name); // optional

        navigate("/contests");
      } else {
        setError("Unexpected error during registration.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("Email already in use.");
      } else {
        setError("Registration failed: " + (error.response?.data || error.message));
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
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
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Join Contest</button>
      </form>
    </div>
  );
}

export default Join;
