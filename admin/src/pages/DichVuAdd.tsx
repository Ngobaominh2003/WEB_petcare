import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DichVuAdd: React.FC = () => {
  const [formData, setFormData] = useState({
    ten_dich_vu: '',
    mo_ta: '',
    gia: 0,
    tai_khoan_id: '',
    luot_dung: 0,
    trang_thai: 1,
    xet_duyet: 'chờ duyệt',
    logo: null as File | null,
  });
  const [nhaCungCapList, setNhaCungCapList] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy danh sách nhà cung cấp từ API
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/dsnhacungcap')
      .then((response) => {
        setNhaCungCapList(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách nhà cung cấp:', error);
        setError('Lỗi khi lấy danh sách nhà cung cấp');
      });
  }, []);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) { // Check if files is not null and has at least one file
      setFormData((prevData) => ({
        ...prevData,
        logo: files[0], // Safely access the first file
      }));
    }
  };
  

  // Xử lý gửi form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('ten_dich_vu', formData.ten_dich_vu);
    formDataToSend.append('mo_ta', formData.mo_ta);
    formDataToSend.append('gia', formData.gia.toString());
    formDataToSend.append('tai_khoan_id', formData.tai_khoan_id);
    formDataToSend.append('luot_dung', formData.luot_dung.toString());
    formDataToSend.append('trang_thai', formData.trang_thai.toString());
    formDataToSend.append('xet_duyet', formData.xet_duyet);
    if (formData.logo) formDataToSend.append('logo', formData.logo);

    try {
      const response = await axios.post('http://localhost:5000/api/dich-vu/them', formDataToSend);
      alert('Dịch vụ đã được thêm thành công!');
      window.location.reload();
      setFormData({
        ten_dich_vu: '',
        mo_ta: '',
        gia: 0,
        tai_khoan_id: '',
        luot_dung: 0,
        trang_thai: 1,
        xet_duyet: 'chờ duyệt',
        logo: null,
      });
    } catch (error) {
      setError('Lỗi khi thêm dịch vụ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Thêm Dịch Vụ</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ten_dich_vu">Tên Dịch Vụ:</label>
            <input
              type="text"
              id="ten_dich_vu"
              name="ten_dich_vu"
              placeholder="Nhập tên dịch vụ"
              value={formData.ten_dich_vu}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mo_ta">Mô Tả:</label>
            <textarea
              id="mo_ta"
              name="mo_ta"
              placeholder="Nhập mô tả dịch vụ"
              value={formData.mo_ta}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gia">Giá:</label>
            <input
              type="number"
              id="gia"
              name="gia"
              placeholder="Nhập giá dịch vụ"
              value={formData.gia}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tai_khoan_id">Tài Khoản ID:</label>
            <select
              id="tai_khoan_id"
              name="tai_khoan_id"
              value={formData.tai_khoan_id}
              onChange={handleChange}
              required
            >
              <option value="">Chọn nhà cung cấp</option>
              {nhaCungCapList.map((nhaCungCap) => (
                <option key={nhaCungCap.tai_khoan_id} value={nhaCungCap.tai_khoan_id}>
                  {nhaCungCap.ten_nha_cung_cap}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="luot_dung">Lượt Dùng:</label>
            <input
              type="number"
              id="luot_dung"
              name="luot_dung"
              placeholder="Nhập lượt dùng"
              value={formData.luot_dung}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="trang_thai">Trạng Thái:</label>
            <select
              id="trang_thai"
              name="trang_thai"
              value={formData.trang_thai}
              onChange={handleChange}
            >
              <option value={1}>Hoạt Động</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="xet_duyet">Xét Duyệt:</label>
            <select
              id="xet_duyet"
              name="xet_duyet"
              value={formData.xet_duyet}
              onChange={handleChange}
            >
              <option value="chờ duyệt">Chờ Duyệt</option>
              <option value="đã duyệt">Đã Duyệt</option>
              <option value="không duyệt">Không Duyệt</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="logo">Logo:</label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Đang Xử Lý...' : 'Thêm Dịch Vụ'}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default DichVuAdd;
