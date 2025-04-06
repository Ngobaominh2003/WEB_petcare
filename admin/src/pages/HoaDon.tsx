import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Plugin jsPDF-AutoTable để hỗ trợ in bảng

interface HoaDonType {
  hoa_don_id: number;
  nguoi_dung_id: number;
  dat_phong_id: number | null;
  dat_lich_id: number | null;
  tong_tien: number;
  trang_thai: string;
  ngay_tao: string;
}

interface UserType {
  nguoi_dung_id: number;
  ten_dang_nhap: string;
}

const HoaDon: React.FC = () => {
  const [hoaDonList, setHoaDonList] = useState<HoaDonType[]>([]);
  const [customerMap, setCustomerMap] = useState<Record<number, string>>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  // Hàm định dạng tiền
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  // Hàm lấy thông tin khách hàng
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const customers = response.data;
      const customerMap: Record<number, string> = {};
      customers.forEach((customer: UserType) => {
        customerMap[customer.nguoi_dung_id] = customer.ten_dang_nhap;
      });
      setCustomerMap(customerMap);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin khách hàng:', error);
    }
  };

  // Hàm lấy hóa đơn
  const fetchHoaDon = async (nguoiDungId?: number, ngayTao?: string) => {
    try {
      const url = nguoiDungId && ngayTao
        ? `http://localhost:5000/api/hoadon/${nguoiDungId}/${ngayTao}`
        : 'http://localhost:5000/api/hoadon';
      const response = await axios.get(url);
      setHoaDonList(response.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu hóa đơn:', error);
    }
  };

  useEffect(() => {
    fetchHoaDon(selectedUserId, selectedDate);
    fetchCustomers();
  }, [selectedUserId, selectedDate]);

  // Hàm xóa hóa đơn
  const handleDelete = async (hoaDonId: number) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa hóa đơn này?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/hoadon/${hoaDonId}`);
      setHoaDonList(hoaDonList.filter(hd => hd.hoa_don_id !== hoaDonId));
      alert('Đã xóa hóa đơn thành công.');
    } catch (error) {
      console.error('Lỗi khi xóa hóa đơn:', error);
      alert('Lỗi khi xóa hóa đơn. Vui lòng thử lại.');
    }
  };

  // Hàm in PDF
  const handlePrintPDF = (hoaDonId: number) => {
    const hoaDon = hoaDonList.find(hd => hd.hoa_don_id === hoaDonId);
    if (!hoaDon) return;

    const doc = new jsPDF();
    const formattedTongTien = formatCurrency(hoaDon.tong_tien);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.text('Hoa DonDon', 20, 20);

    doc.setFontSize(12);
    doc.text(`ID Hoa Don: ${hoaDon.hoa_don_id}`, 20, 30);
    doc.text(`Ten Khach Hang: ${customerMap[hoaDon.nguoi_dung_id] || 'Khách không xác định'}`, 20, 40);
    doc.text(`Tong Tien: ${formattedTongTien} VND`, 20, 50);
    doc.text(`Ngay Tao: ${new Date(hoaDon.ngay_tao).toLocaleDateString()}`, 20, 60);
    

    doc.save(`HoaDon_${hoaDon.hoa_don_id}.pdf`);
  };

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Danh sách Hóa Đơn</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ padding: '8px', fontSize: '14px' }}
                />
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(Number(e.target.value))}
                  style={{ padding: '8px', fontSize: '14px' }}
                >
                  <option value={0}>Chọn khách hàng</option>
                  {Object.entries(customerMap).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
            <table >
              <thead>
                <tr>
                  <th>Tên khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {hoaDonList.map((hoaDon) => (
                  <tr key={hoaDon.hoa_don_id}>
                    <td>{customerMap[hoaDon.nguoi_dung_id] || 'Khách không xác định'}</td>
                    <td>{formatCurrency(hoaDon.tong_tien)}</td>
                    <td>{new Date(hoaDon.ngay_tao).toLocaleDateString()}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: hoaDon.trang_thai === 'Chưa thanh toán' ? '#ffcc00' : '#4CAF50',
                          color: '#fff',
                          padding: '3px 6px',
                          borderRadius: '5px',
                        }}
                      >
                        {hoaDon.trang_thai}
                      </span>
                    </td>
                    <td>
                      <button
                        style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => handleDelete(hoaDon.hoa_don_id)}
                      >
                        Xóa
                      </button>
                      <button
                        style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        onClick={() => handlePrintPDF(hoaDon.hoa_don_id)}
                      >
                        In PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoaDon;
