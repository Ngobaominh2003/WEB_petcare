import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import BaiVietUpdate from './BaiVietUpdate';
import BaiVietAdd from './BaiVietAdd';
import axios from 'axios';

interface BaiVietType {
  bai_viet_id: number;
  tai_khoan_id: number;
  tieu_de: string | null;
  noi_dung: string;
  hinh_anh: string | null;
  ngay_dang: Date;
  trang_thai: "hien" | "an";
  xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const BaiViet: React.FC = () => {
  const [baiVietList, setBaiVietList] = useState<BaiVietType[]>([]);
  const [baiVietChon, setBaiVietChon] = useState<BaiVietType | null>(null);

  useEffect(() => {
    const fetchBaiViet = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/danh-sach-bai-viet');
        setBaiVietList(response.data);
      } catch (error) {
        console.error('Lỗi khi tải bài viết:', error);
      }
    };

    fetchBaiViet();
  }, []);

  const getStatusStyle = (value: string, isXetDuyet = false) => {
    if (isXetDuyet) {
      switch (value) {
        case 'chờ duyệt': return { backgroundColor: '#ffcc00', color: '#fff' };
        case 'đã duyệt': return { backgroundColor: '#4CAF50', color: '#fff' };
        case 'không duyệt': return { backgroundColor: '#f44336', color: '#fff' };
        default: return {};
      }
    } else {
      return value === 'hien'
        ? { backgroundColor: '#2196F3', color: '#fff' }
        : { backgroundColor: '#9E9E9E', color: '#fff' };
    }
  };

  const handleDelete = async (baiVietId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/xoa-bai-viet/${baiVietId}`);
      setBaiVietList(baiVietList.filter(bv => bv.bai_viet_id !== baiVietId));
      alert('Bài viết đã được xóa thành công.');
    } catch (error) {
      console.error('Lỗi khi xóa bài viết:', error);
      alert('Đã xảy ra lỗi khi xóa bài viết. Vui lòng thử lại.');
    }
  };

  const handleSelectBaiViet = (baiViet: BaiVietType) => {
    setBaiVietChon(baiViet);
  };

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />

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
                  <th>Hiển thị</th>
                  <th>Duyệt</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {baiVietList.map((baiViet) => (
                  <tr key={baiViet.bai_viet_id} onClick={() => handleSelectBaiViet(baiViet)}>
                    <td>{baiViet.tieu_de}</td>
                    <td>{truncateText(baiViet.noi_dung, 100)}</td>
                    <td>{new Date(baiViet.ngay_dang).toLocaleDateString()}</td>
                    <td>
                      <img
                        src={
                          baiViet.hinh_anh
                            ? `http://localhost:5000/img/${baiViet.hinh_anh}`
                            : 'https://placehold.co/80x80?text=No+Image'
                        }
                        alt="Hình ảnh"
                        className="avatar"
                      />
                    </td>
                    <td>
                      <span className="status" style={getStatusStyle(baiViet.trang_thai)}>
                        {baiViet.trang_thai === 'hien' ? 'Hiện' : 'Ẩn'}
                      </span>
                    </td>
                    <td>
                      <span className="status" style={getStatusStyle(baiViet.xet_duyet, true)}>
                        {baiViet.xet_duyet}
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

        <div className="details-container">
          <BaiVietUpdate baiVietChon={baiVietChon} />
          <BaiVietAdd />
        </div>
      </div>
    </div>
  );
};

export default BaiViet;
