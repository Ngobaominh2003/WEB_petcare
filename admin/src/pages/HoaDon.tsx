import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import DieuKhien from "../components/DieuKhien";
import axios from "axios";

interface BaoCaoType {
  bao_cao_id: number;
  danh_gia_id: number;
  tai_khoan_id: number;
  ho_ten: string;
  ly_do: string;
  thoi_gian: string;
  trang_thai: string;
  diem: number;
  binh_luan: string;
}

const BaoCao: React.FC = () => {
  const [baoCaoList, setBaoCaoList] = useState<BaoCaoType[]>([]);
  const [trangThaiLoc, setTrangThaiLoc] = useState("");

  const fetchBaoCao = async () => {
    try {
      const url = trangThaiLoc
        ? `http://localhost:5000/api/bao-cao-danh-gia?trang_thai=${trangThaiLoc}`
        : "http://localhost:5000/api/bao-cao-danh-gia";
      const response = await axios.get(url);
      setBaoCaoList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy báo cáo:", error);
    }
  };

  useEffect(() => {
    fetchBaoCao();
  }, [trangThaiLoc]);

  const handleXuLyVaXoa = async (baoCaoId: number) => {
    if (!window.confirm("Xử lý báo cáo và xoá đánh giá liên quan?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/bao-cao-danh-gia/${baoCaoId}/xoa-danh-gia`
      );
      alert("Đã xử lý và xoá đánh giá");
      fetchBaoCao();
    } catch (err) {
      console.error("Lỗi xử lý báo cáo:", err);
      alert("Xử lý thất bại");
    }
  };

  const handleBoQua = async (baoCaoId: number) => {
    if (!window.confirm("Bỏ qua báo cáo này?")) return;
    try {
      await axios.put(
        `http://localhost:5000/api/bao-cao-danh-gia/${baoCaoId}`,
        {
          trang_thai: "bỏ qua",
        }
      );
      fetchBaoCao();
    } catch (err) {
      console.error("Lỗi khi bỏ qua:", err);
      alert("Bỏ qua thất bại");
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
              <h2>Danh sách Báo Cáo Đánh Giá</h2>
              <select
                value={trangThaiLoc}
                onChange={(e) => setTrangThaiLoc(e.target.value)}
                style={{ padding: "8px" }}
              >
                <option value="">Loại báo cáo</option>
                <option value="">Báo cáo đánh giá dịch vụ</option>
                <option value="">Báo cáo bình luận bài viết</option>
                
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Người báo cáo</th>
                  <th>Lý do</th>
                  <th>Thời gian</th>
                  <th>Trạng thái</th>
                  <th>Đánh giá</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {baoCaoList.map((bc) => (
                  <tr key={bc.bao_cao_id}>
                    <td>{bc.ho_ten}</td>
                    <td>{bc.ly_do}</td>
                    <td>{new Date(bc.thoi_gian).toLocaleString()}</td>
                    <td>{bc.trang_thai}</td>
                    <td>
                      <strong>{bc.diem}★</strong> – “{bc.binh_luan}”
                    </td>
                    <td>
                      {bc.trang_thai === "chờ xử lý" ? (
                        <>
                          <button
                            onClick={() => handleXuLyVaXoa(bc.bao_cao_id)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#f44336",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              marginRight: "6px",
                            }}
                          >
                            Xóa đánh giá
                          </button>
                          
                        </>
                      ) : (
                        <i>Không khả dụng</i>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaoCao;
