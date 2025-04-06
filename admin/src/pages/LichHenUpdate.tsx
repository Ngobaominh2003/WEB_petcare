import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DatLich {
  dat_lich_id?: number;
  nguoi_dung_id?: number;
  dich_vu_id?: string;
  ngay_dat?: string;
  gio_dat?: string;
  trang_thai?: 'chờ xác nhận' | 'đã xác nhận' | 'đã hủy';
  ten_kh?: string;
  email_kh?: string;
}

interface Props {
  selectedLichHen: DatLich | null;
  refreshList: () => void;
}

const LichHenUpdate: React.FC<Props> = ({ selectedLichHen, refreshList }) => {
  const [formData, setFormData] = useState<DatLich>({
    dat_lich_id: undefined,
    nguoi_dung_id: undefined,
    dich_vu_id: '',
    ngay_dat: '',
    gio_dat: '',
    trang_thai: 'chờ xác nhận',
    ten_kh: '',
    email_kh: '',
  });

  const [dichVuOptions, setDichVuOptions] = useState<{ value: string; label: string }[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: '',
  });

  // Cập nhật form khi có selectedLichHen
  useEffect(() => {
    if (selectedLichHen) {
      console.log('Dữ liệu lịch hẹn được chọn:', selectedLichHen);
  
      const ngayDatRaw = selectedLichHen.ngay_dat;
      let formattedNgayDat = '';
  
      // Chuyển đổi định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD
      if (ngayDatRaw && /^\d{2}\/\d{2}\/\d{4}$/.test(ngayDatRaw)) {
        const [day, month, year] = ngayDatRaw.split('/');
        formattedNgayDat = `${year}-${month}-${day}`; // Định dạng YYYY-MM-DD
      }
  
      console.log('Ngày định dạng:', formattedNgayDat); // Log ngày sau khi định dạng
  
      setFormData({
        ...selectedLichHen,
        ngay_dat: formattedNgayDat,
      });
    }
  }, [selectedLichHen]);
  

  // Lấy danh sách dịch vụ
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
        setMessage({ text: 'Lỗi khi lấy danh sách dịch vụ!', type: 'error' });
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
      }
    };

    fetchDichVuOptions();
  }, []);

  // Lấy danh sách giờ trống
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      try {
        if (formData.dich_vu_id && formData.ngay_dat) {
          const response = await axios.get('http://localhost:5000/api/datlich/thoi_gian_trong', {
            params: {
              ngay_dat: formData.ngay_dat,
            },
          });
          setAvailableTimes(response.data.availableTimes || []);
        }
      } catch (error) {
        setMessage({ text: 'Lỗi khi lấy danh sách thời gian trống!', type: 'error' });
        console.error('Lỗi khi lấy danh sách thời gian trống:', error);
      }
    };

    fetchAvailableTimes();
  }, [formData.dich_vu_id, formData.ngay_dat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.dat_lich_id) {
      alert('Vui lòng chọn lịch hẹn để cập nhật!');
      return;
    }

    // Loại bỏ các trường không có giá trị
    const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    // Định dạng ngày trước khi gửi
    if (filteredData.ngay_dat) {
      filteredData.ngay_dat = new Date(filteredData.ngay_dat).toISOString().split('T')[0];
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/datlich/${formData.dat_lich_id}`,
        filteredData
      );

      if (response.status === 200) {
        alert('Cập nhật lịch đặt thành công!');
        refreshList();
      } else {
        alert('Đã xảy ra lỗi khi cập nhật lịch đặt!');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Đã xảy ra lỗi khi cập nhật lịch đặt!');
      console.error('Lỗi khi cập nhật lịch đặt:', error.response?.data || error.message);
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật Lịch Đặt</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dat_lich_id">ID Lịch Đặt:</label>
            <input type="number" id="dat_lich_id" name="dat_lich_id" value={formData.dat_lich_id || ''} disabled />
          </div>

          <div className="form-group">
            <label htmlFor="ten_kh">Tên khách hàng:</label>
            <input type="text" id="ten_kh" name="ten_kh" value={formData.ten_kh || ''} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email_kh">Email khách hàng:</label>
            <input type="email" id="email_kh" name="email_kh" value={formData.email_kh || ''} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="dich_vu_id">Dịch vụ:</label>
            <select id="dich_vu_id" name="dich_vu_id" value={formData.dich_vu_id || ''} onChange={handleInputChange}>
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
            <input type="date" id="ngay_dat" name="ngay_dat" value={formData.ngay_dat || ''} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="gio_dat">Giờ đặt:</label>
            <select id="gio_dat" name="gio_dat" value={formData.gio_dat || ''} onChange={handleInputChange}>
              <option value="">Chọn giờ</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trang_thai">Trạng thái:</label>
            <select id="trang_thai" name="trang_thai" value={formData.trang_thai || ''} onChange={handleInputChange}>
              <option value="chờ xác nhận">Chờ xác nhận</option>
              <option value="đã xác nhận">Đã xác nhận</option>
              <option value="đã hủy">Đã hủy</option>
            </select>
          </div>

          <button type="submit" className="btn">
            Cập nhật lịch đặt
          </button>
        </form>
        {message.text && (
          <p className={`message ${message.type}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LichHenUpdate;
