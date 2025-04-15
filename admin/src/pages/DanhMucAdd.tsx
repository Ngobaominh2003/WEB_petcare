import React, { useState, useEffect } from "react";
import axios from "axios";

const DanhMucAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    ten_danh_muc: "",
    mo_ta: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Xử lý gửi form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:5000/api/danh-muc/them", formData);
      alert("Danh mục đã được thêm thành công!");
      window.location.reload();
    } catch (error) {
      setError("Lỗi khi thêm danh mục");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Thêm Danh Mục</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ten_danh_muc">Tên Danh Mục:</label>
            <input
              type="text"
              id="ten_danh_muc"
              name="ten_danh_muc"
              placeholder="Nhập tên danh mục"
              value={formData.ten_danh_muc}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mo_ta">Mô Tả:</label>
            <textarea
              id="mo_ta"
              name="mo_ta"
              placeholder="Nhập mô tả danh mục"
              value={formData.mo_ta}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Đang Xử Lý..." : "Thêm Danh Mục"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default DanhMucAdd;
