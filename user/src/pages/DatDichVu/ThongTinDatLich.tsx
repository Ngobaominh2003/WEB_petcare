import React, { useEffect } from "react";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const ThongTinDatLich: React.FC<Props> = ({ onNext, onBack }) => {
     useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
  return (
    <div className="datdichvu-booking-form">
      <div className="datdichvu-booking-step active" id="step-2">
        <div className="datdichvu-step-header">
          <h2>Thông tin đặt lịch</h2>
          <p>Chọn thú cưng, ngày và giờ cho dịch vụ</p>
        </div>

        <div className="datdichvu-booking-info">
          {/* Chọn thú cưng */}
          <div className="datdichvu-form-section">
            <h3>Chọn thú cưng</h3>
            <div className="datdichvu-pet-selection">
              <div className="datdichvu-pet-card selected">
                <div className="datdichvu-pet-image">
                  <img
                    src="https://placehold.co/100x100/4CAF50/ffffff?text=Chó+Bông"
                    alt="Chó Bông"
                  />
                </div>
                <div className="datdichvu-pet-info">
                  <h4>Chó Bông</h4>
                  <p>Poodle - 3 tuổi</p>
                </div>
                <div className="datdichvu-pet-select">
                  <input
                    type="radio"
                    name="pet"
                    id="pet-1"
                    value="pet-1"
                    defaultChecked
                  />
                  <label htmlFor="pet-1" />
                </div>
              </div>

              <div className="datdichvu-pet-card">
                <div className="datdichvu-pet-image">
                  <img
                    src="https://placehold.co/100x100/4CAF50/ffffff?text=Mèo+Miu"
                    alt="Mèo Miu"
                  />
                </div>
                <div className="datdichvu-pet-info">
                  <h4>Mèo Miu</h4>
                  <p>Mèo Anh lông ngắn - 2 tuổi</p>
                </div>
                <div className="datdichvu-pet-select">
                  <input
                    type="radio"
                    name="pet"
                    id="pet-2"
                    value="pet-2"
                  />
                  <label htmlFor="pet-2" />
                </div>
              </div>

              <div className="datdichvu-pet-card datdichvu-add-pet">
                <div className="datdichvu-add-pet-icon">
                  <i className="fas fa-plus-circle" />
                </div>
                <p>Thêm thú cưng mới</p>
              </div>
            </div>
          </div>

          {/* Ngày và giờ */}
          <div className="datdichvu-form-section">
            <h3>Chọn ngày và giờ</h3>
            <div className="datdichvu-date-time-selection">
              <div className="datdichvu-form-group">
                <label htmlFor="booking-date">Ngày đặt lịch</label>
                <input
                  type="date"
                  id="booking-date"
                  name="booking-date"
                  defaultValue="2025-05-15"
                  required
                />
              </div>
              <div className="datdichvu-form-group">
                <label>Thời gian có sẵn</label>
                <div className="datdichvu-time-slots">
                  {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((time, idx) => (
                    <div key={time} className="datdichvu-time-slot">
                      <input
                        type="radio"
                        name="time-slot"
                        id={`time-${idx}`}
                        defaultValue={time}
                        defaultChecked={time === "14:00"}
                      />
                      <label htmlFor={`time-${idx}`}>{time}</label>
                    </div>
                  ))}
                  <div className="datdichvu-time-slot disabled">
                    <input type="radio" disabled id="time-8" />
                    <label htmlFor="time-8">17:00</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="datdichvu-form-section">
            <h3>Thông tin liên hệ</h3>
            <div className="datdichvu-contact-info">
              <div className="datdichvu-form-row">
                <div className="datdichvu-form-group">
                  <label htmlFor="contact-name">Họ và tên</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="contact-name"
                    defaultValue="Nguyễn Văn A"
                    required
                  />
                </div>
                <div className="datdichvu-form-group">
                  <label htmlFor="contact-phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="contact-phone"
                    defaultValue="0912345678"
                    required
                  />
                </div>
              </div>
              <div className="datdichvu-form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="contact-email"
                  defaultValue="nguyenvana@example.com"
                  required
                />
              </div>
              <div className="datdichvu-form-group">
                <label htmlFor="contact-address">Địa chỉ</label>
                <input
                  type="text"
                  id="contact-address"
                  name="contact-address"
                  defaultValue="123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="datdichvu-step-actions">
          <button onClick={onBack} className="datdichvu-btn datdichvu-btn-outline">
            Quay lại
          </button>
          <button onClick={onNext} className="datdichvu-btn datdichvu-btn-primary">
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThongTinDatLich;
