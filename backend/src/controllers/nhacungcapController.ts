import { Request, Response } from 'express';
import * as NhaCungCapModel from '../models/NhaCungCap'; // Import model

// Thêm nhà cung cấp
export const createNhaCungCap = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id, ten_nha_cung_cap, ma_so_thue, dia_chi, loai_hinh, mo_ta } = req.body;
  
  // Lấy tên tệp ảnh từ req.file (giấy phép kinh doanh), nếu không có tệp thì giay_phep_kinh_doanh sẽ là null
  const giay_phep_kinh_doanh: string | null = req.file?.filename || null;

  try {
    // Tạo nhà cung cấp
    await NhaCungCapModel.createNhaCungCap(
      tai_khoan_id,
      ten_nha_cung_cap,
      ma_so_thue,
      giay_phep_kinh_doanh, // Lưu tên tệp ảnh vào CSDL
      dia_chi,
      loai_hinh, // Loại hình doanh nghiệp
      mo_ta // Mô tả doanh nghiệp
    );
    res.status(201).json({ message: 'Nhà cung cấp đã được tạo thành công' });
  } catch (error) {
    console.error('Lỗi khi thêm nhà cung cấp:', error);
    res.status(500).json({ message: 'Lỗi khi thêm nhà cung cấp', error });
  }
};

// Cập nhật nhà cung cấp
export const updateNhaCungCap = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id, ten_nha_cung_cap, ma_so_thue, dia_chi, loai_hinh, mo_ta } = req.body;
  const giay_phep_kinh_doanh = req.file?.filename; // Lấy tên tệp ảnh từ req.file nếu có

  try {
    // Cập nhật nhà cung cấp
    await NhaCungCapModel.updateNhaCungCap(
      0, // Nha cung cap id không cần thiết ở đây
      tai_khoan_id,
      ten_nha_cung_cap,
      ma_so_thue,
      giay_phep_kinh_doanh, // Cập nhật tên tệp ảnh nếu có
      dia_chi,
      loai_hinh, // Cập nhật loại hình doanh nghiệp
      mo_ta // Cập nhật mô tả doanh nghiệp
    );
    res.status(200).json({ message: 'Cập nhật thông tin nhà cung cấp thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật nhà cung cấp:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật nhà cung cấp', error });
  }
};


// Xóa nhà cung cấp theo tai_khoan_id
export const deleteNhaCungCapByTaiKhoanId = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id } = req.params;

  try {
    await NhaCungCapModel.deleteNhaCungCapByTaiKhoanId(parseInt(tai_khoan_id));
    res.status(200).json({ message: 'Nhà cung cấp đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa nhà cung cấp:', error);
    res.status(500).json({ message: 'Lỗi khi xóa nhà cung cấp', error });
  }
};

// Tìm nhà cung cấp theo tai_khoan_id
export const getNhaCungCapByTaiKhoanId = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id } = req.params;

  try {
    const nhaCungCap = await NhaCungCapModel.getNhaCungCapByTaiKhoanId(parseInt(tai_khoan_id));
    if (nhaCungCap) {
      res.status(200).json(nhaCungCap);
    } else {
      res.status(404).json({ message: 'Nhà cung cấp không tìm thấy' });
    }
  } catch (error) {
    console.error('Lỗi khi tìm nhà cung cấp:', error);
    res.status(500).json({ message: 'Lỗi khi tìm nhà cung cấp', error });
  }
};

// Tìm nhà cung cấp theo tên nhà cung cấp
export const getNhaCungCapByName = async (req: Request, res: Response): Promise<void> => {
  const { ten_nha_cung_cap } = req.params;

  try {
    const nhaCungCap = await NhaCungCapModel.getNhaCungCapByName(ten_nha_cung_cap);
    if (nhaCungCap) {
      res.status(200).json(nhaCungCap);
    } else {
      res.status(404).json({ message: 'Nhà cung cấp không tìm thấy' });
    }
  } catch (error) {
    console.error('Lỗi khi tìm nhà cung cấp:', error);
    res.status(500).json({ message: 'Lỗi khi tìm nhà cung cấp', error });
  }
};
