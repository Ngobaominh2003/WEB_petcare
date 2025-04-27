// src/models/DatLich.ts
import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

export interface DatLich extends RowDataPacket {
  dat_lich_id: number;
  tai_khoan_id: number;
  dich_vu_id: number;
  thu_cung_id?: number | null;
  ngay_gio: Date;
  ghi_chu?: string | null;
  trang_thai: "chờ xác nhận" | "đã xác nhận" | "hoàn thành" | "hủy";
}

export const datLichModel = {
  // Tạo lịch hẹn mới
  async taoDatLich(datLich: Omit<DatLich, "dat_lich_id">) {
    const query = `
      INSERT INTO dat_lich (
        tai_khoan_id, dich_vu_id, thu_cung_id, ngay_gio, ghi_chu, trang_thai
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      datLich.tai_khoan_id,
      datLich.dich_vu_id,
      datLich.thu_cung_id ?? null,
      datLich.ngay_gio,
      datLich.ghi_chu ?? null,
      datLich.trang_thai ?? "chờ xác nhận",
    ];
    const [result]: any = await connection.execute(query, values);
    return result; // result.insertId sẽ có ở đây
  },

  // Lấy toàn bộ lịch hẹn
  async getTatCaDatLich() {
    const query = `SELECT * FROM dat_lich`;
    const [rows] = await connection.execute(query);
    return rows;
  },

  // Lấy lịch hẹn theo ID
  async getDatLichTheoId(id: number) {
    const query = `SELECT * FROM dat_lich WHERE dat_lich_id = ?`;
    const [rows] = await connection.execute(query, [id]);
    return rows;
  },

  // Cập nhật lịch hẹn
  async capNhatDatLich(id: number, update: Partial<DatLich>) {
    const fields = [];
    const values = [];

    if (update.ngay_gio !== undefined) {
      fields.push("ngay_gio = ?");
      values.push(update.ngay_gio);
    }
    if (update.ghi_chu !== undefined) {
      fields.push("ghi_chu = ?");
      values.push(update.ghi_chu);
    }
    if (update.thu_cung_id !== undefined) {
      fields.push("thu_cung_id = ?");
      values.push(update.thu_cung_id);
    }
    if (update.dich_vu_id !== undefined) {
      fields.push("dich_vu_id = ?");
      values.push(update.dich_vu_id);
    }

    if (fields.length === 0) {
      throw new Error("Không có trường nào để cập nhật.");
    }

    const query = `UPDATE dat_lich SET ${fields.join(
      ", "
    )} WHERE dat_lich_id = ?`;
    values.push(id);
    const [result] = await connection.execute(query, values);
    return result;
  },

  // Cập nhật trạng thái lịch hẹn
  async capNhatTrangThai(id: number, trang_thai: DatLich["trang_thai"]) {
    const query = `UPDATE dat_lich SET trang_thai = ? WHERE dat_lich_id = ?`;
    const [result] = await connection.execute(query, [trang_thai, id]);
    return result;
  },

  // Xoá lịch hẹn theo ID
  async xoaDatLich(id: number) {
    const query = `DELETE FROM dat_lich WHERE dat_lich_id = ?`;
    const [result] = await connection.execute(query, [id]);
    return result;
  },
  // Lấy lịch hẹn chi tiết theo tài khoản ID
  async getDatLichTheoTaiKhoanId(taiKhoanId: number) {
    const query = `
    SELECT 
      dl.*, 
      dv.ten_dich_vu,
      dm.ten_danh_muc,
      nc.dia_chi AS dia_chi_nha_cung_cap,
      hd.so_tien,
      tc.ten AS ten_thu_cung
    FROM dat_lich dl
    LEFT JOIN dich_vu dv ON dl.dich_vu_id = dv.dich_vu_id
    LEFT JOIN danh_muc_dich_vu dm ON dv.danh_muc_id = dm.danh_muc_id
    LEFT JOIN nha_cung_cap nc ON dv.tai_khoan_id = nc.tai_khoan_id
    LEFT JOIN hoa_don hd ON dl.dat_lich_id = hd.dat_lich_id
    LEFT JOIN thu_cung tc ON dl.thu_cung_id = tc.thu_cung_id
    WHERE dl.tai_khoan_id = ?
    ORDER BY dl.ngay_gio DESC
  `;

    const [rows] = await connection.execute(query, [taiKhoanId]);
    return rows;
  },
  // Lấy lịch hẹn sửa dụng dịch vu của theo nhà cung cấp
  async getDatLichTheoNhaCungCap(taiKhoanId: number) {
    const query = `
SELECT 
  dl.*, 
  dv.ten_dich_vu,
  dm.ten_danh_muc,
  nc.dia_chi AS dia_chi_nha_cung_cap,
  
  hd.hoa_don_id,       -- 🛠 Lấy thêm hoa_don_id!
  hd.so_tien,
  hd.trang_thai AS trang_thai_hoa_don,

  tc.ten AS ten_thu_cung
FROM dat_lich dl
LEFT JOIN dich_vu dv ON dl.dich_vu_id = dv.dich_vu_id
LEFT JOIN danh_muc_dich_vu dm ON dv.danh_muc_id = dm.danh_muc_id
LEFT JOIN nha_cung_cap nc ON dv.tai_khoan_id = nc.tai_khoan_id
LEFT JOIN hoa_don hd ON dl.dat_lich_id = hd.dat_lich_id -- 🛠 JOIN với bảng hoa_don
LEFT JOIN thu_cung tc ON dl.thu_cung_id = tc.thu_cung_id
WHERE dv.tai_khoan_id = ?
ORDER BY dl.ngay_gio DESC;



    `;

    const [rows] = await connection.execute(query, [taiKhoanId]);
    return rows;
  },
};
