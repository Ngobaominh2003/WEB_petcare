import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/styles.css";
import { getStatusColor, getStatusText } from "../../utils/statusUtils";

interface DatLich {
  dat_lich_id: number;
  ten_dich_vu: string;
  dia_chi_nha_cung_cap: string;
  ngay_gio: string;
  so_tien: number | null;
  ten_thu_cung: string;
  trang_thai: string;
}

const DatLich2: React.FC = () => {
  const [datLichList, setDatLichList] = useState<DatLich[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taiKhoanId = localStorage.getItem("tai_khoan_id"); // lấy từ localStorage
        const response = await axios.get(
          `http://localhost:5000/api/dat-lich/tai-khoan/${taiKhoanId}`
        );
        // chỉ lấy lịch có trạng thái 'hoàn thành'
        const completedBookings = response.data.filter(
          (item: DatLich) => item.trang_thai === "hoàn thành"
        );
        setDatLichList(completedBookings);
      } catch (err) {
        console.error("Lỗi khi lấy lịch đã hoàn thành:", err);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("vi-VN");
  };

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="tabs" id="DatLich2">
        <div className="tab-content active" id="completed">
          {datLichList.length === 0 ? (
            <p>Không có lịch hoàn thành nào.</p>
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
                      className={`badge ${getStatusColor(
                        booking.trang_thai
                      )}`}
                    >
                      {getStatusText(booking.trang_thai)}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="booking-details">
                    <div className="booking-detail">
                      <i className="fas fa-calendar-alt" />
                      <span>{formatDate(booking.ngay_gio)}</span>
                    </div>
                    <div className="booking-detail">
                      <i className="fas fa-clock" />
                      <span>{formatTime(booking.ngay_gio)}</span>
                    </div>
                    <div className="booking-detail">
                      <i className="fas fa-map-marker-alt" />
                      <span>{booking.dia_chi_nha_cung_cap}</span>
                    </div>
                    <div className="booking-detail">
                      <i className="fas fa-dollar-sign" />
                      <span>
                        {booking.so_tien
                          ? `${Number(booking.so_tien).toLocaleString()} VNĐ`
                          : "0 VNĐ"}
                      </span>
                    </div>
                    <div className="booking-detail">
                      <i className="fas fa-paw" />
                      <span>{booking.ten_thu_cung || "Không rõ"}</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-outline">Chi tiết</button>
                  <button className="btn btn-secondary">Đặt lại</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DatLich2;
