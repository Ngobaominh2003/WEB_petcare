import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NhaCCMenu from "../../components/NhaCCMenu";
import "../style/styles.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ThongKe: React.FC = () => {
  const [tongQuan, setTongQuan] = useState<any>(null);
  const [bieuDo, setBieuDo] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [lichSu, setLichSu] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tai_khoan_id = localStorage.getItem("tai_khoan_id");
        const [tongRes, chartRes, lichSuRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/thong-ke/tong-quan?tai_khoan_id=${tai_khoan_id}`),
          axios.get(`http://localhost:5000/api/thong-ke/bieu-do?tai_khoan_id=${tai_khoan_id}`),
          axios.get(`http://localhost:5000/api/thong-ke/lich-su?tai_khoan_id=${tai_khoan_id}&loai=all`),
        ]);

        setTongQuan(tongRes.data);

        const data = chartRes.data.reverse();
        setBieuDo(data);
        setChartData({
          labels: data.map((item: any) => item.thang),
          datasets: [
            {
              label: "Tổng thu nhập (VNĐ)",
              data: data.map((item: any) => item.tong_thu_nhap),
              fill: false,
              borderColor: "#4CAF50",
              backgroundColor: "#4CAF50",
              tension: 0.3,
            },
          ],
        });

        setLichSu(lichSuRes.data);
      } catch (err) {
        console.error("Lỗi khi tải thống kê:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="account-layout">
            <NhaCCMenu />
            <div className="account-content">
              <div className="page-header">
                <h1>Thu nhập & thanh toán</h1>
                <p>Quản lý thu nhập và thanh toán của bạn</p>
              </div>
              <div className="stats-grid">
                <div className="card stat-card">
                  <div className="card-header">
                    <h3>Tổng thu nhập</h3>
                    <p>Tổng thu nhập của bạn</p>
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="card-body">
                    <div className="stat-value">
                      <span>{tongQuan?.tong_thu_nhap?.toLocaleString()} VNĐ</span>
                    </div>
                  </div>
                </div>
                <div className="card stat-card">
                  <div className="card-header">
                    <h3>Thu nhập tháng này</h3>
                    <p>Thu nhập trong tháng hiện tại</p>
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="card-body">
                    <div className="stat-value">
                      <span>{tongQuan?.thu_thang_nay?.toLocaleString()} VNĐ</span>
                    </div>
                  </div>
                </div>
                <div className="card stat-card">
                  <div className="card-header">
                    <h3>Đặt lịch hoàn thành</h3>
                    <p>Số lượng đặt lịch đã hoàn thành</p>
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="card-body">
                    <div className="stat-value">
                      <span>{tongQuan?.tong_luot_hoan_thanh}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h2>Biểu đồ thu nhập</h2>
                  <p>Tổng quan về thu nhập của bạn trong 6 tháng qua</p>
                </div>
                <div className="card-body">
                  <div className="chart-placeholder">
                    {chartData ? (
                      <Line
                        data={chartData}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: "top" },
                            tooltip: {
                              callbacks: {
                                label: (context: any) => {
                                  const value = context.parsed.y;
                                  return ` ${value.toLocaleString()} VNĐ`;
                                },
                              },
                            },
                          },
                          scales: {
                            y: {
                              ticks: {
                                callback: (tickValue: string | number) => 
                                  typeof tickValue === 'number' ? `${tickValue.toLocaleString()} VNĐ` : tickValue,
                              },
                            },
                          },
                        }}
                      />
                    ) : (
                      <p>Đang tải biểu đồ...</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="tabs" id="earnings-tabs">
                <div className="tabs-header">
                  <button className="tab-button active" data-tab="all">Tất cả</button>
                  <button className="tab-button" data-tab="income">Thu nhập</button>
                  <button className="tab-button" data-tab="expense">Chi phí</button>
                </div>
                <div className="tab-content active" id="all">
                  <div className="card">
                    <div className="card-header">
                      <h2>Lịch sử giao dịch</h2>
                      <p>Danh sách tất cả các giao dịch của bạn</p>
                    </div>
                    <div className="card-body">
                      <div className="transactions">
                        {lichSu.map((giaoDich, idx) => (
                          <div className="transaction-item" key={idx}>
                            <div className="transaction-info">
                              <div className={`transaction-icon ${giaoDich.loai === 'thu_nhap' ? 'income' : 'expense'}`}>
                                <i className={`fas fa-arrow-${giaoDich.loai === 'thu_nhap' ? 'up' : 'down'}`} />
                              </div>
                              <div className="transaction-details">
                                <h3>{giaoDich.ten_giao_dich}</h3>
                                <p>{giaoDich.mo_ta}</p>
                              </div>
                            </div>
                            <div className="transaction-amount">
                              <p className={`amount income ${giaoDich.loai}`}>
                                {(giaoDich.loai === 'thu_nhap' ? '+' : '-') + giaoDich.so_tien.toLocaleString()} VNĐ
                              </p>
                              <p className="date">{new Date(giaoDich.thoi_gian).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-outline">
                        <i className="fas fa-download"></i>
                        Xuất báo cáo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThongKe;
