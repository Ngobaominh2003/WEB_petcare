import { RowDataPacket } from "mysql2/promise";
import connection from "../config/db";

export interface DanhGia extends RowDataPacket {
  danh_gia_id: number;
  tai_khoan_id: number;
  dich_vu_id: number;
  diem: number;
  binh_luan: string;
  hinh_anh?: string; 
  thoi_gian: Date;
}

export interface ThongKeDanhGia extends RowDataPacket {
  diem_trung_binh: number | null;
  tong_so_danh_gia: number;
  tong_diem: number | null;
}

export const danhGiaModel = {
  // Thêm đánh giá mới
  async themDanhGia(data: Omit<DanhGia, "danh_gia_id" | "thoi_gian">) {
    const query = `
      INSERT INTO danh_gia (tai_khoan_id, dich_vu_id, diem, binh_luan, hinh_anh)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      data.tai_khoan_id,
      data.dich_vu_id,
      data.diem,
      data.binh_luan,
      data.hinh_anh ?? null,
    ];
    const [result] = await connection.execute(query, values);

    // Trả về bản ghi có ảnh nếu cần
    const [rows] = await connection.execute<DanhGia[]>(`
      SELECT dg.*, tk.hinh_anh AS avatar, nd.ho_ten
      FROM danh_gia dg
      JOIN tai_khoan tk ON dg.tai_khoan_id = tk.tai_khoan_id
      JOIN nguoi_dung nd ON tk.tai_khoan_id = nd.tai_khoan_id
      WHERE dg.danh_gia_id = LAST_INSERT_ID()
    `);

    return rows[0];
  },

  // Lấy tất cả hoặc lọc theo dịch vụ hoặc tài khoản
  async getDanhSachDanhGia(dich_vu_id?: number, tai_khoan_id?: number) {
    let query = `
      SELECT dg.*, nd.avata, nd.ho_ten
      FROM danh_gia dg
      JOIN tai_khoan tk ON dg.tai_khoan_id = tk.tai_khoan_id
      JOIN nguoi_dung nd ON tk.tai_khoan_id = nd.tai_khoan_id
      WHERE 1=1

    `;
    const values: any[] = [];

    if (dich_vu_id !== undefined) {
      query += ` AND dg.dich_vu_id = ?`;
      values.push(dich_vu_id);
    }

    if (tai_khoan_id !== undefined) {
      query += ` AND dg.tai_khoan_id = ?`;
      values.push(tai_khoan_id);
    }

    query += ` ORDER BY dg.thoi_gian DESC`;

    const [rows] = await connection.execute<DanhGia[]>(query, values);
    return rows;
  },

  // Lấy chi tiết theo ID
  async getDanhGiaTheoId(id: number) {
    const query = `
      SELECT dg.*, nd.avata, nd.ho_ten
      FROM danh_gia dg
      JOIN tai_khoan tk ON dg.tai_khoan_id = tk.tai_khoan_id
      JOIN nguoi_dung nd ON tk.tai_khoan_id = nd.tai_khoan_id
      WHERE dg.danh_gia_id = ?
    `;
    const [rows] = await connection.execute<DanhGia[]>(query, [id]);
    return rows[0];
  }
  ,
  // Cập nhật đánh giá
  async capNhatDanhGia(
    id: number,
    data: Partial<
      Omit<DanhGia, "danh_gia_id" | "tai_khoan_id" | "dich_vu_id" | "thoi_gian">
    >
  ) {
    const fields = [];
    const values = [];

    if (data.diem !== undefined) {
      fields.push("diem = ?");
      values.push(data.diem);
    }

    if (data.binh_luan !== undefined) {
      fields.push("binh_luan = ?");
      values.push(data.binh_luan);
    }

    if (fields.length === 0) {
      throw new Error("Không có trường nào để cập nhật");
    }

    const query = `UPDATE danh_gia SET ${fields.join(
      ", "
    )} WHERE danh_gia_id = ?`;
    values.push(id);

    const [result] = await connection.execute(query, values);
    return result;
  },

  // Xóa đánh giá
  async xoaDanhGia(id: number) {
    const query = `DELETE FROM danh_gia WHERE danh_gia_id = ?`;
    const [result] = await connection.execute(query, [id]);
    return result;
  },

  // Tính điểm trung bình và tổng đánh giá cho 1 dịch vụ
  async thongKeDanhGia(dich_vu_id: number) {
    const query = `
      SELECT 
        AVG(diem) AS diem_trung_binh,
        COUNT(*) AS tong_so_danh_gia,
        SUM(diem) AS tong_diem
      FROM danh_gia
      WHERE dich_vu_id = ?
    `;

    const [rows] = await connection.execute<ThongKeDanhGia[]>(query, [
      dich_vu_id,
    ]);
    return rows[0];
  },
};
