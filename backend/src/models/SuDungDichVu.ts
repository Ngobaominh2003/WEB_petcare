import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

export interface SuDungDichVu extends RowDataPacket {
  id: number;
  dich_vu_id: number;
  ngay_su_dung: Date;
}

export const suDungDichVuModel = {
  // Ghi nhận một lượt sử dụng dịch vụ
  async ghiNhanSuDung(dich_vu_id: number, ngay_su_dung?: Date) {
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();
  
      await conn.execute(`
        INSERT INTO su_dung_dich_vu (dich_vu_id, ngay_su_dung)
        VALUES (?, ?)
      `, [dich_vu_id, ngay_su_dung ?? new Date()]);
  
      await conn.execute(`
        UPDATE dich_vu
        SET luot_dung = luot_dung + 1
        WHERE dich_vu_id = ?
      `, [dich_vu_id]);
  
      await conn.commit();
      return { message: "Đã ghi nhận sử dụng và tăng luot_dung" };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
  
  // Lấy lịch sử sử dụng dịch vụ, có thể lọc theo ngày và dich_vu_id
  async getLichSuSuDung(filter?: {
    dich_vu_id?: number;
    ngay_su_dung?: string; // Format YYYY-MM-DD
  }) {
    let query = `SELECT * FROM su_dung_dich_vu WHERE 1=1`;
    const values: any[] = [];

    if (filter?.dich_vu_id !== undefined) {
      query += ` AND dich_vu_id = ?`;
      values.push(filter.dich_vu_id);
    }

    if (filter?.ngay_su_dung !== undefined) {
      query += ` AND DATE(ngay_su_dung) = ?`;
      values.push(filter.ngay_su_dung);
    }

    const [rows] = await connection.execute<SuDungDichVu[]>(query, values);
    return rows;
  },
};
