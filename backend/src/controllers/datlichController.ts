// src/controllers/datLichController.ts

import { Request, Response } from 'express';
import * as DatLichModel from '../models/DatLich';

// Lấy tất cả lịch đặt
export const getAllDatLich = async (req: Request, res: Response) => {
  try {
    const datLichs = await DatLichModel.getAllDatLich();
    res.json(datLichs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: String(error) });
    }
  }
};

// Lấy lịch đặt theo nguoi_dung_id
export const getDatLichByNguoiDungId = async (req: Request, res: Response) => {
  const nguoi_dung_id = parseInt(req.params.nguoi_dung_id);
  try {
    const datLichs = await DatLichModel.getDatLichByNguoiDungId(nguoi_dung_id);
    res.json(datLichs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: String(error) });
    }
  }
};

// Lấy lịch đặt theo dat_lich_id
export const getDatLichById = async (req: Request, res: Response) => {
  const dat_lich_id = parseInt(req.params.id);
  try {
    const datLich = await DatLichModel.getDatLichById(dat_lich_id);
    if (datLich) {
      res.json(datLich);
    } else {
      res.status(404).json({ message: 'Không tìm thấy lịch đặt' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: String(error) });
    }
  }
};
// Danh sách các khung giờ có sẵn trong ngày, ví dụ: mỗi 30 phút từ 8:00 đến 18:00
const workingHours = [
  '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00',
  '11:00:00', '11:30:00', '13:30:00',
  '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00',
  '17:00:00', '17:30:00', '18:00:00'
];

// Hàm lấy giờ còn trống trong ngày
export const getAvailableTimes = async (req: Request, res: Response) => {
  const { ngay_dat } = req.query;

  if (!ngay_dat) {
    return res.status(400).json({ message: 'Vui lòng cung cấp ngày đặt' });
  }

  try {
    // Lấy các giờ đã được đặt trong ngày từ cơ sở dữ liệu
    const bookedTimes = await DatLichModel.getBookedTimesForDate(ngay_dat as string);

    // Tìm các giờ còn trống
    const availableTimes = workingHours.filter(time => !bookedTimes.includes(time));

    res.json({ availableTimes });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
  }
};

// Thêm mới lịch đặt
export const createDatLich = async (req: Request, res: Response) => {
  try {
    const requestData = {
      ...req.body,
      nguoi_dung_id: req.body.nguoi_dung_id || null, // Nếu nguoi_dung_id rỗng, chuyển thành null
    };

    // Kiểm tra số lượng lịch đặt trùng ngày và giờ
    const existingCount = await DatLichModel.countDatLichByDateAndTime(requestData.ngay_dat, requestData.gio_dat);
    if (existingCount >= 8) {
      return res.status(400).json({ message: 'Số lượng lịch đặt trùng ngày và giờ đã đạt tối đa' });
    }

    // Tạo lịch đặt mới
    const result = await DatLichModel.createDatLich(requestData);
    res.status(201).json({ message: 'Tạo lịch đặt thành công', dat_lich_id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
  }
};


// Hàm cập nhật lịch đặt
export const updateDatLich = async (req: Request, res: Response) => {
  const dat_lich_id = parseInt(req.params.dat_lich_id);

  // Kiểm tra tính hợp lệ của dat_lich_id
  if (isNaN(dat_lich_id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  // Lấy dữ liệu cần cập nhật từ body
  const datLichData = req.body;


  try {
    // Gọi model để thực hiện cập nhật
    const result = await DatLichModel.updateDatLich(dat_lich_id, datLichData);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Không tìm thấy lịch đặt' });
    } else {
      res.json({ message: 'Cập nhật thành công' });
    }
  } catch (error) {
    // Xử lý lỗi và gửi phản hồi lỗi cho client
    res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
  }
};

// Hàm xóa lịch đặt
export const deleteDatLich = async (req: Request, res: Response) => {
  const dat_lich_id = parseInt(req.params.dat_lich_id);

  // Kiểm tra tính hợp lệ của dat_lich_id
  if (isNaN(dat_lich_id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }

  try {
    // Gọi model để thực hiện xóa
    const result = await DatLichModel.deleteDatLich(dat_lich_id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Không tìm thấy lịch đặt' });
    } else {
      res.json({ message: 'Xóa thành công' });
    }
  } catch (error) {
    // Xử lý lỗi và gửi phản hồi lỗi cho client
    res.status(500).json({ message: error instanceof Error ? error.message : String(error) });
  }
};