import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container">
            <div className="notfound-box">
                <div className="notfound-code">404</div>
                <h2>Không tìm thấy trang yêu cầu</h2>
                <p>
                    Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi.
                </p>
                <Link to="/" className="btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
                    ← Quay về trang chủ
                </Link>
            </div>
        </div>
    );
}