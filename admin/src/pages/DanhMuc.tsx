import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import DieuKhien from "../components/DieuKhien";
import DanhMucUpdate from "./DanhMucUpdate";
import DanhMucAdd from "./DanhMucAdd";
import axios from "axios"; // Import Axios

interface DanhMucType {
  danh_muc_id: number;
  ten_danh_muc: string;
  mo_ta: string;
}

const DanhMuc: React.FC = () => {
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState<DanhMucType[]>([]);
  const [danhMucChon, setDanhMucChon] = useState<DanhMucType | null>(null);
  const navigate = useNavigate();

  const fetchDanhSachDanhMuc = () => {
    axios
      .get("http://localhost:5000/api/danh-muc")
      .then((response) => {
        console.log("Dữ liệu nhận từ API:", response.data);
        setDanhSachDanhMuc(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
        alert("Lỗi khi lấy dữ liệu từ API");
      });
  };

  useEffect(() => {
    fetchDanhSachDanhMuc();
  }, []);

  const handleRowClick = (danhMuc: DanhMucType) => {
    setDanhMucChon(danhMuc);
  };

  const handleDelete = (danhMucId: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa danh mục này không?"
    );

    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/danh-muc/xoa/${danhMucId}`)
        .then((response) => {
          fetchDanhSachDanhMuc();
          alert("Danh mục đã được xóa thành công.");
        })
        .catch((error) => {
          alert("Lỗi khi xóa danh mục. Vui lòng thử lại.");
          console.error("Lỗi khi xóa danh mục:", error);
        });
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
              <h2>Danh Mục Dịch Vụ</h2>
              <a href="#" className="btn">
                Xem Tất Cả
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {danhSachDanhMuc.length > 0 ? (
                  danhSachDanhMuc.map((danhMuc) => (
                    <tr
                      key={danhMuc.danh_muc_id}
                      onClick={() => handleRowClick(danhMuc)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{danhMuc.ten_danh_muc || "Không có tên"}</td>
                      <td>{danhMuc.mo_ta || "Không có mô tả"}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(danhMuc.danh_muc_id);
                          }}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Không có danh mục nào để hiển thị</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="details-container">
          <DanhMucUpdate danhMucChon={danhMucChon} />
          <DanhMucAdd />
        </div>
      </div>
    </div>
  );
};

export default DanhMuc;
