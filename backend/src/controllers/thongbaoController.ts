import { Request, Response } from "express";
import * as ThongBaoModel from "../models/ThongBao";
import { ThongBao } from "../models/ThongBao"; 

// Tạo thông báo mới
export const create = async (req: Request, res: Response) => {
  try {
    const { tai_khoan_id, tieu_de, noi_dung, loai } = req.body;

    if (!tai_khoan_id || !noi_dung || !loai) {
      return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc." });
    }

    await ThongBaoModel.createThongBao({
      tai_khoan_id,
      tieu_de: tieu_de ?? null, // để chắc chắn không undefined
      noi_dung,
      loai,
      trang_thai: 'chưa đọc', // optional, có thể bỏ
      thoi_gian: new Date()   // optional, có thể bỏ
    } as ThongBao);
    
    res.status(201).json({ message: "Tạo thông báo thành công." });
  } catch (error) {
    console.error("Lỗi tạo thông báo:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

// Lấy danh sách thông báo theo tài khoản
export const getByTaiKhoan = async (req: Request, res: Response) => {
  try {
    const tai_khoan_id = Number(req.query.tai_khoan_id);
    const trang_thai = req.query.trang_thai as string | undefined;

    if (!tai_khoan_id) {
      return res.status(400).json({ message: "Thiếu tai_khoan_id." });
    }

    const list = await ThongBaoModel.getThongBaoByTaiKhoan(tai_khoan_id, trang_thai);
    res.json(list);
  } catch (error) {
    console.error("Lỗi lấy thông báo:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

// Đánh dấu đã đọc
export const markAsReadController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Thiếu ID." });

    await ThongBaoModel.markAsRead(id);
    res.json({ message: "Đánh dấu đã đọc thành công." });
  } catch (error) {
    console.error("Lỗi đánh dấu đã đọc:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

// Xoá 1 thông báo
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ message: "Thiếu ID." });

    await ThongBaoModel.deleteThongBao(id);
    res.json({ message: "Xoá thông báo thành công." });
  } catch (error) {
    console.error("Lỗi xoá thông báo:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

// Xoá tất cả đã đọc
export const deleteAllDaDoc = async (req: Request, res: Response) => {
  try {
    const tai_khoan_id = Number(req.query.tai_khoan_id);
    if (isNaN(tai_khoan_id) || tai_khoan_id <= 0) {
      return res.status(400).json({ message: "Thiếu hoặc sai tài khoản ID." });
    }

    const deleted = await ThongBaoModel.deleteThongBaoDaDoc(tai_khoan_id);
    res.json({ message: "Đã xoá tất cả thông báo đã đọc.", affectedRows: deleted });
  } catch (error) {
    console.error("Lỗi xóa tất cả đã đọc:", error);
    res.status(500).json({ message: "Lỗi server khi xóa." });
  }
};

// Đếm thông báo chưa đọc
export const countUnread = async (req: Request, res: Response) => {
  try {
    const tai_khoan_id = Number(req.query.tai_khoan_id);
    if (!tai_khoan_id)
      return res.status(400).json({ message: "Thiếu tai_khoan_id." });

    const count = await ThongBaoModel.countChuaDoc(tai_khoan_id);
    res.json({ so_luong: count });
  } catch (error) {
    console.error("Lỗi đếm chưa đọc:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};
