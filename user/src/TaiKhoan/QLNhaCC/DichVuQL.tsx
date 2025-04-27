import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NhaCCMenu from "../../components/NhaCCMenu";
import "../style/styles.css";

const QLDichVu: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [dichVuList, setDichVuList] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const taiKhoanId = localStorage.getItem("tai_khoan_id");
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/DichVuAdd");
  };

  const handleEdit = (dichVu: any) => {
    navigate(`/DichVuUpdate/${dichVu.dich_vu_id}`, { state: dichVu });
  };

  // Lấy danh sách dịch vụ
  useEffect(() => {
    if (taiKhoanId) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/api/dich-vu/tai-khoan/${taiKhoanId}`)
        .then((response) => {
          setDichVuList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy danh sách dịch vụ:", error);
          setError("Lỗi khi lấy danh sách dịch vụ");
          setIsLoading(false);
        });
    } else {
      setError("Tai Khoan ID không tồn tại.");
    }
  }, [taiKhoanId]);

  // Hàm để xác định lớp CSS cho trạng thái xét duyệt
  const getXetDuyetClass = (xet_duyet: string) => {
    switch (xet_duyet) {
      case "chờ duyệt":
        return "status-waiting";
      case "đã duyệt":
        return "status-approved";
      case "không duyệt":
        return "status-rejected";
      default:
        return "";
    }
  };

  // Hàm để xác định lớp CSS cho trạng thái hoạt động
  const getTrangThaiClass = (trang_thai: number) => {
    return trang_thai === 1 ? "status-active" : "status-inactive";
  };

  // Xử lý xóa dịch vụ
  const handleDelete = (dichVuId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      axios
        .delete(`http://localhost:5000/api/dich-vu/xoa/${dichVuId}`)
        .then(() => {
          // Sau khi xóa thành công, loại bỏ dịch vụ khỏi danh sách
          setDichVuList((prevList) =>
            prevList.filter((dichVu) => dichVu.dich_vu_id !== dichVuId)
          );
          alert("Dịch vụ đã được xóa thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi xóa dịch vụ:", error);
          setError("Lỗi khi xóa dịch vụ");
        });
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="account-layout">
            {/* Sidebar */}
            <NhaCCMenu />
            {/* Content Area */}
            <div className="account-content">
              <div className="page-header-with-actions">
                <div>
                  <h1>Quản lý dịch vụ</h1>
                  <p>Quản lý các dịch vụ chăm sóc thú cưng của bạn</p>
                </div>
                <button className="btn btn-primary" onClick={handleAdd}>
                  <i className="fas fa-plus-circle" />
                  Thêm dịch vụ mới
                </button>
              </div>

              {/* Nếu đang tải hoặc có lỗi */}
              {isLoading ? (
                <p>Đang tải danh sách dịch vụ...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : (
                <div className="services-grid">
                  {/* Lặp qua danh sách dịch vụ và hiển thị */}
                  {dichVuList.map((dichVu) => (
                    <div className="service-card" key={dichVu.dich_vu_id}>
                      <div className="service-card-header">
                        <div>
                          <h2>{dichVu.ten_dich_vu}</h2>
                          <p>{dichVu.mo_ta}</p>
                        </div>
                        {/* Hiển thị trạng thái xét duyệt với màu sắc */}

                        {/* Hiển thị trạng thái hoạt động với màu sắc */}
                        <div
                          className={`service-status ${getTrangThaiClass(
                            dichVu.trang_thai
                          )}`}
                        >
                          {dichVu.trang_thai === 1 ? "Hoạt động" : "Ẩn"}
                        </div>
                      </div>
                      <div className="service-card-body">
                        <div className="service-info">
                          <img
                            src={`http://localhost:5000/img/${dichVu.logo}`}
                            alt={dichVu.ten_dich_vu}
                            className="service-image"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="service-details">
                            <p>{dichVu.mo_ta}</p>
                            <div className="service-meta">
                              <div className="service-meta-item">
                                <i className="fas fa-dollar-sign" />
                                <span>{dichVu.gia} VNĐ</span>
                              </div>
                              <div className="service-meta-item">
                                <i className="fas fa-clock" />
                                <span>{dichVu.thoi_gian_hoan_thanh}</span>
                              </div>
                            </div>
                            <div className="service-meta-item">
                              <i className="fas fa-eye" />
                              <span>{dichVu.luot_dung} Lượt dùng</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="service-card-footer">
                        <div className="service-actions">
                          <button className="btn btn-outline btn-sm">
                            <i className="fas fa-eye" />
                            Xem
                          </button>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => handleEdit(dichVu)}
                          >
                            <i className="fas fa-edit" />
                            Chỉnh sửa
                          </button>
                        </div>
                        {/* Nút Xóa */}
                        <button
                          className="btn btn-outline btn-sm btn-danger"
                          onClick={() => handleDelete(dichVu.dich_vu_id)}
                        >
                          <i className="fas fa-trash" />
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QLDichVu;
