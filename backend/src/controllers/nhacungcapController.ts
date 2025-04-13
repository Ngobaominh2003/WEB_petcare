import { Request, Response } from 'express';
import * as NhaCungCapModel from '../models/NhaCungCap'; 

export const getDanhSachNhaCungCap = async (req: Request, res: Response) => {
  try {
    const rows = await NhaCungCapModel.getDanhSachNhaCungCap(); // Get the data
    res.status(200).json(rows); // Respond with the list of nhà cung cấp
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: `Lỗi khi lấy danh sách nhà cung cấp: ${err.message}` });
    } else {
      res.status(500).json({ message: 'Lỗi không xác định khi lấy danh sách nhà cung cấp' });
    }
  }
};
// Thêm nhà cung cấp
export const createNhaCungCap = async (req: Request, res: Response): Promise<void> => {
  try {
    // Lấy dữ liệu từ request body
    const { tai_khoan_id, ten_nha_cung_cap, ma_so_thue, dia_chi, loai_hinh, mo_ta } = req.body;

    // Kiểm tra tệp giấy phép kinh doanh
    const giay_phep_kinh_doanh: string = req.file?.filename || 'default_filename.jpg'; // Gán tên tệp mặc định nếu không có tệp

    // Gọi phương thức tạo nhà cung cấp từ model
    await NhaCungCapModel.createNhaCungCap(
      tai_khoan_id,
      ten_nha_cung_cap,
      ma_so_thue,
      giay_phep_kinh_doanh,  // Giấy phép kinh doanh không thể là null
      dia_chi,
      loai_hinh,
      mo_ta
    );

    // Trả về phản hồi thành công
    res.status(201).json({ message: 'Nhà cung cấp đã được tạo thành công' });
  } catch (error) {
    // Log lỗi và trả về thông báo lỗi
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
