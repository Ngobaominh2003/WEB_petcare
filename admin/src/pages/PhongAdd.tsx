import React, { useState } from 'react';
import axios from 'axios';

const PhongAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    so_phong: '',
    trang_thai_phong: 'đang trống', // default state
  });
  const [loading, setLoading] = useState(false); // Để kiểm tra trạng thái loading
  const [errorMessage, setErrorMessage] = useState(''); // Để hiển thị lỗi nếu có

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra nếu số phòng rỗng
    if (!formData.so_phong.trim()) {
      setErrorMessage('Số phòng không được để trống');
      return;
    }

    setLoading(true);  // Bắt đầu quá trình gửi dữ liệu
    setErrorMessage(''); // Xóa lỗi cũ

    try {
      const response = await axios.post(
        'http://localhost:5000/api/phong',
        {
          so_phong: formData.so_phong,
          trang_thai_phong: formData.trang_thai_phong,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Gửi dữ liệu dạng JSON
          },
        }
      );

      if (response.status === 201) {
        alert('Phòng đã được thêm thành công!');
        setFormData({ so_phong: '', trang_thai_phong: 'đang trống' }); // Reset form
      } else {
        setErrorMessage('Đã xảy ra lỗi khi thêm phòng.');
      }
    } catch (error) {
      console.error('Lỗi khi thêm phòng:', error);
      setErrorMessage('Đã xảy ra lỗi khi thêm phòng.');
    } finally {
      setLoading(false); // Kết thúc quá trình gửi dữ liệu
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Thêm phòng mới</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="so_phong">Số phòng:</label>
            <input
              type="text"
              id="so_phong"
              name="so_phong"
              placeholder="Nhập số phòng"
              value={formData.so_phong}
              onChange={handleInputChange}
              required
            />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Hiển thị thông báo lỗi */}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Đang thêm...' : 'Thêm phòng'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhongAdd;
