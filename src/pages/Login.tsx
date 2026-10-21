import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginProps {
    onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (form.username === "admin" && form.password === "123456") {
            onLogin("admin");
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        } else {
            setError("Tài khoản hoặc mật khẩu không chính xác!");
        }
    };

    return (
        <div className="container">
            <div className="form-card">
                <div className="form-header">
                    <h2>🔐 Đăng nhập hệ thống</h2>
                    <p>Đăng nhập để có quyền viết và xuất bản bài mới trên MiniBlog</p>
                </div>

                <div className="demo-account-hint">
                    💡 <strong>Tài khoản chấm bài:</strong> <code>admin</code> / <strong>Mật khẩu:</strong> <code>123456</code>
                </div>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            id="username"
                            name="username"
                            placeholder="Nhập tên tài khoản (admin)..."
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Nhập mật khẩu (123456)..."
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            Đăng nhập ngay
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate("/")}
                        >
                            Về trang chủ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}