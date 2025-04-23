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
      datLich.trang_thai ?? "chờ xác nhận"
    ];
    const [result] = await connection.execute(query, values);
    return result;
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

  // Lấy lịch hẹn theo tài khoản ID
  async getDatLichTheoTaiKhoanId(taiKhoanId: number) {
    const query = `SELECT * FROM dat_lich WHERE tai_khoan_id = ?`;
    const [rows] = await connection.execute(query, [taiKhoanId]);
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

    const query = `UPDATE dat_lich SET ${fields.join(", ")} WHERE dat_lich_id = ?`;
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
  }
};
