import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NhaCCMenu from "../../components/NhaCCMenu";
import { getStatusColor, getStatusText } from "../../utils/statusUtils";
import "../style/styles.css";

const DSLichDat: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [filter, setFilter] = useState<
    "all" | "pending" | "unpaid" | "completed"
  >("all");
  const [loading, setLoading] = useState(false);

  const taiKhoanId = localStorage.getItem("tai_khoan_id");

  useEffect(() => {
    if (taiKhoanId) {
      fetchAppointments();
    }
  }, [taiKhoanId]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/dat-lich/ds/nha-cung-cap/${taiKhoanId}`
      );
      setAppointments(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, trangThai: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/dat-lich/${id}/trang-thai`, {
        trang_thai: trangThai,
      });
      alert("Cập nhật trạng thái thành công!");
      fetchAppointments();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái lịch:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái!");
    }
  };

  const handleUpdatePayment = async (id: number) => {
    try {
      await axios.patch(`http://localhost:5000/api/hoa-don/${id}/trang-thai`, {
        trang_thai: "đã thanh toán",
      });
      alert("Cập nhật trạng thái thanh toán thành công!");
      fetchAppointments();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
      alert("Có lỗi xảy ra khi cập nhật thanh toán!");
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "pending") {
      return appointment.trang_thai?.toLowerCase() === "chờ xác nhận";
    }
    if (filter === "unpaid") {
      return (
        appointment.trang_thai_hoa_don?.toLowerCase() === "chưa thanh toán"
      );
    }
    if (filter === "completed") {
      return appointment.trang_thai?.toLowerCase() === "hoàn thành";
    }
    return true;
  });

  const formatDateTime = (dateTime: string) => {
    if (!dateTime) return "Không có";
    const date = new Date(dateTime);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="account-layout">
            <NhaCCMenu />
            <div className="account-content">
              <div className="booking-management container mt-4">
                <h2 className="section-title">Quản lý lịch hẹn</h2>
                <p className="section-description">
                  Quản lý các lịch hẹn dịch vụ chăm sóc thú cưng của bạn
                </p>

                {/* Nút lọc */}
                <div className="filter-buttons mb-4 d-flex gap-2">
                  <button
                    className={`btn ${
                      filter === "all" ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setFilter("all")}
                  >
                    Tất cả
                  </button>
                  <button
                    className={`btn ${
                      filter === "pending"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setFilter("pending")}
                  >
                    Chờ xác nhận
                  </button>
                  <button
                    className={`btn ${
                      filter === "unpaid"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setFilter("unpaid")}
                  >
                    Chưa thanh toán
                  </button>
                  <button
                    className={`btn ${
                      filter === "completed"
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setFilter("completed")}
                  >
                    Hoàn thành
                  </button>
                </div>

                {/* Danh sách lịch */}
                {loading ? (
                  <p>Đang tải dữ liệu...</p>
                ) : (
                  <div className="row">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <div
                          key={appointment.dat_lich_id}
                          className="col-lg-6 mb-4"
                        >
                          <div className="booking-card">
                            <div className="booking-card-header">
                              <h5 className="pet-service">
                                {appointment.ten_danh_muc || "Không có"} -{" "}
                                {appointment.ten_dich_vu || "Không có"}
                              </h5>
                              <div className="badges">
                                <span
                                  className={`badge ${getStatusColor(
                                    appointment.trang_thai
                                  )}`}
                                >
                                  {getStatusText(appointment.trang_thai)}
                                </span>
                                {appointment.trang_thai_hoa_don && (
                                  <span
                                    className={`badge ${getStatusColor(
                                      appointment.trang_thai_hoa_don
                                    )}`}
                                  >
                                    {getStatusText(
                                      appointment.trang_thai_hoa_don
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="booking-card-body">
                              <p>
                                <i className="fas fa-dog me-2"></i>Thú cưng:{" "}
                                <strong>
                                  {appointment.ten_thu_cung || "Không có"}
                                </strong>
                              </p>
                              <p>
                                <i className="fas fa-wrench me-2"></i>Dịch vụ:{" "}
                                <strong>
                                  {appointment.ten_dich_vu || "Không có"}
                                </strong>
                              </p>
                              <p>
                                <i className="fas fa-tags me-2"></i>Danh mục:{" "}
                                <strong>
                                  {appointment.ten_danh_muc || "Không có"}
                                </strong>
                              </p>
                              <p>
                                <i className="far fa-clock me-2"></i>Ngày giờ:{" "}
                                <strong>
                                  {formatDateTime(appointment.ngay_gio)}
                                </strong>
                              </p>
                              <p>
                                <i className="fas fa-user me-2"></i>Khách hàng:{" "}
                                <strong>
                                  {appointment.ho_ten || "Không có"} -{" "}
                                  {appointment.sdt || "Không có"}
                                </strong>
                              </p>
                              <p>
                                <i className="fas fa-envelope me-2"></i>Email:{" "}
                                <strong>
                                  {appointment.email_khach_hang || "Không có"}
                                </strong>
                              </p>
                              <p>
                                <i className="fas fa-money-bill-wave me-2"></i>
                                Số tiền:{" "}
                                <strong>
                                  {appointment.so_tien
                                    ? appointment.so_tien.toLocaleString(
                                        "vi-VN"
                                      ) + "₫"
                                    : "Không có"}
                                </strong>
                              </p>
                              <p>
                                <i className="fas fa-credit-card me-2"></i>
                                Phương thức:{" "}
                                <strong>
                                  {appointment.phuong_thuc || "Không có"}
                                </strong>
                              </p>
                              <p>
                                <i className="fas fa-sticky-note me-2"></i>Ghi
                                chú:{" "}
                                <strong>
                                  {appointment.ghi_chu || "Không có"}
                                </strong>
                              </p>
                            </div>
                            <div className="booking-card-actions d-flex flex-wrap gap-2">
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                  handleUpdateStatus(
                                    appointment.dat_lich_id,
                                    "đã xác nhận"
                                  )
                                }
                              >
                                Xác nhận
                              </button>

                              <button
                                className="btn btn-info btn-sm"
                                onClick={() =>
                                  handleUpdateStatus(
                                    appointment.dat_lich_id,
                                    "hoàn thành"
                                  )
                                }
                              >
                                Hoàn thành
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleUpdateStatus(
                                    appointment.dat_lich_id,
                                    "hủy"
                                  )
                                }
                              >
                                Hủy
                              </button>

                              {appointment.trang_thai_hoa_don ===
                                "chưa thanh toán" &&
                                appointment.so_tien && (
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                      handleUpdatePayment(
                                        appointment.hoa_don_id
                                      )
                                    }
                                  >
                                    Đã thanh toán
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>Không có lịch phù hợp.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DSLichDat;
