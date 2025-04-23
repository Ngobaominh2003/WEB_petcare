import express from 'express';
import * as BaiVietController from '../controllers/baivietController';
import { upload } from '../middleware/upload';

const router = express.Router();

// Định nghĩa các route
router.get('/baiviet', BaiVietController.getAllBaiViet);
router.get('/baiviet/nguoidung/:nguoi_dung_id', BaiVietController.getBaiVietByNguoiDung);
router.get('/baiviet/:bai_viet_id', BaiVietController.getBaiVietById);
router.post('/baiviet', upload.single('hinh_anh'), BaiVietController.createBaiViet);
router.put('/baiviet/:bai_viet_id', upload.single('hinh_anh'), BaiVietController.updateBaiViet);
router.delete('/baiviet/:bai_viet_id', BaiVietController.deleteBaiViet);

export default router;
