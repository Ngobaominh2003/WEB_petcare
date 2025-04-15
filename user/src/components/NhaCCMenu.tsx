import React from "react";
import { Link, useLocation } from "react-router-dom";

const NhaCCMenu: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/QLNhaCC", icon: "fa-user", label: "Thông tin cá nhân" },
    { path: "/DichVuQL", icon: "fa-briefcase", label: "Quản lý dịch vụ" },
    { path: "/provider/dat-lich", icon: "fa-calendar-alt", label: "Quản lý đặt lịch" },
    { path: "/provider/danh-gia", icon: "fa-star", label: "Đánh giá & xếp hạng" },
    { path: "/provider/thu-nhap", icon: "fa-dollar-sign", label: "Thu nhập & thanh toán" },
    { path: "/provider/tin-nhan", icon: "fa-comment", label: "Tin nhắn" },
    { path: "/provider/cai-dat", icon: "fa-cog", label: "Cài đặt" },
    { path: "/dang-xuat", icon: "fa-sign-out-alt", label: "Đăng xuất", className: "logout" },
  ];

  return (
    <aside className="account-sidebar">
      <div className="sidebar-header">
        <h2>Quản lý nhà cung cấp</h2>
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

export default NhaCCMenu;
