import { Request, Response } from 'express';
import * as UserModel from '../models/User';

// Thêm tài khoản người dùng
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { ten_dang_nhap, mat_khau, email, vai_tro } = req.body;

  try {
    // Thêm tài khoản người dùng và lấy `tai_khoan_id` (insert id)
    const tai_khoan_id = await UserModel.createUser(ten_dang_nhap, mat_khau, email, vai_tro);

    res.status(201).json({ message: 'Tạo tài khoản thành công', tai_khoan_id });
  } catch (error: unknown) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error('Lỗi khi tạo tài khoản:', error.message);
      res.status(500).json({ message: 'Lỗi khi tạo tài khoản', error: error.message });
    } else {
      res.status(500).json({ message: 'Lỗi không xác định khi tạo tài khoản', error });
    }
  }
};

// Cập nhật tài khoản người dùng
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const {
    tai_khoan_id,
    ten_dang_nhap,
    mat_khau,
    email,
    vai_tro,
    trang_thai,
    trang_thai_xet_duyet
  } = req.body;

  try {
    await UserModel.updateUser(
      tai_khoan_id,
      ten_dang_nhap,
      mat_khau,
      email,
      vai_tro,
      trang_thai,
      trang_thai_xet_duyet
    );

    res.status(200).json({ message: 'Cập nhật tài khoản thành công' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Lỗi khi cập nhật tài khoản:', error.message);
      res.status(500).json({ message: 'Lỗi khi cập nhật tài khoản', error: error.message });
    } else {
      console.error('Lỗi không xác định khi cập nhật tài khoản:', error);
      res.status(500).json({ message: 'Lỗi không xác định khi cập nhật tài khoản', error });
    }
  }
};

// Xóa tài khoản người dùng
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id } = req.params;

  try {
    await UserModel.deleteUser(parseInt(tai_khoan_id));

    res.status(200).json({ message: 'Xóa tài khoản thành công' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Lỗi khi xóa tài khoản:', error.message);
      res.status(500).json({ message: 'Lỗi khi xóa tài khoản', error: error.message });
    } else {
      res.status(500).json({ message: 'Lỗi không xác định khi xóa tài khoản', error });
    }
  }
};

// Đăng nhập người dùng
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
      res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Lỗi khi đăng nhập:', error.message);
      res.status(500).json({ message: 'Lỗi khi đăng nhập', error: error.message });
    } else {
      res.status(500).json({ message: 'Lỗi không xác định khi đăng nhập', error });
    }
  }
};

// Lấy tất cả người dùng
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error.message);
      res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng', error: error.message });
    } else {
      res.status(500).json({ message: 'Lỗi không xác định khi lấy danh sách người dùng', error });
    }
  }
};

// Lấy người dùng theo ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id } = req.params;

  try {
    const user = await UserModel.getUserById(parseInt(tai_khoan_id));

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error.message);
      res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error: error.message });
    } else {
      res.status(500).json({ message: 'Lỗi không xác định khi lấy thông tin người dùng', error });
    }
  }
};
