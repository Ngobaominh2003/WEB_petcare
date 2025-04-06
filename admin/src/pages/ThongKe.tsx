import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';

// Đăng ký các thành phần cần thiết
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Định nghĩa kiểu dữ liệu trả về từ API
interface thongkeData {
    ngay?: string; // Nếu timeRange là 'day'
    thang?: string; // Nếu timeRange là 'month'
    nam?: string; // Nếu timeRange là 'year'
    totalthongke: number;
}

// Định nghĩa kiểu dữ liệu cho biểu đồ
interface ChartDataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
}

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

const ThongKe: React.FC = () => {
    const [timeRange, setTimeRange] = useState<'day' | 'month' | 'year'>('day'); // Phạm vi thời gian
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [],
    }); // Dữ liệu biểu đồ
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

    // Hàm gọi API và cập nhật dữ liệu biểu đồ
    const fetchData = async () => {
        setLoading(true);
        setError(null);
      
        try {
          let url = '';
          if (timeRange === 'day') {
            url = 'http://localhost:5000/api/daily'; // Lấy dữ liệu 7 ngày gần nhất
          } else if (timeRange === 'month') {
            url = 'http://localhost:5000/api/monthly';
          } else if (timeRange === 'year') {
            url = 'http://localhost:5000/api/yearly';
          }
      
          const response = await axios.get<{ dailyRevenue?: thongkeData[]; monthlyRevenue?: thongkeData[]; yearlyRevenue?: thongkeData[] }>(url);
          console.log('Phản hồi từ API:', response.data);
      
          let data: thongkeData[] = [];
          if (timeRange === 'day' && response.data.dailyRevenue) {
            data = response.data.dailyRevenue; // Sử dụng 7 ngày gần nhất
          } else if (timeRange === 'month' && response.data.monthlyRevenue) {
            data = response.data.monthlyRevenue;
          } else if (timeRange === 'year' && response.data.yearlyRevenue) {
            data = response.data.yearlyRevenue;
          }
      
          if (!Array.isArray(data)) {
            throw new Error('Phản hồi không phải là một mảng');
          }
      
          const labels = data
            .map((item: thongkeData) => (timeRange === 'day' ? item.ngay : timeRange === 'month' ? item.thang : item.nam))
            .filter((label): label is string => Boolean(label));
          const revenue = data.map((item: thongkeData) => item.totalthongke);
      
          setChartData({
            labels,
            datasets: [
              {
                label: 'Doanh thu',
                data: revenue,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3,
              },
            ],
          });
        } catch (err) {
          console.error('Lỗi khi tải dữ liệu:', err);
          setError('Không thể tải dữ liệu, vui lòng thử lại sau.');
        } finally {
          setLoading(false);
        }
      };
      
    // Gọi API mỗi khi `timeRange` thay đổi
    useEffect(() => {
        fetchData();
    }, [timeRange]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Thời gian',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Doanh thu (VNĐ)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
          {/* Thành phần điều hướng */}
          <Navigation />
    
          {/* Nội dung chính */}
          <div className="main">
            <DieuKhien />
            <div style={{ width: '80%', margin: 'auto', textAlign: 'center' }}>
              <h2>Thống kê doanh thu</h2>
              <div>
                <button
                  onClick={() => setTimeRange('day')}
                  style={{
                    backgroundColor: timeRange === 'day' ? 'blue' : 'white',
                    color: timeRange === 'day' ? 'white' : 'black',
                    marginRight: '5px',
                    padding: '10px',
                  }}
                >
                  Theo ngày
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  style={{
                    backgroundColor: timeRange === 'month' ? 'blue' : 'white',
                    color: timeRange === 'month' ? 'white' : 'black',
                    marginRight: '5px',
                    padding: '10px',
                  }}
                >
                  Theo tháng
                </button>
                <button
                  onClick={() => setTimeRange('year')}
                  style={{
                    backgroundColor: timeRange === 'year' ? 'blue' : 'white',
                    color: timeRange === 'year' ? 'white' : 'black',
                    padding: '10px',
                  }}
                >
                  Theo năm
                </button>
              </div>
    
              {/* Nội dung biểu đồ hoặc trạng thái tải */}
              {loading ? (
                <p>Đang tải dữ liệu...</p>
              ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
              ) : (
                <Line data={chartData} options={options} />
              )}
            </div>
          </div>
        </div>
      );
    };

export default ThongKe;
