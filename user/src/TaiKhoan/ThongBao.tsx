import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NhaCCMenu from "../components/NhaCCMenu";
import NguoiDungMenu from "../components/NguoiDungMenu";
import axios from "axios";
import "./style/styles.css";

interface ThongBao {
  thong_bao_id: number;
  tieu_de: string | null;
  noi_dung: string;
  loai: "he_thong" | "dat_lich" | "tin_nhan";
  trang_thai: "chưa đọc" | "đã đọc";
  thoi_gian: string;
}

const ThongBao: React.FC = () => {
  const [thongBaoList, setThongBaoList] = useState<ThongBao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const vaiTro = searchParams.get("vai_tro"); // 'nha_cc' | 'nguoi_dung'

  const tai_khoan_id = localStorage.getItem("tai_khoan_id");

  useEffect(() => {
    if (!tai_khoan_id || !vaiTro) return;

    axios
      .get(`http://localhost:5000/api/thong-bao?tai_khoan_id=${tai_khoan_id}&vai_tro=${vaiTro}`)
      .then((res) => {
        setThongBaoList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi lấy thông báo:", err);
        setLoading(false);
      });
  }, [tai_khoan_id, vaiTro]);

  const danhDauDaDoc = async (id: number) => {
    try {
      await axios.put(`http://localhost:5000/api/thong-bao/${id}/doc`);
      setThongBaoList((prev) =>
        prev.map((tb) =>
          tb.thong_bao_id === id ? { ...tb, trang_thai: "đã đọc" } : tb
        )
      );
    } catch (err) {
      console.error("Lỗi đánh dấu đã đọc:", err);
    }
  };

  const xoaTatCaDaDoc = async () => {
    if (!tai_khoan_id || !vaiTro) return;
    const xacNhan = window.confirm("Bạn có chắc muốn xóa tất cả thông báo đã đọc?");
    if (!xacNhan) return;

    try {
      await axios.delete(`http://localhost:5000/api/thong-bao/da-doc?tai_khoan_id=${tai_khoan_id}&vai_tro=${vaiTro}`);
      setThongBaoList((prev) => prev.filter((tb) => tb.trang_thai !== "đã đọc"));
    } catch (err) {
      console.error("Lỗi xóa tất cả đã đọc:", err);
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="account-layout">
            {/* Menu theo vai trò */}
            {vaiTro === "nha_cung_cap" ? <NhaCCMenu /> : <NguoiDungMenu />}

            <div className="account-content">
              <div className="page-header">
                <h1>Thông báo</h1>
                <p>Danh sách thông báo của bạn</p>
              </div>

              {thongBaoList.some((tb) => tb.trang_thai === "đã đọc") && (
                <button className="btn-clear-read" onClick={xoaTatCaDaDoc}>
                  <i className="fas fa-trash-alt"></i> Xóa tất cả đã đọc
                </button>
              )}

              {loading ? (
                <p>Đang tải...</p>
              ) : (
                <div className="notification-list">
                  {thongBaoList.map((tb) => (
                    <div
                      key={tb.thong_bao_id}
                      className={`notification-item ${tb.trang_thai === "chưa đọc" ? "unread" : ""}`}
                    >
                      <h4>{tb.tieu_de || "(Không tiêu đề)"}</h4>
                      <p>{tb.noi_dung}</p>
                      <small>
                        <i
                          className={`fas ${
                            tb.loai === "he_thong"
                              ? "fa-cog"
                              : tb.loai === "dat_lich"
                              ? "fa-calendar-alt"
                              : "fa-envelope"
                          }`}
                          style={{ marginRight: "6px", color: "#007bff" }}
                        ></i>
                        {new Date(tb.thoi_gian).toLocaleString("vi-VN")}
                      </small>
                      {tb.trang_thai === "chưa đọc" && (
                        <button onClick={() => danhDauDaDoc(tb.thong_bao_id)}>
                          Đánh dấu đã đọc
                        </button>
                      )}
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

export default ThongBao;
