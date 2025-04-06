// models/User.ts
import { RowDataPacket } from 'mysql2/promise';
import connection from '../config/db';  // Đảm bảo bạn đã cấu hình kết nối với MySQL
import bcrypt from 'bcrypt';

// Định nghĩa interface cho tài khoản người dùng
export interface TaiKhoan extends RowDataPacket {
  tai_khoan_id: number;
  ten_dang_nhap: string;
  mat_khau: string;
  email: string;
  vai_tro: 'quan_tri' | 'nguoi_dung' | 'nha_cung_cap';
  trang_thai: 'hoat_dong' | 'khoa';
  trang_thai_xet_duyet: 'chờ duyệt' | 'đã duyệt' | 'không duyệt';
}

// Thêm tài khoản người dùng
export const createUser = async (ten_dang_nhap: string, mat_khau: string, email: string, vai_tro: 'quan_tri' | 'nguoi_dung' | 'nha_cung_cap'): Promise<number> => {
  const hashedPassword = await bcrypt.hash(mat_khau, 10);
  const [result] = await connection.execute(
    'INSERT INTO tai_khoan (ten_dang_nhap, mat_khau, email, vai_tro) VALUES (?, ?, ?, ?)',
    [ten_dang_nhap, hashedPassword, email, vai_tro]
  );
  return (result as RowDataPacket).insertId;
};

// Lấy tất cả tài khoản
export const getAllUsers = async (): Promise<TaiKhoan[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM tai_khoan');
  return rows as TaiKhoan[];
};

// Tìm kiếm tài khoản theo `tai_khoan_id`
  export const getUserById = async (tai_khoan_id: number): Promise<TaiKhoan | null> => {
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM tai_khoan WHERE tai_khoan_id = ?',
      [tai_khoan_id]
    );
    return rows.length > 0 ? (rows[0] as TaiKhoan) : null;
  };

// Cập nhật tài khoản người dùng
export const updateUser = async (
  tai_khoan_id: number,
  ten_dang_nhap?: string,
  mat_khau?: string,
  email?: string,
  vai_tro?: 'quan_tri' | 'nguoi_dung' | 'nha_cung_cap',
  trang_thai?: 'hoat_dong' | 'khoa',
  trang_thai_xet_duyet?: 'chờ duyệt' | 'đã duyệt' | 'không duyệt'
): Promise<void> => {
  let query = 'UPDATE tai_khoan SET ';
  const values: (string | number)[] = [];

  if (ten_dang_nhap) {
    query += 'ten_dang_nhap = ?, ';
    values.push(ten_dang_nhap);
  }

  if (mat_khau) {
    query += 'mat_khau = ?, ';
    values.push(await bcrypt.hash(mat_khau, 10));
  }

  if (email) {
    query += 'email = ?, ';
    values.push(email);
  }

  if (vai_tro) {
    query += 'vai_tro = ?, ';
    values.push(vai_tro);
  }

  if (trang_thai) {
    query += 'trang_thai = ?, ';
    values.push(trang_thai);
  }

  if (trang_thai_xet_duyet) {
    query += 'trang_thai_xet_duyet = ?, ';
    values.push(trang_thai_xet_duyet);
  }

  if (values.length === 0) {
    throw new Error('Không có thông tin nào để cập nhật');
  }

  query = query.slice(0, -2); // Bỏ dấu phẩy cuối
  query += ' WHERE tai_khoan_id = ?';
  values.push(tai_khoan_id);

  await connection.execute(query, values);
};


// Xóa tài khoản người dùng
export const deleteUser = async (tai_khoan_id: number): Promise<void> => {
  await connection.execute('DELETE FROM tai_khoan WHERE tai_khoan_id = ?', [tai_khoan_id]);
};

// Đăng nhập người dùng
export const login = async (email: string, mat_khau: string): Promise<TaiKhoan | null> => {
  // Sửa câu lệnh SQL để tìm kiếm theo email thay vì tên đăng nhập
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM tai_khoan WHERE email = ?',
    [email]  // Sử dụng email thay vì ten_dang_nhap
  );
  
  // Kiểm tra nếu có người dùng và ép kiểu cho dòng trả về
  const user = rows[0] as TaiKhoan;

  // Kiểm tra mật khẩu đã mã hóa
  if (user && await bcrypt.compare(mat_khau, user.mat_khau)) {
    return user;  // Đăng nhập thành công, trả về thông tin tài khoản
  } else {
    return null;  // Đăng nhập không thành công
  }
};

