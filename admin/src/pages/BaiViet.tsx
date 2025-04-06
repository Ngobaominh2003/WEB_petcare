import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import BaiVietUpdate from './BaiVietUpdate';
import BaiVietAdd from './BaiVietAdd';
import axios from 'axios';

interface BaiVietType {
  bai_viet_id: number;
  tieu_de: string;
  noi_dung: string;
  ngay_tao: string;
  hinh_anh: string;
  trang_thai: 'đã duyệt' | 'chờ duyệt' | 'hủy';
}

// Hàm để cắt ngắn nội dung
const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const BaiViet: React.FC = () => {
  const [baiVietList, setBaiVietList] = useState<BaiVietType[]>([]);
  const [baiVietChon, setBaiVietChon] = useState<BaiVietType | null>(null);

  useEffect(() => {
    const fetchBaiViet = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/baiviet');
        setBaiVietList(response.data);
      } catch (error) {
        console.error('Lỗi khi tải bài viết:', error);
      }
    };

    fetchBaiViet();
  }, []);
  const getStatusStyle = (trangThai: string) => {
    switch (trangThai) {
      case 'chờ duyệt':
        return { backgroundColor: '#ffcc00', color: '#fff' };
      case 'đã duyệt':
        return { backgroundColor: '#4CAF50', color: '#fff' };
      case 'hủy':
        return { backgroundColor: '#f44336', color: '#fff' };
      default:
        return {};
    }
  };
  // Hàm xóa bài viết
  const handleDelete = async (baiVietId: number) => {
    // Hiển thị hộp thoại xác nhận xóa
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');

    if (!confirmDelete) {
      return; // Nếu người dùng chọn "Hủy", không làm gì cả
    }

    try {
      await axios.delete(`http://localhost:5000/api/baiviet/${baiVietId}`);
      // Cập nhật lại danh sách bài viết sau khi xóa
      setBaiVietList(baiVietList.filter(bv => bv.bai_viet_id !== baiVietId));
      alert('Bài viết đã được xóa thành công.');
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      alert('Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại.');
    }
  };

  // Hàm chọn bài viết để cập nhật
  const handleSelectBaiViet = (baiViet: BaiVietType) => {
    setBaiVietChon(baiViet); // Truyền bài viết được chọn vào state
  };

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />

        {/* ================ Danh sách bài viết ================= */}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Bài Viết Chăm Sóc Thú Cưng</h2>
              <a href="#" className="btn">Xem Tất Cả</a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Nội dung</th>
                  <th>Ngày tạo</th>
                  <th>Hình ảnh</th>
                  <th>Trạng Thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {baiVietList.map((baiViet) => (
                  <tr key={baiViet.bai_viet_id} onClick={() => handleSelectBaiViet(baiViet)}>
                    <td>{baiViet.tieu_de}</td>
                    <td>{truncateText(baiViet.noi_dung, 100)}</td>
                    <td>{new Date(baiViet.ngay_tao).toLocaleDateString()}</td>
                    <td>

                      <img
                        src={`http://localhost:5000/img/${baiViet.hinh_anh}`}

                        className="avatar"

                      />
                    </td>

                    <td>
                      <span
                        className="status"
                        style={getStatusStyle(baiViet.trang_thai)}
                      >
                        {baiViet.trang_thai}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(baiViet.bai_viet_id);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================ Form cập nhật bài viết ================= */}
        <div className="details-container">
          <BaiVietUpdate baiVietChon={baiVietChon} />
          <BaiVietAdd />
        </div>
      </div>
    </div>
  );
};

export default BaiViet;
