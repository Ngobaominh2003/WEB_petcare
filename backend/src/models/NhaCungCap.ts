// models/NhaCungCap.ts
import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db"; // Đảm bảo bạn đã cấu hình kết nối với MySQL

// Định nghĩa interface cho nhà cung cấp
export interface NhaCungCap extends RowDataPacket {
  nha_cung_cap_id: number;
  tai_khoan_id: number;
  ten_nha_cung_cap: string;
  ma_so_thue: string;
  giay_phep_kinh_doanh?: string;
  loai_hinh: string,
  mo_ta: string | null
}

// Thêm nhà cung cấp

export const createNhaCungCap = async (
  tai_khoan_id: number,
  ten_nha_cung_cap: string,
  ma_so_thue: string,
  giay_phep_kinh_doanh: string | null,
  dia_chi: string,
  loai_hinh: string,
  mo_ta: string | null
): Promise<void> => {
  await connection.execute(
    "INSERT INTO nha_cung_cap (tai_khoan_id, ten_nha_cung_cap, ma_so_thue, giay_phep_kinh_doanh, dia_chi, loai_hinh, mo_ta) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      tai_khoan_id,
      ten_nha_cung_cap,
      ma_so_thue,
      giay_phep_kinh_doanh,
      dia_chi,
      loai_hinh,
      mo_ta
    ]
  );
};

// updateNhaCungCap trong model
export const updateNhaCungCap = async (
  nha_cung_cap_id: number,
  tai_khoan_id: number,
  ten_nha_cung_cap?: string,
  ma_so_thue?: string,
  giay_phep_kinh_doanh?: string | null,
  dia_chi?: string,
  loai_hinh?: string,
  mo_ta?: string | null
): Promise<void> => {
  let query = "UPDATE nha_cung_cap SET ";
  const values: (string | number | null)[] = [];

  // Thêm các trường cần cập nhật
  if (ten_nha_cung_cap !== undefined) {
    query += "ten_nha_cung_cap = ?, ";
    values.push(ten_nha_cung_cap);
  }

  if (ma_so_thue !== undefined) {
    query += "ma_so_thue = ?, ";
    values.push(ma_so_thue);
  }

  if (giay_phep_kinh_doanh !== undefined) {
    query += "giay_phep_kinh_doanh = ?, ";
    values.push(giay_phep_kinh_doanh === null ? null : giay_phep_kinh_doanh);
  }

  if (dia_chi !== undefined) {
    query += "dia_chi = ?, ";
    values.push(dia_chi);
  }

  if (loai_hinh !== undefined) {
    query += "loai_hinh = ?, ";
    values.push(loai_hinh);
  }

  if (mo_ta !== undefined) {
    query += "mo_ta = ?, ";
    values.push(mo_ta === null ? null : mo_ta);
  }

  // Nếu không có bất kỳ trường nào được truyền vào để cập nhật, ném lỗi
  if (values.length === 0) {
    throw new Error("Không có thông tin nào để cập nhật");
  }

  // Xóa dấu phẩy thừa cuối cùng
  query = query.slice(0, -2);

  // Thêm điều kiện WHERE
  query += " WHERE tai_khoan_id = ?";
  values.push(tai_khoan_id);

  // Thực hiện câu lệnh SQL
  await connection.execute(query, values);
};


// Xóa nhà cung cấp
export const deleteNhaCungCap = async (
  nha_cung_cap_id: number
): Promise<void> => {
  await connection.execute(
    "DELETE FROM nha_cung_cap WHERE nha_cung_cap_id = ?",
    [nha_cung_cap_id]
  );
};

// Tìm nhà cung cấp theo `tai_khoan_id`
export const getNhaCungCapByTaiKhoanId = async (
  tai_khoan_id: number
): Promise<NhaCungCap | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM nha_cung_cap WHERE tai_khoan_id = ?",
    [tai_khoan_id]
  );
  return rows.length > 0 ? (rows[0] as NhaCungCap) : null;
};

// Xóa nhà cung cấp theo tai_khoan_id
export const deleteNhaCungCapByTaiKhoanId = async (
  tai_khoan_id: number
): Promise<void> => {
  await connection.execute("DELETE FROM nha_cung_cap WHERE tai_khoan_id = ?", [
    tai_khoan_id,
  ]);
};

// Tìm nhà cung cấp theo tên nhà cung cấp (ten_nha_cung_cap)
export const getNhaCungCapByName = async (
  ten_nha_cung_cap: string
): Promise<NhaCungCap | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    "SELECT * FROM nha_cung_cap WHERE ten_nha_cung_cap = ?",
    [ten_nha_cung_cap]
  );
  return rows.length > 0 ? (rows[0] as NhaCungCap) : null;
};
