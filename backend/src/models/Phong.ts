import { RowDataPacket } from 'mysql2/promise';
import connection from '../config/db'; // Đảm bảo bạn đã cấu hình kết nối với MySQL

// Định nghĩa interface cho phòng
export interface Phong extends RowDataPacket {
  phong_id: number;
  so_phong: string;
  trang_thai_phong: 'đang trống' | 'đã đặt' | 'đang sửa chữa';
  ngay_tao: Date;
}

// Lấy tất cả phòng
export const getAllPhong = async (): Promise<Phong[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT phong_id, so_phong, trang_thai_phong, ngay_tao FROM phong'
  );
  return rows as Phong[];
};
// Lấy tất cả các phòng trống
export const getPhongTrong = async (): Promise<Phong[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT phong_id, so_phong, trang_thai_phong, ngay_tao FROM phong WHERE trang_thai_phong = "đang trống"'
  );
  return rows as Phong[];
};
// Lấy phòng theo `phong_id`
export const getPhongById = async (phong_id: number): Promise<Phong | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT phong_id, so_phong, trang_thai_phong, ngay_tao FROM phong WHERE phong_id = ?',
    [phong_id]
  );
  return rows.length > 0 ? (rows[0] as Phong) : null;
};

// Thêm phòng mới (không có gia_phong)
export const createPhong = async (
  so_phong: string,  // Giữ lại so_phong
  trang_thai_phong: 'đang trống' | 'đã đặt' | 'đang sửa chữa' = 'đang trống'
): Promise<void> => {
  const ngay_tao = new Date();

  await connection.execute(
    'INSERT INTO phong (so_phong, trang_thai_phong, ngay_tao) VALUES (?, ?, ?)',
    [so_phong, trang_thai_phong, ngay_tao]
  );
};

// Hàm cập nhật thông tin phòng chỉ khi có giá trị được cung cấp
export const updatePhong = async (
  phong_id: number,
  so_phong?: string,   // Optional
  trang_thai_phong?: 'đang trống' | 'đã đặt' | 'đang sửa chữa'  // Optional
): Promise<void> => {
  let query = 'UPDATE phong SET ';
  const values: (string | number)[] = [];

  // Kiểm tra và thêm trường so_phong nếu có giá trị
  if (so_phong) {
    query += 'so_phong = ?, ';
    values.push(so_phong);
  }

  // Kiểm tra và thêm trường trang_thai_phong nếu có giá trị
  if (trang_thai_phong) {
    query += 'trang_thai_phong = ?, ';
    values.push(trang_thai_phong);
  }

  // Nếu không có trường nào được cung cấp, ném lỗi
  if (values.length === 0) {
    throw new Error('Không có thông tin nào để cập nhật');
  }

  // Loại bỏ dấu phẩy thừa cuối cùng và thêm điều kiện WHERE
  query = query.slice(0, -2);  // Xóa dấu phẩy thừa
  query += ' WHERE phong_id = ?';
  values.push(phong_id);

  // Thực hiện truy vấn
  await connection.execute(query, values);
};

// Cập nhật trạng thái phòng theo `phong_id`
export const updatePhongStatus = async (
  phong_id: number,
  trang_thai_phong: 'đang trống' | 'đã đặt' | 'đang sửa chữa'
): Promise<void> => {
  const query = `
    UPDATE phong
    SET trang_thai_phong = ?
    WHERE phong_id = ?
  `;
  
  const values = [trang_thai_phong, phong_id];

  try {
    await connection.execute(query, values);
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái phòng:', error);
    throw new Error('Không thể cập nhật trạng thái phòng.');
  }
};

// Xóa phòng theo `phong_id`
export const deletePhong = async (phong_id: number): Promise<void> => {
  await connection.execute(
    'DELETE FROM phong WHERE phong_id = ?',
    [phong_id]
  );
};
