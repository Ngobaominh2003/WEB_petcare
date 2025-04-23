import express from 'express';
import * as NguoiDungController from '../controllers/nguoidungController';
import { upload } from '../middleware/upload';

const router = express.Router();


router.post('/nguoidung', upload.single('avata'), NguoiDungController.createNguoiDung);
router.put('/nguoidung', upload.single('avata'), NguoiDungController.updateNguoiDung);
router.delete('/nguoidung/:nguoi_dung_id', NguoiDungController.deleteNguoiDung);
router.delete('/nguoidung/tai-khoan/:tai_khoan_id', NguoiDungController.deleteNguoiDungByTaiKhoanId);
router.get('/nguoidung/tai-khoan/:tai_khoan_id', NguoiDungController.getNguoiDungByTaiKhoanId);

export default router;
