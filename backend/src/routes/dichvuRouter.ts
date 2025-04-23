import express from 'express';
import * as DichVuController from '../controllers/dichvuController'; 
import { upload } from '../middleware/upload'; 

const router = express.Router();

// === Thêm – Cập nhật – Xoá ===
router.post('/dich-vu/them', upload.single('logo'), DichVuController.themDichVu);
router.put('/dich-vu/cap-nhat/:id', upload.single('logo'), DichVuController.capNhatDichVu);
router.delete('/dich-vu/xoa/:id', DichVuController.xoaDichVu);

// === Hiển thị danh sách ===
router.get('/dich-vu', DichVuController.getDanhSachDichVu);
router.get('/dich-vu/danhsach/:danhMucId', DichVuController.getDichVuTheoDanhMucId);
router.get('/dich-vu/tai-khoan/:taiKhoanId', DichVuController.getDichVuTheoTaiKhoanId);
router.get('/dich-vu/tim', DichVuController.timDichVuTheoTen);
router.get('/dich-vu/dieu-kien', DichVuController.getDichVuTheoDieuKien); 

export default router;
