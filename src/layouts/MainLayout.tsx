import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
    user: string | null;
    onLogout: () => void;
}

export default function MainLayout({ user, onLogout }: MainLayoutProps) {
    return (
        <div className="app-layout">
            <Navbar user={user} onLogout={onLogout} />

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <h3>MiniBlog</h3>
                        <p>
                            Nền tảng chia sẻ kiến thức, câu chuyện và kết nối cộng đồng yêu công nghệ mỗi ngày.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4>Điều hướng</h4>
                        <Link to="/">Trang chủ</Link>
                        <Link to="/create">Viết bài</Link>
                        <Link to="/login">Đăng nhập</Link>
                    </div>

                    <div className="footer-info">
                        <h4>Thông tin học phần</h4>
                        <p>Môn học: Lập trình Web (RIPT1306)</p>
                        <p>Công nghệ: React + TypeScript + Vite</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 MiniBlog — Bài kiểm tra thực hành giữa kỳ.</p>
                </div>
            </footer>
        </div>
    );
}