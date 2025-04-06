import React, { useEffect, useState } from 'react';

interface GoiDichVu {
  goi_dich_vu_id: number;
  ten_goi: string;
  mo_ta: string;
  gia_1_thang: number | null;
  gia_6_thang: number | null;
  gia_1_nam: number | null;
}

interface GoiDichVuUpdateProps {
  selectedGoiDichVu: GoiDichVu | null;
}

const GoiDichVuUpdate: React.FC<GoiDichVuUpdateProps> = ({ selectedGoiDichVu }) => {
  const [formData, setFormData] = useState<GoiDichVu | null>(null);

  useEffect(() => {
    if (selectedGoiDichVu) {
      setFormData({ ...selectedGoiDichVu });
    }
  }, [selectedGoiDichVu]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      const { name, value } = e.target;
      const updatedValue = e.target.type === 'number' ? (value === '' ? null : parseFloat(value)) : value;
      setFormData({ ...formData, [name]: updatedValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData) return;

    // Kiểm tra xem các trường bắt buộc có bị trống không
    if (!formData.ten_goi || formData.gia_1_thang === null || formData.gia_6_thang === null || formData.gia_1_nam === null) {
        alert('Vui lòng điền đầy đủ tất cả các trường bắt buộc.');
        return;
    }

    const formDataToSend = {
      ten_goi: formData.ten_goi,
      mo_ta: formData.mo_ta,
      gia_1_thang: formData.gia_1_thang,
      gia_6_thang: formData.gia_6_thang,
      gia_1_nam: formData.gia_1_nam,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/goidichvu/${formData.goi_dich_vu_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Cập nhật thất bại!');
      }

      alert('Cập nhật thông tin gói dịch vụ thành công!');
    } catch (error) {
      console.error('Error updating service package:', error);
      alert('Lỗi khi cập nhật thông tin gói dịch vụ!');
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật gói dịch vụ: ID: {selectedGoiDichVu?.goi_dich_vu_id}</h2>
        </div>

        {formData ? (
          <form className="add-user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ten_goi">Tên gói:</label>
              <input
                type="text"
                id="ten_goi"
                name="ten_goi"
                placeholder="Nhập tên gói dịch vụ"
                required
                value={formData.ten_goi || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mo_ta">Mô tả:</label>
              <textarea
                id="mo_ta"
                name="mo_ta"
                placeholder="Nhập mô tả"
                value={formData.mo_ta || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gia_1_thang">Giá 1 tháng:</label>
              <input
                type="number"
                id="gia_1_thang"
                name="gia_1_thang"
                placeholder="Nhập giá 1 tháng"
                required
                value={formData.gia_1_thang !== null ? formData.gia_1_thang : ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gia_6_thang">Giá 6 tháng:</label>
              <input
                type="number"
                id="gia_6_thang"
                name="gia_6_thang"
                placeholder="Nhập giá 6 tháng"
                required
                value={formData.gia_6_thang !== null ? formData.gia_6_thang : ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gia_1_nam">Giá 1 năm:</label>
              <input
                type="number"
                id="gia_1_nam"
                name="gia_1_nam"
                placeholder="Nhập giá 1 năm"
                required
                value={formData.gia_1_nam !== null ? formData.gia_1_nam : ''}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn">Cập nhật gói dịch vụ</button>
          </form>
        ) : (
          <p>Vui lòng chọn một gói dịch vụ để cập nhật.</p>
        )}
      </div>
    </div>
  );
};

export default GoiDichVuUpdate;
