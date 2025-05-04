import { RowDataPacket } from 'mysql2/promise';
import connection from '../config/db';

export interface ThongKe extends RowDataPacket {
  thong_ke_id: number;
  tai_khoan_id: number;
  dich_vu_id?: number;
  ten_giao_dich?: string;
  mo_ta?: string;
  loai: 'thu_nhap' | 'chi_phi';
  so_luot_dat: number;
  so_luot_hoan_thanh: number;
  tong_danh_thu: number;
  so_danh_gia: number;
  diem_trung_binh: number;
  thoi_gian_thong_ke: string; // YYYY-MM-DD
}

export const getTongQuan = async (tai_khoan_id: number) => {
  const [rows] = await connection.execute<ThongKe[]>(
    `
    SELECT 
      SUM(CASE WHEN loai = 'thu_nhap' THEN tong_danh_thu ELSE 0 END) AS tong_thu_nhap,
      SUM(CASE WHEN loai = 'thu_nhap' AND MONTH(thoi_gian_thong_ke) = MONTH(CURDATE()) AND YEAR(thoi_gian_thong_ke) = YEAR(CURDATE())
               THEN tong_danh_thu ELSE 0 END) AS thu_thang_nay,
      SUM(so_luot_hoan_thanh) AS tong_luot_hoan_thanh
    FROM thong_ke_dich_vu
    WHERE tai_khoan_id = ?
    `,
    [tai_khoan_id]
  );
  return rows[0];
};

export const getBieuDoThuNhap = async (tai_khoan_id: number) => {
  const [rows] = await connection.execute(
    `
    SELECT 
      DATE_FORMAT(thoi_gian_thong_ke, '%Y-%m') AS thang,
      SUM(tong_danh_thu) AS tong_thu_nhap
    FROM thong_ke_dich_vu
    WHERE tai_khoan_id = ? AND loai = 'thu_nhap'
    GROUP BY thang
    ORDER BY thang DESC
    LIMIT 6
    `,
    [tai_khoan_id]
  );
  return rows;
};

export const getLichSuGiaoDich = async (tai_khoan_id: number, loai: string) => {
  const [rows] = await connection.execute(
    `
    SELECT 
      ten_giao_dich, mo_ta, tong_danh_thu AS so_tien, thoi_gian_thong_ke AS thoi_gian, loai
    FROM thong_ke_dich_vu
    WHERE tai_khoan_id = ? AND (? = 'all' OR loai = ?)
    ORDER BY thoi_gian_thong_ke DESC
    `,
    [tai_khoan_id, loai, loai]
  );
  return rows;
};

export const addThongKe = async (data: Omit<ThongKe, 'thong_ke_id'>) => {
  const [result] = await connection.execute(
    `
    INSERT INTO thong_ke_dich_vu 
      (tai_khoan_id, dich_vu_id, ten_giao_dich, mo_ta, loai, so_luot_dat, so_luot_hoan_thanh, tong_danh_thu, so_danh_gia, diem_trung_binh, thoi_gian_thong_ke)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.tai_khoan_id,
      data.dich_vu_id ?? null,
      data.ten_giao_dich ?? null,
      data.mo_ta ?? null,
      data.loai,
      data.so_luot_dat,
      data.so_luot_hoan_thanh,
      data.tong_danh_thu,
      data.so_danh_gia,
      data.diem_trung_binh,
      data.thoi_gian_thong_ke,
    ]
  );
  return result;
};

export const updateThongKe = async (id: number, data: Partial<ThongKe>) => {
  const fields = Object.entries(data)
    .map(([key]) => `${key} = ?`)
    .join(', ');

  const values = Object.values(data);
  values.push(id);

  const [result] = await connection.execute(
    `UPDATE thong_ke_dich_vu SET ${fields} WHERE thong_ke_id = ?`,
    values
  );
  return result;
};

export const deleteThongKe = async (id: number) => {
  const [result] = await connection.execute(
    `DELETE FROM thong_ke_dich_vu WHERE thong_ke_id = ?`,
    [id]
  );
  return result;
};

export const tinhThongKeTuDong = async () => {
  const [rows] = await connection.execute<any[]>(
    `
    SELECT 
      dv.dich_vu_id,
      dv.tai_khoan_id,
      dv.ten_dich_vu AS ten_giao_dich,
      COUNT(DISTINCT dl.dat_lich_id) AS so_luot_dat,
      SUM(CASE WHEN dl.trang_thai = 'hoàn thành' THEN 1 ELSE 0 END) AS so_luot_hoan_thanh,
      SUM(CASE WHEN dl.trang_thai = 'hoàn thành' THEN hd.so_tien ELSE 0 END) AS tong_danh_thu,
      COUNT(dg.danh_gia_id) AS so_danh_gia,
      ROUND(AVG(dg.diem), 2) AS diem_trung_binh,
      DATE_FORMAT(CURDATE(), '%Y-%m-01') AS thoi_gian_thong_ke
    FROM dat_lich dl
    JOIN dich_vu dv ON dl.dich_vu_id = dv.dich_vu_id
    LEFT JOIN hoa_don hd ON dl.dat_lich_id = hd.dat_lich_id AND hd.trang_thai = 'đã thanh toán'
    LEFT JOIN danh_gia dg ON dl.dich_vu_id = dg.dich_vu_id
    WHERE MONTH(dl.ngay_gio) = MONTH(CURDATE())
      AND YEAR(dl.ngay_gio) = YEAR(CURDATE())
    GROUP BY dv.dich_vu_id, dv.tai_khoan_id
    `
  );

  // Insert từng dòng vào thong_ke_dich_vu
  for (const row of rows) {
    await connection.execute(
      `
      INSERT INTO thong_ke_dich_vu 
        (tai_khoan_id, dich_vu_id, ten_giao_dich, mo_ta, loai, so_luot_dat, so_luot_hoan_thanh, tong_danh_thu, so_danh_gia, diem_trung_binh, thoi_gian_thong_ke)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        row.tai_khoan_id,
        row.dich_vu_id,
        row.ten_giao_dich,
        null,
        'thu_nhap',
        row.so_luot_dat,
        row.so_luot_hoan_thanh,
        row.tong_danh_thu,
        row.so_danh_gia,
        row.diem_trung_binh,
        row.thoi_gian_thong_ke
      ]
    );
  }

  return { inserted: rows.length };
};
