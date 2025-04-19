import React from "react";
import "../TaiKhoan/style/datdichvu.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DatDichVu: React.FC = () => {
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

          <div className="datdichvu-booking-progress">
            <div className="datdichvu-progress-step active">
              <div className="datdichvu-step-number">1</div>
              <div className="datdichvu-step-text">Chọn dịch vụ</div>
            </div>
            <div className="datdichvu-progress-line" />
            <div className="datdichvu-progress-step">
              <div className="datdichvu-step-number">2</div>
              <div className="datdichvu-step-text">Thông tin đặt lịch</div>
            </div>
            <div className="datdichvu-progress-line" />
            <div className="datdichvu-progress-step">
              <div className="datdichvu-step-number">3</div>
              <div className="datdichvu-step-text">Thanh toán</div>
            </div>
            <div className="datdichvu-progress-line" />
            <div className="datdichvu-progress-step">
              <div className="datdichvu-step-number">4</div>
              <div className="datdichvu-step-text">Xác nhận</div>
            </div>
          </div>
          <div className="datdichvu-booking-container">
            {/* Booking Form */}
            <div className="datdichvu-booking-form">
              {/* Step 1: Service Selection */}
              <div className="datdichvu-booking-step active" id="step-1">
                <div className="datdichvu-step-header">
                  <h2>Chọn dịch vụ</h2>
                  <p>Chọn dịch vụ bạn muốn đặt lịch</p>
                </div>
                <div className="datdichvu-content-row">
                <div className="datdichvu-service-selection">
                  <div className="datdichvu-service-card selected">
                    <div className="datdichvu-service-image">
                      <img
                        src="https://placehold.co/400x300/4CAF50/ffffff?text=Tắm+và+cắt+tỉa+lông"
                        alt="Tắm và cắt tỉa lông cho chó"
                      />
                    </div>
                    <div className="datdichvu-service-details">
                      <h3>Tắm và cắt tỉa lông cho chó</h3>
                      <div className="datdichvu-service-provider">
                        <img
                          src="https://placehold.co/50x50/4CAF50/ffffff?text=HP"
                          alt="Happy Pets"
                          className="datdichvu-provider-avatar"
                        />
                        <span>Happy Pets</span>
                      </div>
                      <div className="datdichvu-service-rating">
                        <div className="datdichvu-stars">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </div>
                        <span>4.5 (120 đánh giá)</span>
                      </div>
                      <div className="datdichvu-service-price">
                        <span className="datdichvu-price">
                          250.000 - 500.000 VNĐ
                        </span>
                      </div>
                    </div>
                    <div className="datdichvu-service-select">
                      <input
                        type="radio"
                        name="service"
                        id="service-1"
                        value="service-1"
                        defaultChecked
                      />
                      <label htmlFor="service-1">Đã chọn</label>
                    </div>
                  </div>
                  <div className="datdichvu-service-options">
                    <div className="datdichvu-form-group">
                      <label htmlFor="service-package">Gói dịch vụ</label>
                      <select
                        id="service-package"
                        name="service-package"
                        defaultValue="standard"
                      >
                        <option value="basic">Gói cơ bản - 250.000 VNĐ</option>
                        <option value="standard">
                          Gói tiêu chuẩn - 350.000 VNĐ
                        </option>
                        <option value="premium">
                          Gói cao cấp - 500.000 VNĐ
                        </option>
                      </select>
                    </div>
                    <div className="datdichvu-package-details">
                      <h4>Chi tiết gói dịch vụ</h4>
                      <ul>
                        <li>
                          <i className="fas fa-check" /> Tắm sạch với sản phẩm
                          chuyên dụng
                        </li>
                        <li>
                          <i className="fas fa-check" /> Sấy khô và chải lông
                        </li>
                        <li>
                          <i className="fas fa-check" /> Cắt tỉa lông theo yêu
                          cầu
                        </li>
                        <li>
                          <i className="fas fa-check" /> Cắt móng và vệ sinh tai
                        </li>
                        <li>
                          <i className="fas fa-check" /> Xịt thơm và thắt
                          nơ/khăn quàng (tùy chọn)
                        </li>
                      </ul>
                    </div>
                    <div className="datdichvu-form-group">
                      <label htmlFor="service-note">Ghi chú thêm</label>
                      <textarea
                        id="service-note"
                        name="service-note"
                        rows={3}
                        placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú cho nhà cung cấp dịch vụ"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
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
                            <span className="datdichvu-info-label">
                              Thú cưng
                            </span>
                            <span
                              className="datdichvu-info-value"
                              id="summary-pet"
                            >
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
                <div className="datdichvu-step-actions">
                  <a
                    href="services.html"
                    className="datdichvu-btn datdichvu-btn-outline"
                  >
                    Quay lại
                  </a>
                  <a
                    href="#step-2"
                    className="datdichvu-btn datdichvu-btn-primary"
                  >
                    Tiếp tục
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Step 2: Booking Information */}
          <div className="datdichvu-booking-step" id="step-2">
            <div className="datdichvu-step-header">
              <h2>Thông tin đặt lịch</h2>
              <p>Chọn thú cưng, ngày và giờ cho dịch vụ</p>
            </div>
            <div className="datdichvu-booking-info">
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
                        defaultValue="pet-2"
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
                      <div className="datdichvu-time-slot">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-1"
                          defaultValue="09:00"
                        />
                        <label htmlFor="time-1">09:00</label>
                      </div>
                      <div className="datdichvu-time-slot">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-2"
                          defaultValue="10:00"
                        />
                        <label htmlFor="time-2">10:00</label>
                      </div>
                      <div className="datdichvu-time-slot">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-3"
                          defaultValue="11:00"
                        />
                        <label htmlFor="time-3">11:00</label>
                      </div>
                      <div className="datdichvu-time-slot">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-4"
                          defaultValue="13:00"
                        />
                        <label htmlFor="time-4">13:00</label>
                      </div>
                      <div className="datdichvu-time-slot">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-5"
                          value="14:00"
                          defaultChecked
                        />
                        <label htmlFor="time-5">14:00</label>
                      </div>
                      <div className="datdichvu-time-slot">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-6"
                          defaultValue="15:00"
                        />
                        <label htmlFor="time-6">15:00</label>
                      </div>
                      <div className="datdichvu-time-slot">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-7"
                          defaultValue="16:00"
                        />
                        <label htmlFor="time-7">16:00</label>
                      </div>
                      <div className="datdichvu-time-slot disabled">
                        <input
                          type="radio"
                          name="time-slot"
                          id="time-8"
                          value="17:00"
                          disabled
                        />
                        <label htmlFor="time-8">17:00</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <a href="#step-1" className="datdichvu-btn datdichvu-btn-outline">
                Quay lại
              </a>
              <a href="#step-3" className="datdichvu-btn datdichvu-btn-primary">
                Tiếp tục
              </a>
            </div>
          </div>
          {/* Step 3: Payment */}
          <div className="datdichvu-booking-step" id="step-3">
            <div className="datdichvu-step-header">
              <h2>Thanh toán</h2>
              <p>Chọn phương thức thanh toán và hoàn tất đặt lịch</p>
            </div>
            <div className="datdichvu-payment-section">
              <div className="datdichvu-order-summary">
                <h3>Tóm tắt đơn hàng</h3>
                <div className="datdichvu-summary-item">
                  <span className="datdichvu-item-name">
                    Tắm và cắt tỉa lông cho chó (Gói tiêu chuẩn)
                  </span>
                  <span className="datdichvu-item-price">350.000 VNĐ</span>
                </div>
                <div className="datdichvu-summary-item">
                  <span className="datdichvu-item-name">Phí dịch vụ</span>
                  <span className="datdichvu-item-price">15.000 VNĐ</span>
                </div>
                <div className="datdichvu-summary-divider" />
                <div className="datdichvu-summary-item datdichvu-total">
                  <span className="datdichvu-item-name">Tổng cộng</span>
                  <span className="datdichvu-item-price">365.000 VNĐ</span>
                </div>
              </div>
              <div className="datdichvu-payment-methods">
                <h3>Phương thức thanh toán</h3>
                <div className="datdichvu-payment-options">
                  <div className="datdichvu-payment-option">
                    <input
                      type="radio"
                      name="payment-method"
                      id="payment-cash"
                      value="cash"
                      defaultChecked
                    />
                    <label htmlFor="payment-cash">
                      <div className="datdichvu-payment-icon">
                        <i className="fas fa-money-bill-wave" />
                      </div>
                      <div className="datdichvu-payment-info">
                        <h4>Thanh toán khi sử dụng dịch vụ</h4>
                        <p>
                          Thanh toán bằng tiền mặt sau khi dịch vụ hoàn thành
                        </p>
                      </div>
                    </label>
                  </div>
                  <div className="datdichvu-payment-option">
                    <input
                      type="radio"
                      name="payment-method"
                      id="payment-card"
                      defaultValue="card"
                    />
                    <label htmlFor="payment-card">
                      <div className="datdichvu-payment-icon">
                        <i className="fas fa-credit-card" />
                      </div>
                      <div className="datdichvu-payment-info">
                        <h4>Thẻ tín dụng/Ghi nợ</h4>
                        <p>Thanh toán an toàn với Visa, Mastercard, JCB</p>
                      </div>
                    </label>
                  </div>
                  <div className="datdichvu-payment-option">
                    <input
                      type="radio"
                      name="payment-method"
                      id="payment-momo"
                      defaultValue="momo"
                    />
                    <label htmlFor="payment-momo">
                      <div className="datdichvu-payment-icon">
                        <i className="fas fa-wallet" />
                      </div>
                      <div className="datdichvu-payment-info">
                        <h4>Ví điện tử MoMo</h4>
                        <p>Thanh toán nhanh chóng qua ví MoMo</p>
                      </div>
                    </label>
                  </div>
                  <div className="datdichvu-payment-option">
                    <input
                      type="radio"
                      name="payment-method"
                      id="payment-banking"
                      defaultValue="banking"
                    />
                    <label htmlFor="payment-banking">
                      <div className="datdichvu-payment-icon">
                        <i className="fas fa-university" />
                      </div>
                      <div className="datdichvu-payment-info">
                        <h4>Chuyển khoản ngân hàng</h4>
                        <p>
                          Chuyển khoản trực tiếp đến tài khoản của chúng tôi
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                <div
                  className="datdichvu-card-payment-form"
                  id="card-payment-form"
                  style={{ display: "none" }}
                >
                  <div className="datdichvu-form-row">
                    <div className="datdichvu-form-group">
                      <label htmlFor="card-name">Tên chủ thẻ</label>
                      <input
                        type="text"
                        id="card-name"
                        name="card-name"
                        placeholder="Nhập tên chủ thẻ"
                      />
                    </div>
                  </div>
                  <div className="datdichvu-form-group">
                    <label htmlFor="card-number">Số thẻ</label>
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                  </div>
                  <div className="datdichvu-form-row">
                    <div className="datdichvu-form-group">
                      <label htmlFor="card-expiry">Ngày hết hạn</label>
                      <input
                        type="text"
                        id="card-expiry"
                        name="card-expiry"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="datdichvu-form-group">
                      <label htmlFor="card-cvv">CVV</label>
                      <input
                        type="text"
                        id="card-cvv"
                        name="card-cvv"
                        placeholder="XXX"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="datdichvu-booking-policy">
                <div className="datdichvu-form-group">
                  <div className="datdichvu-checkbox-group">
                    <input
                      type="checkbox"
                      id="terms-agree"
                      name="terms-agree"
                      required
                    />
                    <label htmlFor="terms-agree">
                      Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
                      <a href="#">Chính sách đặt lịch</a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="datdichvu-step-actions">
              <a href="#step-2" className="datdichvu-btn datdichvu-btn-outline">
                Quay lại
              </a>
              <a href="#step-4" className="datdichvu-btn datdichvu-btn-primary">
                Hoàn tất thanh toán
              </a>
            </div>
          </div>
          {/* Step 4: Confirmation */}
          <div className="datdichvu-booking-step" id="step-4">
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
                  <span className="datdichvu-detail-value">
                    Chó Bông (Poodle)
                  </span>
                </div>
                <div className="datdichvu-booking-detail-item">
                  <span className="datdichvu-detail-label">Ngày và giờ:</span>
                  <span className="datdichvu-detail-value">
                    15/05/2025, 14:00
                  </span>
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
                  <span className="datdichvu-detail-label">
                    Tổng thanh toán:
                  </span>
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
                  Chúng tôi đã gửi thông tin chi tiết về lịch đặt dịch vụ đến
                  email của bạn. Bạn cũng có thể xem lịch đặt dịch vụ trong mục
                  "Lịch đặt dịch vụ" trong tài khoản của mình.
                </p>
              </div>
              <div className="datdichvu-confirmation-actions">
                <a
                  href="user-account-bookings.html"
                  className="datdichvu-btn datdichvu-btn-outline"
                >
                  Xem lịch đặt dịch vụ
                </a>
                <a
                  href="index.html"
                  className="datdichvu-btn datdichvu-btn-primary"
                >
                  Về trang chủ
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Booking Summary */}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DatDichVu;
