import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

export interface BaoCaoDanhGia extends RowDataPacket {
    bao_cao_id: number;
    danh_gia_id: number;
    tai_khoan_id: number;
    ly_do: string;
    thoi_gian: Date;
    trang_thai: "chờ xử lý" | "đã xử lý" | "bỏ qua";
  }
  
export const baoCaoDanhGiaModel = {
  // Thêm báo cáo
  async themBaoCao(data: Omit<BaoCaoDanhGia, "bao_cao_id" | "thoi_gian" | "trang_thai">) {
    const query = `
      INSERT INTO bao_cao_danh_gia (danh_gia_id, tai_khoan_id, ly_do)
      VALUES (?, ?, ?)
    `;
    const values = [data.danh_gia_id, data.tai_khoan_id, data.ly_do];
    const [result] = await connection.execute(query, values);
    return result;
  },

  // Lấy danh sách báo cáo (tùy chọn lọc theo trạng thái)
  async getDanhSachBaoCao(trang_thai?: string) {
    let query = `
      SELECT b.*, nd.ho_ten, dg.diem, dg.binh_luan
      FROM bao_cao_danh_gia b
      JOIN tai_khoan tk ON b.tai_khoan_id = tk.tai_khoan_id
      JOIN nguoi_dung nd ON tk.tai_khoan_id = nd.tai_khoan_id
      JOIN danh_gia dg ON b.danh_gia_id = dg.danh_gia_id
      WHERE 1=1
    `;
    const values: any[] = [];

    if (trang_thai) {
      query += ` AND b.trang_thai = ?`;
      values.push(trang_thai);
    }

    query += ` ORDER BY b.thoi_gian DESC`;

    const [rows] = await connection.execute<BaoCaoDanhGia[]>(query, values);
    return rows;
  },

  // Cập nhật trạng thái báo cáo
  async capNhatTrangThai(id: number, trang_thai: string) {
    const query = `UPDATE bao_cao_danh_gia SET trang_thai = ? WHERE bao_cao_id = ?`;
    const [result] = await connection.execute(query, [trang_thai, id]);
    return result;
  },

  // Xem chi tiết báo cáo
  async getBaoCaoTheoId(id: number) {
    const query = `
      SELECT b.*, nd.ho_ten, dg.diem, dg.binh_luan
      FROM bao_cao_danh_gia b
      JOIN tai_khoan tk ON b.tai_khoan_id = tk.tai_khoan_id
      JOIN nguoi_dung nd ON tk.tai_khoan_id = nd.tai_khoan_id
      JOIN danh_gia dg ON b.danh_gia_id = dg.danh_gia_id
      WHERE b.bao_cao_id = ?
    `;
    const [rows] = await connection.execute<BaoCaoDanhGia[]>(query, [id]);
    return rows[0];
  }
};
