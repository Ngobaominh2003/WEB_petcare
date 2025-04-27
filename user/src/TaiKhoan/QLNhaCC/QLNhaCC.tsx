import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NhaCCMenu from "../../components/NhaCCMenu";
import NguoiDung from "../QLTaiKhoan/NguoiDung";
import NhaCC from "./NhaCC";
import "../style/styles.css";

const QLNhaCC: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Quản lý trạng thái của tab đang chọn
  const workingDays = [
    { id: 1, name: "Thứ 2" },
    { id: 2, name: "Thứ 3" },
    { id: 3, name: "Thứ 4" },
    { id: 4, name: "Thứ 5" },
    { id: 5, name: "Thứ 6" },
    { id: 6, name: "Thứ 7" },
    { id: 7, name: "Chủ nhật" },
  ];

  const timeOptions = ["08:00", "09:00", "10:00", "17:00", "18:00", "19:00"];
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
            <NhaCCMenu />
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
              <div className="card">
                <div className="card-header">
                  <h2>Giờ làm việc</h2>
                  <p>Cập nhật giờ làm việc của doanh nghiệp</p>
                </div>
                <div className="card-body">
                  <div className="working-hours">
                    {workingDays.map((day) => (
                      <div className="working-hour-item" key={day.id}>
                        <div className="day">{day.name}</div>
                        <div className="hours">
                          <select defaultValue="10:00">
                            {timeOptions.slice(0, 3).map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                          <span>-</span>
                          <select defaultValue="18:00">
                            {timeOptions.slice(3).map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="status">
                          <input
                            type="checkbox"
                            id={`day-${day.id}`}
                            defaultChecked
                          />
                          <label htmlFor={`day-${day.id}`}>Mở cửa</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-primary">Lưu thay đổi</button>
                </div>
              </div>
              <div className="stats-grid">
                <div className="card stat-card">
                  <div className="card-header">
                    <h3>Tổng dịch vụ</h3>
                    <p>Số lượng dịch vụ đang cung cấp</p>
                  </div>
                  <div className="card-body">
                    <div className="stat-value">
                      <i className="fas fa-briefcase" />
                      <span>12</span>
                    </div>
                  </div>
                </div>
                <div className="card stat-card">
                  <div className="card-header">
                    <h3>Lịch đặt</h3>
                    <p>Lịch đặt trong tuần này</p>
                  </div>
                  <div className="card-body">
                    <div className="stat-value">
                      <i className="fas fa-calendar-alt" />
                      <span>8</span>
                    </div>
                  </div>
                </div>
                <div className="card stat-card">
                  <div className="card-header">
                    <h3>Đánh giá</h3>
                    <p>Xếp hạng trung bình</p>
                  </div>
                  <div className="card-body">
                    <div className="stat-value">
                      <i className="fas fa-star" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QLNhaCC;
