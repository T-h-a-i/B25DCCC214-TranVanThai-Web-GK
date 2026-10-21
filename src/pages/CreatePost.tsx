import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types";

export default function CreatePost() {
    const [form, setForm] = useState({ title: "", body: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const title = form.title.trim();
        const body = form.body.trim();

        if (!title || !body) {
            setError("Vui lòng nhập đầy đủ cả tiêu đề và nội dung bài viết!");
            return;
        }
        if (title.length < 5) {
            setError("Tiêu đề bài viết phải có ít nhất 5 ký tự!");
            return;
        }
        if (body.length < 10) {
            setError("Nội dung bài viết phải có ít nhất 10 ký tự!");
            return;
        }

        const newPost: Post = {
            id: Date.now(),
            userId: 1,
            title,
            body,
        };

        const saved = localStorage.getItem("local_posts");
        const localPosts: Post[] = saved ? JSON.parse(saved) : [];

        localStorage.setItem("local_posts", JSON.stringify([newPost, ...localPosts]));
        navigate("/");
    };

    return (
        <div className="container">
            <div className="form-card">
                <div className="form-header">
                    <h2>✍️ Tạo bài viết mới</h2>
                    <p>Bài viết sẽ được lưu vào hệ thống và hiển thị ngay trên trang chủ.</p>
                </div>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Tiêu đề bài viết</label>
                        <input
                            id="title"
                            name="title"
                            placeholder="Nhập tiêu đề bài viết (tối thiểu 5 ký tự)..."
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="body">Nội dung chi tiết</label>
                        <textarea
                            id="body"
                            name="body"
                            rows={7}
                            placeholder="Nhập nội dung bài viết của bạn tại đây..."
                            value={form.body}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary">
                            Xuất bản bài viết
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Hủy & Quay lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}