import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import GoiDichVuAdd from './GoiDichVuAdd';
import GoiDichVuUpdate from './GoiDichVuUpdate';

interface GoiDichVu {
  goi_dich_vu_id: number;
  ten_goi: string;
  mo_ta: string;
  gia_1_thang: number | null;
  gia_6_thang: number | null;
  gia_1_nam: number | null;
  ngay_tao: string;
}

const GoiDichVu: React.FC = () => {
  const [goiDichVuList, setGoiDichVuList] = useState<GoiDichVu[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedGoiDichVu, setSelectedGoiDichVu] = useState<GoiDichVu | null>(null);

  // Hàm để lấy danh sách gói dịch vụ từ server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/goidichvu');
        const formattedData = response.data.map((item: any) => ({
          goi_dich_vu_id: item.goi_dich_vu_id,
          ten_goi: item.ten_goi,
          mo_ta: item.mo_ta,
          gia_1_thang: item.gia_1_thang,
          gia_6_thang: item.gia_6_thang,
          gia_1_nam: item.gia_1_nam,
          ngay_tao: item.ngay_tao,
        }));
        setGoiDichVuList(formattedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching service packages:', error);
        setError('Không thể tải dữ liệu gói dịch vụ. Vui lòng thử lại sau.');
      }
    };
    fetchData();
  }, []);

  // Hàm để xóa gói dịch vụ
  const handleDelete = async (goiDichVuId: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/goidichvu/${goiDichVuId}`);
      if (response.status === 200) {
        setGoiDichVuList(goiDichVuList.filter(item => item.goi_dich_vu_id !== goiDichVuId));
        alert('Gói dịch vụ đã được xóa thành công!');
      } else {
        throw new Error('Xóa gói dịch vụ thất bại');
      }
    } catch (error) {
      console.error('Error deleting service package:', error);
      setError('Có lỗi xảy ra khi xóa gói dịch vụ.');
    }
  };

  // Hàm xử lý khi chọn gói dịch vụ để cập nhật
  const handleRowClick = (item: GoiDichVu) => {
    setSelectedGoiDichVu(item);
  };

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />

        {/* Hiển thị danh sách gói dịch vụ */}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Gói Dịch Vụ Chăm Sóc Thú Cưng</h2>
              <a href="#" className="btn">Xem Tất Cả</a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tên gói</th>
                  <th>Mô tả</th>
                  <th>Giá 1 tháng</th>
                  <th>Giá 6 tháng</th>
                  <th>Giá 1 năm</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {goiDichVuList.length > 0 ? (
                  goiDichVuList.map((item) => (
                    <tr key={item.goi_dich_vu_id} onClick={() => handleRowClick(item)}>
                      <td>{item.ten_goi || 'Không có tên gói'}</td>
                      <td>{item.mo_ta || 'Không có mô tả'}</td>
                      <td>
                        {item.gia_1_thang
                          ? `${(item.gia_1_thang)} VND`
                          : 'Không có giá'}
                      </td>

                      <td>{item.gia_6_thang ? `${(item.gia_6_thang)} VND` : 'Không có giá'}</td>
                      <td>{item.gia_1_nam ? `${(item.gia_1_nam)} VND` : 'Không có giá'}</td>
                      <td>
                        <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(item.goi_dich_vu_id); }}>
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>
                      {error ? error : 'Không có gói dịch vụ nào được tìm thấy'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hiển thị form cập nhật và thêm mới gói dịch vụ */}
        <div className="details-container">
          <GoiDichVuUpdate selectedGoiDichVu={selectedGoiDichVu} />
          <GoiDichVuAdd />
        </div>
      </div>
    </div>
  );
};

export default GoiDichVu;
