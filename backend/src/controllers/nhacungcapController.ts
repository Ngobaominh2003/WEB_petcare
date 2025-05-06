import { Request, Response } from 'express';
import * as NhaCungCapModel from '../models/NhaCungCap';

// Hàm xử lý lỗi dùng chung
const handleError = (res: Response, error: unknown, message: string) => {
  console.error(`${message}:`, error);
  res.status(500).json({ message, error });
};

// Lấy danh sách nhà cung cấp
export const getDanhSachNhaCungCap = async (req: Request, res: Response) => {
  try {
    const rows = await NhaCungCapModel.getDanhSachNhaCungCap();
    res.status(200).json(rows);
  } catch (error) {
    handleError(res, error, 'Lỗi khi lấy danh sách nhà cung cấp');
  }
};

// Thêm nhà cung cấp
export const createNhaCungCap = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tai_khoan_id, ten_nha_cung_cap, ma_so_thue, dia_chi, loai_hinh, mo_ta } = req.body;
    const giay_phep_kinh_doanh = req.file?.filename || 'default_file.jpg';

    await NhaCungCapModel.createNhaCungCap(
      tai_khoan_id,
      ten_nha_cung_cap,
      ma_so_thue,
      giay_phep_kinh_doanh,
      dia_chi,
      loai_hinh,
      mo_ta
    );

    res.status(201).json({ message: 'Nhà cung cấp đã được tạo thành công' });
  } catch (error) {
    handleError(res, error, 'Lỗi khi thêm nhà cung cấp');
  }
};

// Cập nhật nhà cung cấp theo tai_khoan_id
export const updateNhaCungCap = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id, ten_nha_cung_cap, ma_so_thue, dia_chi, loai_hinh, mo_ta } = req.body;
  const giay_phep_kinh_doanh = req.file?.filename;

  try {
    await NhaCungCapModel.updateNhaCungCap(tai_khoan_id, {
      ten_nha_cung_cap,
      ma_so_thue,
      giay_phep_kinh_doanh,
      dia_chi,
      loai_hinh,
      mo_ta
    });

    res.status(200).json({ message: 'Cập nhật thông tin nhà cung cấp thành công' });
  } catch (error) {
    handleError(res, error, 'Lỗi khi cập nhật nhà cung cấp');
  }
};

// Xoá nhà cung cấp theo tai_khoan_id
export const deleteNhaCungCapByTaiKhoanId = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.tai_khoan_id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'tai_khoan_id không hợp lệ' });
    return Promise.resolve();
  }

  try {
    await NhaCungCapModel.deleteNhaCungCapByTaiKhoanId(id);
    res.status(200).json({ message: 'Nhà cung cấp đã được xóa thành công' });
  } catch (error) {
    handleError(res, error, 'Lỗi khi xóa nhà cung cấp');
  }
};

// Lấy nhà cung cấp theo tai_khoan_id
export const getNhaCungCapByTaiKhoanId = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.tai_khoan_id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'tai_khoan_id không hợp lệ' });
    return Promise.resolve();
  }

  try {
    const data = await NhaCungCapModel.getNhaCungCapByTaiKhoanId(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: 'Nhà cung cấp không tìm thấy' });
    }
  } catch (error) {
    handleError(res, error, 'Lỗi khi tìm nhà cung cấp');
  }
};

// Lấy nhà cung cấp theo tên
export const getNhaCungCapByName = async (req: Request, res: Response): Promise<void> => {
  const { ten_nha_cung_cap } = req.params;

  try {
    const data = await NhaCungCapModel.getNhaCungCapByName(ten_nha_cung_cap);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: 'Nhà cung cấp không tìm thấy' });
    }
  } catch (error) {
    handleError(res, error, 'Lỗi khi tìm nhà cung cấp theo tên');
  }
};
