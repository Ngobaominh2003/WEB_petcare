import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  DatPhongChon: any; // Prop from the parent component
}

interface Phong {
  phong_id: string;
  so_phong: string;
}

const DatPhongUpdate: React.FC<Props> = ({ DatPhongChon }) => {
  const [formData, setFormData] = useState({
    dat_phong_id: DatPhongChon?.dat_phong_id || '', // Booking ID
    nguoi_dung_id: DatPhongChon?.nguoi_dung_id || null, // User ID
    ten_khach_hang: DatPhongChon?.ten_khach_hang || '', // Customer name
    email: DatPhongChon?.email || '', // Customer email
    sdt: DatPhongChon?.sdt || '', // Phone number
    phong_id: DatPhongChon?.phong_id || null, // Room ID
    ngay_bat_dau: DatPhongChon?.ngay_bat_dau ? new Date(DatPhongChon.ngay_bat_dau).toISOString().split('T')[0] : '', // Start date
    ngay_ket_thuc: DatPhongChon?.ngay_ket_thuc ? new Date(DatPhongChon.ngay_ket_thuc).toISOString().split('T')[0] : '', // End date
    can_nang: DatPhongChon?.can_nang || '', // Weight
    tien: DatPhongChon?.tien || 0, // Amount
  });

  const [rooms, setRooms] = useState<Phong[]>([]); // State for rooms
  const weightToPrice: Record<string, number> = {
    '0-5kg': 120000,
    '6-10kg': 150000,
    '11-15kg': 180000,
  };

  useEffect(() => {
    if (DatPhongChon) {
      setFormData({
        dat_phong_id: DatPhongChon.dat_phong_id || '',
        nguoi_dung_id: DatPhongChon.nguoi_dung_id || null,
        ten_khach_hang: DatPhongChon.ten_khach_hang || '',
        email: DatPhongChon.email || '',
        sdt: DatPhongChon.sdt || '',
        phong_id: DatPhongChon.phong_id || null,
        ngay_bat_dau: DatPhongChon.ngay_bat_dau ? new Date(DatPhongChon.ngay_bat_dau).toISOString().split('T')[0] : '',
        ngay_ket_thuc: DatPhongChon.ngay_ket_thuc ? new Date(DatPhongChon.ngay_ket_thuc).toISOString().split('T')[0] : '',
        can_nang: DatPhongChon.can_nang || '',
        tien: DatPhongChon.tien || 0,
      });
    }

    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/phongtrong');
        if (response.status === 200) {
          setRooms(response.data); // Update state with available rooms
        } else {
          alert('Không thể lấy danh sách phòng!');
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng:', error);
        alert('Đã xảy ra lỗi khi lấy danh sách phòng.');
      }
    };

    fetchRooms();
  }, [DatPhongChon]);
  
  // Tính toán tổng tiền mỗi khi các trường liên quan thay đổi
  const calculateTotalPrice = () => {
    if (formData.ngay_bat_dau && formData.ngay_ket_thuc && formData.can_nang) {
      const startDate = new Date(formData.ngay_bat_dau);
      const endDate = new Date(formData.ngay_ket_thuc);
      const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24); // Tính số ngày

      let pricePerDay = weightToPrice[formData.can_nang] || 0;
      const totalPrice = days * pricePerDay;

      setFormData((prevData) => ({
        ...prevData,
        tien: totalPrice.toString(),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        tien: '', // Nếu thiếu các trường yêu cầu, xóa tổng tiền
      }));
    }
  };

  // Xử lý thay đổi giá trị cho tất cả các trường
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gọi hàm tính tổng tiền mỗi khi ngày bắt đầu, ngày kết thúc hoặc cân nặng thay đổi
  useEffect(() => {
    calculateTotalPrice();
  }, [formData.ngay_bat_dau, formData.ngay_ket_thuc, formData.can_nang]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Kiểm tra thông tin khách hàng
    if (!formData.ten_khach_hang || !formData.email) {
      alert('Vui lòng điền đầy đủ thông tin khách hàng!');
      return;
    }
  
    try {
      // Gửi yêu cầu cập nhật đơn đặt phòng
      const response = await axios.put(
        `http://localhost:5000/api/datphong/${formData.dat_phong_id}`,
        formData
      );
  
      if (response.status === 200) {
        alert('Cập nhật đơn đặt phòng thành công!');
  
        // Sau khi cập nhật đơn đặt phòng, cập nhật trạng thái phòng thành "đã đặt"
        try {
          const updateRoomResponse = await axios.put(
            `http://localhost:5000/api/phong/status/${formData.phong_id}`,
            {
              trang_thai_phong: 'đã đặt', // Giá trị trạng thái phòng
            }
          );
  
          if (updateRoomResponse.status === 200) {
            alert('Cập nhật trạng thái phòng thành công!');
          } else {
            alert('Đã xảy ra lỗi khi cập nhật trạng thái phòng!');
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật trạng thái phòng:', error);
          alert('Không thể cập nhật trạng thái phòng.');
        }
      } else {
        alert('Đã xảy ra lỗi khi cập nhật đơn đặt phòng!');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật đơn đặt phòng:', error);
      alert('Đã xảy ra lỗi khi cập nhật đơn đặt phòng!');
    }
  };
  

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật Đơn Đặt Phòng</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nguoi_dung_id">Người dùng ID:</label>
            <input
              type="text"
              id="nguoi_dung_id"
              name="nguoi_dung_id"
              placeholder="Nhập ID người dùng"
              value={formData.nguoi_dung_id || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ten_khach_hang">Tên khách hàng:</label>
            <input
              type="text"
              id="ten_khach_hang"
              name="ten_khach_hang"
              value={formData.ten_khach_hang || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email khách hàng:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sdt">Số điện thoại:</label>
            <input
              type="text"
              id="sdt"
              name="sdt"
              value={formData.sdt || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phong_id">Số phòng:</label>
            <select
              id="phong_id"
              name="phong_id"
              value={formData.phong_id || ''}
              onChange={handleChange}
            >
              <option value="">Chọn phòng</option>
              {rooms.map((room) => (
                <option key={room.phong_id} value={room.phong_id}>
                  {room.so_phong}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ngay_bat_dau">Ngày bắt đầu:</label>
            <input
              type="date"
              id="ngay_bat_dau"
              name="ngay_bat_dau"
              value={formData.ngay_bat_dau || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ngay_ket_thuc">Ngày kết thúc:</label>
            <input
              type="date"
              id="ngay_ket_thuc"
              name="ngay_ket_thuc"
              value={formData.ngay_ket_thuc || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="can_nang">Cân nặng (kg):</label>
            <select
              id="can_nang"
              name="can_nang"
              value={formData.can_nang || ''}
              onChange={handleChange}
              required
            >
              <option value="">Chọn cân nặng</option>
              <option value="0-5kg">0-5kg</option>
              <option value="6-10kg">6-10kg</option>
              <option value="11-15kg">11-15kg</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tien">Tổng tiền:</label>
            <input
              type="text"
              id="tien"
              name="tien"
              value={formData.tien || ''}
              readOnly
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatPhongUpdate;
