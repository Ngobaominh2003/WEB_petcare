import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

// Kiểu trả về
export interface ThongKeTongQuat {
  tong_doanh_thu: number;
  khach_hang_moi: number;
  so_don_hang: number;
  ty_le_hoan_thanh: number;
}

export interface DoanhThuThang {
  thang: string;
  doanh_thu: number;
}

export interface DonHangGanDay {
  ma_don: string;
  ten_khach: string;
  ngay: string;
  gia_tri: number;
  trang_thai: string;
}

export interface PhanBoDanhMuc {
  nhom: string;
  ty_le: number;
}

// ✅ Export đúng cách từng hàm
export async function layThongKeTongQuat(): Promise<ThongKeTongQuat> {
  const [rows] = await connection.query<RowDataPacket[]>(`
    SELECT
      (SELECT IFNULL(SUM(so_tien), 0) FROM hoa_don WHERE trang_thai = 'đã thanh toán') AS tong_doanh_thu,
      (SELECT COUNT(*) FROM tai_khoan WHERE ngay_tao >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) AS khach_hang_moi,
      (SELECT COUNT(*) FROM dat_lich) AS so_don_hang,
      (SELECT ROUND(100 * COUNT(*) / NULLIF((SELECT COUNT(*) FROM dat_lich), 0), 1)
       FROM dat_lich WHERE trang_thai = 'hoàn thành') AS ty_le_hoan_thanh
  `);
  return rows[0] as ThongKeTongQuat;
}

export async function layDoanhThuTheoThang(): Promise<DoanhThuThang[]> {
    const [rows] = await connection.query<RowDataPacket[]>(`
      SELECT 
        CONCAT('T', thang) AS thang,
        SUM(so_tien) AS doanh_thu
      FROM (
        SELECT 
          MONTH(thoi_gian_tt) AS thang,
          so_tien
        FROM hoa_don
        WHERE YEAR(thoi_gian_tt) = YEAR(CURDATE())
          AND trang_thai = 'đã thanh toán'
      ) AS sub
      GROUP BY thang
      ORDER BY thang
    `);
    return rows as DoanhThuThang[];
  }
  

export async function layDonHangGanDay(limit: number): Promise<DonHangGanDay[]> {
  const [rows] = await connection.query<RowDataPacket[]>(`
    SELECT 
      CONCAT('#ORD-', dl.dat_lich_id) AS ma_don,
      nd.ho_ten AS ten_khach,
      DATE_FORMAT(dl.ngay_gio, '%Y-%m-%d') AS ngay,
      hd.so_tien AS gia_tri,
      dl.trang_thai
    FROM dat_lich dl
    JOIN hoa_don hd ON dl.dat_lich_id = hd.dat_lich_id
    JOIN nguoi_dung nd ON dl.tai_khoan_id = nd.tai_khoan_id
    ORDER BY dl.ngay_gio DESC
    LIMIT ?
  `, [limit]);
  return rows as DonHangGanDay[];
}

export async function layPhanBoTheoDanhMuc(): Promise<PhanBoDanhMuc[]> {
  const [rows] = await connection.query<RowDataPacket[]>(`
    SELECT 
      dmdv.ten_danh_muc AS nhom,
      ROUND(100 * COUNT(*) / (SELECT COUNT(*) FROM dich_vu), 1) AS ty_le
    FROM dich_vu dv
    JOIN danh_muc_dich_vu dmdv ON dv.danh_muc_id = dmdv.danh_muc_id
    GROUP BY dmdv.ten_danh_muc
  `);
  return rows as PhanBoDanhMuc[];
}
