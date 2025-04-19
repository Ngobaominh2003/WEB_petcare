import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db"; // Kết nối database

interface ThuCung extends RowDataPacket {
  thu_cung_id: number;
  tai_khoan_id: number;
  ten: string;
  loai: string;
  gioi_tinh: "đực" | "cái" | "khác" ;
  tuoi: number;
  can_nang: number ;
  hinh_anh: string ;
}


export const thuCungModel = {
  // Thêm mới thú cưng
  async themThuCung(thuCung: any) {
    const query = `
      INSERT INTO thu_cung (tai_khoan_id, ten, loai, gioi_tinh, tuoi, can_nang, hinh_anh)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      thuCung.tai_khoan_id,
      thuCung.ten || "",
      thuCung.loai || "",
      thuCung.gioi_tinh || "khác",
      thuCung.tuoi !== undefined ? thuCung.tuoi : null,
      thuCung.can_nang !== undefined ? thuCung.can_nang : null,
      thuCung.hinh_anh || null,
    ];

    try {
      const [result] = await connection.execute(query, values);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi thêm thú cưng: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi thêm thú cưng");
      }
    }
  },

  // Cập nhật thông tin thú cưng
  async capNhatThuCung(thuCungId: number, thuCung: Partial<ThuCung>) {
    const fieldsToUpdate = [];
    const values = [];

    if (thuCung.ten) {
      fieldsToUpdate.push("ten = ?");
      values.push(thuCung.ten);
    }
    if (thuCung.loai) {
      fieldsToUpdate.push("loai = ?");
      values.push(thuCung.loai);
    }
    if (thuCung.gioi_tinh !== undefined) {
      fieldsToUpdate.push("gioi_tinh = ?");
      values.push(thuCung.gioi_tinh);
    }
    if (thuCung.tuoi !== undefined) {
      fieldsToUpdate.push("tuoi = ?");
      values.push(thuCung.tuoi);
    }
    if (thuCung.can_nang !== undefined) {
      fieldsToUpdate.push("can_nang = ?");
      values.push(thuCung.can_nang);
    }
    if (thuCung.hinh_anh !== undefined) {
      fieldsToUpdate.push("hinh_anh = ?");
      values.push(thuCung.hinh_anh);
    }

    if (fieldsToUpdate.length === 0) {
      throw new Error("Không có trường nào để cập nhật");
    }

    const query = `
      UPDATE thu_cung
      SET ${fieldsToUpdate.join(", ")}
      WHERE thu_cung_id = ?
    `;
    values.push(thuCungId);

    try {
      const [result] = await connection.execute(query, values);
      const affectedRows = (result as { affectedRows: number }).affectedRows;
      if (affectedRows === 0) {
        throw new Error("Không tìm thấy thú cưng để cập nhật");
      }
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi cập nhật thú cưng: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi cập nhật thú cưng");
      }
    }
  },

  // Lấy danh sách thú cưng theo tai_khoan_id
  async getThuCungTheoTaiKhoanId(taiKhoanId: number) {
    const query = `SELECT * FROM thu_cung WHERE tai_khoan_id = ?`;
    try {
      const [rows] = await connection.execute(query, [taiKhoanId]);
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi lấy thú cưng theo tai_khoan_id: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi lấy thú cưng theo tai_khoan_id");
      }
    }
  },

  // Xóa thú cưng theo thu_cung_id
  async xoaThuCung(thuCungId: number) {
    const query = `DELETE FROM thu_cung WHERE thu_cung_id = ?`;
    try {
      const [result] = await connection.execute(query, [thuCungId]);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi xóa thú cưng: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi xóa thú cưng");
      }
    }
  },

  // Tìm thú cưng theo tên gần đúng
  async timThuCungTheoTen(tenThuCung: string) {
    const query = `SELECT * FROM thu_cung WHERE ten LIKE ?`;
    try {
      const [rows] = await connection.execute(query, [`%${tenThuCung}%`]);
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi tìm thú cưng: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi tìm thú cưng");
      }
    }
  },
};

