import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NhaCCMenu from "../components/NhaCCMenu";
import "./style/styles.css";

const DichVuAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    ten_dich_vu: "",
    mo_ta: "",
    gia: 0,
    thoi_gian_hoan_thanh: "",
    danh_muc_id: "",
    trang_thai: 1,
    xet_duyet: "chờ duyệt",
    logo: null as File | null,
  });

  const [danhMucList, setDanhMucList] = useState<any[]>([]);
  const taiKhoanId = localStorage.getItem("tai_khoan_id");

  useEffect(() => {
    axios.get("http://localhost:5000/api/danh-muc")
      .then((res) => setDanhMucList(res.data))
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("ten_dich_vu", formData.ten_dich_vu);
    data.append("mo_ta", formData.mo_ta);
    data.append("gia", formData.gia.toString());
    data.append("thoi_gian_hoan_thanh", formData.thoi_gian_hoan_thanh);
    data.append("danh_muc_id", formData.danh_muc_id);
    data.append("trang_thai", formData.trang_thai.toString());
    data.append("xet_duyet", formData.xet_duyet);
    data.append("tai_khoan_id", taiKhoanId || "");
    if (formData.logo) data.append("logo", formData.logo);

    try {
      await axios.post("http://localhost:5000/api/dich-vu/them", data);
      alert("Thêm dịch vụ thành công");     
      window.location.reload();
    } catch (err) {
      alert("Lỗi khi thêm dịch vụ");
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content" style={{ marginTop: "225px" }}>
        <div className="container">
          <div className="account-layout">
            {/* Sidebar */}
            <NhaCCMenu />
            {/* Content Area */}
      <div className="account-content">
        <div className="page-header">
          <h1>Thêm dịch vụ mới</h1>
          <p>Tạo một dịch vụ mới cho khách hàng của bạn</p>
        </div>
        <div className="card service-form-card">
          <div className="card-body">
            <form className="service-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="ten_dich_vu">Tên dịch vụ *</label>
                <input
                  type="text"
                  id="ten_dich_vu"
                  name="ten_dich_vu"
                  value={formData.ten_dich_vu}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="danh_muc_id">Danh mục *</label>
                  <select
                    id="danh_muc_id"
                    name="danh_muc_id"
                    value={formData.danh_muc_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {danhMucList.map((dm) => (
                      <option key={dm.danh_muc_id} value={dm.danh_muc_id}>
                        {dm.ten_danh_muc}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="trang_thai">Trạng thái</label>
                  <select
                    id="trang_thai"
                    name="trang_thai"
                    value={formData.trang_thai}
                    onChange={handleChange}
                  >
                    <option value={1}>Đang hoạt động</option>
                    <option value={0}>Tạm ngưng</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="mo_ta">Mô tả dịch vụ *</label>
                <textarea
                  id="mo_ta"
                  name="mo_ta"
                  value={formData.mo_ta}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gia">Giá (VNĐ) *</label>
                  <input
                    type="number"
                    id="gia"
                    name="gia"
                    value={formData.gia}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="thoi_gian_hoan_thanh">Thời gian hoàn thành *</label>
                  <input
                    type="text"
                    id="thoi_gian_hoan_thanh"
                    name="thoi_gian_hoan_thanh"
                    value={formData.thoi_gian_hoan_thanh}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="logo">Hình ảnh dịch vụ *</label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Tạo dịch vụ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
    
    </main>
    </div>
  );
};

export default DichVuAdd;