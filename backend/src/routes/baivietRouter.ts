import express from 'express';
import * as BaiVietController from '../controllers/baivietController';
import { upload } from '../middleware/upload';

const router = express.Router();

// GET: Lấy tất cả bài viết
router.get('/danh-sach-bai-viet', BaiVietController.getDanhSachBaiViet);
router.get('/danh-sach-bai-viet-dk', BaiVietController.getDKBaiViet);

// GET: Lấy chi tiết bài viết theo ID
router.get('/chi-tiet-bai-viet/:id', BaiVietController.getChiTietBaiViet);

// POST: Thêm bài viết mới (có hình)
router.post('/them-bai-viet', upload.single('hinh_anh'), BaiVietController.themBaiViet);

// PUT: Cập nhật bài viết (có thể có hình mới)
router.put('/cap-nhat-bai-viet/:id', upload.single('hinh_anh'), BaiVietController.capNhatBaiViet);

// DELETE: Xóa bài viết theo ID
router.delete('/xoa-bai-viet/:id', BaiVietController.xoaBaiViet);

export default router;
