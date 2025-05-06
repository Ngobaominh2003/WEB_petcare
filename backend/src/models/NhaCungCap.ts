import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

export interface NhaCungCap extends RowDataPacket {
  nha_cung_cap_id: number;
  tai_khoan_id: number;
  ten_nha_cung_cap: string;
  ma_so_thue: string;
  giay_phep_kinh_doanh?: string;
  loai_hinh: string;
  mo_ta: string | null;
  dia_chi?: string;
}

// Thêm nhà cung cấp
export const createNhaCungCap = async (
  tai_khoan_id: number,
  ten_nha_cung_cap: string,
  ma_so_thue: string,
  giay_phep_kinh_doanh: string,
  dia_chi: string,
  loai_hinh: string,
  mo_ta: string | null
): Promise<void> => {
  await connection.execute(
    `INSERT INTO nha_cung_cap (
      tai_khoan_id, ten_nha_cung_cap, ma_so_thue,
      giay_phep_kinh_doanh, dia_chi, loai_hinh, mo_ta
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [tai_khoan_id, ten_nha_cung_cap, ma_so_thue, giay_phep_kinh_doanh, dia_chi, loai_hinh, mo_ta]
  );
};

// Cập nhật nhà cung cấp
export const updateNhaCungCap = async (
  tai_khoan_id: number,
  updates: Partial<Omit<NhaCungCap, 'nha_cung_cap_id' | 'tai_khoan_id'>>
): Promise<void> => {
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  const fieldMap: { [key: string]: any } = {
    ten_nha_cung_cap: updates.ten_nha_cung_cap,
    ma_so_thue: updates.ma_so_thue,
    giay_phep_kinh_doanh: updates.giay_phep_kinh_doanh,
    dia_chi: updates.dia_chi,
    loai_hinh: updates.loai_hinh,
    mo_ta: updates.mo_ta
  };

  for (const [key, value] of Object.entries(fieldMap)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) throw new Error("Không có thông tin nào để cập nhật");

  const query = `UPDATE nha_cung_cap SET ${fields.join(', ')} WHERE tai_khoan_id = ?`;
  values.push(tai_khoan_id);

  await connection.execute(query, values);
};

// Xóa theo ID
export const deleteNhaCungCap = async (nha_cung_cap_id: number): Promise<void> => {
  await connection.execute("DELETE FROM nha_cung_cap WHERE nha_cung_cap_id = ?", [nha_cung_cap_id]);
};

// Xóa theo tài khoản
export const deleteNhaCungCapByTaiKhoanId = async (tai_khoan_id: number): Promise<void> => {
  await connection.execute("DELETE FROM nha_cung_cap WHERE tai_khoan_id = ?", [tai_khoan_id]);
};

// Lấy theo tài khoản
export const getNhaCungCapByTaiKhoanId = async (
  tai_khoan_id: number
): Promise<NhaCungCap | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM nha_cung_cap WHERE tai_khoan_id = ?",
    [tai_khoan_id]
  );
  return rows.length > 0 ? (rows[0] as NhaCungCap) : null;
};

// Lấy theo tên nhà cung cấp
export const getNhaCungCapByName = async (
  ten_nha_cung_cap: string
): Promise<NhaCungCap | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM nha_cung_cap WHERE ten_nha_cung_cap = ?",
    [ten_nha_cung_cap]
  );
  return rows.length > 0 ? (rows[0] as NhaCungCap) : null;
};

// Lấy toàn bộ danh sách nhà cung cấp
export const getDanhSachNhaCungCap = async (): Promise<NhaCungCap[]> => {
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT * FROM nha_cung_cap"
    );
    return rows as NhaCungCap[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Lỗi khi lấy danh sách nhà cung cấp: ${err.message}`);
    } else {
      throw new Error("Lỗi không xác định khi lấy danh sách nhà cung cấp");
    }
  }
};
