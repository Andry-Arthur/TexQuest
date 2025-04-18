import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import ContestList from "./pages/ContestList";
import Contest from "./pages/Contest";
import Admin from "./pages/Admin";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/Navbar";
import AuthRoute from "./components/AuthRoute";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <GuestOnlyRoute>
              <Join setUser={setUser} />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestOnlyRoute>
              <Login setUser={setUser} />
            </GuestOnlyRoute>
          }
        />
        <Route
          path="/contests"
          element={
            <AuthRoute>
              <ContestList />
            </AuthRoute>
          }
        />
        <Route
          path="/contest/:contestId"
          element={
            <AuthRoute>
              <Contest userId={user?.id} />
            </AuthRoute>
          }
        />
        <Route
          path="/contest/:contestId/leaderboard"
          element={
            <AuthRoute>
              <Leaderboard />
            </AuthRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthRoute>
              <Admin />
            </AuthRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
