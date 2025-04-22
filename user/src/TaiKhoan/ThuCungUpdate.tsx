import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { showSuccess, showError } from "../utils/toast";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NguoiDungMenu from "../components/NguoiDungMenu";
import "./style/styles.css";

const ThuCungUpdate: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pet = location.state;

  const [formData, setFormData] = useState({
    ten: "",
    loai: "",
    gioi_tinh: "khác",
    tuoi: 0,
    can_nang: 0,
    hinh_anh: "" as string | File,
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) {
      alert("Thiếu ID thú cưng");
      navigate("/ThuCung");
      return;
    }

    if (location.state) {
      setFormData({ ...location.state });
    } else {
      axios
        .get(`http://localhost:5000/api/thu-cung/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => {
          console.error("Không thể lấy dữ liệu thú cưng:", err);
          showError("Không tìm thấy thú cưng");
          navigate("/ThuCung");
        });
    }
  }, [location.state, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setFormData((prev) => ({ ...prev, hinh_anh: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    form.append("ten", formData.ten);
    form.append("loai", formData.loai);
    form.append("gioi_tinh", formData.gioi_tinh);
    form.append("tuoi", formData.tuoi.toString());
    form.append("can_nang", formData.can_nang.toString());

    if (formData.hinh_anh instanceof File) {
      form.append("hinh_anh", formData.hinh_anh); // Ảnh mới
    } else if (typeof formData.hinh_anh === "string") {
      form.append("hinh_anh", formData.hinh_anh); // Ảnh cũ
    }

    try {
      await axios.put(`http://localhost:5000/api/thu-cung/update/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showSuccess("🎉 Cập nhật thú cưng thành công!");
      navigate("/ThuCung");
    } catch (err) {
      console.error("Lỗi khi gửi yêu cầu cập nhật:", err);
      showError("❌ Lỗi khi cập nhật thú cưng. Vui lòng thử lại.");
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
                <h1>Cập nhật thú cưng</h1>
              </div>
              <div className="card service-form-card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
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

                    <div className="form-group">
                      <label htmlFor="loai">Loài *</label>
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
                      <label htmlFor="gioi_tinh">Giới tính</label>
                      <select
                        id="gioi_tinh"
                        name="gioi_tinh"
                        value={formData.gioi_tinh}
                        onChange={handleChange}
                      >
                        <option value="đực">Đực</option>
                        <option value="cái">Cái</option>
                        <option value="khác">Khác</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tuoi">Tuổi *</label>
                      <input
                        type="number"
                        id="tuoi"
                        name="tuoi"
                        value={formData.tuoi}
                        onChange={handleChange}
                        required
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
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="hinh_anh">Hình ảnh</label>
                      <input
                        type="file"
                        id="hinh_anh"
                        name="hinh_anh"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {typeof formData.hinh_anh === "string" && (
                        <img
                          src={`http://localhost:5000/img/${formData.hinh_anh}`}
                          alt="Preview"
                          style={{ width: "120px", marginTop: "10px" }}
                        />
                      )}
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">
                        Cập nhật thú cưng
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

export default ThuCungUpdate;
