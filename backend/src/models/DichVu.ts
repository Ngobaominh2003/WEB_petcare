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
    const fieldMappings: [keyof DichVu, string][] = [
      ['ten_dich_vu', 'ten_dich_vu = ?'],
      ['mo_ta', 'mo_ta = ?'],
      ['logo', 'logo = ?'],
      ['tai_khoan_id', 'tai_khoan_id = ?'],
      ['gia', 'gia = ?'],
      ['luot_dung', 'luot_dung = ?'],
      ['danh_muc_id', 'danh_muc_id = ?'],
      ['trang_thai', 'trang_thai = ?'],
      ['xet_duyet', 'xet_duyet = ?'],
      ['thoi_gian_hoan_thanh', 'thoi_gian_hoan_thanh = ?']
    ];
  
    const fieldsToUpdate: string[] = [];
    const values: any[] = [];
  
    for (const [key, sqlExpr] of fieldMappings) {
      if (dichVu[key] !== undefined) {
        fieldsToUpdate.push(sqlExpr);
        values.push(dichVu[key]);
      }
    }
  
    if (fieldsToUpdate.length === 0) {
      throw new Error("Không có trường nào để cập nhật");
    }
  
    const query = `
      UPDATE dich_vu
      SET ${fieldsToUpdate.join(", ")}
      WHERE dich_vu_id = ?
    `;
    values.push(dichVuId);
  
    try {
      console.log("Câu truy vấn:", query);
      console.log("Giá trị truyền vào:", values);
  
      const [result] = await connection.execute(query, values);
      const affectedRows = (result as { affectedRows: number }).affectedRows;
  
      if (affectedRows === 0) {
        throw new Error("Không tìm thấy dịch vụ để cập nhật");
      }
  
      return result;
    } catch (err: unknown) {
      throw new Error(
        err instanceof Error
          ? `Lỗi khi cập nhật dịch vụ: ${err.message}`
          : "Lỗi không xác định khi cập nhật dịch vụ"
      );
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
    SELECT 
      dv.*, 
      dmdv.ten_danh_muc,                      
      nc.ten_nha_cung_cap, 
      nc.dia_chi,            
      nd.sdt,                
      nd.avata, 
      tk.vai_tro
    FROM dich_vu dv
    INNER JOIN tai_khoan tk ON dv.tai_khoan_id = tk.tai_khoan_id
    INNER JOIN nha_cung_cap nc ON dv.tai_khoan_id = nc.tai_khoan_id
    INNER JOIN nguoi_dung nd ON dv.tai_khoan_id = nd.tai_khoan_id
    INNER JOIN danh_muc_dich_vu dmdv ON dv.danh_muc_id = dmdv.danh_muc_id
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

  // Lấy dịch vụ theo ID
  async getChiTietDichVu(dichVuId: number) {
    const query = `
      SELECT 
        dv.*, 
        nc.tai_khoan_id AS nha_cung_cap_tai_khoan_id,
        nc.ten_nha_cung_cap, 
        nc.dia_chi,
        nd.sdt,
        nd.avata,
        tk.vai_tro
      FROM dich_vu dv
      INNER JOIN tai_khoan tk ON dv.tai_khoan_id = tk.tai_khoan_id
      INNER JOIN nha_cung_cap nc ON dv.tai_khoan_id = nc.tai_khoan_id
      INNER JOIN nguoi_dung nd ON dv.tai_khoan_id = nd.tai_khoan_id
      WHERE dv.dich_vu_id = ?
    `;
  
    try {
      const [rows] = await connection.execute(query, [dichVuId]);
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0]; // Trả về chi tiết dịch vụ
      } else {
        throw new Error("Không tìm thấy dịch vụ với ID tương ứng");
      }
    } catch (err: unknown) {
      throw new Error(
        "Lỗi khi lấy chi tiết dịch vụ: " +
        (err instanceof Error ? err.message : "Lỗi không xác định")
      );
    }
  },
  
  async locDichVu(filters: {
    danh_muc_id?: string;
    loai_thu_cung?: string;
    danh_gia_tu?: string;
    gia_min?: string;
    gia_max?: string;
    sap_xep?: "gia_asc" | "gia_desc";
  }) {
    const {
      danh_muc_id,
      loai_thu_cung,
      danh_gia_tu,
      gia_min,
      gia_max,
      sap_xep
    } = filters;
  
    const where: string[] = [
      "dv.trang_thai = 1",
      "dv.xet_duyet = 'đã duyệt'"
    ];
    const params: any[] = [];
  
    if (danh_muc_id) {
      where.push("dv.danh_muc_id = ?");
      params.push(danh_muc_id);
    }
  
    if (loai_thu_cung) {
      where.push("dtc.loai_thu_cung = ?");
      params.push(loai_thu_cung);
    }
  
    if (gia_min) {
      where.push("dv.gia >= ?");
      params.push(Number(gia_min));
    }
  
    if (gia_max) {
      where.push("dv.gia <= ?");
      params.push(Number(gia_max));
    }
  
    let having = "";
    if (danh_gia_tu) {
      having = "HAVING diem_trung_binh >= ?";
      params.push(Number(danh_gia_tu));
    }
  
    let query = `
      SELECT 
        dv.*, 
        dmdv.ten_danh_muc,
        AVG(dg.diem) AS diem_trung_binh
      FROM dich_vu dv
      LEFT JOIN dich_vu_thu_cung dtc ON dv.dich_vu_id = dtc.dich_vu_id
      LEFT JOIN danh_gia dg ON dv.dich_vu_id = dg.dich_vu_id
      INNER JOIN danh_muc_dich_vu dmdv ON dv.danh_muc_id = dmdv.danh_muc_id
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      GROUP BY dv.dich_vu_id
      ${having}
    `;
  
    if (sap_xep === "gia_asc") query += " ORDER BY dv.gia ASC";
    if (sap_xep === "gia_desc") query += " ORDER BY dv.gia DESC";
  
    try {
      const [rows] = await connection.execute(query, params);
      return rows;
    } catch (err) {
      throw new Error(
        err instanceof Error
          ? `Lỗi khi lọc dịch vụ: ${err.message}`
          : "Lỗi không xác định khi lọc dịch vụ"
      );
    }
  }
  
  
};
