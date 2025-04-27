import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NguoiDungMenu from "../../components/NguoiDungMenu";
import NguoiDung from "./NguoiDung";
import NhaCC from "../QLNhaCC/NhaCC";
import "../style/styles.css";

const QLTaiKhoan: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Quản lý trạng thái của tab đang chọn

  // Hàm thay đổi tab khi người dùng nhấn vào tab
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="account-layout">
            {/* Sidebar */}
            <NguoiDungMenu />
            {/* Content Area */}
            <div className="account-content">
              <div className="page-header">
                <h1>Thông tin nhà cung cấp</h1>
                <p>Quản lý thông tin và hồ sơ nhà cung cấp dịch vụ của bạn</p>
              </div>
              {/* Tabs */}
              <div className="tabs" id="account-tabs">
                <div className="tabs-header">
                  {/* Tab Hồ sơ */}
                  <button
                    className={`tab-button ${
                      activeTab === "profile" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("profile")}
                  >
                    Hồ sơ
                  </button>

                  {/* Tab Thông tin kinh doanh */}
                  <button
                    className={`tab-button ${
                      activeTab === "business" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("business")}
                  >
                    Thông tin kinh doanh
                  </button>
                </div>

                {/* Hiển thị component dựa trên tab được chọn */}
                {activeTab === "profile" && <NguoiDung />}
                {activeTab === "business" && <NhaCC />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QLTaiKhoan;
