import { RowDataPacket } from "mysql2";
import connection from "../config/db";

export interface ThongBao extends RowDataPacket {
  thong_bao_id?: number;
  tai_khoan_id: number;
  tieu_de: string | null;
  noi_dung: string;
  loai: 'he_thong' | 'dat_lich' | 'tin_nhan';
  trang_thai?: 'chưa đọc' | 'đã đọc';
  thoi_gian?: Date;
}

export const createThongBao = async (thongBao: ThongBao): Promise<void> => {
  const { tai_khoan_id, tieu_de, noi_dung, loai } = thongBao;
  const sql = `INSERT INTO thong_bao (tai_khoan_id, tieu_de, noi_dung, loai) VALUES (?, ?, ?, ?)`;
  await connection.execute(sql, [tai_khoan_id, tieu_de, noi_dung, loai]);
};

export const getThongBaoByTaiKhoan = async (tai_khoan_id: number, trang_thai?: string): Promise<ThongBao[]> => {
  let sql = `SELECT * FROM thong_bao WHERE tai_khoan_id = ?`;
  const params: any[] = [tai_khoan_id];

  if (trang_thai) {
    sql += ` AND trang_thai = ?`;
    params.push(trang_thai);
  }

  sql += ` ORDER BY thoi_gian DESC`;
  const [rows] = await connection.execute<ThongBao[]>(sql, params);
  return rows;
};

export const markAsRead = async (id: number): Promise<void> => {
  const sql = `UPDATE thong_bao SET trang_thai = 'đã đọc' WHERE thong_bao_id = ?`;
  await connection.execute(sql, [id]);
};

export const deleteThongBao = async (id: number): Promise<void> => {
  const sql = `DELETE FROM thong_bao WHERE thong_bao_id = ?`;
  await connection.execute(sql, [id]);
};

export const deleteThongBaoDaDoc = async (tai_khoan_id: number): Promise<number> => {
  const [result]: any = await connection.execute(
    `DELETE FROM thong_bao WHERE tai_khoan_id = ? AND trang_thai = 'đã đọc'`,
    [tai_khoan_id]
  );
  return result.affectedRows;
};

export const countChuaDoc = async (tai_khoan_id: number): Promise<number> => {
  const sql = `SELECT COUNT(*) as so_luong FROM thong_bao WHERE tai_khoan_id = ? AND trang_thai = 'chưa đọc'`;
  const [rows] = await connection.execute<RowDataPacket[]>(sql, [tai_khoan_id]);
  return rows[0].so_luong;
};
