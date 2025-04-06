import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import PhongUpdate from './PhongUpdate';
import PhongAdd from './PhongAdd';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho phòng
interface Phong {
  phong_id: number;
  so_phong: string;
  gia_phong: number;
  trang_thai_phong: 'đang trống' | 'đã đặt' | 'đang sửa chữa'; // Trạng thái phòng
  ngay_tao: string;
}

const Phong: React.FC = () => {
  const [rooms, setRooms] = useState<Phong[]>([]); // Mảng lưu trữ thông tin phòng

  // Hàm lấy danh sách phòng từ API
  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/phong');
      setRooms(response.data); // Lưu dữ liệu phòng vào state
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phòng:', error);
    }
  };

  useEffect(() => {
    fetchRooms(); // Gọi API khi component được render lần đầu
  }, []);

  // Hàm cập nhật trạng thái phòng
  const handleChangeRoomStatus = async (phong_id: number, trang_thai_phong: 'đang trống' | 'đã đặt' | 'đang sửa chữa') => {
    try {
      await axios.put(`http://localhost:5000/api/phong/status/${phong_id}`, {
        trang_thai_phong,
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái phòng:', error);
    }
  };

  // Hàm xử lý thay đổi màu phòng theo trạng thái
  const getRoomColor = (trang_thai_phong: 'đang trống' | 'đã đặt' | 'đang sửa chữa') => {
    switch (trang_thai_phong) {
      case 'đang trống':
        return 'phong-green'; // Màu xanh lá cho phòng trống
      case 'đã đặt':
        return 'phong-red'; // Màu đỏ cho phòng đã đặt
      case 'đang sửa chữa':
        return 'phong-yellow'; // Màu vàng cho phòng đang sửa chữa
      default:
        return 'phong-green'; // Mặc định là phòng trống
    }
  };

  // Hàm xử lý thay đổi trạng thái khi nhấn vào phòng
  const handleRoomClick = async (phong_id: number) => {
    // Tìm phòng trong state và cập nhật trạng thái
    const updatedRooms = rooms.map((room) => {
      if (room.phong_id === phong_id) {
        let newStatus: 'đang trống' | 'đã đặt' | 'đang sửa chữa';
        if (room.trang_thai_phong === 'đang trống') {
          newStatus = 'đã đặt';
        } else if (room.trang_thai_phong === 'đã đặt') {
          newStatus = 'đang sửa chữa';
        } else {
          newStatus = 'đang trống';
        }

        // Cập nhật trạng thái phòng trong state
        return { ...room, trang_thai_phong: newStatus };
      }
      return room;
    });

    // Cập nhật state với danh sách phòng mới
    setRooms(updatedRooms);

    try {
      // Gửi yêu cầu cập nhật trạng thái lên server
      await handleChangeRoomStatus(phong_id, updatedRooms.find(room => room.phong_id === phong_id)?.trang_thai_phong || 'đang trống');
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái phòng trên server:', error);
    }
  };


  // Hàm cập nhật trạng thái cho tất cả các phòng
  const handleUpdateAllRooms = async () => {
    try {
      // Lặp qua tất cả các phòng và thay đổi trạng thái
      for (const room of rooms) {
        await handleChangeRoomStatus(room.phong_id, room.trang_thai_phong);
      }
      // Sau khi cập nhật tất cả phòng, gọi lại API để làm mới danh sách phòng
      fetchRooms();
    } catch (error) {
      console.error('Lỗi khi cập nhật tất cả trạng thái phòng:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />

        {/* ================ Danh Sách Phòng ================= */}
        <div className="details">

          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Danh Sách Phòng</h2>
            </div>

            <div className="phong-grid">
              {/* Tạo các phòng dưới dạng các ô vuông */}
              {rooms.map((room) => (
                <div
                  key={room.phong_id}
                  className={`phong-room ${getRoomColor(room.trang_thai_phong)}`} // Áp dụng màu phòng dựa trên trạng thái
                  onClick={() => handleRoomClick(room.phong_id)} // Xử lý sự kiện khi nhấn vào phòng
                >
                  <span className="phong-roomText">{room.so_phong}</span> {/* Hiển thị số phòng */}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================ Form cập nhật bài viết ================= */}
        <div className="details-container">
          <PhongAdd />
          <PhongUpdate />

        </div>
      </div>
    </div>
  );
};

export default Phong;
