import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NguoiDungMenu from "../components/NguoiDungMenu";
import './style/styles.css';

const ThuCung: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Quản lý trạng thái của tab đang chọn

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
              <div className="page-header-with-actions">
                <div>
                  <h1>Thú cưng của tôi</h1>
                  <p>Quản lý thông tin thú cưng của bạn</p>
                </div>
                <button className="btn btn-primary">
                  <i className="fas fa-plus-circle" />
                  Thêm thú cưng
                </button>
              </div>
              <div className="pets-grid">
                {/* Pet Card 1 */}
                <div className="pet-card">
                  <div className="pet-card-header">
                    <h2>Mèo Miu</h2>
                    <p>Mèo - Mèo Anh lông ngắn</p>
                  </div>
                  <div className="pet-card-body">
                    <div className="pet-info">
                      <img
                        src="https://placehold.co/100x100/4CAF50/ffffff?text=Mèo+Miu"
                        alt="Mèo Miu"
                        className="pet-image"
                      />
                      <div className="pet-details">
                        <p>
                          <span>Tuổi:</span> 2 tuổi
                        </p>
                        <p>
                          <span>Giới tính:</span> Cái
                        </p>
                        <p>
                          <span>Cân nặng:</span> 3.5 kg
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pet-card-footer">
                    <button className="btn btn-outline btn-sm">
                      <i className="fas fa-edit" />
                      Chỉnh sửa
                    </button>
                    <button className="btn btn-outline btn-sm btn-danger">
                      <i className="fas fa-trash" />
                      Xóa
                    </button>
                  </div>
                </div>
                {/* Pet Card 2 */}
                <div className="pet-card">
                  <div className="pet-card-header">
                    <h2>Chó Bông</h2>
                    <p>Chó - Poodle</p>
                  </div>
                  <div className="pet-card-body">
                    <div className="pet-info">
                      <img
                        src="https://placehold.co/100x100/4CAF50/ffffff?text=Chó+Bông"
                        alt="Chó Bông"
                        className="pet-image"
                      />
                      <div className="pet-details">
                        <p>
                          <span>Tuổi:</span> 3 tuổi
                        </p>
                        <p>
                          <span>Giới tính:</span> Đực
                        </p>
                        <p>
                          <span>Cân nặng:</span> 5 kg
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pet-card-footer">
                    <button className="btn btn-outline btn-sm">
                      <i className="fas fa-edit" />
                      Chỉnh sửa
                    </button>
                    <button className="btn btn-outline btn-sm btn-danger">
                      <i className="fas fa-trash" />
                      Xóa
                    </button>
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

export default ThuCung;
