
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import CreateBlog from './pages/CreateBlog.jsx';
import AdminPanel from "./components/AdminPenal";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("username");
    const admin = localStorage.getItem("admin");

    if (token) {
      setIsAuthenticated(true);
      setUser(userName || "");
      setIsAdmin(admin === 'true');
    }
  }, []);

  const handleLogin = (userName, isAdmin = false) => {
    setIsAuthenticated(true);
    setUser(userName);
    setIsAdmin(isAdmin);
    localStorage.setItem("admin", isAdmin);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("admin");
    setIsAuthenticated(false);
    setUser("");
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <>
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/admin/login" &&
        location.pathname !== "/admin" && (
          <Navbar
            isAuthenticated={isAuthenticated}
            user={user}
            handleLogout={handleLogout}
          />
        )}
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/login" element={<AdminLogin handleLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={
            isAuthenticated && isAdmin ? (
              <AdminPanel />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </>
  );
}

export default App;
