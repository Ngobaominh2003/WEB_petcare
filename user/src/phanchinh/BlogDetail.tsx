import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface BinhLuan {
  binh_luan_id: number;
  bai_viet_id: number;
  tai_khoan_id: number;
  ho_ten: string;
  noi_dung: string;
  thoi_gian_binh_luan: string;
  so_luot_like: number;
}

interface BaiViet {
  bai_viet_id: number;
  tieu_de: string;
  noi_dung: string;
  ngay_dang: string;
  nguoi_dung: string;
  hinh_anh: string;
  avata: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const [baiViet, setBaiViet] = useState<BaiViet | null>(null);
  const [comments, setComments] = useState<BinhLuan[]>([]);
  const [newComment, setNewComment] = useState("");
  const [nguoiDung, setNguoiDung] = useState<any>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("tai_khoan_id");
    if (storedId) {
      setNguoiDung({ tai_khoan_id: Number(storedId) });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chi-tiet-bai-viet/${id}`
        );
        setBaiViet(res.data);

        const blRes = await axios.get(
          `http://localhost:5000/api/bai-viet/${id}`
        );
        setComments(blRes.data);
      } catch (err) {
        console.error("Lỗi khi tải bài viết hoặc bình luận:", err);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const storedId = localStorage.getItem("tai_khoan_id");
    const tai_khoan_id = storedId ? Number(storedId) : null;

    if (!tai_khoan_id) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/binh-luan", {
        bai_viet_id: id,
        tai_khoan_id,
        noi_dung: newComment,
      });
      setNewComment("");

      window.location.reload();
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
    }
  };

  const handleDeleteComment = async (binh_luan_id: number) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa bình luận này?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/binh-luan/${binh_luan_id}`);

      window.location.reload();
    } catch (err) {
      console.error("Lỗi khi xóa bình luận:", err);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="blog-wrapper">
        <div className="blog-main">
          {baiViet ? (
            <>
              <h1 className="blog-title">{baiViet.tieu_de}</h1>

              {baiViet.hinh_anh && (
                <div className="blog-image">
                  <img
                    src={`http://localhost:5000/img/${baiViet.hinh_anh}`}
                    alt={baiViet.tieu_de}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      marginBottom: "1rem",
                    }}
                  />
                </div>
              )}

              <div className="blog-meta">
                <span>👤 {baiViet.nguoi_dung}</span>
                <span>
                  📅 {new Date(baiViet.ngay_dang).toLocaleDateString()}
                </span>
                <span>💬 {comments.length} bình luận</span>
              </div>

              <div className="blog-content">
                {baiViet.noi_dung.split("\r\n").map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="blog-comments">
                <h3>📝 Bình luận ({comments.length})</h3>

                {nguoiDung && (
                  <p>
                    Bạn đang bình luận với tư cách:{" "}
                    <strong>{nguoiDung.ho_ten}</strong>
                  </p>
                )}

                <textarea
                  placeholder="Viết bình luận..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={4}
                  style={{ width: "100%", marginBottom: "1rem" }}
                />
                <button onClick={handleCommentSubmit}>Gửi bình luận</button>

                {comments.map((c) => {
                  console.log(
                    "tai_khoan_id hiện tại:",
                    nguoiDung?.tai_khoan_id,
                    "| của bình luận:",
                    c.tai_khoan_id
                  );
                  return (
                    <div key={c.binh_luan_id} className="comment">
                      <strong>{c.ho_ten}</strong>{" "}
                      <em>
                        {new Date(c.thoi_gian_binh_luan).toLocaleDateString()}
                      </em>
                      <p>{c.noi_dung}</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>👍 {c.so_luot_like}</div>
                        {nguoiDung?.tai_khoan_id === c.tai_khoan_id && (
                         <button
                         onClick={() => handleDeleteComment(c.binh_luan_id)}
                         className="delete-button"
                       >
                         🗑️ Xóa
                       </button>
                       
                        
                        
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>Đang tải bài viết...</p>
          )}
        </div>

        <aside className="blog-sidebar">
          <div className="author-card">
            <div className="author-img">
              <img
                src={`http://localhost:5000/img/${
                  baiViet?.avata || "default.jpg"
                }`}
                alt="Ảnh người dùng"
                style={{ width: "100%", height: "auto", borderRadius: "50%" }}
              />
            </div>

            <h4>{baiViet?.nguoi_dung || "Tác giả"}</h4>

            <p>Chuyên gia phát triển nội dung thú cưng.</p>
            <button>Xem tất cả bài viết</button>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
};

export default BlogDetail;
