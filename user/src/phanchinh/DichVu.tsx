"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "../TaiKhoan/style/dichvu.module.css";

interface DichVuProps {
  tuKhoa: string;
  data: any;
}

interface DichVu {
  dich_vu_id: number;
  ten_dich_vu: string;
  mo_ta: string;
  logo?: string;
  gia: number;
  luot_dung: number;
  thoi_gian_hoan_thanh?: string;
  avata?: string;
  ten_nha_cung_cap?: string;
  ten_danh_muc?: string; // Added this property
}

interface ThongKeDanhGia {
  diem_trung_binh: number | null;
}

const DichVu: React.FC<DichVuProps> = ({ tuKhoa: propTuKhoa, data }) => {
  const [dichVuList, setDichVuList] = useState<DichVu[]>([]);
  const [loading, setLoading] = useState(true);
  const [thongKeDanhGia, setThongKeDanhGia] = useState<{
    [key: number]: ThongKeDanhGia;
  }>({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tuKhoa = searchParams.get("ten") || propTuKhoa;
  

  
  const handleDatLich = (dichVu: DichVu) => {
    const isLoggedIn = !!localStorage.getItem("token");

    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Lưu dữ liệu dịch vụ vào localStorage (hoặc Context)
      localStorage.setItem("dichVuDaChon", JSON.stringify(dichVu));

      // Chuyển sang trang đặt lịch
      navigate("/DatDichVu");
    }
  };
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star" />);
    }
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star" />);
    }

    return stars;
  };

  const fetchThongKeDanhGia = async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/danh-gia/thong-ke/${id}`
      );
      setThongKeDanhGia((prev) => ({ ...prev, [id]: res.data }));
    } catch (error) {
      console.error("Lỗi lấy thống kê:", error);
    }
  };

  useEffect(() => {
    const fetchDichVu = async () => {
      try {
        setLoading(true);
        let list: DichVu[] = [];
  
        // Nếu có từ khóa tìm kiếm → luôn ưu tiên gọi API tìm kiếm
        if (tuKhoa && tuKhoa.trim() !== "") {
          const res = await axios.get(
            `http://localhost:5000/api/dich-vu/tim?ten=${encodeURIComponent(tuKhoa)}`
          );
          list = res.data;
        }
        // Nếu không có tuKhoa nhưng có data props từ cha → dùng luôn
        else if (Array.isArray(data) && data.length > 0) {
          list = data;
        }
        // Nếu không có gì cả → gọi API mặc định
        else {
          const res = await axios.get("http://localhost:5000/api/dich-vu/dieu-kien");
          list = res.data;
        }
  
        setDichVuList(list);
  
        list.forEach((dichVu) => {
          if (!thongKeDanhGia[dichVu.dich_vu_id]) {
            fetchThongKeDanhGia(dichVu.dich_vu_id);
          }
        });
      } catch (error) {
        console.error("Lỗi khi tải dịch vụ:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDichVu();
  }, [data, tuKhoa]);
  
  

  if (loading) return <p>Đang tải dịch vụ...</p>;

  const handleXemChiTiet = (dichVu: DichVu) => {
    const diem = thongKeDanhGia[dichVu.dich_vu_id]?.diem_trung_binh || 0;

    const dichVuFull = {
      ...dichVu,
      diem_trung_binh: diem,
    };

    localStorage.setItem("dichVuChiTiet", JSON.stringify(dichVuFull));
    navigate(`/DichVuChiTiet/${dichVu.dich_vu_id}`);
  };

  return (
    <div className={styles.grid}>
      {dichVuList.length > 0 ? (
        dichVuList.map((dichVu) => {
          const thongKe = thongKeDanhGia[dichVu.dich_vu_id];

          return (
            <div key={dichVu.dich_vu_id} className={styles.card}>
              <div className={styles.image}>
                <img
                  src={
                    dichVu.logo
                      ? `http://localhost:5000/img/${dichVu.logo}`
                      : "https://placehold.co/400x250?text=No+Image"
                  }
                  alt={dichVu.ten_dich_vu}
                />
                <div className={styles.badge}>Phổ biến</div>
              </div>
              <div className={styles.content}>
                <div className={styles.provider}>
                  <img
                    src={
                      dichVu.avata
                        ? `http://localhost:5000/img/${dichVu.avata}`
                        : "https://placehold.co/50x50/4CAF50/ffffff?text=No+avata"
                    }
                    alt="Provider avata"
                    className={styles.providerAvatar}
                  />
                  <span>
                    {dichVu.ten_nha_cung_cap || "Không có tên nhà cung cấp"}
                  </span>
                </div>
                <h3 className={styles.title}>{dichVu.ten_dich_vu}</h3>

                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {renderStars(
                      thongKe?.diem_trung_binh
                        ? Number(thongKe.diem_trung_binh)
                        : 0
                    )}
                  </div>
                  <span>
                    {thongKe?.diem_trung_binh
                      ? Number(thongKe.diem_trung_binh).toFixed(1)
                      : ""}
                  </span>

                  <span>{dichVu.luot_dung} Lượt dùng</span>
                </div>

                <div className={styles.details}>
                  <div className={styles.detail}>
                    <i className="fas fa-tag" />
                    <span>{dichVu.ten_danh_muc}</span>
                  </div>
                  <div className={styles.detail}>
                    <i className="fas fa-clock" />
                    <span>{dichVu.thoi_gian_hoan_thanh || "60-90 phút"}</span>
                  </div>
                  <div className={styles.detail}>
                    <i className="fas fa-paw" />
                    <span>Chó</span>
                  </div>
                </div>

                <div className={styles.price}>
                  <span className={styles.priceValue}>
                    {new Intl.NumberFormat("vi-VN").format(dichVu.gia)} VNĐ
                  </span>
                </div>

                <div className={styles.actions}>
                  <button
                    onClick={() => handleXemChiTiet(dichVu)}
                    className={`${styles.btn} ${styles.btnOutline}`}
                  >
                    Xem chi tiết
                  </button>

                  <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => handleDatLich(dichVu)}
                  >
                    Đặt lịch
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>Không có dịch vụ nào để hiển thị.</p>
      )}

      {/* Pagination */}
    </div>
  );
};

export default DichVu;
