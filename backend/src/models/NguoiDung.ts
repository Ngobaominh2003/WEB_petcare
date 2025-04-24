// models/NguoiDung.ts
import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db"; // Đảm bảo bạn đã cấu hình kết nối với MySQL

// Định nghĩa interface cho người dùng
export interface NguoiDung extends RowDataPacket {
  nguoi_dung_id: number;
  tai_khoan_id: number;
  ho_ten: string;
  sdt?: string;
  gioi_tinh: "nam" | "nu" | "khac" | null;
  avata?: string;
  dia_chi?: string; // thêm dòng này
}


// Thêm người dùng
export const createNguoiDung = async (
  tai_khoan_id: number,
  ho_ten: string,
  sdt: string | null,
  gioi_tinh: "nam" | "nu" | "khac" | null,
  avata: string | null,
  dia_chi: string | null // thêm tham số này
): Promise<void> => {
  await connection.execute(
    "INSERT INTO nguoi_dung (tai_khoan_id, ho_ten, sdt, gioi_tinh, avata, dia_chi) VALUES (?, ?, ?, ?, ?, ?)",
    [tai_khoan_id, ho_ten, sdt, gioi_tinh, avata, dia_chi]
  );
};


// Cập nhật thông tin người dùng
export const updateNguoiDung = async (
  tai_khoan_id: number,
  ho_ten?: string,
  sdt?: string | null,
  gioi_tinh?: 'nam' | 'nu' | 'khac' | null,
  avata?: string | null,
  dia_chi?: string | null // thêm tham số này
): Promise<void> => {
  let query = 'UPDATE nguoi_dung SET ';
  const values: (string | number | null)[] = [];

  if (ho_ten !== undefined) {
    query += 'ho_ten = ?, ';
    values.push(ho_ten);
  }

  if (sdt !== undefined) {
    query += 'sdt = ?, ';
    values.push(sdt);
  }

  if (gioi_tinh !== undefined) {
    query += 'gioi_tinh = ?, ';
    values.push(gioi_tinh);
  }

  if (avata !== undefined) {
    query += 'avata = ?, ';
    values.push(avata);
  }

  if (dia_chi !== undefined) {
    query += 'dia_chi = ?, ';
    values.push(dia_chi);
  }

  if (values.length === 0) {
    throw new Error('Không có thông tin nào để cập nhật');
  }

  query = query.slice(0, -2); // Xóa dấu phẩy cuối
  query += ' WHERE tai_khoan_id = ?';
  values.push(tai_khoan_id);

  await connection.execute(query, values);
};

// Xóa người dùng
export const deleteNguoiDung = async (nguoi_dung_id: number): Promise<void> => {
  await connection.execute("DELETE FROM nguoi_dung WHERE nguoi_dung_id = ?", [
    nguoi_dung_id,
  ]);
};

// Xóa người dùng theo tai_khoan_id
export const deleteNguoiDungByTaiKhoanId = async (
  tai_khoan_id: number
): Promise<void> => {
  await connection.execute("DELETE FROM nguoi_dung WHERE tai_khoan_id = ?", [
    tai_khoan_id,
  ]);
};

// Tìm người dùng theo `tai_khoan_id`
export const getNguoiDungByTaiKhoanId = async (
  tai_khoan_id: number
): Promise<NguoiDung | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM nguoi_dung WHERE tai_khoan_id = ?",
    [tai_khoan_id]
  );
  return rows.length > 0 ? (rows[0] as NguoiDung) : null;
};
