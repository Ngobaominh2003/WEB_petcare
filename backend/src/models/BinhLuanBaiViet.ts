import { RowDataPacket } from "mysql2";
import connection from "../config/db";

// Interface đại diện cho 1 dòng dữ liệu từ bảng binh_luan_bai_viet
export interface BinhLuanBaiViet extends RowDataPacket {
  binh_luan_id: number;
  bai_viet_id: number;
  tai_khoan_id: number;
  noi_dung: string;
  thoi_gian_binh_luan: string;
}

// Lấy tất cả bình luận
export const getAllBinhLuan = async (): Promise<BinhLuanBaiViet[]> => {
  const [rows] = await connection.execute<BinhLuanBaiViet[]>(
    "SELECT * FROM binh_luan_bai_viet ORDER BY thoi_gian_binh_luan DESC"
  );
  return rows;
};

// Lấy bình luận theo bài viết
export const getBinhLuanByBaiVietId = async (
    bai_viet_id: number
  ): Promise<BinhLuanBaiViet[]> => {
    const [rows] = await connection.execute<BinhLuanBaiViet[]>(
      `
      SELECT 
        bl.*, 
        nd.ho_ten 
      FROM binh_luan_bai_viet bl
      JOIN nguoi_dung nd ON bl.tai_khoan_id = nd.tai_khoan_id
      WHERE bl.bai_viet_id = ?
      ORDER BY bl.thoi_gian_binh_luan DESC
      `,
      [bai_viet_id]
    );
    return rows;
  };
  

// Thêm bình luận mới
export const createBinhLuan = async (
  bai_viet_id: number,
  tai_khoan_id: number,
  noi_dung: string
): Promise<number> => {
  const [result] = await connection.execute(
    "INSERT INTO binh_luan_bai_viet (bai_viet_id, tai_khoan_id, noi_dung) VALUES (?, ?, ?)",
    [bai_viet_id, tai_khoan_id, noi_dung]
  );
  return (result as any).insertId;
};

// Sửa nội dung bình luận
export const updateBinhLuan = async (
  binh_luan_id: number,
  noi_dung: string
): Promise<void> => {
  await connection.execute(
    "UPDATE binh_luan_bai_viet SET noi_dung = ? WHERE binh_luan_id = ?",
    [noi_dung, binh_luan_id]
  );
};

// Xoá bình luận
export const deleteBinhLuan = async (binh_luan_id: number): Promise<void> => {
  await connection.execute(
    "DELETE FROM binh_luan_bai_viet WHERE binh_luan_id = ?",
    [binh_luan_id]
  );
};
