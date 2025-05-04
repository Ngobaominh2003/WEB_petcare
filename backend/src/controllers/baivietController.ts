import { Request, Response } from 'express';
import * as BaiVietModel from '../models/BaiViet';

export const getDanhSachBaiViet = async (req: Request, res: Response) => {
  try {
    const data = await BaiVietModel.getAllBaiViet();
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
export const getDKBaiViet = async (req: Request, res: Response) => {
  try {
    const data = await BaiVietModel.getDSBaiViet();
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getChiTietBaiViet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await BaiVietModel.getBaiVietById(id);
    if (!data) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.json(data);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết bài viết:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const themBaiViet = async (req: Request, res: Response) => {
  try {
    const { tai_khoan_id, tieu_de, noi_dung } = req.body;
    const hinh_anh = req.file ? req.file.filename : undefined;

    if (!tai_khoan_id || !tieu_de || !noi_dung) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    await BaiVietModel.createBaiViet({ tai_khoan_id, tieu_de, noi_dung, hinh_anh });
    res.status(201).json({ message: "Tạo bài viết thành công" });
  } catch (error) {
    console.error("Lỗi khi thêm bài viết:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const capNhatBaiViet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const hinh_anh = req.file ? req.file.filename : undefined;
    const updateData = { ...data, hinh_anh };

    await BaiVietModel.updateBaiViet(id, updateData);
    res.json({ message: "Cập nhật bài viết thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const xoaBaiViet = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await BaiVietModel.deleteBaiViet(id);
    res.json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
