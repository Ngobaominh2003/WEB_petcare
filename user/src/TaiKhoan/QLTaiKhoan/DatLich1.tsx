import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/styles.css";
import { showSuccess, showError, showWarn } from "../../utils/toast";
import { getStatusColor, getStatusText } from "../../utils/statusUtils";

const DatLich1: React.FC = () => {
  const [datLichList, setDatLichList] = useState<any[]>([]);

  useEffect(() => {
    const taiKhoanId = localStorage.getItem("tai_khoan_id");
    if (taiKhoanId) {
      axios
        .get(`http://localhost:5000/api/dat-lich/tai-khoan/${taiKhoanId}`)
        .then((res) => {
          const filtered = res.data
            .filter(
              (item: any) =>
                item.trang_thai === "chờ xác nhận" ||
                item.trang_thai === "đã xác nhận" ||
                item.trang_thai === "hủy"
            )
            .sort(
              (a: any, b: any) =>
                new Date(b.thoi_gian_tao).getTime() - new Date(a.thoi_gian_tao).getTime()
            );

          setDatLichList(filtered);
        })
        .catch((err) => console.error("Lỗi khi tải lịch hẹn:", err));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleCancel = async (datLichId: number, trangThai: string) => {
    if (trangThai === "đã xác nhận") {
      showWarn("❌ Không thể hủy lịch đã xác nhận!");
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn hủy lịch này không?")) {
      try {
        await axios.delete(`http://localhost:5000/api/dat-lich/${datLichId}`);
        showSuccess("🎉 Hủy lịch thành công!");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.error("Lỗi khi hủy lịch:", error);
        showError("❌ Hủy lịch thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div>
      <div className="tabs" id="DatLich1">
        <div className="tab-content active" id="upcoming">
          {datLichList.length === 0 ? (
            <p>Không có lịch hẹn nào.</p>
          ) : (
            datLichList.map((booking) => (
              <div className="card booking-card" key={booking.dat_lich_id}>
                <div className="card-header">
                  <div className="booking-header">
                    <div>
                      <h2>{booking.ten_dich_vu || "Dịch vụ"}</h2>
                      <p>{booking.dia_chi_nha_cung_cap || "Chưa có địa chỉ"}</p>
                    </div>
                    <div
                      className={`booking-status ${getStatusColor(
                        booking.trang_thai
                      )}`}
                    >
                      {getStatusText(booking.trang_thai)}
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="booking-details">
                    {/* Ngày riêng */}
                    <div className="booking-detail">
                      <i className="fas fa-calendar-alt" />
                      <span>{formatDate(booking.ngay_gio)}</span>
                    </div>

                    {/* Giờ riêng */}
                    <div className="booking-detail">
                      <i className="fas fa-clock" />
                      <span>{formatTime(booking.ngay_gio)}</span>
                    </div>

                    {/* Địa chỉ */}
                    <div className="booking-detail">
                      <i className="fas fa-map-marker-alt" />
                      <span>{booking.dia_chi_nha_cung_cap}</span>
                    </div>

                    {/* Số tiền */}
                    <div className="booking-detail">
                      <i className="fas fa-dollar-sign" />
                      <span>
                        {booking.so_tien
                          ? `${Number(booking.so_tien).toLocaleString()} VNĐ`
                          : "0 VNĐ"}
                      </span>
                    </div>

                    {/* Thú cưng */}
                    <div className="booking-detail">
                      <i className="fas fa-paw" />
                      <span>{booking.ten_thu_cung || "Không rõ"}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button className="btn btn-outline">Chi tiết</button>
                  {booking.trang_thai === "chờ xác nhận" && (
                    <button
                      className="btn btn-outline btn-sm btn-danger"
                      onClick={() =>
                        handleCancel(booking.dat_lich_id, booking.trang_thai)
                      }
                    >
                      <i className="fas fa-trash" /> Hủy Lịch
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const getStatusClass = (status: string) => {
  if (status === "chờ xác nhận") return "pending";
  if (status === "đã xác nhận") return "confirmed";
  if (status === "hủy") return "cancelled";
  return "";
};

export default DatLich1;
