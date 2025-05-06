import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";

const ThongKe: React.FC = () => {
  const [tongQuat, setTongQuat] = useState<any>(null);
  const [doanhThuThang, setDoanhThuThang] = useState<any[]>([]);
  const [phanBo, setPhanBo] = useState<any[]>([]);
  const [donHangGanDay, setDonHangGanDay] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/thong-ke/tong-quat").then((res) => setTongQuat(res.data));
    axios.get("http://localhost:5000/api/thong-ke/doanh-thu-thang").then((res) => setDoanhThuThang(res.data));
    axios.get("http://localhost:5000/api/thong-ke/phan-bo-san-pham").then((res) => setPhanBo(res.data));
    axios.get("http://localhost:5000/api/thong-ke/don-hang-gan-day").then((res) => setDonHangGanDay(res.data));
  }, []);

  return (
    <div>
      <Navigation />
      <div className="main">
        <div className="container">
          <header>
            <h1>Bảng Thống Kê</h1>
            <p className="dashboard-info">Cập nhật lần cuối: {new Date().toLocaleString()}</p>
          </header>

          <div className="stats-container">
            <div className="stat-card">
              <h3>Tổng Doanh Thu</h3>
              <div className="number">
                {tongQuat ? `${tongQuat.tong_doanh_thu.toLocaleString()}₫` : "Đang tải..."}
              </div>
              <div className="trend up">
                <span className="trend-icon">↑</span> 12.5% so với tháng trước
              </div>
            </div>
            <div className="stat-card">
              <h3>Khách Hàng Mới</h3>
              <div className="number">
                {tongQuat ? tongQuat.khach_hang_moi : "Đang tải..."}
              </div>
              <div className="trend up">
                <span className="trend-icon">↑</span> 8.3% so với tháng trước
              </div>
            </div>
            <div className="stat-card">
              <h3>Đơn Hàng</h3>
              <div className="number">
                {tongQuat ? tongQuat.so_don_hang : "Đang tải..."}
              </div>
              <div className="trend up">
                <span className="trend-icon">↑</span> 5.2% so với tháng trước
              </div>
            </div>
            <div className="stat-card">
              <h3>Tỷ Lệ Hoàn Thành</h3>
              <div className="number">
                {tongQuat ? `${tongQuat.ty_le_hoan_thanh}%` : "Đang tải..."}
              </div>
              <div className="trend down">
                <span className="trend-icon">↓</span> 1.2% so với tháng trước
              </div>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart-card">
              <h2>Doanh Thu Theo Tháng</h2>
              <div className="bar-chart">
                {doanhThuThang.length > 0
                  ? doanhThuThang.map((item, index) => {
                      const height = `${Math.min(item.doanh_thu / 1000000 * 100, 100)}%`;
                      return (
                        <div key={index} className="bar" style={{ height }}>
                          <div className="bar-value">{item.doanh_thu.toLocaleString()}₫</div>
                          <div className="bar-label">{item.thang}</div>
                        </div>
                      );
                    })
                  : "Đang tải..."}
              </div>
            </div>

            <div className="chart-card">
              <h2>Phân Bổ Sản Phẩm</h2>
              <div className="pie-chart"></div>
              <div className="pie-legend">
                {phanBo.length > 0
                  ? phanBo.map((item, index) => (
                      <div key={index} className="legend-item">
                        <div
                          className="legend-color"
                          style={{ backgroundColor: getColor(index) }}
                        ></div>
                        <span>{item.nhom} ({item.ty_le}%)</span>
                      </div>
                    ))
                  : "Đang tải..."}
              </div>
            </div>
          </div>

          <div className="table-container">
            <h2>Đơn Hàng Gần Đây</h2>
            <table>
              <thead>
                <tr>
                  <th>Mã Đơn</th>
                  <th>Khách Hàng</th>
                  <th>Ngày</th>
                  <th>Giá Trị</th>
                  <th>Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {donHangGanDay.length > 0
                  ? donHangGanDay.map((order, index) => (
                      <tr key={index}>
                        <td>{order.ma_don}</td>
                        <td>{order.ten_khach}</td>
                        <td>{order.ngay}</td>
                        
                        <td>{order.gia_tri.toLocaleString()}₫</td>
                        <td>
  <span className={`status ${getTrangThaiClass(order.trang_thai)}`}>
    {formatTrangThai(order.trang_thai)}
  </span>
</td>

                      </tr>
                    ))
                  : (
                    <tr>
                      <td colSpan={5}>Đang tải dữ liệu...</td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatTrangThai(status: string) {
  switch (status) {
    case "hoàn thành": return "Hoàn thành";
    case "chờ xác nhận": return "Đang xử lý";
    case "hủy": return "Đã hủy";
    default: return status;
  }
}

function getColor(index: number) {
  const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#9b59b6"];
  return colors[index % colors.length];
}
function getTrangThaiClass(status: string): string {
  switch (status.toLowerCase()) {
    case "hoàn thành":
      return "status-green";
    case "chờ xác nhận":
      return "status-yellow";
    case "hủy":
      return "status-red";
    default:
      return "status-default";
  }
}

export default ThongKe;
