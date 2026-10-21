import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";

export default function App() {
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem("user");
  });

  const handleLogin = (username: string) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout user={user} onLogout={handleLogout} />}>
        <Route index element={<Home />} />
        <Route path="posts/:id" element={<PostDetail />} />
        <Route path="login" element={<Login onLogin={handleLogin} />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="create" element={<CreatePost />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}