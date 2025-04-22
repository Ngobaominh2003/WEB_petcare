//src/pages/DatDichVu/ThanhToan.tsx
import React, { useEffect } from "react";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const ThanhToan: React.FC<Props> = ({ onNext, onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="datdichvu-booking-form">
      <div className="datdichvu-booking-step active" id="step-3">
        <div className="datdichvu-step-header">
          <h2>Thanh toán</h2>
          <p>Chọn phương thức thanh toán và hoàn tất đặt lịch</p>
        </div>

        <div className="datdichvu-payment-section">
          <div className="datdichvu-order-summary">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="datdichvu-summary-item">
              <span className="datdichvu-item-name">Tắm và cắt tỉa lông cho chó (Gói tiêu chuẩn)</span>
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
              {[
                { id: "cash", icon: "money-bill-wave", title: "Thanh toán khi sử dụng dịch vụ", desc: "Thanh toán bằng tiền mặt sau khi dịch vụ hoàn thành" },
                { id: "card", icon: "credit-card", title: "Thẻ tín dụng/Ghi nợ", desc: "Thanh toán an toàn với Visa, Mastercard, JCB" },
                { id: "momo", icon: "wallet", title: "Ví điện tử MoMo", desc: "Thanh toán nhanh chóng qua ví MoMo" },
                { id: "banking", icon: "university", title: "Chuyển khoản ngân hàng", desc: "Chuyển khoản trực tiếp đến tài khoản của chúng tôi" },
              ].map((method) => (
                <div className="datdichvu-payment-option" key={method.id}>
                  <input
                    type="radio"
                    name="payment-method"
                    id={`payment-${method.id}`}
                    value={method.id}
                    defaultChecked={method.id === "cash"}
                  />
                  <label htmlFor={`payment-${method.id}`}>
                    <div className="datdichvu-payment-icon">
                      <i className={`fas fa-${method.icon}`} />
                    </div>
                    <div className="datdichvu-payment-info">
                      <h4>{method.title}</h4>
                      <p>{method.desc}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="datdichvu-booking-policy">
            <div className="datdichvu-form-group">
              <div className="datdichvu-checkbox-group">
                <input type="checkbox" id="terms-agree" name="terms-agree" required />
                <label htmlFor="terms-agree">
                  Tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách đặt lịch</a>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="datdichvu-step-actions">
          <button onClick={onBack} className="datdichvu-btn datdichvu-btn-outline">
            Quay lại
          </button>
          <button onClick={onNext} className="datdichvu-btn datdichvu-btn-primary">
            Hoàn tất thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
