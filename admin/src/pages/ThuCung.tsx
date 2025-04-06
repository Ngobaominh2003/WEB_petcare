import React from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';

const ThuCung: React.FC = () => (
  <div>
    <Navigation />
    <div className="main">
      <DieuKhien />

      {/* ================ Pet List ================= */}
      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Quản Lý Thú Cưng</h2>
            <a href="#" className="btn">Xem Tất Cả</a>
          </div>

          <table>
            <thead>
              <tr>
                <th>Tên chủ</th>
                <th>Tên thú cưng</th>
                <th>Loài thú cưng</th>
                <th>Tuổi</th>
                <th>Giới tính</th>
                <th>Lịch sử khám</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nguyễn Văn A</td>
                <td>Rex</td>
                <td>Chó</td>
                <td>3</td>
                <td>Đực</td>
                <td>Khám sức khỏe định kỳ, Chích ngừa</td>
                <td>2024-10-01</td>
                <td>
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>

              <tr>
                <td>Trần Thị B</td>
                <td>Mimi</td>
                <td>Mèo</td>
                <td>2</td>
                <td>Cái</td>
                <td>Khám da liễu, Tiêm phòng</td>
                <td>2024-09-15</td>
                <td>
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>

              <tr>
                <td>Phạm Văn C</td>
                <td>Bunny</td>
                <td>Thỏ</td>
                <td>1</td>
                <td>Đực</td>
                <td>Kiểm tra răng miệng, Chích ngừa</td>
                <td>2024-08-20</td>
                <td>
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>

              <tr>
                <td>Lê Thị D</td>
                <td>Nemo</td>
                <td>Cá</td>
                <td>1</td>
                <td>Không xác định</td>
                <td>Khám định kỳ bể cá</td>
                <td>2024-07-10</td>
                <td>
                  <button className="delete-btn">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default ThuCung;
