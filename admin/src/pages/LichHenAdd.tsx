import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LichHenAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    nguoi_dung_id: '',
    dich_vu_id: '',
    ngay_dat: '',
    gio_dat: '',
    ten_kh: '',
    email_kh: '',
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [dichVuOptions, setDichVuOptions] = useState<{ value: string; label: string }[]>([]);

  // Lấy danh sách giờ trống từ API
  const fetchAvailableTimes = async (ngay_dat: string) => {
    try {
      const response = await axios.get('http://localhost:5000/api/datlich/thoi_gian_trong', {
        params: { ngay_dat },
      });
      setAvailableTimes(response.data.availableTimes || []);
    } catch (error) {
      console.error('Lỗi khi lấy giờ trống:', error);
    }
  };

  // Lấy danh sách dịch vụ từ API
  useEffect(() => {
    const fetchDichVuOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dichvu');
        const options = response.data.map((dichVu: any) => ({
          value: dichVu.dich_vu_id.toString(),
          label: dichVu.ten_dich_vu,
        }));
        setDichVuOptions(options);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
      }
    };

    fetchDichVuOptions();
  }, []);

  // Cập nhật giờ trống khi ngày thay đổi
  useEffect(() => {
    if (formData.ngay_dat) {
      fetchAvailableTimes(formData.ngay_dat);
    }
  }, [formData.ngay_dat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Chuẩn bị dữ liệu gửi
      const payload = { ...formData, nguoi_dung_id: formData.nguoi_dung_id || null };

      console.log('Dữ liệu gửi đi:', payload);

      const response = await axios.post('http://localhost:5000/api/datlich', payload);

      if (response.status === 201) {
        alert('Lịch đặt đã được thêm thành công!');
        setFormData({
          nguoi_dung_id: '',
          dich_vu_id: '',
          ngay_dat: '',
          gio_dat: '',
          ten_kh: '',
          email_kh: '',
        });
      } else {
        alert('Đã xảy ra lỗi khi thêm lịch đặt.');
      }
    } catch (error: any) {
      console.error('Lỗi khi thêm lịch đặt:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Đã xảy ra lỗi khi thêm lịch đặt.');
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Thêm lịch đặt mới</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nguoi_dung_id">Người dùng ID (Tùy chọn):</label>
            <input
              type="text"
              id="nguoi_dung_id"
              name="nguoi_dung_id"
              placeholder="Nhập ID người dùng"
              value={formData.nguoi_dung_id}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dich_vu_id">Dịch vụ:</label>
            <select
              id="dich_vu_id"
              name="dich_vu_id"
              value={formData.dich_vu_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn dịch vụ</option>
              {dichVuOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ngay_dat">Ngày đặt:</label>
            <input
              type="date"
              id="ngay_dat"
              name="ngay_dat"
              value={formData.ngay_dat}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gio_dat">Giờ đặt:</label>
            <select
              id="gio_dat"
              name="gio_dat"
              value={formData.gio_dat}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn giờ</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ten_kh">Tên khách hàng:</label>
            <input
              type="text"
              id="ten_kh"
              name="ten_kh"
              placeholder="Nhập tên khách hàng"
              value={formData.ten_kh}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email_kh">Email khách hàng:</label>
            <input
              type="email"
              id="email_kh"
              name="email_kh"
              placeholder="Nhập email khách hàng"
              value={formData.email_kh}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn">Thêm lịch đặt</button>
        </form>
      </div>
    </div>
  );
};

export default LichHenAdd;
