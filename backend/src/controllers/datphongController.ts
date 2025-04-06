import { Request, Response } from 'express';
import cron from 'node-cron';
import * as DatPhongModel from '../models/DatPhong';

// Lấy tất cả các đơn đặt phòng
export const getAllDatPhong = async (req: Request, res: Response): Promise<void> => {
  try {
    const datPhongList = await DatPhongModel.getAllDatPhong();
    res.status(200).json(datPhongList);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn đặt phòng:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn đặt phòng' });
  }
};

// Lấy đơn đặt phòng theo `dat_phong_id`
export const getDatPhongById = async (req: Request, res: Response): Promise<void> => {
  const { dat_phong_id } = req.params;

  try {
    const datPhong = await DatPhongModel.getDatPhongById(Number(dat_phong_id));
    if (datPhong) {
      res.status(200).json(datPhong);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn đặt phòng' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy thông tin đơn đặt phòng:', error);
    res.status(500).json({ message: 'Lỗi khi lấy thông tin đơn đặt phòng' });
  }
};

// Thêm đơn đặt phòng mới
export const createDatPhong = async (req: Request, res: Response): Promise<void> => {
    const { nguoi_dung_id, ten_khach_hang, email, sdt, phong_id, ngay_bat_dau, ngay_ket_thuc, can_nang, tien } = req.body;
  
    // Kiểm tra xem các trường bắt buộc có đầy đủ không
    if (!ten_khach_hang || !email || !sdt || !phong_id || !ngay_bat_dau || !ngay_ket_thuc || can_nang === undefined || !tien) {
      res.status(400).json({ message: 'Thông tin đơn đặt phòng không đầy đủ' });
      return;
    }
  
    // Kiểm tra nếu ngày bắt đầu và ngày kết thúc có đúng định dạng Date không
    const ngayBatDau = new Date(ngay_bat_dau);
    const ngayKetThuc = new Date(ngay_ket_thuc);
  
    if (isNaN(ngayBatDau.getTime()) || isNaN(ngayKetThuc.getTime())) {
      res.status(400).json({ message: 'Ngày bắt đầu hoặc ngày kết thúc không hợp lệ' });
      return;
    }
  
    try {
      // Gọi phương thức thêm đơn đặt phòng từ Model
      await DatPhongModel.createDatPhong(
        nguoi_dung_id || null,  // Truyền nguoi_dung_id hoặc null nếu không có
        ten_khach_hang,
        email,
        sdt,
        phong_id,
        ngayBatDau,
        ngayKetThuc,
        can_nang || null,  // Trường can_nang có thể là null
        tien
      );
  
      // Trả về thông báo thành công
      res.status(201).json({ message: 'Đơn đặt phòng đã được tạo thành công' });
    } catch (error) {
      console.error('Lỗi khi tạo đơn đặt phòng mới:', error);
      res.status(500).json({ message: 'Lỗi khi tạo đơn đặt phòng' });
    }
  };
// Cập nhật thông tin đơn đặt phòng
export const updateDatPhong = async (req: Request, res: Response): Promise<void> => {
  const { dat_phong_id } = req.params;
  const { nguoi_dung_id, ten_khach_hang, email, sdt, phong_id, ngay_bat_dau, ngay_ket_thuc, can_nang, tien } = req.body;

  try {
    await DatPhongModel.updateDatPhong(
      Number(dat_phong_id),
      nguoi_dung_id,
      ten_khach_hang,
      email,
      sdt,
      phong_id,
      ngay_bat_dau ? new Date(ngay_bat_dau) : undefined,
      ngay_ket_thuc ? new Date(ngay_ket_thuc) : undefined,
      can_nang,
      tien
    );
    res.status(200).json({ message: 'Cập nhật đơn đặt phòng thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật đơn đặt phòng:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật đơn đặt phòng' });
  }
};

// Xóa đơn đặt phòng theo `dat_phong_id`
export const deleteDatPhong = async (req: Request, res: Response): Promise<void> => {
  const { dat_phong_id } = req.params;

  try {
    await DatPhongModel.deleteDatPhong(Number(dat_phong_id));
    res.status(200).json({ message: 'Đơn đặt phòng đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa đơn đặt phòng:', error);
    res.status(500).json({ message: 'Lỗi khi xóa đơn đặt phòng' });
  }
};

// Lấy đơn đặt phòng theo `nguoi_dung_id`
export const getDatPhongByNguoiDungId = async (req: Request, res: Response): Promise<void> => {
  const { nguoi_dung_id } = req.params;

  try {
    const datPhongList = await DatPhongModel.getDatPhongByNguoiDungId(Number(nguoi_dung_id));
    if (datPhongList.length > 0) {
      res.status(200).json(datPhongList);
    } else {
      res.status(404).json({ message: 'Không tìm thấy đơn đặt phòng cho người dùng này' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn đặt phòng theo người dùng:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn đặt phòng' });
  }
};
// Cập nhật trạng thái hết hạn mỗi ngày một lần
cron.schedule('0 0 * * *', async () => {
    try {
      await DatPhongModel.updateTrangThaiDatPhong();
      console.log('Đã cập nhật trạng thái hết hạn cho các đơn đặt phòng.');
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái: ', error);
    }
  });