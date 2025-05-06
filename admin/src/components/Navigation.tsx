import React from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  icon: string;
  path: string;
  external?: boolean;
}

const menuItems: MenuItem[] = [
  { label: "PET LOVER", icon: "paw-outline", path: "#", external: true },
  { label: "HOME", icon: "home-outline", path: "#", external: true },
  { label: "Người dùng", icon: "person-outline", path: "/" },
  { label: "Bài viết", icon: "newspaper-outline", path: "/BaiViet" },
  { label: "Danh mục", icon: "list-outline", path: "/DanhMuc" },
  { label: "Phản hồi đánh giá", icon: "chatbox-ellipses-outline", path: "/reviews" },
  
  { label: "Dịch vụ", icon: "construct-outline", path: "/DichVu" },
  { label: "Báo Cáo", icon: "alert-circle-outline", path: "/BaoCao" },

  { label: "Thống Kê", icon: "analytics-outline", path: "/ThongKe" },
  { label: "Thú cưng", icon: "paw-outline", path: "/ThuCung" },
  { label: "Help", icon: "help-circle-outline", path: "#", external: true },
  { label: "Settings", icon: "settings-outline", path: "#", external: true },
  { label: "Password", icon: "lock-closed-outline", path: "#", external: true },
  { label: "Sign Out", icon: "log-out-outline", path: "#", external: true },
];

const Navigation: React.FC = () => {
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.external ? (
                <a href={item.path}>
                  <span className="icon">
                    <ion-icon name={item.icon}></ion-icon>
                  </span>
                  <span className="title">{item.label}</span>
                </a>
              ) : (
                <Link to={item.path}>
                  <span className="icon">
                    <ion-icon name={item.icon}></ion-icon>
                  </span>
                  <span className="title">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
