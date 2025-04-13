import express from 'express';
import * as NhaCungCapController from '../controllers/nhacungcapController';
import { upload } from '../middleware/upload'; 

const router = express.Router();


router.post('/nhacungcap', upload.single('giay_phep_kinh_doanh'), NhaCungCapController.createNhaCungCap);
router.put('/nhacungcap', upload.single('giay_phep_kinh_doanh'), NhaCungCapController.updateNhaCungCap);
router.delete('/nhacungcap/tai-khoan/:tai_khoan_id', NhaCungCapController.deleteNhaCungCapByTaiKhoanId);
router.get('/nhacungcap/tai-khoan/:tai_khoan_id', NhaCungCapController.getNhaCungCapByTaiKhoanId);
router.get('/nhacungcap/name/:ten_nha_cung_cap', NhaCungCapController.getNhaCungCapByName);
router.get('/dsnhacungcap', NhaCungCapController.getDanhSachNhaCungCap);

export default router;
