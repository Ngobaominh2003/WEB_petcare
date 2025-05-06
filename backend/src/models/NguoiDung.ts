import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

// Interface người dùng
export interface NguoiDung extends RowDataPacket {
  nguoi_dung_id: number;
  tai_khoan_id: number;
  ho_ten: string;
  sdt?: string;
  gioi_tinh: "nam" | "nu" | "khac" | null;
  avata?: string;
  dia_chi?: string;
}

// Thêm người dùng
export const createNguoiDung = async (
  tai_khoan_id: number,
  ho_ten: string,
  sdt: string | null,
  gioi_tinh: "nam" | "nu" | "khac" | null,
  avata: string | null,
  dia_chi: string | null
): Promise<void> => {
  await connection.execute(
    "INSERT INTO nguoi_dung (tai_khoan_id, ho_ten, sdt, gioi_tinh, avata, dia_chi) VALUES (?, ?, ?, ?, ?, ?)",
    [tai_khoan_id, ho_ten, sdt, gioi_tinh, avata, dia_chi]
  );
};

// Cập nhật người dùng
export const updateNguoiDung = async (
  tai_khoan_id: number,
  updates: Partial<Omit<NguoiDung, 'nguoi_dung_id' | 'tai_khoan_id'>>
): Promise<void> => {
  const fields: string[] = [];
  const values: (string | null)[] = [];

  const fieldMap: { [key: string]: any } = {
    ho_ten: updates.ho_ten,
    sdt: updates.sdt,
    gioi_tinh: updates.gioi_tinh,
    avata: updates.avata,
    dia_chi: updates.dia_chi,
  };

  for (const [key, value] of Object.entries(fieldMap)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) throw new Error("Không có thông tin nào để cập nhật");

  const query = `UPDATE nguoi_dung SET ${fields.join(', ')} WHERE tai_khoan_id = ?`;
  values.push(String(tai_khoan_id));

  await connection.execute(query, values);
};

// Xoá người dùng theo ID
export const deleteNguoiDung = async (nguoi_dung_id: number): Promise<void> => {
  await connection.execute(
    "DELETE FROM nguoi_dung WHERE nguoi_dung_id = ?",
    [nguoi_dung_id]
  );
};

// Xoá người dùng theo tài khoản
export const deleteNguoiDungByTaiKhoanId = async (tai_khoan_id: number): Promise<void> => {
  await connection.execute(
    "DELETE FROM nguoi_dung WHERE tai_khoan_id = ?",
    [tai_khoan_id]
  );
};

// Lấy người dùng theo tài khoản
export const getNguoiDungByTaiKhoanId = async (
  tai_khoan_id: number
): Promise<NguoiDung | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM nguoi_dung WHERE tai_khoan_id = ?",
    [tai_khoan_id]
  );
  return rows.length > 0 ? (rows[0] as NguoiDung) : null;
};
