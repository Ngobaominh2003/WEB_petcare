//src/pages/DatDichVu/DatDichVu.tsx
import React, { useState } from "react";
import "../../TaiKhoan/style/datdichvu.css";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ChonDichVu from "./ChonDichVu";
import ThongTinDatLich from "./ThongTinDatLich";
import ThanhToan from "./ThanhToan";
import XacNhan from "./XacNhan";

const DatDichVu: React.FC = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="datdichvu-container">
      {/* Header và Navbar */}
      <Header />
      <Navbar />
      <main className="datdichvu-main" style={{ marginTop: "225px" }}>
        {/* Nội dung chính */}
        <div className="datdichvu-content">
          <div className="datdichvu-booking-header">
            <h1>Đăng ký dịch vụ</h1>
            <p>Hoàn tất thông tin đặt lịch và thanh toán dịch vụ</p>
          </div>

           {/* Progress */}
           <div className="datdichvu-booking-progress">
            {[1, 2, 3, 4].map((s, i) => (
              <React.Fragment key={s}>
                <div className={`datdichvu-progress-step ${step === s ? "active" : ""}`}>
                  <div className="datdichvu-step-number">{s}</div>
                  <div className="datdichvu-step-text">
                    {s === 1 && "Chọn dịch vụ"}
                    {s === 2 && "Thông tin đặt lịch"}
                    {s === 3 && "Thanh toán"}
                    {s === 4 && "Xác nhận"}
                  </div>
                </div>
                {s !== 4 && <div className="datdichvu-progress-line" />}
              </React.Fragment>
            ))}
          </div>
          
            {/* Booking steps */}
          <div className="datdichvu-booking-container">
            {step === 1 && <ChonDichVu onNext={() => setStep(2)} />}
            {step === 2 && <ThongTinDatLich onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <ThanhToan onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <XacNhan />}
          
            {/* Booking Summary */}
            <div className="datdichvu-booking-summary">
              <div className="datdichvu-summary-card">
                <div className="datdichvu-summary-header">
                  <h3>Tóm tắt đặt lịch</h3>
                </div>
                <div className="datdichvu-summary-content">
                  <div className="datdichvu-summary-service">
                    <img
                      src="https://placehold.co/400x300/4CAF50/ffffff?text=Tắm+và+cắt+tỉa+lông"
                      alt="Tắm và cắt tỉa lông cho chó"
                      className="datdichvu-summary-image"
                    />
                    <div className="datdichvu-summary-service-details">
                      <h4>Tắm và cắt tỉa lông cho chó</h4>
                      <p>Happy Pets</p>
                    </div>
                  </div>
                  <div className="datdichvu-summary-info">
                    <div className="datdichvu-summary-info-item">
                      <i className="fas fa-box" />
                      <div>
                        <span className="datdichvu-info-label">
                          Gói dịch vụ
                        </span>
                        <span
                          className="datdichvu-info-value"
                          id="summary-package"
                        >
                          Gói tiêu chuẩn
                        </span>
                      </div>
                    </div>
                    <div className="datdichvu-summary-info-item">
                      <i className="fas fa-paw" />
                      <div>
                        <span className="datdichvu-info-label">Thú cưng</span>
                        <span className="datdichvu-info-value" id="summary-pet">
                          Chó Bông (Poodle)
                        </span>
                      </div>
                    </div>
                    <div className="datdichvu-summary-info-item">
                      <i className="fas fa-calendar-alt" />
                      <div>
                        <span className="datdichvu-info-label">Ngày</span>
                        <span
                          className="datdichvu-info-value"
                          id="summary-date"
                        >
                          15/05/2025
                        </span>
                      </div>
                    </div>
                    <div className="datdichvu-summary-info-item">
                      <i className="fas fa-clock" />
                      <div>
                        <span className="datdichvu-info-label">Giờ</span>
                        <span
                          className="datdichvu-info-value"
                          id="summary-time"
                        >
                          14:00
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="datdichvu-summary-pricing">
                    <div className="datdichvu-pricing-item">
                      <span>Giá dịch vụ</span>
                      <span id="summary-price">350.000 VNĐ</span>
                    </div>
                    <div className="datdichvu-pricing-item">
                      <span>Phí dịch vụ</span>
                      <span>15.000 VNĐ</span>
                    </div>
                    <div className="datdichvu-pricing-total">
                      <span>Tổng cộng</span>
                      <span id="summary-total">365.000 VNĐ</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="datdichvu-provider-card">
                <div className="datdichvu-provider-info">
                  <img
                    src="https://placehold.co/50x50/4CAF50/ffffff?text=HP"
                    alt="Happy Pets"
                    className="datdichvu-provider-logo"
                  />
                  <div>
                    <h4>Happy Pets</h4>
                    <div className="datdichvu-provider-rating">
                      <div className="datdichvu-stars">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </div>
                      <span>4.5 (120 đánh giá)</span>
                    </div>
                  </div>
                </div>
                <div className="datdichvu-provider-contact">
                  <div className="datdichvu-contact-item">
                    <i className="fas fa-map-marker-alt" />
                    <span>123 Đường ABC, Quận 1, TP. HCM</span>
                  </div>
                  <div className="datdichvu-contact-item">
                    <i className="fas fa-phone" />
                    <span>0123 456 789</span>
                  </div>
                </div>
                <a
                  href="#"
                  className="datdichvu-btn datdichvu-btn-outline datdichvu-btn-sm"
                >
                  Xem thông tin
                </a>
              </div>
            </div>
          </div>
         
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DatDichVu;
