import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  tai_khoan_id: number;
  ten_dang_nhap: string;
  mat_khau: string;
  email: string;
  vai_tro: "quan_tri" | "nguoi_dung" | "nha_cung_cap";
  trang_thai: "hoat_dong" | "khoa";
  trang_thai_xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
}

interface UserUpdateProps {
  user: User | null;
}

const UserUpdate: React.FC<UserUpdateProps> = ({ user }) => {
  const [formData, setFormData] = useState<User>({
    tai_khoan_id: 0,
    ten_dang_nhap: '',
    mat_khau: '',
    email: '',
    vai_tro: 'nguoi_dung',
    trang_thai: 'hoat_dong',
    trang_thai_xet_duyet: 'chờ duyệt',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as any,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:5000/api/update", formData
      );

      if (response.status === 200) {
        alert("Cập nhật thành công!");
        window.location.reload(); // Tự động tải lại trang sau khi cập nhật
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Đã xảy ra lỗi!");
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật người dùng: ID {formData.tai_khoan_id}</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên đăng nhập:</label>
            <input
              type="text"
              name="ten_dang_nhap"
              value={formData.ten_dang_nhap}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu:</label>
            {/* Đặt type là "text" để mật khẩu luôn hiển thị rõ */}
            <input
               
              name="mat_khau"
              value={formData.mat_khau}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Vai trò:</label>
            <select name="vai_tro" value={formData.vai_tro} onChange={handleChange}>
              <option value="quan_tri">Quản trị</option>
              <option value="nguoi_dung">Người dùng</option>
              <option value="nha_cung_cap">Nhà cung cấp</option>
            </select>
          </div>

          <div className="form-group">
            <label>Trạng thái:</label>
            <select name="trang_thai" value={formData.trang_thai} onChange={handleChange}>
              <option value="hoat_dong">Hoạt động</option>
              <option value="khoa">Khóa</option>
            </select>
          </div>

          <div className="form-group">
            <label>Trạng thái xét duyệt:</label>
            <select
              name="trang_thai_xet_duyet"
              value={formData.trang_thai_xet_duyet}
              onChange={handleChange}
            >
              <option value="chờ duyệt">Chờ duyệt</option>
              <option value="đã duyệt">Đã duyệt</option>
              <option value="không duyệt">Không duyệt</option>
            </select>
          </div>

          <button className="btn" type="submit">Cập nhật người dùng</button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
