import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Post } from "../types";

const API = "https://jsonplaceholder.typicode.com";

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get("q") ?? "";

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await fetch(`${API}/posts`);
                if (!res.ok) throw new Error("Lỗi tải dữ liệu từ máy chủ");
                const apiPosts: Post[] = await res.json();

                const saved = localStorage.getItem("local_posts");
                const localPosts: Post[] = saved ? JSON.parse(saved) : [];

                setPosts([...localPosts, ...apiPosts]);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
            setLoading(false);
        }
        load();
    }, []);

    const filtered = useMemo(
        () =>
            posts.filter((p) =>
                p.title.toLowerCase().includes(q.toLowerCase())
            ),
        [posts, q]
    );

    return (
        <div>
            {/* PHẦN HERO BANNER CHÀO MỪNG */}
            <section className="hero-banner">
                <div className="hero-content">
                    <span className="hero-tag">✨ Chào mừng bạn đến với MiniBlog</span>
                    <h1>Khám phá & Chia sẻ câu chuyện của bạn</h1>
                    <p>
                        Nơi tổng hợp các bài viết thú vị từ cộng đồng. Bạn có thể tìm kiếm chủ đề yêu thích hoặc tự tay đăng tải bài viết mới ngay hôm nay!
                    </p>
                    <div className="hero-actions">
                        <Link to="/create" className="btn-hero">
                            ✍️ Viết bài mới ngay
                        </Link>
                    </div>
                </div>
            </section>

            <div className="container">
                {/* THANH TÌM KIẾM & THỐNG KÊ */}
                <div className="search-section">
                    <div className="search-box">
                        <input
                            placeholder="🔍 Nhập từ khóa để tìm kiếm theo tiêu đề bài viết..."
                            value={q}
                            onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
                        />
                        {q && (
                            <button
                                type="button"
                                className="btn-clear"
                                onClick={() => setSearchParams({})}
                            >
                                Xóa lọc
                            </button>
                        )}
                    </div>
                    <div className="post-stats">
                        Hiển thị <strong>{filtered.length}</strong> bài viết
                        {q && <span> cho từ khóa "{q}"</span>}
                    </div>
                </div>

                {/* TRẠNG THÁI ĐANG TẢI & BÁO LỖI */}
                {loading && (
                    <div className="status-box">
                        <p>⏳ Đang tải danh sách bài viết...</p>
                    </div>
                )}

                {error && (
                    <div className="error-box">
                        <p>⚠️ Lỗi: {error}</p>
                    </div>
                )}

                {/* DANH SÁCH BÀI VIẾT DẠNG GRID */}
                {!loading && !error && (
                    <>
                        {filtered.length === 0 ? (
                            <div className="empty-box">
                                <h3>Không tìm thấy bài viết nào phù hợp</h3>
                                <p>Hãy thử tìm với một từ khóa khác hoặc xóa bộ lọc tìm kiếm.</p>
                            </div>
                        ) : (
                            <div className="post-grid">
                                {filtered.map((p) => {
                                    const isLocalPost = p.id > 1000;
                                    return (
                                        <article key={p.id} className="post-card">
                                            <div className="card-top">
                                                <span className={isLocalPost ? "badge badge-new" : "badge"}>
                                                    {isLocalPost ? "🌟 Bài mới đăng" : `Bài viết #${p.id}`}
                                                </span>
                                                <span className="author-text">
                                                    Tác giả: {isLocalPost ? "Admin" : `User ${p.userId ?? 1}`}
                                                </span>
                                            </div>

                                            <h3 className="card-title">
                                                <Link to={`/posts/${p.id}`}>{p.title}</Link>
                                            </h3>

                                            <p className="card-excerpt">
                                                {p.body.length > 110 ? p.body.substring(0, 110) + "..." : p.body}
                                            </p>

                                            <div className="card-footer">
                                                <Link to={`/posts/${p.id}`} className="read-more-link">
                                                    Xem chi tiết & bình luận →
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}