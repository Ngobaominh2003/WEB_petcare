import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import DatPhongUpdate from './DatPhongUpdate';
import DatPhongAdd from './DatPhongAdd';
import axios from 'axios';

// Định nghĩa kiểu DatPhong
interface DatPhongType {
  dat_phong_id: number;
  nguoi_dung_id: number | null;
  ten_khach_hang: string;
  email: string;
  sdt: string;
  phong_id: number;
  ngay_bat_dau: string;
  ngay_ket_thuc: string;
  can_nang: number | null;
  tien: number;
}

// Định nghĩa kiểu Phong
interface Phong {
  phong_id: number;
  so_phong: string;
}

const DatPhong: React.FC = () => {
  const [DatPhongList, setDatPhongList] = useState<DatPhongType[]>([]); // Danh sách đặt phòng
  const [PhongList, setPhongList] = useState<Phong[]>([]); // Danh sách phòng
  const [DatPhongChon, setDatPhongChon] = useState<DatPhongType | null>(null); // Đặt phòng đã chọn

  // Lấy danh sách đặt phòng
  useEffect(() => {
    const fetchDatPhong = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/DatPhong');
        setDatPhongList(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đặt phòng:', error);
      }
    };
    fetchDatPhong();
  }, []);

  // Lấy danh sách phòng
  useEffect(() => {
    const fetchPhong = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Phong');
        setPhongList(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu phòng:', error);
      }
    };
    fetchPhong();
  }, []);

  // Lấy trạng thái của đặt phòng dựa trên ngày
  const getStatusStyle = (ngay_bat_dau: string, ngay_ket_thuc: string) => {
    const today = new Date();
    const startDate = new Date(ngay_bat_dau);
    const endDate = new Date(ngay_ket_thuc);

    if (today < startDate) {
      return { backgroundColor: '#ffcc00', color: '#fff' }; 
    } else if (today >= startDate && today <= endDate) {
      return { backgroundColor: '#4CAF50', color: '#fff' }; 
    } else {
      return { backgroundColor: '#f44336', color: '#fff' }; 
    }
  };

  // Xử lý xóa đặt phòng
  const handleDelete = async (datPhongId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa đặt phòng này?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/DatPhong/${datPhongId}`);
      setDatPhongList(DatPhongList.filter(dp => dp.dat_phong_id !== datPhongId));
      alert('Đã xóa đặt phòng thành công.');
    } catch (error) {
      console.error('Lỗi khi xóa đặt phòng:', error);
      alert('Lỗi khi xóa đặt phòng. Vui lòng thử lại.');
    }
  };

  // Chọn đặt phòng để cập nhật
  const handleSelectDatPhong = (DatPhong: DatPhongType) => {
    setDatPhongChon(DatPhong);
  };

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />

        {/* Danh sách đặt phòng */}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Danh sách Đặt Phòng</h2>
              <a href="#" className="btn">Xem tất cả</a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tên khách hàng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Số phòng</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {DatPhongList.map((DatPhong) => {
                  const room = PhongList.find(p => p.phong_id === DatPhong.phong_id);
                  return (
                    <tr key={DatPhong.dat_phong_id} onClick={() => handleSelectDatPhong(DatPhong)}>
                      <td>{DatPhong.ten_khach_hang}</td>
                      <td>{DatPhong.email}</td>
                      <td>{DatPhong.sdt}</td>
                      <td>{new Date(DatPhong.ngay_bat_dau).toLocaleDateString()}</td>
                      <td>{new Date(DatPhong.ngay_ket_thuc).toLocaleDateString()}</td>
                      <td>{room ? room.so_phong : 'Không có thông tin'}</td>
                      <td>
                        <span
                          className="status"
                          style={getStatusStyle(DatPhong.ngay_bat_dau, DatPhong.ngay_ket_thuc)}
                        >
                          {new Date() < new Date(DatPhong.ngay_bat_dau)
                            ? 'Sắp tới'
                            : new Date() <= new Date(DatPhong.ngay_ket_thuc)
                            ? 'Đang diễn ra'
                            : 'Đã kết thúc'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(DatPhong.dat_phong_id);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Cập nhật và Thêm Đặt Phòng */}
        <div className="details-container">
          <DatPhongUpdate DatPhongChon={DatPhongChon} />
          <DatPhongAdd />
        </div>
      </div>
    </div>
  );
};

export default DatPhong;
