//src/pages/DatDichVu/DatDichVu.tsx
import React, { useState, useEffect } from "react";

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
  const [dichVu, setDichVu] = useState<any | null>(null);
  const [chonDichVuInfo, setChonDichVuInfo] = useState<any | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("dichVuDaChon");
    if (data) {
      setDichVu(JSON.parse(data));
    }
  }, []);
  const [datLichInfo, setDatLichInfo] = useState<any | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("datLichInfo");
    if (data) {
      setDatLichInfo(JSON.parse(data));
    }
  }, []);

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
                <div
                  className={`datdichvu-progress-step ${
                    step === s ? "active" : ""
                  }`}
                >
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
            {step === 1 && (
              <ChonDichVu
                onNext={() => setStep(2)}
                setChonDichVuInfo={setChonDichVuInfo}
              />
            )}

            {step === 2 && (
              <ThongTinDatLich
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
                setDatLichInfo={setDatLichInfo}
              />
            )}

            {step === 3 && (
              <ThanhToan onNext={() => setStep(4)} onBack={() => setStep(2)} />
            )}
            {step === 4 && <XacNhan />}

            {/* Booking Summary */}
            <div className="datdichvu-booking-summary">
              <div className="datdichvu-summary-card">
                <div className="datdichvu-summary-header">
                  <h3>Tóm tắt đặt lịch</h3>
                </div>
                <div className="datdichvu-summary-content">
                  {dichVu && (
                    <div className="datdichvu-summary-service">
                      <img
                        src={`http://localhost:5000/img/${dichVu.logo}`}
                        alt={dichVu.ten_dich_vu}
                        className="datdichvu-summary-image"
                      />
                      <div className="datdichvu-summary-service-details">
                        <h4>{dichVu.ten_dich_vu}</h4>
                        <p>{dichVu.ten_nha_cung_cap || "Không rõ"}</p>
                      </div>
                    </div>
                  )}

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
                          {datLichInfo?.ten_thu_cung || "Chưa chọn"}
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
                          {datLichInfo?.ngay_gio?.split(" ")[0] || "Chưa chọn"}
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
                          {datLichInfo?.ngay_gio?.split(" ")[1]?.slice(0, 5) ||
                            "Chưa chọn"}
                        </span>
                      </div>
                    </div>
                    <div className="datdichvu-summary-info-item">
                      <i className="fas fa-sticky-note" />
                      <div>
                        <span className="datdichvu-info-label">Ghi chú</span>
                        <span className="datdichvu-info-value">
                          {chonDichVuInfo?.ghi_chu || "Không có"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="datdichvu-summary-pricing">
                    <div className="datdichvu-pricing-item">
                      <span>Giá dịch vụ</span>
                      <span id="summary-price">
                        {dichVu ? `${dichVu.gia.toLocaleString()} VNĐ` : "N/A"}
                      </span>
                    </div>

                    <div className="datdichvu-pricing-item">
                      <span>Phí dịch vụ</span>
                      <span>15000 VNĐ</span>
                    </div>

                    <div className="datdichvu-pricing-total">
                      <span>Tổng cộng</span>
                      <span id="summary-total">
  {dichVu ? `${(Number(dichVu.gia) + 15000).toLocaleString()} VNĐ` : "N/A"}
</span>

                    </div>
                  </div>
                </div>
              </div>
              <div className="datdichvu-provider-card">
                {dichVu && (
                  <div className="datdichvu-provider-info">
                    <img
                      src={
                        dichVu.avata
                          ? `http://localhost:5000/img/${dichVu.avata}`
                          : "https://placehold.co/50x50"
                      }
                      alt={dichVu.ten_nha_cung_cap}
                      className="datdichvu-provider-logo"
                    />
                    <div>
                      <h4>{dichVu.ten_nha_cung_cap || "Không rõ"}</h4>
                      <div className="datdichvu-provider-rating">
                        <div className="datdichvu-stars">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </div>
                        <span>{dichVu.luot_dung || 0} đánh giá</span>
                      </div>
                    </div>
                  </div>
                )}

                {dichVu && (
                  <div className="datdichvu-provider-contact">
                    <div className="datdichvu-contact-item">
                      <i className="fas fa-map-marker-alt" />
                      <span>{dichVu.dia_chi || "Chưa có địa chỉ"}</span>
                    </div>
                    <div className="datdichvu-contact-item">
                      <i className="fas fa-phone" />
                      <span>{dichVu.sdt || "Chưa có số điện thoại"}</span>
                    </div>
                  </div>
                )}

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
