import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import Contest from "./pages/Contest";
import ContestList from "./pages/ContestList";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Login from "./pages/Login";


function App() {
  const userId = localStorage.getItem("userId"); // ✅ Define it first


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/contests" element={<ContestList />} />
        <Route path="/contest/:contestId" element={<Contest userId={userId} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
