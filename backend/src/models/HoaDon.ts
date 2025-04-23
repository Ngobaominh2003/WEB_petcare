import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

export interface HoaDon extends RowDataPacket {
  hoa_don_id: number;
  dat_lich_id: number;
  tai_khoan_id: number;
  so_tien: number;
  phuong_thuc: "tiền mặt" | "chuyển khoản" | "momo" | "zalo_pay" | null;
  thoi_gian_tt?: Date;
  trang_thai: "đã thanh toán" | "chưa thanh toán" | "hủy";
}

export const hoaDonModel = {
  // Tạo mới hóa đơn
  async taoHoaDon(hoaDon: Omit<HoaDon, "hoa_don_id" | "thoi_gian_tt">) {
    const query = `
      INSERT INTO hoa_don (dat_lich_id, tai_khoan_id, so_tien, phuong_thuc, trang_thai)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      hoaDon.dat_lich_id,
      hoaDon.tai_khoan_id,
      hoaDon.so_tien,
      hoaDon.phuong_thuc ?? null,
      hoaDon.trang_thai ?? "chưa thanh toán",
    ];
    const [result] = await connection.execute(query, values);
    return result;
  },

  // Lấy danh sách hóa đơn, có thể lọc theo tài khoản và trạng thái
  async getDanhSachHoaDon(tai_khoan_id?: number, trang_thai?: string) {
    let query = `SELECT * FROM hoa_don WHERE 1=1`;
    const values: any[] = [];

    if (tai_khoan_id !== undefined) {
      query += ` AND tai_khoan_id = ?`;
      values.push(tai_khoan_id);
    }

    if (trang_thai !== undefined) {
      query += ` AND trang_thai = ?`;
      values.push(trang_thai);
    }

    const [rows] = await connection.execute<HoaDon[]>(query, values);
    return rows;
  },

  // Lấy chi tiết hóa đơn theo ID
  async getHoaDonTheoId(id: number) {
    const query = `SELECT * FROM hoa_don WHERE hoa_don_id = ?`;
    const [rows] = await connection.execute<HoaDon[]>(query, [id]);
    return rows[0];
  },

  // Cập nhật trạng thái hóa đơn
  async capNhatTrangThai(id: number, trang_thai: HoaDon["trang_thai"]) {
    const query = `UPDATE hoa_don SET trang_thai = ? WHERE hoa_don_id = ?`;
    const [result] = await connection.execute(query, [trang_thai, id]);
    return result;
  },

  // Xóa hóa đơn
  async xoaHoaDon(id: number) {
    const query = `DELETE FROM hoa_don WHERE hoa_don_id = ?`;
    const [result] = await connection.execute(query, [id]);
    return result;
  },
};
