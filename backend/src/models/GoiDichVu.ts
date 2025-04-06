import connection from '../config/db';
import { RowDataPacket } from 'mysql2/promise';

interface GoiDichVuAttributes {
  goiDichVuId?: number;
  tenGoi: string;
  moTa?: string;
  gia1Thang: number;
  gia6Thang: number;
  gia1Nam: number;
  ngayTao?: Date;
}

// Lấy tất cả gói dịch vụ
export const getAllGoiDichVu = async (): Promise<GoiDichVuAttributes[]> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM goi_dich_vu');
    return rows as GoiDichVuAttributes[];
  } catch (error) {
    console.error('Error fetching all GoiDichVu:', error);
    throw error;
  }
};

// Tạo gói dịch vụ mới
export const createGoiDichVu = async (goiDichVu: GoiDichVuAttributes): Promise<any> => {
  const { tenGoi, moTa, gia1Thang, gia6Thang, gia1Nam } = goiDichVu;

  try {
    const [result] = await connection.query(
      'INSERT INTO goi_dich_vu (ten_goi, mo_ta, gia_1_thang, gia_6_thang, gia_1_nam) VALUES (?, ?, ?, ?, ?)',
      [tenGoi, moTa, gia1Thang, gia6Thang, gia1Nam]
    );
    return result;
  } catch (error) {
    console.error('Error creating GoiDichVu:', error);
    throw error;
  }
};

// Sửa gói dịch vụ
export const updateGoiDichVu = async (id: number, goiDichVu: GoiDichVuAttributes): Promise<any> => {
  const { tenGoi, moTa, gia1Thang, gia6Thang, gia1Nam } = goiDichVu;

  try {
    const [result] = await connection.query(
      'UPDATE goi_dich_vu SET ten_goi = ?, mo_ta = ?, gia_1_thang = ?, gia_6_thang = ?, gia_1_nam = ? WHERE goi_dich_vu_id = ?',
      [tenGoi, moTa, gia1Thang, gia6Thang, gia1Nam, id]
    );
    return result;
  } catch (error) {
    console.error('Error updating GoiDichVu:', error);
    throw error;
  }
};

// Xóa gói dịch vụ
export const deleteGoiDichVu = async (id: number): Promise<any> => {
  try {
    const [result] = await connection.query(
      'DELETE FROM goi_dich_vu WHERE goi_dich_vu_id = ?',
      [id]
    );
    return result;
  } catch (error) {
    console.error('Error deleting GoiDichVu:', error);
    throw error;
  }
};
