import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="paw-outline"></ion-icon> {/* Changed to a paw icon */}
              </span>
              <span className="title">PET LOVER</span>
            </a>
          </li>


          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">HOME</span>
            </a>
          </li>

          <li>
            <Link to="/">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Người dùng</span>
            </Link>
          </li>

          <li>
            <Link to="/BaiViet">
              <span className="icon">
                <ion-icon name="document-text-outline"></ion-icon>
              </span>
              <span className="title">Bài viết</span>
            </Link>
          </li>
          <li>
            <Link to="/reviews">
              <span className="icon">
                <ion-icon name="star-outline"></ion-icon>
              </span>
              <span className="title">Phản hồi đánh giá</span>
            </Link>
          </li>

          <li>
            <Link to="/LichHen">
              <span className="icon">
                <ion-icon name="calendar-outline"></ion-icon>
              </span>
              <span className="title">Lịch hẹn</span>
            </Link>
          </li>

          <li>
            <Link to="/DichVu">
              <span className="icon">
                <ion-icon name="briefcase-outline"></ion-icon>
              </span>
              <span className="title">Dịch vụ</span>
            </Link>
          </li>

          <li>
            <Link to="/HoaDon">
              <span className="icon">
                <ion-icon name="document-outline"></ion-icon>
              </span>
              <span className="title">Hóa đơn</span>
            </Link>
          </li>

          <li>
            <Link to="/GoiDichVu">
              <span className="icon">
                <ion-icon name="cube-outline"></ion-icon>
              </span>
              <span className="title">Gói dịch vụ</span>
            </Link>
          </li>
          <li>
            <Link to="/Phong">
              <span className="icon">
                <ion-icon name="bed-outline"></ion-icon>
              </span>
              <span className="title">Phòng </span>
            </Link>
          </li>
          <li>
            <Link to="/DatPhong">
              <span className="icon">
                <ion-icon name="bed-outline"></ion-icon>
              </span>
              <span className="title">Lịch Đặt Phòng </span>
            </Link>
          </li>
          <li>
            <Link to="/ThongKe">
              <span className="icon">
                <ion-icon name="paw-outline"></ion-icon>
              </span>
              <span className="title">Thống Kê</span>
            </Link>
          </li>
          <li>
            <Link to="/ThuCung">
              <span className="icon">
                <ion-icon name="paw-outline"></ion-icon>
              </span>
              <span className="title">Thú cưng</span>
            </Link>
          </li>


          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="help-outline"></ion-icon>
              </span>
              <span className="title">Help</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span className="title">Settings</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="lock-closed-outline"></ion-icon>
              </span>
              <span className="title">Password</span>
            </a>
          </li>

          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
