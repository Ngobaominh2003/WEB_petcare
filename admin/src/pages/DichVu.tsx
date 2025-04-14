import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import DieuKhien from "../components/DieuKhien";
import DichVuUpdate from "./DichVuUpdate";
import DichVuAdd from "./DichVuAdd";
import axios from "axios"; // Import Axios

interface DichVuType {
  dich_vu_id: number;
  ten_dich_vu: string;
  mo_ta: string;
  logo?: string;
  gia: number;
  ngay_tao: Date;
  tai_khoan_id: number;
  luot_dung: number;
  trang_thai: number;
  xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
  thoi_gian_hoan_thanh: string;
}

const DichVu: React.FC = () => {
  const [danhSachDichVu, setDanhSachDichVu] = useState<DichVuType[]>([]);
  const [dichVuChon, setDichVuChon] = useState<DichVuType | null>(null);
  const navigate = useNavigate();

  const fetchDanhSachDichVu = () => {
    axios
      .get("http://localhost:5000/api/dich-vu")
      .then((response) => {
        console.log("Dữ liệu nhận từ API:", response.data);
        setDanhSachDichVu(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách dịch vụ:", error);
        alert("Lỗi khi lấy dữ liệu từ API");
      });
  };

  useEffect(() => {
    fetchDanhSachDichVu();
  }, []);

  const handleRowClick = (dichVu: DichVuType) => {
    setDichVuChon(dichVu);
  };

  const handleDelete = (dichVuId: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa dịch vụ này không?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/dich-vu/xoa/${dichVuId}`)
        .then((response) => {
          fetchDanhSachDichVu();
          alert("Dịch vụ đã được xóa thành công.");
        })
        .catch((error) => {
          alert("Lỗi khi xóa dịch vụ. Vui lòng thử lại.");
          console.error("Lỗi khi xóa dịch vụ:", error);
        });
    }
  };

  const getXetDuyetColor = (
    xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt"
  ) => {
    switch (xet_duyet) {
      case "chờ duyệt":
        return { color: "orange", text: "Chờ duyệt" };
      case "đã duyệt":
        return { color: "green", text: "Đã duyệt" };
      case "không duyệt":
        return { color: "red", text: "Không duyệt" };
      default:
        return { color: "gray", text: "Chưa xác định" };
    }
  };

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Dịch Vụ Chăm Sóc Thú Cưng</h2>
              <a href="#" className="btn">
                Xem Tất Cả
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tên dịch vụ</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Logo</th>
                  <th>Trạng thái</th>
                  <th>Thời gian hoàn thành</th>
                  <th>Lượt dùng</th>
                  <th>Ngày tạo</th>
                  <th>Xét duyệt</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {danhSachDichVu.length > 0 ? (
                  danhSachDichVu.map((dichVu) => (
                    <tr
                      key={dichVu.dich_vu_id}
                      onClick={() => handleRowClick(dichVu)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{dichVu.ten_dich_vu || "Không có tên"}</td>
                      <td>{dichVu.mo_ta || "Không có mô tả"}</td>
                      <td>{dichVu.gia} VND</td>
                      <td>
                        <img
                          src={`http://localhost:5000/img/${dichVu.logo}`}
                          alt={dichVu.ten_dich_vu}
                          width="50"
                        />
                      </td>
                      <td>{dichVu.trang_thai === 1 ? "Hoạt động" : "Ẩn"}</td>{" "}
                      {/* Đảm bảo hiển thị trạng thái */}
                      <td>{dichVu.thoi_gian_hoan_thanh }</td>
                      <td>{dichVu.luot_dung}</td> {/* Hiển thị lượt dùng */}
                      <td>{new Date(dichVu.ngay_tao).toLocaleString()}</td>{" "}
                      {/* Hiển thị ngày tạo */}
                      <td
                        style={{
                          color: getXetDuyetColor(dichVu.xet_duyet).color,
                        }}
                      >
                        {getXetDuyetColor(dichVu.xet_duyet).text}
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(dichVu.dich_vu_id);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>Không có dịch vụ nào để hiển thị</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="details-container">
          <DichVuUpdate dichVuChon={dichVuChon} />
          <DichVuAdd />
        </div>
      </div>
    </div>
  );
};

export default DichVu;
