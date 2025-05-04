import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

interface BaiViet {
  bai_viet_id: number;
  tai_khoan_id: number;
  tieu_de: string | null;
  noi_dung: string;
  hinh_anh: string | null;
  ngay_dang: string;
  trang_thai: "hien" | "an";
  xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
  nguoi_dung: string;
}

const DSBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/danh-sach-bai-viet-dk");
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-wrapper">
      <h2 className="blog-heading">Blog của chúng tôi</h2>
      <p className="blog-subheading">Chia sẻ kiến thức và kinh nghiệm về thú cưng</p>

      <div className="blog-list">
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.bai_viet_id} className="blog-item">
              <div className="blog-thumb">
                <img
                  src={
                    blog.hinh_anh
                      ? `http://localhost:5000/img/${blog.hinh_anh}`
                      : "https://placehold.co/400x250?text=No+Image"
                  }
                  alt={blog.tieu_de || "Ảnh bài viết"}
                />
              </div>
              <div className="blog-body">
                <h3 className="blog-title">{blog.tieu_de}</h3>
                <p className="blog-date">
                  📅 {new Date(blog.ngay_dang).toLocaleDateString()}
                </p>
                <p className="blog-excerpt">
                  {blog.noi_dung.length > 200
                    ? blog.noi_dung.slice(0, 200) + "..."
                    : blog.noi_dung}
                </p>
                <div className="blog-meta">
                  <span className="blog-author">👤 {blog.nguoi_dung}</span>
                  <Link to={`/BlogDetail/${blog.bai_viet_id}`} className="blog-readmore">
                    Đọc tiếp →
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      
    </div>
  );
};

export default DSBlog;
