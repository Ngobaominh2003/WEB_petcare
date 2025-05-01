import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";
import { showSuccess, showError, showWarn } from "../utils/toast";

interface DanhGia {
  danh_gia_id: number;
  diem: number;
  binh_luan: string;
  ngay: string;
  hinh_anh?: string;
  ho_ten: string;
}

interface DichVu {
  dich_vu_id: number;
  ten_dich_vu: string;
  mo_ta: string;
  logo?: string;
  gia: number;
  luot_dung: number;
  thoi_gian_hoan_thanh?: string;
  avata?: string;
  ten_nha_cung_cap?: string;
  diem_trung_binh?: number;
}

const DichVuChiTiet: React.FC = () => {
  // hooks
  const [dichVu, setDichVu] = useState<DichVu | null>(null);
  const [dsDanhGia, setDsDanhGia] = useState<DanhGia[]>([]);
  const [danhGiaMoi, setDanhGiaMoi] = useState({
    diem: 5,
    binh_luan: "",
    ngay: "",
    hinh_anh: "",
    ho_ten: "",
  });
  const [indexDangSua, setIndexDangSua] = useState<number | null>(null);
  const [indexDangBaoCao, setIndexDangBaoCao] = useState<number | null>(null);
  const [lyDoBaoCao, setLyDoBaoCao] = useState("");

  const dsLyDo = [
    "Ngôn ngữ không phù hợp",
    "Nội dung không liên quan",
    "Spam hoặc giả mạo",
    "Khác",
  ];

  // Load thông tin dịch vụ
  useEffect(() => {
    const data = localStorage.getItem("dichVuChiTiet");
    if (data) setDichVu(JSON.parse(data));
    return () => localStorage.removeItem("dichVuChiTiet");
  }, []);

  // Load danh sách đánh giá theo dịch vụ
  useEffect(() => {
    const fetchDanhGia = async () => {
      if (!dichVu?.dich_vu_id) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/danh-gia?dich_vu_id=${dichVu.dich_vu_id}`
        );
        const data = res.data.map((dg: any) => ({
          danh_gia_id: dg.danh_gia_id,
          diem: dg.diem,
          binh_luan: dg.binh_luan,
          ngay: dg.thoi_gian,
          ho_ten: dg.ho_ten || "Ẩn danh",
          hinh_anh: dg.hinh_anh
            ? `http://localhost:5000/img/${dg.hinh_anh}`
            : "",
        }));
        setDsDanhGia(data);
      } catch (error) {
        showError("Lỗi khi tải đánh giá:");
      }
    };
    fetchDanhGia();
  }, [dichVu?.dich_vu_id]);
  const fetchDanhGia = async () => {
    if (!dichVu?.dich_vu_id) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/danh-gia?dich_vu_id=${dichVu.dich_vu_id}`
      );
      const data = res.data.map((dg: any) => ({
        danh_gia_id: dg.danh_gia_id,
        diem: dg.diem,
        binh_luan: dg.binh_luan,
        ngay: dg.thoi_gian,
        ho_ten: dg.ho_ten || "Ẩn danh",
        hinh_anh: dg.hinh_anh ? `http://localhost:5000/img/${dg.hinh_anh}` : "",
      }));
      setDsDanhGia(data);
    } catch (error) {
      showError("Lỗi khi tải đánh giá");
    }
  };

  // Gửi đánh giá mới
  const handleSubmit = async () => {
    const taiKhoanId = localStorage.getItem("tai_khoan_id");
    if (!taiKhoanId) return alert("Vui lòng đăng nhập để đánh giá");
    if (!danhGiaMoi.binh_luan) return alert("Vui lòng nhập nội dung đánh giá");

    try {
      const formData = new FormData();
      formData.append("tai_khoan_id", taiKhoanId);
      formData.append("dich_vu_id", dichVu?.dich_vu_id.toString() || "");
      formData.append("diem", danhGiaMoi.diem.toString());
      formData.append("binh_luan", danhGiaMoi.binh_luan);
      if (danhGiaMoi.hinh_anh?.startsWith("data:")) {
        const blob = await fetch(danhGiaMoi.hinh_anh).then((r) => r.blob());
        const file = new File([blob], "anh_danh_gia.png", { type: blob.type });
        formData.append("hinh_anh", file);
      }

      await axios.post("http://localhost:5000/api/danh-gia", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchDanhGia(); // ⚠️ Gọi lại để load từ server

      setDanhGiaMoi({
        diem: 5,
        binh_luan: "",
        ngay: "",
        hinh_anh: "",
        ho_ten: "",
      });

      showSuccess("🎉 Thêm đánh giá thành công!");
    } catch (err) {
      console.error("Lỗi khi gửi đánh giá:", err);
      showError("❌ Gửi đánh giá thất bại. Vui lòng thử lại.");
    }
  };

  // Chọn ảnh
  const handleChonAnh = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDanhGiaMoi((prev) => ({
          ...prev,
          hinh_anh: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xoá đánh giá
  const handleXoa = async (idx: number) => {
    if (!window.confirm("Bạn có chắc muốn xoá đánh giá này?")) return;

    const id = dsDanhGia[idx].danh_gia_id;
    try {
      await axios.delete(`http://localhost:5000/api/danh-gia/${id}`);
      setDsDanhGia((prev) => prev.filter((_, i) => i !== idx));
      showSuccess("🎉 Bạn đã xóa đánh giá thành công!");
    } catch (err) {
      console.error("Lỗi xoá đánh giá:", err);
      showError("❌ Xóa đánh giá thất bại. Vui lòng thử lại.");
    }
  };

  // Mở form báo cáo
  const handleBaoCao = (idx: number) => {
    setIndexDangBaoCao(idx);
    setLyDoBaoCao("");
  };

  // Gửi form báo cáo lên API
  const handleGuiBaoCao = async (idx: number) => {
    if (!lyDoBaoCao) return alert("Vui lòng chọn lý do");

    try {
      const tai_khoan_id = localStorage.getItem("tai_khoan_id");
      if (!tai_khoan_id) return alert("Vui lòng đăng nhập để báo cáo");

      const danh_gia_id = dsDanhGia[idx].danh_gia_id;
      await axios.post("http://localhost:5000/api/bao-cao-danh-gia", {
        danh_gia_id,
        tai_khoan_id: parseInt(tai_khoan_id),
        ly_do: lyDoBaoCao,
      });

      showSuccess("🎉 Bạn đã gửi đánh giá thành công!");
      setIndexDangBaoCao(null);
      setLyDoBaoCao("");
    } catch (error) {
      console.error("Lỗi khi gửi báo cáo:", error);
      showError("❌ Gửi đánh giá. Vui lòng thử lại.");
    }
  };

  if (!dichVu) {
    return (
      <div>
        <Header />
        <Navbar />
        <p style={{ padding: "20px", textAlign: "center" }}>
          Không tìm thấy thông tin dịch vụ.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Navbar />
      <div className="dv-container">
        <div className="dv-grid">
          <div className="dv-left">
            <img
              src={
                dichVu.avata
                  ? `http://localhost:5000/img/${dichVu.avata}`
                  : "https://placehold.co/100x100/4CAF50/ffffff?text=No+Avt"
              }
              alt="Ảnh đại diện dịch vụ"
              className="dv-avatar"
            />
          </div>

          <div className="dv-right">
            <h1 className="dv-title">{dichVu.ten_dich_vu}</h1>

            <p className="dv-price">
              <i className="fas fa-coins"></i>{" "}
              {dichVu.gia.toLocaleString("vi-VN")} VNĐ
            </p>

            <p className="dv-time">
              <i className="fas fa-stopwatch"></i>{" "}
              {dichVu.thoi_gian_hoan_thanh || "?"} phút
            </p>

            <p className="dv-usage">
              <i className="fas fa-users"></i> {dichVu.luot_dung} lượt dùng
            </p>

            {dichVu.diem_trung_binh !== undefined && (
              <p className="dv-rating">
                <i className="fas fa-star text-warning"></i>{" "}
                {Number(dichVu.diem_trung_binh).toFixed(1)} / 5
              </p>
            )}

            <p className="dv-description">
              <i className="fas fa-info-circle"></i> {dichVu.mo_ta}
            </p>
          </div>
        </div>

        <div className="dv-review-form">
          <h3>Gửi đánh giá</h3>
          <div className="dv-stars">
            {[1, 2, 3, 4, 5].map((sao) => (
              <span
                key={sao}
                className={`star ${danhGiaMoi.diem >= sao ? "active" : ""}`}
                onClick={() => setDanhGiaMoi({ ...danhGiaMoi, diem: sao })}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Nhận xét..."
            value={danhGiaMoi.binh_luan}
            onChange={(e) =>
              setDanhGiaMoi({ ...danhGiaMoi, binh_luan: e.target.value })
            }
            className="dv-textarea"
          />
          <input type="file" accept="image/*" onChange={handleChonAnh} />
          {danhGiaMoi.hinh_anh && (
            <img
              src={danhGiaMoi.hinh_anh}
              alt="preview"
              className="dv-preview-img"
            />
          )}
          <button onClick={handleSubmit} className="dv-btn-blue">
            Gửi đánh giá
          </button>
        </div>

        <div className="dv-review-section">
          <h2 className="dv-review-title">Tất cả đánh giá</h2>
          {dsDanhGia.map((dg, idx) => (
            <div key={idx} className="dv-review-card">
              <div className="dv-review-header">
                <span className="dv-review-author">{dg.ho_ten}</span>
                <span className="star active">
                  {"★".repeat(dg.diem)}
                  {"☆".repeat(5 - dg.diem)}
                </span>
              </div>
              <p className="dv-review-date">
                {new Date(dg.ngay).toLocaleDateString()}
              </p>
              <p className="dv-review-comment">"{dg.binh_luan}"</p>
              {dg.hinh_anh && (
                <img
                  src={dg.hinh_anh}
                  alt="ảnh đánh giá"
                  className="dv-review-img"
                />
              )}

              {/* Hành động */}
              <div className="dv-review-actions">
                <button onClick={() => idx}>Sửa</button>
                <button onClick={() => handleXoa(idx)}>Xoá</button>
                <button onClick={() => handleBaoCao(idx)}>Báo cáo</button>
              </div>

              {/* Form báo cáo nếu được mở */}
              {indexDangBaoCao === idx && (
                <div className="dv-report-form">
                  <p>Chọn lý do báo cáo:</p>
                  <select
                    value={lyDoBaoCao}
                    onChange={(e) => setLyDoBaoCao(e.target.value)}
                    className="dv-select"
                  >
                    <option value="">-- Chọn lý do --</option>
                    {dsLyDo.map((lyDo, i) => (
                      <option key={i} value={lyDo}>
                        {lyDo}
                      </option>
                    ))}
                  </select>
                  <div style={{ marginTop: "8px" }}>
                    <button
                      onClick={() => handleGuiBaoCao(idx)}
                      className="dv-btn-blue"
                    >
                      Gửi báo cáo
                    </button>
                    <button
                      onClick={() => setIndexDangBaoCao(null)}
                      style={{ marginLeft: "10px" }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DichVuChiTiet;
