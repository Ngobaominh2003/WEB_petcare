// src/models/DatLich.ts
import connection from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface DatLich {
  dat_lich_id?: number;
  nguoi_dung_id: number;
  dich_vu_id: number;
  thu_cung_id?: number | null;
  ngay_dat: string; // Định dạng 'YYYY-MM-DD'
  gio_dat: string;  // Định dạng 'HH:MM:SS'
  trang_thai?: 'chờ xác nhận' | 'đã xác nhận' | 'đã hủy';
  ngay_tao?: Date;
  ten_kh: string;
  email_kh: string;
}

// Lấy tất cả các lịch đặt
export const getAllDatLich = async (): Promise<DatLich[]> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM dat_lich'
    );
    return rows as DatLich[];
  } catch (error) {
    throw error;
  }
};

// Lấy danh sách lịch đặt theo nguoi_dung_id
export const getDatLichByNguoiDungId = async (nguoi_dung_id: number): Promise<DatLich[]> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM dat_lich WHERE nguoi_dung_id = ?',
      [nguoi_dung_id]
    );
    return rows as DatLich[];
  } catch (error) {
    throw error;
  }
};

// Lấy một lịch đặt theo dat_lich_id
export const getDatLichById = async (dat_lich_id: number): Promise<DatLich | null> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM dat_lich WHERE dat_lich_id = ?',
      [dat_lich_id]
    );
    if (rows.length > 0) {
      return rows[0] as DatLich;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
// Hàm đếm số lượng lịch đặt trùng ngày và giờ
export const countDatLichByDateAndTime = async (ngay_dat: string, gio_dat: string): Promise<number> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM dat_lich WHERE ngay_dat = ? AND gio_dat = ?',
      [ngay_dat, gio_dat]
    );
    return rows[0].count;
  } catch (error) {
    throw error;
  }
};
// Hàm lấy giờ đã đặt trong ngày
export const getBookedTimesForDate = async (ngay_dat: string): Promise<string[]> => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT gio_dat FROM dat_lich WHERE ngay_dat = ?',
      [ngay_dat]
    );

    // Trả về danh sách các giờ đã đặt (chỉ lấy `gio_dat`)
    return rows.map(row => row.gio_dat);
  } catch (error) {
    throw error;
  }
};

// Thêm mới một lịch đặt
export const createDatLich = async (datLichData: Partial<DatLich>): Promise<ResultSetHeader> => {
  try {
    const {
      nguoi_dung_id,
      dich_vu_id,
      ngay_dat,
      gio_dat,
      trang_thai,
      ten_kh,
      email_kh,
    } = datLichData;

    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO dat_lich (nguoi_dung_id, dich_vu_id, ngay_dat, gio_dat, trang_thai, ten_kh, email_kh)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,

      [
        nguoi_dung_id ? nguoi_dung_id : null, // Chuyển '' thành null nếu không có giá trị
        dich_vu_id,
        ngay_dat,
        gio_dat,
        trang_thai || 'chờ xác nhận', // Giá trị mặc định cho trạng thái
        ten_kh,
        email_kh,
      ]
    );

    return result;
  } catch (error) {
    throw error;
  }
};



// Hàm cập nhật thông tin lịch đặt
export const updateDatLich = async (dat_lich_id: number, datLichData: Partial<DatLich>): Promise<ResultSetHeader> => {
  try {
    const fields: string[] = [];
    const values: any[] = [];

    // Chuẩn bị câu lệnh cập nhật động cho các trường hợp lệ trong datLichData
    for (const key of Object.keys(datLichData) as Array<keyof DatLich>) {
      const value = datLichData[key];
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error("Không có dữ liệu để cập nhật");
    }

    // Thêm dat_lich_id vào cuối mảng giá trị để khớp với điều kiện WHERE
    values.push(dat_lich_id);

    const [result] = await connection.query<ResultSetHeader>(
      `UPDATE dat_lich SET ${fields.join(', ')} WHERE dat_lich_id = ?`,
      values
    );

    return result;
  } catch (error) {
    throw error;
  }
};

// Hàm xóa một lịch đặt theo dat_lich_id
export const deleteDatLich = async (dat_lich_id: number): Promise<ResultSetHeader> => {
  try {
    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM dat_lich WHERE dat_lich_id = ?',
      [dat_lich_id]
    );

    return result;
  } catch (error) {
    throw error;
  }
};