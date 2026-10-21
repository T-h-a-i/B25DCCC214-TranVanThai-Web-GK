import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post, Comment } from "../types";

const API = "https://jsonplaceholder.typicode.com";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const saved = localStorage.getItem("local_posts");
                const localPosts: Post[] = saved ? JSON.parse(saved) : [];
                const foundLocal = localPosts.find((p) => String(p.id) === id);

                if (foundLocal) {
                    setPost(foundLocal);
                    setComments([]);
                    setLoading(false);
                    return;
                }

                const resPost = await fetch(`${API}/posts/${id}`);
                if (!resPost.ok) throw new Error("Không tìm thấy bài viết này");
                setPost(await resPost.json());

                const resComments = await fetch(`${API}/posts/${id}/comments`);
                if (!resComments.ok) throw new Error("Lỗi tải danh sách bình luận");
                setComments(await resComments.json());
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
            setLoading(false);
        }
        load();
    }, [id]);

    if (loading) {
        return (
            <div className="container">
                <div className="status-box">⏳ Đang tải nội dung bài viết...</div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="container">
                <div className="error-box">
                    <p>⚠️ Lỗi: {error ?? "Không có dữ liệu"}</p>
                    <Link to="/" className="btn-back">← Quay lại trang chủ</Link>
                </div>
            </div>
        );
    }

    const isLocalPost = post.id > 1000;

    return (
        <div className="container">
            <div className="detail-nav">
                <Link to="/" className="btn-back">
                    ← Quay lại danh sách bài viết
                </Link>
            </div>

            <article className="article-box">
                <div className="article-meta">
                    <span className={isLocalPost ? "badge badge-new" : "badge"}>
                        {isLocalPost ? "🌟 Bài viết của Admin" : `Chuyên mục #${post.userId ?? 1}`}
                    </span>
                    <span className="meta-id">Mã bài viết: #{post.id}</span>
                </div>

                <h1 className="article-title">{post.title}</h1>
                <div className="article-body">{post.body}</div>
            </article>

            <section className="comments-section">
                <h3 className="comments-heading">
                    💬 Bình luận từ độc giả ({comments.length})
                </h3>

                {comments.length === 0 ? (
                    <div className="empty-box">
                        <p>Bài viết này hiện chưa có bình luận nào.</p>
                    </div>
                ) : (
                    <div className="comment-list">
                        {comments.map((c) => (
                            <div key={c.id} className="comment-card">
                                <div className="comment-avatar">
                                    {c.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="comment-content">
                                    <div className="comment-header">
                                        <strong>{c.name}</strong>
                                        <span className="comment-email">{c.email}</span>
                                    </div>
                                    <p className="comment-text">{c.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}