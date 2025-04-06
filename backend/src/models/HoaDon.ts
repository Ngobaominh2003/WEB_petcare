import { RowDataPacket } from 'mysql2/promise';
import { OkPacket } from 'mysql2'; // OkPacket là kiểu trả về của các câu lệnh INSERT, UPDATE, DELETE
import connection from '../config/db'; // Đảm bảo rằng connection đã được cấu hình đúng

// Định nghĩa interface cho Hóa Đơn (HoaDon)
export interface HoaDon extends RowDataPacket {
  hoa_don_id: number;
  nguoi_dung_id: number;
  dat_phong_id: number | null;
  dat_lich_id: number | null;
  tong_tien: number;
  trang_thai: string;
  ngay_tao: string;
}

// Hàm lấy tất cả hóa đơn
export const getAllInvoices = async (): Promise<HoaDon[]> => {
  try {
    const [rows] = await connection.execute(
      'SELECT hoa_don_id, nguoi_dung_id, dat_phong_id, dat_lich_id, tong_tien, trang_thai, ngay_tao FROM hoa_don'
    );
    return rows as HoaDon[];
  } catch (error) {
    console.error('Lỗi khi lấy tất cả hóa đơn:', error);
    throw new Error('Không thể lấy danh sách hóa đơn');
  }
};

// Hàm lấy hóa đơn theo nguoi_dung_id và ngày tạo
export const getInvoicesByUserIdAndDate = async (nguoiDungId: number, ngayTao: string): Promise<HoaDon[]> => {
  try {
    const [rows] = await connection.execute(
      'SELECT hoa_don_id, nguoi_dung_id, dat_phong_id, dat_lich_id, tong_tien, trang_thai, ngay_tao FROM hoa_don WHERE nguoi_dung_id = ? AND DATE(ngay_tao) = ?',
      [nguoiDungId, ngayTao]
    );
    return rows as HoaDon[];
  } catch (error) {
    console.error('Lỗi khi lấy hóa đơn theo ID người dùng và ngày tạo:', error);
    throw new Error('Không thể lấy hóa đơn theo ID người dùng và ngày tạo');
  }
};



// Hàm xóa hóa đơn theo ID
export const deleteInvoice = async (hoaDonId: number): Promise<void> => {
  try {
    const [result] = await connection.execute(
      'DELETE FROM hoa_don WHERE hoa_don_id = ?',
      [hoaDonId]
    );

    // Kiểm tra số lượng bản ghi bị ảnh hưởng
    const affectedRows = (result as OkPacket).affectedRows;

    if (affectedRows === 0) {
      throw new Error('Hóa đơn không tồn tại hoặc không thể xóa');
    }
  } catch (error) {
    console.error('Lỗi khi xóa hóa đơn:', error);
    throw new Error('Không thể xóa hóa đơn');
  }
};
