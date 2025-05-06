import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NguoiDungMenu from "../../components/NguoiDungMenu";
import axios from "axios";
import "../style/styles.css";


interface NhaCungCap {
  id: number;
  ten: string;
  logo: string;
  mo_ta?: string;
}

const NhaCCYeuThich: React.FC = () => {
  const [dsYeuThich, setDsYeuThich] = useState<NhaCungCap[]>([]);
  useEffect(() => {
    // Dữ liệu mẫu giả lập
    const mockData: NhaCungCap[] = [
      {
        id: 1,
        ten: "Cửa hàng thú cưng Mèo Xinh",
        logo: "meo-xinh.jpg",
        mo_ta: "Chuyên cung cấp đồ dùng cho mèo.",
      },
      {
        id: 2,
        ten: "PetShop Hạnh Phúc",
        logo: "petshop-hanhphuc.png",
        mo_ta: "Dịch vụ chăm sóc thú cưng toàn diện.",
      },
      {
        id: 3,
        ten: "Bệnh viện thú y Sài Gòn",
        logo: "benhvienthuy.jpg",
        mo_ta: "Khám chữa bệnh cho thú cưng uy tín.",
      },
    ];
  
    setDsYeuThich(mockData);
  }, []);
  
  useEffect(() => {
    const tai_khoan_id = localStorage.getItem("tai_khoan_id");

    if (tai_khoan_id) {
      axios
        .get(`http://localhost:5000/api/nha-cc/yeu-thich?tai_khoan_id=${tai_khoan_id}`)
        .then((res) => setDsYeuThich(res.data))
        .catch((err) => console.error("Lỗi khi lấy danh sách yêu thích:", err));
    }
  }, []);

  const handleXoaYeuThich = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/nha-cc/yeu-thich/${id}`)
      .then(() => {
        setDsYeuThich(dsYeuThich.filter((ncc) => ncc.id !== id));
      })
      .catch((err) => console.error("Lỗi khi xóa yêu thích:", err));
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="account-layout">
            <NguoiDungMenu />

            <div className="account-content">
              <div className="page-header">
                <h1>Nhà cung cấp yêu thích</h1>
                <p>Danh sách các nhà cung cấp bạn đã đánh dấu yêu thích.</p>
              </div>

              <div className="yeuthich-list">
                {dsYeuThich.length > 0 ? (
                  dsYeuThich.map((ncc) => (
                    <div key={ncc.id} className="yeuthich-card">
                      <img src={`/uploads/${ncc.logo}`} alt={ncc.ten} className="yeuthich-avatar" />
                      <div className="yeuthich-info">
                        <h3>{ncc.ten}</h3>
                        {ncc.mo_ta && <p>{ncc.mo_ta}</p>}
                      </div>
                      <button className="btn-xoa" onClick={() => handleXoaYeuThich(ncc.id)}>
                        ❌ Xoá
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Chưa có nhà cung cấp nào được yêu thích.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NhaCCYeuThich;
