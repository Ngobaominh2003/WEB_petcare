import { Request, Response } from 'express';
import * as UserModel from '../models/TaiKhoan';

// Helper xử lý lỗi chung
const handleError = (res: Response, error: unknown, message: string) => {
  if (error instanceof Error) {
    console.error(`${message}:`, error.message);
    res.status(500).json({ message, error: error.message });
  } else {
    console.error(`${message}:`, error);
    res.status(500).json({ message, error });
  }
};

// Thêm tài khoản
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { ten_dang_nhap, mat_khau, email, vai_tro } = req.body;

  try {
    const tai_khoan_id = await UserModel.createUser(ten_dang_nhap, mat_khau, email, vai_tro);
    res.status(201).json({ message: 'Tạo tài khoản thành công', tai_khoan_id });
  } catch (error) {
    handleError(res, error, 'Lỗi khi tạo tài khoản');
  }
};

// Cập nhật tài khoản
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id, ...updates } = req.body;

  if (!tai_khoan_id || typeof tai_khoan_id !== 'number') {
    res.status(400).json({ message: 'Thiếu hoặc sai định dạng tai_khoan_id' });
    return;
  }

  try {
    await UserModel.updateUser(tai_khoan_id, updates);
    res.status(200).json({ message: 'Cập nhật tài khoản thành công' });
  } catch (error) {
    handleError(res, error, 'Lỗi khi cập nhật tài khoản');
  }
};

// Xoá tài khoản
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const tai_khoan_id = parseInt(req.params.tai_khoan_id);

  if (isNaN(tai_khoan_id)) {
    res.status(400).json({ message: 'ID tài khoản không hợp lệ' });
    return;
  }

  try {
    await UserModel.deleteUser(tai_khoan_id);
    res.status(200).json({ message: 'Xoá tài khoản thành công' });
  } catch (error) {
    handleError(res, error, 'Lỗi khi xoá tài khoản');
  }
};

// Đăng nhập
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, mat_khau } = req.body;

  if (!email || !mat_khau) {
    res.status(400).json({ message: 'Email và mật khẩu không được để trống' });
    return;
  }

  try {
    const user = await UserModel.login(email, mat_khau);

    if (user) {
      res.status(200).json({
        message: 'Đăng nhập thành công',
        user: {
          id: user.tai_khoan_id,
          email: user.email,
          vai_tro: user.vai_tro,
        },
      });
    } else {
      res.status(401).json({ message: 'Sai email hoặc mật khẩu' });
    }
  } catch (error) {
    handleError(res, error, 'Lỗi khi đăng nhập');
  }
};

// Lấy tất cả tài khoản
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error, 'Lỗi khi lấy danh sách người dùng');
  }
};

// Lấy người dùng theo ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const tai_khoan_id = parseInt(req.params.tai_khoan_id);

  if (isNaN(tai_khoan_id)) {
    res.status(400).json({ message: 'ID tài khoản không hợp lệ' });
    return;
  }

  try {
    const user = await UserModel.getUserById(tai_khoan_id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  } catch (error) {
    handleError(res, error, 'Lỗi khi lấy thông tin người dùng');
  }
};
