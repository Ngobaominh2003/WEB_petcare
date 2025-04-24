import React, { useEffect } from "react";

const XacNhan: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="datdichvu-booking-form">
      <div className="datdichvu-booking-step active" id="step-4">
        <div className="datdichvu-confirmation-content">
          <div className="datdichvu-confirmation-icon">
            <i className="fas fa-check-circle" />
          </div>
          <h2>Đặt lịch thành công!</h2>
          <p>Cảm ơn bạn đã sử dụng dịch vụ của PetCare Connect</p>

          <div className="datdichvu-booking-details">
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Mã đặt lịch:</span>
              <span className="datdichvu-detail-value">PCC-2025051401</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Dịch vụ:</span>
              <span className="datdichvu-detail-value">
                Tắm và cắt tỉa lông cho chó (Gói tiêu chuẩn)
              </span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Thú cưng:</span>
              <span className="datdichvu-detail-value">Chó Bông (Poodle)</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Ngày và giờ:</span>
              <span className="datdichvu-detail-value">15/05/2025, 14:00</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Nhà cung cấp:</span>
              <span className="datdichvu-detail-value">Happy Pets</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Địa chỉ:</span>
              <span className="datdichvu-detail-value">
                123 Đường ABC, Quận 1, TP. HCM
              </span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Tổng thanh toán:</span>
              <span className="datdichvu-detail-value">365.000 VNĐ</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">
                Phương thức thanh toán:
              </span>
              <span className="datdichvu-detail-value">
                Thanh toán khi sử dụng dịch vụ
              </span>
            </div>
          </div>

          <div className="datdichvu-confirmation-message">
            <p>
              Chúng tôi đã gửi thông tin chi tiết về lịch đặt dịch vụ đến email
              của bạn. Bạn cũng có thể xem lịch đặt dịch vụ trong mục "Lịch đặt
              dịch vụ" trong tài khoản của mình.
            </p>
          </div>

          <div className="datdichvu-confirmation-actions">
            <a
              href="user-account-bookings.html"
              className="datdichvu-btn datdichvu-btn-outline"
            >
              Xem lịch đặt dịch vụ
            </a>
            <a href="/" className="datdichvu-btn datdichvu-btn-primary">
              Về trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XacNhan;
