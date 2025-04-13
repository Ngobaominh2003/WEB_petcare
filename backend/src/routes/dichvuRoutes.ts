import express from 'express';
import * as DichVuController from '../controllers/dichvuController'; 
import { upload } from '../middleware/upload'; 

const router = express.Router();

router.post('/dich-vu/them', upload.single('logo'), DichVuController.themDichVu);
router.put('/dich-vu/cap-nhat/:id', upload.single('logo'), DichVuController.capNhatDichVu);
router.get('/dich-vu', DichVuController.getDanhSachDichVu);
router.get('/dich-vu/tai-khoan/:taiKhoanId', DichVuController.getDichVuTheoTaiKhoanId);
router.delete('/dich-vu/xoa/:id', DichVuController.xoaDichVu);
router.get('/dich-vu/tim', DichVuController.timDichVuTheoTen);
router.get('/user/danhsach/dich-vu', DichVuController.getDichVuTheoDieuKien);

export default router;
