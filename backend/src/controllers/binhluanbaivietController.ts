import { Request, Response } from 'express';
import * as BinhLuanBaiVietModel from '../models/BinhLuanBaiViet';

// [GET] /api/binh-luan - Lấy toàn bộ bình luận
export const getAll = async (req: Request, res: Response) => {
  try {
    const binhLuans = await BinhLuanBaiVietModel.getAllBinhLuan();
    res.json(binhLuans);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách bình luận' });
  }
};

// [GET] /api/binh-luan/bai-viet/:bai_viet_id - Lấy bình luận theo bài viết
export const getByBaiVietId = async (req: Request, res: Response) => {
  const { bai_viet_id } = req.params;

  try {
    const binhLuans = await BinhLuanBaiVietModel.getBinhLuanByBaiVietId(Number(bai_viet_id));
    res.json(binhLuans);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy bình luận theo bài viết' });
  }
};

// [POST] /api/binh-luan - Thêm bình luận mới
export const create = async (req: Request, res: Response) => {
  const { bai_viet_id, tai_khoan_id, noi_dung } = req.body;

  if (!bai_viet_id || !tai_khoan_id || !noi_dung) {
    return res.status(400).json({ error: 'Thiếu thông tin bình luận' });
  }

  try {
    const insertId = await BinhLuanBaiVietModel.createBinhLuan(bai_viet_id, tai_khoan_id, noi_dung);
    res.status(201).json({ message: 'Thêm bình luận thành công', binh_luan_id: insertId });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi thêm bình luận' });
  }
};

// [PUT] /api/binh-luan/:binh_luan_id - Sửa nội dung bình luận
export const update = async (req: Request, res: Response) => {
  const { binh_luan_id } = req.params;
  const { noi_dung } = req.body;

  if (!noi_dung) {
    return res.status(400).json({ error: 'Nội dung không được bỏ trống' });
  }

  try {
    await BinhLuanBaiVietModel.updateBinhLuan(Number(binh_luan_id), noi_dung);
    res.json({ message: 'Cập nhật bình luận thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi cập nhật bình luận' });
  }
};

// [DELETE] /api/binh-luan/:binh_luan_id - Xóa bình luận
export const remove = async (req: Request, res: Response) => {
  const { binh_luan_id } = req.params;

  try {
    await BinhLuanBaiVietModel.deleteBinhLuan(Number(binh_luan_id));
    res.json({ message: 'Xóa bình luận thành công' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa bình luận' });
  }
};
