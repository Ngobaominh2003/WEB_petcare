import { RowDataPacket } from 'mysql2/promise';
import connection from '../config/db'; 

// Interface cho HoaDon
export interface HoaDon extends RowDataPacket {
  hoa_don_id: number;
  nguoi_dung_id: number | null;
  dat_phong_id: number | null;
  dat_lich_id: number | null;
  tong_tien: number;
  trang_thai: string;
  ngay_tao: Date;
}

// Hàm thống kê tổng doanh thu
export const getTotalRevenue = async (): Promise<number> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT SUM(tong_tien) as totalRevenue FROM hoa_don'
  );
  const totalRevenue = rows[0]?.totalRevenue || 0;
  return parseFloat(totalRevenue);
};

// Hàm đếm số hóa đơn
export const getTotalOrders = async (): Promise<number> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT COUNT(*) as totalOrders FROM hoa_don'
  );
  return rows[0]?.totalOrders || 0;
};

// Hàm đếm số hóa đơn chưa thanh toán
export const getUnpaidOrders = async (): Promise<number> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT COUNT(*) as unpaidOrders FROM hoa_don WHERE trang_thai = "chưa thanh toán"'
  );
  return rows[0]?.unpaidOrders || 0;
};

// Hàm lấy danh sách hóa đơn theo trạng thái
export const getOrdersByStatus = async (status: string): Promise<HoaDon[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM hoa_don WHERE trang_thai = ?',
    [status]
  );
  return rows as HoaDon[];
};

// Hàm thống kê tổng doanh thu theo ngày
export const getDailyRevenue = async (): Promise<{ ngay: string; totalthongke: number }[]> => {
    const [rows] = await connection.execute(`
      SELECT 
        DATE(ngay_tao) as ngay, 
        SUM(tong_tien) as totalthongke 
      FROM hoa_don 
      GROUP BY DATE(ngay_tao)
      ORDER BY ngay DESC
    `);
    return rows as { ngay: string; totalthongke: number }[];
  }

// Hàm thống kê tổng doanh thu theo tháng
export const getMonthlyRevenue = async (): Promise<{ thang: string; totalthongke: number }[]> => {
    const [rows] = await connection.execute(`
      SELECT 
        DATE_FORMAT(ngay_tao, '%Y-%m') as thang, 
        SUM(tong_tien) as totalthongke 
      FROM hoa_don 
      GROUP BY DATE_FORMAT(ngay_tao, '%Y-%m')
      ORDER BY thang
    `);
    return rows as { thang: string; totalthongke: number }[];
  };
  

// Hàm thống kê tổng doanh thu theo năm
export const getYearlyRevenue = async (): Promise<
  { nam: string; totalRevenue: number }[]
> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    `
    SELECT 
      YEAR(ngay_tao) as nam, 
      SUM(tong_tien) as totalRevenue 
    FROM hoa_don 
    GROUP BY YEAR(ngay_tao)
    ORDER BY nam
    `
  );
  return rows.map((row) => ({
    nam: row.nam,
    totalRevenue: parseFloat(row.totalRevenue),
  }));
};
