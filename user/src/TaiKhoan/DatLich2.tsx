import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import './style/styles.css';

//Lịch đặt dịch vụ đã hoàn thànhthành
const DatLich1: React.FC = () => {

  return (
    <div>
      <div className="tabs" id="DatLich2">
          
          {/* Upcoming Bookings Tab */}
          <div className="tab-content active" id="upcoming">
            {/* Booking Card 1 */}
            <div className="card booking-card">
              <div className="card-header">
                <div className="booking-header">
                  <div>
                    <h2>Tắm và cắt tỉa lông</h2>
                    <p>Spa thú cưng Happy Pets</p>
                  </div>
                  <div className="booking-status completed">Hoàn thành</div>
                </div>
              </div>
              <div className="card-body">
                <div className="booking-details">
                  <div className="booking-detail">
                    <i className="fas fa-calendar-alt" />
                    <span>15/05/2025</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-clock" />
                    <span>10:00 - 11:30</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-map-marker-alt" />
                    <span>123 Đường ABC, Quận 1, TP. HCM</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-dollar-sign" />
                    <span>350.000 VNĐ</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-paw" />
                    <span>Mèo Miu</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-outline">Chi tiết</button>
                <button className="btn btn-secondary">Đặt lại</button>
              </div>
            </div>
            {/* Booking Card 2 */}
            <div className="card booking-card">
              <div className="card-header">
                <div className="booking-header">
                  <div>
                    <h2>Khám sức khỏe định kỳ</h2>
                    <p>Phòng khám thú y PetHealth</p>
                  </div>
                  <div className="booking-status pending">Chờ xác nhận</div>
                </div>
              </div>
              <div className="card-body">
                <div className="booking-details">
                  <div className="booking-detail">
                    <i className="fas fa-calendar-alt" />
                    <span>20/05/2025</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-clock" />
                    <span>15:00 - 16:00</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-map-marker-alt" />
                    <span>456 Đường XYZ, Quận 2, TP. HCM</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-dollar-sign" />
                    <span>500.000 VNĐ</span>
                  </div>
                  <div className="booking-detail">
                    <i className="fas fa-paw" />
                    <span>Chó Bông</span>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-outline">Chi tiết</button>
                <button className="btn btn-danger">Đặt lại</button>
              </div>
            </div>
          </div>
          </div>
      {/* Tab Bảo mật có thể được thêm sau */}
    </div>
  );
};

export default DatLich1;
