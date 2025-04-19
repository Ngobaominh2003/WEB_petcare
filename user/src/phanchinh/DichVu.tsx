"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from '../TaiKhoan/style/dichvu.module.css';


// Định nghĩa kiểu dữ liệu cho dịch vụ
interface DichVu {
  ten_dich_vu: string
  mo_ta: string
  logo?: string
  gia: number
  luot_dung: number
  thoi_gian_hoan_thanh?: string
  avata?: string
  ten_nha_cung_cap?: string // Tên nhà cung cấp
}

const DichVu: React.FC = () => {
  const [dichVuList, setDichVuList] = useState<DichVu[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDichVu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dich-vu/dieu-kien")
        setDichVuList(response.data)
      } catch (error) {
        console.error("Error fetching services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDichVu()
  }, [])

  if (loading) {
    return <p>Đang tải dịch vụ...</p>
  }

  return (
    <div className={styles.grid}>
      {dichVuList.length > 0 ? (
        dichVuList.map((dichVu, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.image}>
              <img src={`http://localhost:5000/img/${dichVu.logo}`} alt={dichVu.ten_dich_vu} />
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
                <span>{dichVu.ten_nha_cung_cap || "Không có tên nhà cung cấp"}</span>
              </div>
              <h3 className={styles.title}>{dichVu.ten_dich_vu}</h3>
              <div className={styles.rating}>
                <div className={styles.stars}>
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" />
                </div>
                <span>{dichVu.luot_dung} đánh giá</span>
              </div>
              <div className={styles.details}>
                <div className={styles.detail}>
                  <i className="fas fa-tag" />
                  <span>Làm đẹp</span>
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
                <span className={styles.priceValue}>{dichVu.gia} VNĐ</span>
              </div>
              <div className={styles.actions}>
                <a href="service-detail.html" className={`${styles.btn} ${styles.btnOutline}`}>
                  Xem chi tiết
                </a>
                <a href="#" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Đặt lịch
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Không có dịch vụ nào để hiển thị.</p>
      )}
      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.paginationBtn} disabled={true}>
          <i className="fas fa-chevron-left" />
        </button>
        <button className={`${styles.paginationBtn} ${styles.active}`}>1</button>
        <button className={styles.paginationBtn}>2</button>
        <button className={styles.paginationBtn}>3</button>
        <button className={styles.paginationBtn}>
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </div>
  )
}

export default DichVu
