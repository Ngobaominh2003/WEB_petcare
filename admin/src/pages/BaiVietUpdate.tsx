import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface BaiVietUpdateProps {
  baiVietChon: {
    bai_viet_id: number;
    tieu_de: string;
    noi_dung: string;
    hinh_anh: string;
    trang_thai: 'đã duyệt' | 'chờ duyệt' | 'hủy';
  } | null;
}

const BaiVietUpdate: React.FC<BaiVietUpdateProps> = ({ baiVietChon }) => {
  const [formData, setFormData] = useState({
    tieu_de: '',
    noi_dung: '',
    hinh_anh: null as File | null,
    trang_thai: 'chờ duyệt' as 'đã duyệt' | 'chờ duyệt' | 'hủy',
  });

  useEffect(() => {
    if (baiVietChon) {
      setFormData({
        tieu_de: baiVietChon.tieu_de,
        noi_dung: baiVietChon.noi_dung,
        hinh_anh: null, // Reset hình ảnh để người dùng chọn lại nếu cần
        trang_thai: baiVietChon.trang_thai,
      });
    }
  }, [baiVietChon]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, hinh_anh: e.target.files[0] });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, trang_thai: e.target.value as 'đã duyệt' | 'chờ duyệt' | 'hủy' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!baiVietChon) return;
  
    const formDataToSend = new FormData();
    formDataToSend.append('tieu_de', formData.tieu_de);
    formDataToSend.append('noi_dung', formData.noi_dung || '');
    formDataToSend.append('trang_thai', formData.trang_thai);
  
    if (formData.hinh_anh) {
      formDataToSend.append('hinh_anh', formData.hinh_anh);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/baiviet/${baiVietChon.bai_viet_id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (response.status === 200) {
        alert('Bài viết đã được cập nhật thành công!');  // Thông báo mặc định của trình duyệt
      } else {
        alert('Đã xảy ra lỗi khi cập nhật bài viết.');  // Thông báo lỗi
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật bài viết:', error);
      alert('Đã xảy ra lỗi khi cập nhật bài viết.');  // Thông báo lỗi
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật bài viết</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tieu_de">Tiêu đề:</label>
            <input
              type="text"
              id="tieu_de"
              name="tieu_de"
              value={formData.tieu_de}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="noi_dung">Nội Dung:</label>
            <textarea
              id="noi_dung"
              name="noi_dung"
              value={formData.noi_dung}
              onChange={handleInputChange}
              placeholder="Nhập nội dung bài viết"
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

          <div className="form-group">
            <label htmlFor="trang_thai">Trạng Thái:</label>
            <select
              id="trang_thai"
              name="trang_thai"
              value={formData.trang_thai}
              onChange={handleSelectChange}
            >
              <option value="chờ duyệt">Chờ duyệt</option>
              <option value="đã duyệt">Đã duyệt</option>
              <option value="hủy">Hủy</option>
            </select>
          </div>

          <button type="submit" className="btn">Cập nhật bài viết</button>
        </form>
      </div>
    </div>
  );
};

export default BaiVietUpdate;
