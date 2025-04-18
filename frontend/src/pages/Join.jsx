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
        localStorage.setItem("userName", res.data.name);
        navigate("/contests");
      } else {
        setError("Unexpected error during registration.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("Email already in use.");
      } else {
        setError(
          "Registration failed: " + (error.response?.data || error.message)
        );
      }
    }
  };

  return (
    <div className="join-wrapper">
      <style>{`
        .join-wrapper {
          display: flex;
          max-width: 900px;
          margin: 13rem auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .image-section {
          flex: 1;
          background-image: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085");
          background-size: cover;
          background-position: center;
        }

        .form-section {
          flex: 1;
          padding: 2rem;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group {
          position: relative;
        }

        .input-group input {
          width: 93%;
          padding: 1rem 0.75rem 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: transparent;
          outline: none;
          color: #000;
        }

        .input-group label {
          position: absolute;
          top: 50%;
          left: 0.75rem;
          transform: translateY(-50%);
          color: #888;
          pointer-events: none;
          transition: 0.2s ease all;
          background: white;
          padding: 0 4px;
        }

        .input-group input:focus + label,
        .input-group input.filled + label {
          top: -0.5rem;
          left: 0.5rem;
          font-size: 0.75rem;
          color: #1D5167;
        }

        button {
          padding: 0.75rem;
          background-color: #4F6D7A;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
        }

        button:hover {
          background-color: #1D5167;
        }

        p {
          color: red;
          margin-top: -0.5rem;
        }

        @media (max-width: 768px) {
          .join-wrapper {
            flex-direction: column;
          }

          .image-section {
            height: 200px;
          }
        }
      `}</style>

      <div className="image-section" />
      <div className="form-section">
        <h2>Join TexQuest</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={name ? "filled" : ""}
              required
            />
            <label>Name</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={email ? "filled" : ""}
              required
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={password ? "filled" : ""}
              required
            />
            <label>Password</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={confirmPassword ? "filled" : ""}
              required
            />
            <label>Confirm Password</label>
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Join Contest</button>
        </form>
      </div>
    </div>
  );
}

export default Join;
