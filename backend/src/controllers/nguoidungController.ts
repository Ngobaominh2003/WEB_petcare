import { Request, Response } from "express";
import * as NguoiDungModel from "../models/NguoiDung";

// Helper xử lý lỗi
const handleError = (res: Response, error: unknown, message: string) => {
  console.error(`${message}:`, error);
  res.status(500).json({ message, error });
};

// Thêm người dùng
export const createNguoiDung = async (req: Request, res: Response) => {
  try {
    const { tai_khoan_id, ho_ten, sdt, gioi_tinh, dia_chi } = req.body;
    const avata = req.file ? req.file.filename : null;

    await NguoiDungModel.createNguoiDung(
      tai_khoan_id,
      ho_ten,
      sdt,
      gioi_tinh,
      avata,
      dia_chi
    );

    res.status(201).json({ message: "Người dùng đã được thêm thành công!" });
  } catch (error) {
    handleError(res, error, "Lỗi khi thêm người dùng");
  }
};

// Cập nhật người dùng
export const updateNguoiDung = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id, ho_ten, sdt, gioi_tinh, dia_chi } = req.body;
  const newAvata = req.file ? req.file.filename : null;

  try {
    const existing = await NguoiDungModel.getNguoiDungByTaiKhoanId(tai_khoan_id);
    if (!existing) {
      res.status(404).json({ message: "Không tìm thấy người dùng." });
      return;
    }

    const updates = {
      ho_ten,
      sdt,
      gioi_tinh: ['nam', 'nu', 'khac'].includes(gioi_tinh) ? gioi_tinh : null,
      avata: newAvata || existing.avata,
      dia_chi
    };

    await NguoiDungModel.updateNguoiDung(tai_khoan_id, updates);
    res.status(200).json({ message: "Cập nhật người dùng thành công!" });
  } catch (error) {
    handleError(res, error, "Lỗi khi cập nhật người dùng");
  }
};

// Xoá theo nguoi_dung_id
export const deleteNguoiDung = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.nguoi_dung_id);
  if (isNaN(id)) {
    res.status(400).json({ message: "ID không hợp lệ" });
    return;
  }

  try {
    await NguoiDungModel.deleteNguoiDung(id);
    res.status(200).json({ message: "Người dùng đã được xoá thành công" });
  } catch (error) {
    handleError(res, error, "Lỗi khi xoá người dùng");
  }
};

// Xoá theo tai_khoan_id
export const deleteNguoiDungByTaiKhoanId = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.tai_khoan_id);
  if (isNaN(id)) {
    res.status(400).json({ message: "tai_khoan_id không hợp lệ" });
    return;
  }

  try {
    await NguoiDungModel.deleteNguoiDungByTaiKhoanId(id);
    res.status(200).json({ message: "Đã xoá người dùng theo tai_khoan_id" });
  } catch (error) {
    handleError(res, error, "Lỗi khi xoá người dùng theo tai_khoan_id");
  }
};

// Lấy người dùng theo tài khoản ID
export const getNguoiDungByTaiKhoanId = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.tai_khoan_id);
  if (isNaN(id)) {
    res.status(400).json({ message: "tai_khoan_id không hợp lệ" });
    return;
  }

  try {
    const user = await NguoiDungModel.getNguoiDungByTaiKhoanId(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Người dùng không tồn tại" });
    }
  } catch (error) {
    handleError(res, error, "Lỗi khi lấy người dùng theo tai_khoan_id");
  }
};
