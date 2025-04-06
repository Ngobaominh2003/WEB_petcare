import connection from '../config/db';
import { RowDataPacket } from 'mysql2/promise';

export interface BaiViet extends RowDataPacket {
    bai_viet_id: number;
    nguoi_dung_id: number | null;
    tieu_de: string;
    noi_dung: string | null;
    ngay_tao: Date;
    hinh_anh: string | null;
    trang_thai: 'đã duyệt' | 'chờ duyệt' | 'hủy';
  }

// Lấy tất cả bài viết
export const getAllBaiViet = async (): Promise<BaiViet[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM bai_viet'
  );
  return rows as BaiViet[];
};

// Lấy bài viết theo nguoi_dung_id
export const getBaiVietByNguoiDung = async (nguoi_dung_id: number): Promise<BaiViet[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM bai_viet WHERE nguoi_dung_id = ?',
    [nguoi_dung_id]
  );
  return rows as BaiViet[];
};

// Lấy bài viết theo bai_viet_id

export const getBaiVietById = async (bai_viet_id: number): Promise<BaiViet | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM bai_viet WHERE bai_viet_id = ?',
    [bai_viet_id]
  );
  // Return the first row or null if no results
  return rows.length > 0 ? (rows[0] as BaiViet) : null;
};


// Thêm bài viết mới
export const createBaiViet = async (
  nguoi_dung_id: number | null,
  tieu_de: string,
  noi_dung: string | null,
  hinh_anh: string | null
): Promise<void> => {
  const trang_thai = 'chờ duyệt'; 
  const ngay_tao = new Date();

  await connection.execute(
    'INSERT INTO bai_viet (nguoi_dung_id, tieu_de, noi_dung, ngay_tao, hinh_anh, trang_thai) VALUES (?, ?, ?, ?, ?, ?)',
    [nguoi_dung_id, tieu_de, noi_dung, ngay_tao, hinh_anh, trang_thai]
  );
};

// Cập nhật bài viết theo bai_viet_id
export const updateBaiViet = async (
  bai_viet_id: number,
  tieu_de: string,
  noi_dung: string | null,
  hinh_anh: string | null,
  trang_thai?: 'đã duyệt' | 'chờ duyệt' | 'hủy' 
): Promise<void> => {
  let query = 'UPDATE bai_viet SET tieu_de = ?';
  const params: any[] = [tieu_de];

  // Chỉ cập nhật trường trang_thai nếu nó được truyền vào
  if (trang_thai !== undefined && trang_thai !== null) {
    query += ', trang_thai = ?';
    params.push(trang_thai);
  }

  // Kiểm tra và thêm nội dung nếu nó được cung cấp
  if (noi_dung !== undefined && noi_dung !== null) {
    query += ', noi_dung = ?';
    params.push(noi_dung);
  }

  // Kiểm tra và thêm hình ảnh nếu nó được cung cấp
  if (hinh_anh !== undefined && hinh_anh !== null) {
    query += ', hinh_anh = ?';
    params.push(hinh_anh);
  }

  query += ' WHERE bai_viet_id = ?';
  params.push(bai_viet_id);

  // Thực hiện câu truy vấn cập nhật
  await connection.execute(query, params);
};
;
  

// Xóa bài viết theo bai_viet_id
export const deleteBaiViet = async (bai_viet_id: number): Promise<void> => {
  await connection.execute(
    'DELETE FROM bai_viet WHERE bai_viet_id = ?',
    [bai_viet_id]
  );
};
