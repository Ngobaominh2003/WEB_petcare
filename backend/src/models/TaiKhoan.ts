import { RowDataPacket } from 'mysql2/promise';
import connection from '../config/db';
import bcrypt from 'bcrypt';

// Interface tài khoản
export interface TaiKhoan extends RowDataPacket {
  tai_khoan_id: number;
  ten_dang_nhap: string;
  mat_khau: string;
  email: string;
  vai_tro: 'quan_tri' | 'nguoi_dung' | 'nha_cung_cap';
  trang_thai: 'hoat_dong' | 'khoa';
  trang_thai_xet_duyet: 'chờ duyệt' | 'đã duyệt' | 'không duyệt';
}

// Thêm tài khoản mới
export const createUser = async (
  ten_dang_nhap: string,
  mat_khau: string,
  email: string,
  vai_tro: 'quan_tri' | 'nguoi_dung' | 'nha_cung_cap'
): Promise<number> => {
  const hashedPassword = await bcrypt.hash(mat_khau, 10);
  const [result] = await connection.execute(
    'INSERT INTO tai_khoan (ten_dang_nhap, mat_khau, email, vai_tro) VALUES (?, ?, ?, ?)',
    [ten_dang_nhap, hashedPassword, email, vai_tro]
  );
  return (result as any).insertId;
};

// Lấy tất cả tài khoản
export const getAllUsers = async (): Promise<TaiKhoan[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM tai_khoan');
  return rows as TaiKhoan[];
};

// Lấy tài khoản theo ID
export const getUserById = async (tai_khoan_id: number): Promise<TaiKhoan | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM tai_khoan WHERE tai_khoan_id = ?',
    [tai_khoan_id]
  );
  return rows.length > 0 ? (rows[0] as TaiKhoan) : null;
};

// Cập nhật tài khoản
export const updateUser = async (
  tai_khoan_id: number,
  updates: Partial<Omit<TaiKhoan, 'tai_khoan_id'>> & { mat_khau_plain?: string }
): Promise<void> => {
  const fields: string[] = [];
  const values: any[] = [];

  const fieldMap: { [key: string]: any } = {
    ten_dang_nhap: updates.ten_dang_nhap,
    email: updates.email,
    vai_tro: updates.vai_tro,
    trang_thai: updates.trang_thai,
    trang_thai_xet_duyet: updates.trang_thai_xet_duyet,
  };

  // Duyệt qua các trường để thêm vào câu query
  for (const [key, value] of Object.entries(fieldMap)) {
    if (value !== undefined) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  // Xử lý mật khẩu riêng vì cần hash
  if (updates.mat_khau_plain) {
    fields.push(`mat_khau = ?`);
    values.push(await bcrypt.hash(updates.mat_khau_plain, 10));
  }

  if (fields.length === 0) {
    throw new Error('Không có thông tin nào để cập nhật');
  }

  const query = `UPDATE tai_khoan SET ${fields.join(', ')} WHERE tai_khoan_id = ?`;
  values.push(tai_khoan_id);

  await connection.execute(query, values);
};


// Xóa tài khoản
export const deleteUser = async (tai_khoan_id: number): Promise<void> => {
  await connection.execute('DELETE FROM tai_khoan WHERE tai_khoan_id = ?', [tai_khoan_id]);
};

// Đăng nhập bằng email
export const login = async (email: string, mat_khau: string): Promise<TaiKhoan | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>(
    'SELECT * FROM tai_khoan WHERE email = ?',
    [email]
  );

  if (rows.length === 0) return null;

  const user = rows[0] as TaiKhoan;
  const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);

  return isMatch ? user : null;
};
