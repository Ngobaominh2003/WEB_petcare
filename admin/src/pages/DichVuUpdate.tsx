import React, { useEffect, useState } from 'react';

interface DichVuUpdateProps {
  dichVuChon: {
    dich_vu_id: number;
    ten_dich_vu: string;
    mo_ta: string;
    gia: number;
    logo: string;
  } | null;
}

const DichVuUpdate: React.FC<DichVuUpdateProps> = ({ dichVuChon }) => {
  const [formData, setFormData] = useState({
    ten_dich_vu: '',
    mo_ta: '',
    gia: 0,
    logo: null as File | null, // Thay đổi logo thành kiểu File | null
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Tệp được chọn

  useEffect(() => {
    if (dichVuChon) {
      setFormData({
        ten_dich_vu: dichVuChon.ten_dich_vu,
        mo_ta: dichVuChon.mo_ta,
        gia: dichVuChon.gia,
        logo: null, // Khởi tạo với null, tệp sẽ được cập nhật sau
      });
    }
  }, [dichVuChon]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        logo: e.target.files[0], // Lưu tệp hình ảnh được chọn
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dichVuChon) return;

    // Khai báo formData để gửi lên server
    const formDataToSend = new FormData();
    formDataToSend.append('tenDichVu', formData.ten_dich_vu);
    formDataToSend.append('moTa', formData.mo_ta);
    formDataToSend.append('gia', formData.gia.toString());

    // Chỉ thêm logo vào FormData nếu có tệp mới được chọn
    if (formData.logo) {
        formDataToSend.append('logo', formData.logo); // Sử dụng logo mới
    } 

    try {
        const response = await fetch(`http://localhost:5000/api/dichvu/${dichVuChon.dich_vu_id}`, {
            method: 'PUT',
            body: formDataToSend,
        });

        if (response.ok) {
            alert('Dịch vụ đã được cập nhật thành công.');
        } else {
            const errorData = await response.json();
            alert(`Lỗi khi cập nhật dịch vụ: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật dịch vụ:', error);
        alert('Đã xảy ra lỗi khi cập nhật dịch vụ. Vui lòng thử lại.');
    }
};


  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật dịch vụ</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="ten_dich_vu">Tên dịch vụ:</label>
            <input
              type="text"
              id="ten_dich_vu"
              name="ten_dich_vu"
              value={formData.ten_dich_vu}
              onChange={handleInputChange}
              placeholder="Nhập tên dịch vụ"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mo_ta">Mô tả:</label>
            <textarea
              id="mo_ta"
              name="mo_ta"
              value={formData.mo_ta}
              onChange={handleInputChange}
              placeholder="Nhập mô tả dịch vụ"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gia">Giá:</label>
            <input
              type="number"
              id="gia"
              name="gia"
              value={formData.gia}
              onChange={handleInputChange}
              placeholder="Nhập giá dịch vụ"
              required
            />
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

          <button type="submit" className="btn">Cập nhật dịch vụ</button>
        </form>
      </div>
    </div>
  );
};

export default DichVuUpdate;
