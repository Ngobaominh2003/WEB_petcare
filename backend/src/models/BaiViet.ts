import { RowDataPacket } from "mysql2";
import connection from "../config/db"; // sửa lại path nếu cần

export interface BaiViet extends RowDataPacket {
  bai_viet_id: number;
  tai_khoan_id: number;
  tieu_de: string | null;
  noi_dung: string;
  hinh_anh: string | null;
  ngay_dang: Date;
  trang_thai: "hien" | "an";
  xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
}

export const getAllBaiViet = async (): Promise<BaiViet[]> => {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        bv.bai_viet_id,
        bv.tieu_de,
        bv.noi_dung,
        bv.hinh_anh,
        bv.ngay_dang,
        bv.trang_thai,
        bv.xet_duyet,
        nd.ho_ten AS nguoi_dung 
      FROM bai_viet bv
      JOIN nguoi_dung nd ON bv.tai_khoan_id = nd.tai_khoan_id
      ORDER BY bv.ngay_dang DESC
    `);
    return rows as BaiViet[];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error);
    throw error;
  }
};

export const getDSBaiViet = async (): Promise<BaiViet[]> => {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        bv.bai_viet_id,
        bv.tieu_de,
        bv.noi_dung,
        bv.hinh_anh,
        bv.ngay_dang,
        nd.ho_ten AS nguoi_dung 
      FROM bai_viet bv
      JOIN nguoi_dung nd ON bv.tai_khoan_id = nd.tai_khoan_id
      WHERE bv.trang_thai = 'hien' AND bv.xet_duyet = 'đã duyệt'

    `);
    return rows as BaiViet[];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error);
    throw error;
  }
};

export const getBaiVietById = async (id: number): Promise<any> => {
  const [rows] = await connection.execute<any[]>(
    `SELECT 
      bv.*, 
      nd.ho_ten AS nguoi_dung, 
      nd.avata
    FROM bai_viet bv
    JOIN nguoi_dung nd ON bv.tai_khoan_id = nd.tai_khoan_id
    WHERE bv.bai_viet_id = ?
`,
    [id]
  );
  return rows[0] || null;
};

export const createBaiViet = async (data: {
  tai_khoan_id: number;
  tieu_de: string;
  noi_dung: string;
  hinh_anh?: string;
}): Promise<void> => {
  const { tai_khoan_id, tieu_de, noi_dung, hinh_anh } = data;
  await connection.execute(
    "INSERT INTO bai_viet (tai_khoan_id, tieu_de, noi_dung, hinh_anh) VALUES (?, ?, ?, ?)",
    [tai_khoan_id, tieu_de, noi_dung, hinh_anh || null]
  );
};

export const updateBaiViet = async (
  id: number,
  data: {
    tieu_de?: string;
    noi_dung?: string;
    hinh_anh?: string | null;
    trang_thai?: "hien" | "an";
    xet_duyet?: "chờ duyệt" | "đã duyệt" | "không duyệt";
  }
): Promise<void> => {
  const fields: string[] = [];
  const values: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) return;

  values.push(id);
  const query = `UPDATE bai_viet SET ${fields.join(
    ", "
  )} WHERE bai_viet_id = ?`;

  await connection.execute(query, values);
};

export const deleteBaiViet = async (id: number): Promise<void> => {
  await connection.execute("DELETE FROM bai_viet WHERE bai_viet_id = ?", [id]);
};
export function baiVietGetAll() {
  throw new Error("Function not implemented.");
}
export function baiVietGetById(id: number) {
  throw new Error("Function not implemented.");
}
export function baiVietDelete(id: number) {
  throw new Error("Function not implemented.");
}
