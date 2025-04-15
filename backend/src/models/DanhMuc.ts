import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db"; // Kết nối database

// Định nghĩa interface cho danh mục dịch vụ
interface DanhMuc extends RowDataPacket {
  danh_muc_id: number;
  ten_danh_muc: string;
  mo_ta?: string;
}

export const DanhMucModel = {
  // Thêm danh mục dịch vụ
  async themDanhMuc(danhMuc: DanhMuc) {
    const query = `
      INSERT INTO danh_muc_dich_vu (ten_danh_muc, mo_ta)
      VALUES (?, ?)
    `;
    const values = [danhMuc.ten_danh_muc, danhMuc.mo_ta || null];

    try {
      const [result] = await connection.execute(query, values);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi thêm danh mục: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi thêm danh mục");
      }
    }
  },

  // Cập nhật danh mục dịch vụ
  async capNhatDanhMuc(danhMucId: number, danhMuc: DanhMuc) {
    const query = `
      UPDATE danh_muc_dich_vu
      SET ten_danh_muc = ?, mo_ta = ?
      WHERE danh_muc_id = ?
    `;
    const values = [danhMuc.ten_danh_muc, danhMuc.mo_ta || null, danhMucId];

    try {
      const [result] = await connection.execute(query, values);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi cập nhật danh mục: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi cập nhật danh mục");
      }
    }
  },

  // Xóa danh mục dịch vụ
  async xoaDanhMuc(danhMucId: number) {
    const query = `
      DELETE FROM danh_muc_dich_vu WHERE danh_muc_id = ?
    `;
    const values = [danhMucId];

    try {
      const [result] = await connection.execute(query, values);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi xóa danh mục: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi xóa danh mục");
      }
    }
  },

  // Lấy danh sách tất cả danh mục
  async getDanhSachDanhMuc() {
    const query = "SELECT * FROM danh_muc_dich_vu";

    try {
      const [rows] = await connection.execute(query);
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi lấy danh sách danh mục: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi lấy danh sách danh mục");
      }
    }
  },
};
