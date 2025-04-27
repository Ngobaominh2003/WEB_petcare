import React, { useEffect, useState } from "react";
import axios from "axios";

const XacNhan: React.FC = () => {
  const [hoaDon, setHoaDon] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Lấy hoa_don_id vừa tạo xong từ localStorage
    const hoaDonId = localStorage.getItem("hoa_don_id");
    if (hoaDonId) {
      axios
        .get(`http://localhost:5000/api/hoa-don/${hoaDonId}`)
        .then((res) => {
          setHoaDon(res.data);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy hóa đơn:", err);
        });
    }
  }, []);

  if (!hoaDon) {
    return <div>Đang tải thông tin đặt lịch...</div>;
  }

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
              <span className="datdichvu-detail-value">PCC-{hoaDon.hoa_don_id}</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Dịch vụ:</span>
              <span className="datdichvu-detail-value">
                {hoaDon.ten_dich_vu} ({hoaDon.goi_dich_vu || "Gói tiêu chuẩn"})
              </span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Thú cưng:</span>
              <span className="datdichvu-detail-value">
                {hoaDon.ten_thu_cung || "Chưa có"}
              </span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Ngày và giờ:</span>
              <span className="datdichvu-detail-value">
                {new Date(hoaDon.ngay_gio).toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Nhà cung cấp:</span>
              <span className="datdichvu-detail-value">{hoaDon.ten_nha_cung_cap}</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Địa chỉ:</span>
              <span className="datdichvu-detail-value">{hoaDon.dia_chi}</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Tổng thanh toán:</span>
              <span className="datdichvu-detail-value">
                {Number(hoaDon.so_tien).toLocaleString()} VNĐ
              </span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Phương thức thanh toán:</span>
              <span className="datdichvu-detail-value">{hoaDon.phuong_thuc || "Không rõ"}</span>
            </div>
            <div className="datdichvu-booking-detail-item">
              <span className="datdichvu-detail-label">Trạng thái thanh toán:</span>
              <span className="datdichvu-detail-value">{hoaDon.trang_thai || "Không rõ"}</span>
            </div>
          </div>

          <div className="datdichvu-confirmation-message">
            <p>
              Chúng tôi đã gửi thông tin chi tiết về lịch đặt dịch vụ đến email của bạn.
              Bạn cũng có thể xem trong mục "Lịch đặt dịch vụ" trong tài khoản của mình.
            </p>
          </div>

          <div className="datdichvu-confirmation-actions">
            <a href="/lich-dat" className="datdichvu-btn datdichvu-btn-outline">
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
