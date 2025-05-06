import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const NhaCCMenu: React.FC = () => {
  const location = useLocation();
  const [soThongBaoChuaDoc, setSoThongBaoChuaDoc] = useState<number>(0);

  useEffect(() => {
    const tai_khoan_id = localStorage.getItem("tai_khoan_id");
    if (tai_khoan_id) {
      axios
        .get(`http://localhost:5000/api/thong-bao/chua-doc?tai_khoan_id=${tai_khoan_id}`)
        .then((res) => {
          setSoThongBaoChuaDoc(res.data.so_luong || 0);
        })
        .catch((err) => {
          console.error("Lỗi lấy số thông báo chưa đọc:", err);
        });
    }
  }, []);

  const menuItems = [
    { path: "/QLNhaCC", icon: "fa-user", label: "Thông tin cá nhân" },
    { path: "/DichVuQL", icon: "fa-briefcase", label: "Quản lý dịch vụ" },
    { path: "/DSLichDat", icon: "fa-calendar-alt", label: "Quản lý đặt lịch" },
    { path: "", icon: "fa-star", label: "Đánh giá & xếp hạng" },
    { path: "/ThongKe", icon: "fa-dollar-sign", label: "Thu nhập & thanh toán" },
    {
      path: "/ThongBao?vai_tro=nha_cung_cap",
      icon: "fa-bell",
      label: "Thông báo",
      badge: soThongBaoChuaDoc,
    },
    { path: "", icon: "fa-comment", label: "Tin nhắn" },
    { path: "", icon: "fa-cog", label: "Cài đặt" },
    {
      path: "/dang-xuat",
      icon: "fa-sign-out-alt",
      label: "Đăng xuất",
      className: "logout",
    },
  ];

  return (
    <aside className="account-sidebar">
      <div className="sidebar-header">
        <h2>Quản lý nhà cung cấp</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map(({ path, icon, label, className, badge }) => {
          const isActive = location.pathname === path;

          return (
            <li
              key={path}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <Link to={path} className={`sidebar-link ${className || ""}`}>
                <i className={`fas ${icon}`}></i>
                <span>{label}</span>
                {badge && badge > 0 && (
                  <span className="badge">{badge}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default NhaCCMenu;
