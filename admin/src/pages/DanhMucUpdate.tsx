import React, { useState, useEffect } from "react";
import axios from "axios";

interface DanhMuc {
  danh_muc_id: number;
  ten_danh_muc: string;
  mo_ta: string;
}

interface DanhMucUpdateProps {
  danhMucChon: DanhMuc | null;
}

const DanhMucUpdate: React.FC<DanhMucUpdateProps> = ({ danhMucChon }) => {
  const [formData, setFormData] = useState<DanhMuc>({
    danh_muc_id: 0,
    ten_danh_muc: "",
    mo_ta: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (danhMucChon) {
      setFormData(danhMucChon);
    }
  }, [danhMucChon]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.put(
        `http://localhost:5000/api/danh-muc/cap-nhat/${formData.danh_muc_id}`,
        formData
      );
      alert("Danh mục đã được cập nhật thành công!");
      window.location.reload();
    } catch (error) {
      setError("Lỗi khi cập nhật danh mục");
      console.error("Lỗi khi cập nhật danh mục:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật danh mục</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          {/* Tên danh mục */}
          <div className="form-group">
            <label htmlFor="ten_danh_muc">Tên danh mục:</label>
            <input
              type="text"
              id="ten_danh_muc"
              name="ten_danh_muc"
              value={formData.ten_danh_muc}
              onChange={handleInputChange}
              placeholder="Nhập tên danh mục"
              required
            />
          </div>

          {/* Mô tả */}
          <div className="form-group">
            <label htmlFor="mo_ta">Mô tả:</label>
            <textarea
              id="mo_ta"
              name="mo_ta"
              value={formData.mo_ta}
              onChange={handleInputChange}
              placeholder="Nhập mô tả danh mục"
              required
            />
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Cập nhật danh mục"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default DanhMucUpdate;
