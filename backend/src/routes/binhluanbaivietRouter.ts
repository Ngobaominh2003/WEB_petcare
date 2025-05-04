import express from 'express';
import * as BinhLuanBaiVietController from '../controllers/binhluanbaivietController';


const router = express.Router();

// GET /api/binh-luan - lấy tất cả bình luận
router.get('/binh-luan', BinhLuanBaiVietController.getAll);

// GET /api/binh-luan/bai-viet/:bai_viet_id - lấy bình luận theo bài viết
router.get('/bai-viet/:bai_viet_id', BinhLuanBaiVietController.getByBaiVietId);

// POST /api/binh-luan - thêm bình luận
router.post('/binh-luan', BinhLuanBaiVietController.create);

// PUT /api/binh-luan/:binh_luan_id - cập nhật bình luận
router.put('/binh-luan/:binh_luan_id', BinhLuanBaiVietController.update);

// DELETE /api/binh-luan/:binh_luan_id - xóa bình luận
router.delete('/binh-luan/:binh_luan_id', BinhLuanBaiVietController.remove);

export default router;
