import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NguoiDungMenu from "../components/NguoiDungMenu";
import DatLich1 from "./DatLich1";
import DatLich2 from "./DatLich2";
import './style/styles.css';


const DatLich: React.FC = () => {
  const [activeTab, setActiveTab] = useState("DatLich1"); // Quản lý trạng thái của tab đang chọn

  // Hàm thay đổi tab khi người dùng nhấn vào tab
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content" style={{ marginTop: "225px" }}>
        <div className="container">
          <div className="account-layout">
            {/* Sidebar */}
            <NguoiDungMenu />
            {/* Content Area */}
            <div className="account-content">
              <div className="page-header">
                <h1>Lịch đặt dịch vụ</h1>
                <p>Quản lý các lịch đặt dịch vụ chăm sóc thú cưng của bạn</p>
              </div>
              {/* Tabs */}
              <div className="tabs" id="account-tabs">
                <div className="tabs-header">
                  {/* Tab Hồ sơ */}
                  <button
                    className={`tab-button ${
                      activeTab === "DatLich1" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("DatLich1")}
                  >
                    Sắp tới
                  </button>

                  {/* Tab Thông tin kinh doanh */}
                  <button
                    className={`tab-button ${
                      activeTab === "DatLich2" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("DatLich2")}
                  >
                    Đã hoàn thànhthành
                  </button>
                </div>

                {/* Hiển thị component dựa trên tab được chọn */}
                {activeTab === "DatLich1" && <DatLich1 />}
                {activeTab === "DatLich2" && <DatLich2 />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DatLich;
