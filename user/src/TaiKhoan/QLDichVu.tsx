import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NhaCCMenu from "../components/NhaCCMenu";
import './style/styles.css';

const QLDichVu: React.FC = () => {
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
            <NhaCCMenu />
            {/* Content Area */}
            <div className="account-content">
  <div className="page-header-with-actions">
    <div>
      <h1>Quản lý dịch vụ</h1>
      <p>Quản lý các dịch vụ chăm sóc thú cưng của bạn</p>
    </div>
    <button className="btn btn-primary">
      <i className="fas fa-plus-circle" />
      Thêm dịch vụ mới
    </button>
  </div>
  <div className="services-grid">
    {/* Service Card 1 */}
    <div className="service-card">
      <div className="service-card-header">
        <div>
          <h2>Tắm và cắt tỉa lông cho chó</h2>
          <p>Làm đẹp</p>
        </div>
        <div className="service-status active">Đang hoạt động</div>
      </div>
      <div className="service-card-body">
        <div className="service-info">
          <img
            src="https://placehold.co/250x150/4CAF50/ffffff?text=Tắm+và+cắt+tỉa+lông"
            alt="Tắm và cắt tỉa lông cho chó"
            className="service-image"
          />
          <div className="service-details">
            <p>Dịch vụ tắm và cắt tỉa lông chuyên nghiệp cho chó các loại</p>
            <div className="service-meta">
              <div className="service-meta-item">
                <i className="fas fa-dollar-sign" />
                <span>250.000 - 500.000 VNĐ</span>
              </div>
              <div className="service-meta-item">
                <i className="fas fa-clock" />
                <span>60-90 phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-card-footer">
        <div className="service-actions">
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-eye" />
            Xem
          </button>
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-edit" />
            Chỉnh sửa
          </button>
        </div>
        <button className="btn btn-outline btn-sm btn-danger">
          <i className="fas fa-trash" />
          Xóa
        </button>
      </div>
    </div>
    {/* Service Card 2 */}
    <div className="service-card">
      <div className="service-card-header">
        <div>
          <h2>Spa cao cấp cho mèo</h2>
          <p>Spa</p>
        </div>
        <div className="service-status active">Đang hoạt động</div>
      </div>
      <div className="service-card-body">
        <div className="service-info">
          <img
            src="https://placehold.co/250x150/4CAF50/ffffff?text=Spa+cao+cấp"
            alt="Spa cao cấp cho mèo"
            className="service-image"
          />
          <div className="service-details">
            <p>
              Dịch vụ spa cao cấp dành cho mèo, bao gồm tắm, mát-xa và chăm sóc
              móng
            </p>
            <div className="service-meta">
              <div className="service-meta-item">
                <i className="fas fa-dollar-sign" />
                <span>350.000 - 600.000 VNĐ</span>
              </div>
              <div className="service-meta-item">
                <i className="fas fa-clock" />
                <span>90-120 phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-card-footer">
        <div className="service-actions">
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-eye" />
            Xem
          </button>
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-edit" />
            Chỉnh sửa
          </button>
        </div>
        <button className="btn btn-outline btn-sm btn-danger">
          <i className="fas fa-trash" />
          Xóa
        </button>
      </div>
    </div>
    {/* Service Card 3 */}
    <div className="service-card">
      <div className="service-card-header">
        <div>
          <h2>Khám sức khỏe định kỳ</h2>
          <p>Sức khỏe</p>
        </div>
        <div className="service-status active">Đang hoạt động</div>
      </div>
      <div className="service-card-body">
        <div className="service-info">
          <img
            src="https://placehold.co/250x150/4CAF50/ffffff?text=Khám+sức+khỏe"
            alt="Khám sức khỏe định kỳ"
            className="service-image"
          />
          <div className="service-details">
            <p>Dịch vụ khám sức khỏe tổng quát định kỳ cho thú cưng</p>
            <div className="service-meta">
              <div className="service-meta-item">
                <i className="fas fa-dollar-sign" />
                <span>400.000 - 800.000 VNĐ</span>
              </div>
              <div className="service-meta-item">
                <i className="fas fa-clock" />
                <span>45-60 phút</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-card-footer">
        <div className="service-actions">
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-eye" />
            Xem
          </button>
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-edit" />
            Chỉnh sửa
          </button>
        </div>
        <button className="btn btn-outline btn-sm btn-danger">
          <i className="fas fa-trash" />
          Xóa
        </button>
      </div>
    </div>
    {/* Service Card 4 */}
    <div className="service-card inactive">
      <div className="service-card-header">
        <div>
          <h2>Huấn luyện cơ bản</h2>
          <p>Huấn luyện</p>
        </div>
        <div className="service-status inactive">Tạm ngưng</div>
      </div>
      <div className="service-card-body">
        <div className="service-info">
          <img
            src="https://placehold.co/250x150/4CAF50/ffffff?text=Huấn+luyện"
            alt="Huấn luyện cơ bản"
            className="service-image"
          />
          <div className="service-details">
            <p>Khóa huấn luyện cơ bản cho chó con và chó trưởng thành</p>
            <div className="service-meta">
              <div className="service-meta-item">
                <i className="fas fa-dollar-sign" />
                <span>1.200.000 - 2.500.000 VNĐ</span>
              </div>
              <div className="service-meta-item">
                <i className="fas fa-clock" />
                <span>4-8 tuần</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="service-card-footer">
        <div className="service-actions">
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-eye" />
            Xem
          </button>
          <button className="btn btn-outline btn-sm">
            <i className="fas fa-edit" />
            Chỉnh sửa
          </button>
        </div>
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

export default QLDichVu;
