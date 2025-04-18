import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      if (res.data && res.data.id) {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("userName", res.data.name);
        navigate("/contests");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="login-wrapper">
      <style>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f0f2f5;
        }

        .login-container {
          display: flex;
          width: 800px;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        }

        .login-image {
          width: 50%;
          background: url('https://images.unsplash.com/photo-1498050108023-c5249f4df085') no-repeat center;
          background-size: cover;
        }

        .login-form {
          width: 50%;
          padding: 2.5rem;
        }

        h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        .input-group {
          position: relative;
          margin-bottom: 1.5rem;
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

        .error {
          color: red;
          margin-bottom: 1rem;
        }

        button {
          padding: 0.75rem;
          background-color: #4F6D7A;
          color: white;
          border: none;
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        button:hover {
          background-color: #1D5167;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
            width: 90%;
          }

          .login-image {
            width: 100%;
            height: 200px;
          }

          .login-form {
            width: 100%;
            padding: 2rem;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-image" />
        <div className="login-form">
          <h2>🔐 Log In to TexQuest</h2>
          <form onSubmit={handleSubmit}>
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
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
