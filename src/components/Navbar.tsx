import { Link, NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
    user: string | null;
    onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
    const navigate = useNavigate();

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "nav-link active" : "nav-link";

    const handleLogout = () => {
        onLogout();
        navigate("/");
    };

    return (
        <header className="navbar-wrapper">
            <nav className="navbar">
                <Link to="/" className="logo">
                    <span className="logo-badge">M</span>
                    MiniBlog
                </Link>

                <div className="nav-menu">
                    <NavLink to="/" end className={linkClass}>
                        Trang chủ
                    </NavLink>

                    <NavLink to="/create" className={linkClass}>
                        Viết bài mới
                    </NavLink>

                    {user ? (
                        <div className="auth-box">
                            <span className="user-badge">👋 Xin chào, {user}</span>
                            <button type="button" onClick={handleLogout} className="btn-logout">
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <NavLink to="/login" className="btn-login-nav">
                            Đăng nhập
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
}