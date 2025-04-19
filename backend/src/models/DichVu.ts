import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db"; // Kết nối database

interface DichVu extends RowDataPacket {
  dich_vu_id: number;
  ten_dich_vu: string;
  mo_ta: string;
  logo?: string;
  gia: number;
  ngay_tao: Date;
  tai_khoan_id: number;
  luot_dung: number;
  trang_thai: number;
  xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
  thoi_gian_hoan_thanh?: string;
  danh_muc_id: number;
}

export const dichVuModel = {
  // Thêm mới dịch vụ
  async themDichVu(dichVu: DichVu) {
    const query = `
      INSERT INTO dich_vu (ten_dich_vu, mo_ta, logo, gia, tai_khoan_id, luot_dung, trang_thai, xet_duyet, thoi_gian_hoan_thanh, danh_muc_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      dichVu.ten_dich_vu,
      dichVu.mo_ta,
      dichVu.logo || null,
      dichVu.gia,
      dichVu.tai_khoan_id,
      dichVu.luot_dung || 0,
      dichVu.trang_thai || 1,
      dichVu.xet_duyet || "chờ duyệt",
      dichVu.thoi_gian_hoan_thanh || null,
      dichVu.danh_muc_id, // thêm danh_muc_id
    ];

    try {
      const [result] = await connection.execute(query, values);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi thêm dịch vụ: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi thêm dịch vụ");
      }
    }
  },

  async capNhatDichVu(dichVuId: number, dichVu: Partial<DichVu>) {
    const fieldsToUpdate = [];
    const values = [];

    if (dichVu.ten_dich_vu) {
      fieldsToUpdate.push("ten_dich_vu = ?");
      values.push(dichVu.ten_dich_vu);
    }
    if (dichVu.mo_ta) {
      fieldsToUpdate.push("mo_ta = ?");
      values.push(dichVu.mo_ta);
    }
    if (dichVu.logo !== undefined) {
      fieldsToUpdate.push("logo = ?");
      values.push(dichVu.logo);
    }
    if (dichVu.gia !== undefined) {
      fieldsToUpdate.push("gia = ?");
      values.push(dichVu.gia);
    }
    if (dichVu.luot_dung !== undefined) {
      fieldsToUpdate.push("luot_dung = ?");
      values.push(dichVu.luot_dung);
    }
    if (dichVu.danh_muc_id !== undefined) {
      fieldsToUpdate.push("danh_muc_id = ?");
      values.push(dichVu.danh_muc_id);
    }

    if (dichVu.trang_thai !== undefined) {
      fieldsToUpdate.push("trang_thai = ?");
      values.push(dichVu.trang_thai);
    }
    if (dichVu.xet_duyet !== undefined) {
      fieldsToUpdate.push("xet_duyet = ?");
      values.push(dichVu.xet_duyet);
    }
    // Kiểm tra thoi_gian_hoan_thanh
    if (dichVu.thoi_gian_hoan_thanh !== undefined) {
      fieldsToUpdate.push("thoi_gian_hoan_thanh = ?");
      values.push(dichVu.thoi_gian_hoan_thanh);
    }

    // Nếu không có trường nào để cập nhật
    if (fieldsToUpdate.length === 0) {
      throw new Error("Không có trường nào để cập nhật");
    }

    // Truy vấn SQL để cập nhật dữ liệu
    const query = `
    UPDATE dich_vu
    SET ${fieldsToUpdate.join(", ")}
    WHERE dich_vu_id = ?
  `;
    values.push(dichVuId);

    try {
      // Ghi log để kiểm tra các giá trị truyền vào
      console.log("Câu truy vấn:", query);
      console.log("Giá trị truyền vào:", values);

      // Thực thi truy vấn
      const [result] = await connection.execute(query, values);

      // Kiểm tra nếu affectedRows > 0 thì cập nhật thành công
      const affectedRows = (result as { affectedRows: number }).affectedRows;
      if (affectedRows === 0) {
        throw new Error("Không tìm thấy dịch vụ để cập nhật");
      }
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi cập nhật dịch vụ: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi cập nhật dịch vụ");
      }
    }
  },

  // Hiển thị danh sách tất cả dịch vụ
  async getDanhSachDichVu() {
    const query = `SELECT * FROM dich_vu`;
    try {
      const [rows] = await connection.execute(query);
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi hiển thị danh sách dịch vụ: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi hiển thị danh sách dịch vụ");
      }
    }
  },

  // Hiển thị dịch vụ theo tai_khoan_id
  async getDichVuTheoTaiKhoanId(taiKhoanId: number) {
    const query = `SELECT * FROM dich_vu WHERE tai_khoan_id = ?`;
    try {
      const [rows] = await connection.execute(query, [taiKhoanId]);
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(
          `Lỗi khi lấy dịch vụ theo tai_khoan_id: ${err.message}`
        );
      } else {
        throw new Error("Lỗi không xác định khi lấy dịch vụ theo tai_khoan_id");
      }
    }
  },

  // Xóa dịch vụ theo dich_vu_id
  async xoaDichVu(dichVuId: number) {
    const query = `DELETE FROM dich_vu WHERE dich_vu_id = ?`;
    try {
      const [result] = await connection.execute(query, [dichVuId]);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi xóa dịch vụ: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi xóa dịch vụ");
      }
    }
  },

  // Tìm dịch vụ theo tên gần đúng
  async timDichVuTheoTen(tenDichVu: string) {
    const query = `SELECT * FROM dich_vu WHERE ten_dich_vu LIKE ?`;
    try {
      // Sử dụng dấu `%` để tìm kiếm tên gần đúng (tên chứa chuỗi tìm kiếm)
      const [rows] = await connection.execute(query, [`%${tenDichVu}%`]);
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi tìm dịch vụ: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi tìm dịch vụ");
      }
    }
  },

  async getDichVuTheoDanhMucId(danhMucId: number) {
    const query = `SELECT * FROM dich_vu WHERE danh_muc_id = ?`;
    try {
      const [rows] = await connection.execute(query, [danhMucId]);
      return rows;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Lỗi khi lấy dịch vụ theo danh_muc_id: ${err.message}`);
      } else {
        throw new Error("Lỗi không xác định khi lấy dịch vụ theo danh_muc_id");
      }
    }
  },

  // Lấy danh sách dịch vụ theo điều kiện
  async getDichVuTheoDieuKien() {
    const query = `
          SELECT dv.*, 
       nc.ten_nha_cung_cap, 
       nd.avata, 
       tk.vai_tro
FROM dich_vu dv
INNER JOIN tai_khoan tk ON dv.tai_khoan_id = tk.tai_khoan_id
INNER JOIN nha_cung_cap nc ON dv.tai_khoan_id = nc.tai_khoan_id  -- Thêm bảng nha_cung_cap
INNER JOIN nguoi_dung nd ON dv.tai_khoan_id = nd.tai_khoan_id  -- Thêm bảng nguoi_dung
WHERE dv.trang_thai = 1
  AND dv.xet_duyet = 'đã duyệt'
  AND tk.vai_tro = 'nha_cung_cap'
  AND tk.trang_thai = 'hoat_dong'
  AND tk.trang_thai_xet_duyet = 'đã duyệt'

        `;

    try {
      const [rows] = await connection.execute(query);
      return rows as RowDataPacket[];
    } catch (err: unknown) {
      throw new Error(
        "Lỗi khi lấy danh sách dịch vụ: " +
          (err instanceof Error ? err.message : "Lỗi không xác định")
      );
    }
  },
};
