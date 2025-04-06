import React, { useState } from 'react';
import axios from 'axios';

const BaiVietAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    nguoi_dung_id: '',
    tieu_de: '',
    noi_dung: '',
    hinh_anh: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, hinh_anh: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Khởi tạo FormData để gửi dữ liệu
    const formDataToSend = new FormData();
    formDataToSend.append('nguoi_dung_id', formData.nguoi_dung_id); 
    formDataToSend.append('tieu_de', formData.tieu_de);
    formDataToSend.append('noi_dung', formData.noi_dung);

    if (formData.hinh_anh) {
      formDataToSend.append('hinh_anh', formData.hinh_anh);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/baiviet', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Bài viết đã được thêm thành công!');  // Thông báo thành công bằng alert()
      } else {
        alert('Đã xảy ra lỗi khi thêm bài viết.');  // Thông báo lỗi bằng alert()
      }
    } catch (error) {
      console.error('Lỗi khi thêm bài viết:', error);
      alert('Đã xảy ra lỗi khi thêm bài viết.');  // Thông báo lỗi bằng alert()
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Thêm bài viết mới</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nguoi_dung_id">Người dùng ID:</label>
            <input
              type="text"
              id="nguoi_dung_id"
              name="nguoi_dung_id"
              placeholder="Nhập ID người dùng"
              value={formData.nguoi_dung_id}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tieu_de">Tiêu đề:</label>
            <input
              type="text"
              id="tieu_de"
              name="tieu_de"
              placeholder="Nhập tiêu đề bài viết"
              value={formData.tieu_de}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="noi_dung">Nội dung:</label>
            <textarea
              id="noi_dung"
              name="noi_dung"
              placeholder="Nhập nội dung bài viết"
              value={formData.noi_dung}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hinh_anh">Hình ảnh:</label>
            <input
              type="file"
              id="hinh_anh"
              name="hinh_anh"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn">Thêm bài viết</button>
        </form>
      </div>
    </div>
  );
};

export default BaiVietAdd;
