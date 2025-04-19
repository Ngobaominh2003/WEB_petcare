import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NguoiDungMenu from "../components/NguoiDungMenu";
import "./style/styles.css";

const ThuCungAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    ten: "",
    loai: "",
    gioi_tinh: "khác",
    tuoi: 0,
    can_nang: 0,
    hinh_anh: null as File | null,
  });

  const taiKhoanId = localStorage.getItem("tai_khoan_id");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tuoi" || name === "can_nang" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, hinh_anh: e.target.files![0] }));
    }
  };

  const resetForm = () => {
    setFormData({
      ten: "",
      loai: "",
      gioi_tinh: "khác",
      tuoi: 0,
      can_nang: 0,
      hinh_anh: null,
    });
    (document.getElementById("hinh_anh") as HTMLInputElement).value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taiKhoanId) {
      alert("Không tìm thấy tài khoản. Vui lòng đăng nhập lại.");
      return;
    }

    if (formData.tuoi < 0 || formData.can_nang < 0) {
      alert("Tuổi và cân nặng không được âm.");
      return;
    }

    const data = new FormData();
    data.append("tai_khoan_id", taiKhoanId);
    data.append("ten", formData.ten || "");
    data.append("loai", formData.loai || "");
    data.append("gioi_tinh", formData.gioi_tinh || "khác");
    data.append("tuoi", formData.tuoi.toString());
    data.append("can_nang", formData.can_nang.toString());

    if (formData.hinh_anh) {
      data.append("hinh_anh", formData.hinh_anh);
    } else {
      alert("Vui lòng tải lên hình ảnh");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/thu-cung/them", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(" Thêm thú cưng thành công!");
      resetForm();
    } catch (err) {
      console.error(" Error when adding pet:", err);
      alert(" Lỗi khi thêm thú cưng. Vui lòng kiểm tra lại dữ liệu.");
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content" style={{ marginTop: "225px" }}>
        <div className="container">
          <div className="account-layout">
            <NguoiDungMenu />
            <div className="account-content">
              <div className="page-header">
                <h1>Thêm thú cưng mới</h1>
                <p>Thêm thông tin thú cưng của bạn</p>
              </div>
              <div className="card service-form-card">
                <div className="card-body">
                  <form className="service-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="ten">Tên thú cưng *</label>
                      <input
                        type="text"
                        id="ten"
                        name="ten"
                        value={formData.ten}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="loai">Loại thú cưng *</label>
                        <input
                          type="text"
                          id="loai"
                          name="loai"
                          value={formData.loai}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="gioi_tinh">Giới tính *</label>
                        <select
                          id="gioi_tinh"
                          name="gioi_tinh"
                          value={formData.gioi_tinh}
                          onChange={handleChange}
                          required
                        >
                          <option value="đực">Đực</option>
                          <option value="cái">Cái</option>
                          <option value="khác">Khác</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="tuoi">Tuổi (năm) *</label>
                        <input
                          type="number"
                          id="tuoi"
                          name="tuoi"
                          value={formData.tuoi}
                          onChange={handleChange}
                          required
                          min={0}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="can_nang">Cân nặng (kg) *</label>
                        <input
                          type="number"
                          id="can_nang"
                          name="can_nang"
                          value={formData.can_nang}
                          onChange={handleChange}
                          required
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="hinh_anh">Hình ảnh thú cưng *</label>
                      <input
                        type="file"
                        id="hinh_anh"
                        name="hinh_anh"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        Thêm thú cưng
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

export default ThuCungAdd;
