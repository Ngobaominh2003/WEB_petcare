import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/HomePage", label: "Trang Chủ" },
    { path: "/About", label: "Giới Thiệu" },
    { path: "/DichVuDS", label: "Dịch Vụ" },
    { path: "/Price", label: "Giá" },
    { path: "/Contact", label: "Liên Hệ" },
    { path: "/Blog", label: "Blog" },
  ];

  return (
    <div
      className="container-fluid p-0"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: "#000000",
      }}
    >
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-lg-5">
        <Link to="/" className="navbar-brand d-block d-lg-none">
          <h1 className="m-0 display-5 text-capitalize font-italic text-white">
            <span className="text-primary">Safety</span>First
          </h1>
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between px-3"
          id="navbarCollapse"
        >
          <div className="navbar-nav mr-auto py-0">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item nav-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            to="/quote"
            className="btn btn-lg btn-primary px-3 d-none d-lg-block"
          >
            Nhận báo giá
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
