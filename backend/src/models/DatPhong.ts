import { RowDataPacket } from 'mysql2/promise';
import connection from '../config/db'; // Đảm bảo bạn đã cấu hình kết nối với MySQL

// Định nghĩa interface cho `DatPhong`
export interface DatPhong extends RowDataPacket {
  dat_phong_id: number;
  nguoi_dung_id: number | null;
  ten_khach_hang: string;
  email: string;
  sdt: string;
  phong_id: number;
  ngay_bat_dau: Date;
  ngay_ket_thuc: Date;
  can_nang: string;
  tien: number;
  trang_thai: 'đang hoạt động' | 'đã hết hạn'; // Trạng thái đơn đặt phòng
}

// Lấy tất cả các đơn đặt phòng
export const getAllDatPhong = async (): Promise<DatPhong[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM dat_phong'
  );
  return rows as DatPhong[];
};

// Lấy đơn đặt phòng theo `dat_phong_id`
export const getDatPhongById = async (dat_phong_id: number): Promise<DatPhong | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM dat_phong WHERE dat_phong_id = ?',
    [dat_phong_id]
  );
  return rows.length > 0 ? (rows[0] as DatPhong) : null;
};

// Lấy đơn đặt phòng theo `nguoi_dung_id`
export const getDatPhongByNguoiDungId = async (nguoi_dung_id: number): Promise<DatPhong[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM dat_phong WHERE nguoi_dung_id = ?',
    [nguoi_dung_id]
  );
  return rows as DatPhong[];
};

// Thêm đơn đặt phòng mới
export const createDatPhong = async (
  nguoi_dung_id: number | null,
  ten_khach_hang: string,
  email: string,
  sdt: string,
  phong_id: number,
  ngay_bat_dau: Date,
  ngay_ket_thuc: Date,
  can_nang: string | null,
  tien: number
): Promise<void> => {
  const query = `
    INSERT INTO dat_phong 
      (nguoi_dung_id, ten_khach_hang, email, sdt, phong_id, ngay_bat_dau, ngay_ket_thuc, can_nang, tien)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Chuyển đổi ngày tháng thành chuỗi ISO nếu cần thiết
  const ngayBatDauStr = ngay_bat_dau.toISOString().slice(0, 19).replace('T', ' ');
  const ngayKetThucStr = ngay_ket_thuc.toISOString().slice(0, 19).replace('T', ' ');

  // Các giá trị cần chèn vào cơ sở dữ liệu
  const values = [
    nguoi_dung_id, 
    ten_khach_hang, 
    email, 
    sdt, 
    phong_id, 
    ngayBatDauStr, 
    ngayKetThucStr, 
    can_nang || '0kg', // Cấp giá trị mặc định '0kg' nếu `can_nang` là null
    tien
  ];

  // Thực thi câu lệnh SQL
  await connection.execute(query, values);
};

// Cập nhật thông tin đơn đặt phòng
export const updateDatPhong = async (
  dat_phong_id: number,
  nguoi_dung_id?: number | null,
  ten_khach_hang?: string,
  email?: string,
  sdt?: string,
  phong_id?: number,
  ngay_bat_dau?: Date,
  ngay_ket_thuc?: Date,
  can_nang?: string,
  tien?: number
): Promise<void> => {
  let query = 'UPDATE dat_phong SET ';
  const values: (string | number | null)[] = [];

  // Thêm các trường cần cập nhật vào câu truy vấn
  if (nguoi_dung_id !== undefined) {
    query += 'nguoi_dung_id = ?, ';
    values.push(nguoi_dung_id);
  }
  if (ten_khach_hang) {
    query += 'ten_khach_hang = ?, ';
    values.push(ten_khach_hang);
  }
  if (email) {
    query += 'email = ?, ';
    values.push(email);
  }
  if (sdt) {
    query += 'sdt = ?, ';
    values.push(sdt);
  }
  if (phong_id) {
    query += 'phong_id = ?, ';
    values.push(phong_id);
  }
  if (ngay_bat_dau) {
    query += 'ngay_bat_dau = ?, ';
    values.push(ngay_bat_dau.toISOString().slice(0, 19).replace('T', ' ')); // Chuyển đổi ngày thành chuỗi
  }
  if (ngay_ket_thuc) {
    query += 'ngay_ket_thuc = ?, ';
    values.push(ngay_ket_thuc.toISOString().slice(0, 19).replace('T', ' ')); // Chuyển đổi ngày thành chuỗi
  }
  if (can_nang) {
    query += 'can_nang = ?, ';
    values.push(can_nang);
  }
  if (tien) {
    query += 'tien = ?, ';
    values.push(tien);
  }

  // Loại bỏ dấu phẩy thừa ở cuối chuỗi query
  query = query.slice(0, -2);
  
  query += ' WHERE dat_phong_id = ?';
  values.push(dat_phong_id);  // Thêm điều kiện WHERE để chỉ cập nhật bản ghi theo ID

  try {
    await connection.execute(query, values);
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin đơn đặt phòng:', error);
    throw new Error('Lỗi khi cập nhật thông tin đơn đặt phòng');
  }
};

// Xóa đơn đặt phòng theo `dat_phong_id`
export const deleteDatPhong = async (dat_phong_id: number): Promise<void> => {
  await connection.execute(
    'DELETE FROM dat_phong WHERE dat_phong_id = ?',
    [dat_phong_id]
  );
};

// Hàm tự động cập nhật trạng thái "đã hết hạn" cho các đơn đặt phòng
export const updateTrangThaiDatPhong = async (): Promise<void> => {
  const query = `
    UPDATE dat_phong
    SET trang_thai = 'đã hết hạn'
    WHERE ngay_ket_thuc < NOW() AND trang_thai = 'đang hoạt động'
  `;
  
  try {
    await connection.execute(query);
    console.log('Cập nhật trạng thái thành công.');
  } catch (error) {
    console.error('Lỗi khi thực hiện cập nhật trạng thái hết hạn: ', error);
  }
};
