import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const NguoiDungMenu: React.FC = () => {
  const location = useLocation();
  const [soThongBaoChuaDoc, setSoThongBaoChuaDoc] = useState<number>(0);

  useEffect(() => {
    const tai_khoan_id = localStorage.getItem("tai_khoan_id");
    if (tai_khoan_id) {
      axios
        .get(
          `http://localhost:5000/api/thong-bao/chua-doc?tai_khoan_id=${tai_khoan_id}`
        )
        .then((res) => {
          setSoThongBaoChuaDoc(res.data.so_luong || 0);
        })
        .catch((err) => {
          console.error("Lỗi lấy số thông báo chưa đọc:", err);
        });
    }
  }, []);

  const menuItems = [
    { path: "/QLTaiKhoan", icon: "fa-user", label: "Thông tin cá nhân" },
    { path: "/ThuCung", icon: "fa-paw", label: "Thú cưng của tôi" },
    { path: "/DatLich", icon: "fa-calendar-alt", label: "Lịch đặt dịch vụ" },
    { path: "/NhaCCYeuThich", icon: "fa-heart", label: "Nhà cung cấp yêu thích" },
    {
      path: "/CachThanhToan",
      icon: "fa-credit-card",
      label: "Phương thức thanh toán",
    },
    {
      path: "/ThongBao?vai_tro=nguoi_dung ",
      icon: "fa-bell",
      label: "Thông báo",
      badge: soThongBaoChuaDoc,
    },
    { path: "/cai-dat", icon: "fa-cog", label: "Cài đặt" },
    {
      path: "",
      icon: "fa-sign-out-alt",
      label: "Đăng xuất",
      className: "logout",
    },
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
            <Link
              to={item.path}
              className={`sidebar-link ${item.className || ""}`}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
              {(item.badge ?? 0) > 0 && (
                <span className="badge">{item.badge}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NguoiDungMenu;
