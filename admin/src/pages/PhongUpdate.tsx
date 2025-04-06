import React, { useState } from 'react';
import axios from 'axios';

const PhongUpdate: React.FC = () => {
  const [formData, setFormData] = useState({
    phong_id: '',
    so_phong: '',
    trang_thai_phong: 'đang trống' as 'đang trống' | 'đã đặt' | 'đang sửa chữa',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, trang_thai_phong: e.target.value as 'đang trống' | 'đã đặt' | 'đang sửa chữa' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/phong/${formData.phong_id}`,  // Sửa URL API cho đúng
        {
          so_phong: formData.so_phong,
          trang_thai_phong: formData.trang_thai_phong
        }
      );

      if (response.status === 200) {
        alert(' Cập nhật thành công!');
        
        // Tự động làm mới trang sau khi cập nhật thành công
        window.location.reload();
      } else {
        alert('Đã xảy ra lỗi khi cập nhật trạng thái phòng.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái phòng:', error);
      alert('Đã xảy ra lỗi khi cập nhật trạng thái phòng.');
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật phòng</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phong_id">ID phòng:</label>
            <input
              type="text"
              id="phong_id"
              name="phong_id"
              value={formData.phong_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="so_phong">Số phòng:</label>
            <input
              type="text"
              id="so_phong"
              name="so_phong"
              value={formData.so_phong}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="trang_thai_phong">Trạng Thái Phòng:</label>
            <select
              id="trang_thai_phong"
              name="trang_thai_phong"
              value={formData.trang_thai_phong}
              onChange={handleSelectChange}
            >
              <option value="đang trống">Đang trống</option>
              <option value="đã đặt">Đã đặt</option>
              <option value="đang sửa chữa">Đang sửa chữa</option>
            </select>
          </div>

          <button type="submit" className="btn">Cập nhật trạng thái phòng</button>
        </form>
      </div>
    </div>
  );
};

export default PhongUpdate;
