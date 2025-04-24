//src/pages/DatDichVu/ThanhToan.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const ThanhToan: React.FC<Props> = ({ onNext, onBack }) => {
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [dichVu, setDichVu] = useState<any | null>(null);
  const datLichInfo = JSON.parse(localStorage.getItem("datLichInfo") || "{}");
  const [chonDichVuInfo, setChonDichVuInfo] = useState<any | null>(null);
  const paymentMap: Record<string, string> = {
    cash: "tiền mặt",
    card: "chuyển khoản",
    momo: "momo",
    banking: "zalo_pay", // hoặc "chuyển khoản" nếu bạn muốn ánh xạ vậy
  };

  useEffect(() => {
    const info = localStorage.getItem("chonDichVuInfo");
    if (info) setChonDichVuInfo(JSON.parse(info));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const dv = localStorage.getItem("dichVuDaChon");
    if (dv) setDichVu(JSON.parse(dv));

    const info = localStorage.getItem("chonDichVuInfo");
    if (info) setChonDichVuInfo(JSON.parse(info));
  }, []);
  const handleFinish = async () => {
    try {
      // 1. Tạo lịch đặt
      const response1 = await axios.post("http://localhost:5000/api/dat-lich", {
        tai_khoan_id: chonDichVuInfo.tai_khoan_id,
        dich_vu_id: chonDichVuInfo.dich_vu_id,
        thu_cung_id: datLichInfo.thu_cung_id,
        ngay_gio: datLichInfo.ngay_gio,
        ghi_chu: datLichInfo.ghi_chu,
        trang_thai: "chờ xác nhận",
      });

      const datLichId = response1.data.insertId; // Lấy id lịch đặt vừa tạo

      // 3. Ghi nhận sử dụng dịch vụ
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      await axios.post("http://localhost:5000/api/su-dung-dich-vu", {
        dich_vu_id: chonDichVuInfo.dich_vu_id,
        ngay_su_dung: today,
      });
      // 2. Tạo hóa đơn gắn với dat_lich_id
      await axios.post("http://localhost:5000/api/hoa-don", {
        dat_lich_id: datLichId,
        tai_khoan_id: chonDichVuInfo.tai_khoan_id,
        so_tien: Number(chonDichVuInfo.so_tien || 0) + 15000,
        phuong_thuc: paymentMap[selectedPayment],
        trang_thai: "chưa thanh toán",
      });
      // 4. Chuyển sang bước xác nhận
      onNext();
    } catch (err) {
      console.error("Lỗi khi hoàn tất thanh toán:", err);
      alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
    }
  };

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
              <span className="datdichvu-item-name">
                {dichVu?.ten_dich_vu || "Dịch vụ"} (
                {chonDichVuInfo?.goi_dich_vu || "Gói tiêu chuẩn"})
              </span>
              <span className="datdichvu-item-price">
                {(
                  Number(chonDichVuInfo?.so_tien || 0) + 15000
                ).toLocaleString()}{" "}
                VNĐ
              </span>
            </div>

            <div className="datdichvu-summary-item">
              <span className="datdichvu-item-name">Phí dịch vụ</span>
              <span className="datdichvu-item-price">15.000 VNĐ</span>
            </div>

            <div className="datdichvu-summary-divider" />

            <div className="datdichvu-summary-item datdichvu-total">
              <span className="datdichvu-item-name">Tổng cộng</span>
              <span className="datdichvu-item-price">
                {(
                  Number(chonDichVuInfo?.so_tien || 0) + 15000
                ).toLocaleString()}{" "}
                VNĐ
              </span>
            </div>
          </div>

          <div className="datdichvu-payment-methods">
            <h3>Phương thức thanh toán</h3>
            <div className="datdichvu-payment-options">
              {[
                {
                  id: "cash",
                  icon: "money-bill-wave",
                  title: "Thanh toán khi sử dụng dịch vụ",
                  desc: "Thanh toán bằng tiền mặt sau khi dịch vụ hoàn thành",
                },
                {
                  id: "card",
                  icon: "credit-card",
                  title: "Thẻ tín dụng/Ghi nợ",
                  desc: "Thanh toán an toàn với Visa, Mastercard, JCB",
                },
                {
                  id: "momo",
                  icon: "wallet",
                  title: "Ví điện tử MoMo",
                  desc: "Thanh toán nhanh chóng qua ví MoMo",
                },
                {
                  id: "banking",
                  icon: "university",
                  title: "Chuyển khoản ngân hàng",
                  desc: "Chuyển khoản trực tiếp đến tài khoản của chúng tôi",
                },
              ].map((method) => (
                <div className="datdichvu-payment-option" key={method.id}>
                  <input
                    type="radio"
                    id={`payment-${method.id}`}
                    name="payment-method"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
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
          <button
            onClick={onBack}
            className="datdichvu-btn datdichvu-btn-outline"
          >
            Quay lại
          </button>
          <button
            onClick={handleFinish}
            className="datdichvu-btn datdichvu-btn-primary"
          >
            Hoàn tất thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
