import React, { useState } from 'react';
import axios from 'axios';

interface UserFormData {
  ten_dang_nhap: string;
  email: string;
  mat_khau: string;
  vai_tro: "quan_tri" | "nguoi_dung" | "nha_cung_cap";
  trang_thai: "hoat_dong" | "khoa";
  trang_thai_xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
}

const AddUser: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    ten_dang_nhap: '',
    email: '',
    mat_khau: '',
    vai_tro: 'nguoi_dung',
    trang_thai: 'hoat_dong',
    trang_thai_xet_duyet: 'chờ duyệt',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/create', formData);
      alert('Thêm người dùng thành công!');
      console.log(response.data);
  
      window.location.reload(); // 👉 Tải lại trang sau khi thêm
    } catch (error) {
      console.error('Lỗi thêm người dùng:', error);
      alert('Thêm người dùng thất bại!');
    }
  };
  

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Thêm người dùng</h2>
        </div>
        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ten_dang_nhap">Tên đăng nhập:</label>
            <input
              type="text"
              id="ten_dang_nhap"
              name="ten_dang_nhap"
              required
              value={formData.ten_dang_nhap}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mat_khau">Mật khẩu:</label>
            <input
              type="text"
              id="mat_khau"
              name="mat_khau"
              required
              value={formData.mat_khau}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="vai_tro">Vai trò:</label>
            <select name="vai_tro" value={formData.vai_tro} onChange={handleChange}>
              <option value="quan_tri">Quản trị</option>
              <option value="nguoi_dung">Người dùng</option>
              <option value="nha_cung_cap">Nhà cung cấp</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trang_thai">Trạng thái:</label>
            <select name="trang_thai" value={formData.trang_thai} onChange={handleChange}>
              <option value="hoat_dong">Hoạt động</option>
              <option value="khoa">Khóa</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trang_thai_xet_duyet">Trạng thái xét duyệt:</label>
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

          <button type="submit" className="btn">Thêm người dùng</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
