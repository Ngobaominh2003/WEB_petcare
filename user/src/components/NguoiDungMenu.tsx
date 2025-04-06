import React from "react";
import { Link, useLocation } from "react-router-dom";

const NguoiDungMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/QLTaiKhoan", icon: "fa-user", label: "Thông tin cá nhân" },
    { path: "/ThuCung", icon: "fa-paw", label: "Thú cưng của tôi" },
    { path: "/DatLich", icon: "fa-calendar-alt", label: "Lịch đặt dịch vụ" },
    { path: "/yeu-thich", icon: "fa-heart", label: "Nhà cung cấp yêu thích" },
    { path: "/thanh-toan", icon: "fa-credit-card", label: "Phương thức thanh toán" },
    { path: "/thong-bao", icon: "fa-bell", label: "Thông báo" },
    { path: "/cai-dat", icon: "fa-cog", label: "Cài đặt" },
    { path: "/dang-xuat", icon: "fa-sign-out-alt", label: "Đăng xuất", className: "logout" },
    
  ];

  return (
    <aside className="account-sidebar">
      <div className="sidebar-header">
        <h2>Tài khoản của tôi</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`sidebar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <Link to={item.path} className={`sidebar-link ${item.className || ""}`}>
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NguoiDungMenu;
