import express from 'express';
import * as DanhMucController from '../controllers/danhmucController';

const router = express.Router();


router.post('/danh-muc/them', DanhMucController.themDanhMuc);
router.put('/danh-muc/cap-nhat/:id', DanhMucController.capNhatDanhMuc);
router.delete('/danh-muc/xoa/:id', DanhMucController.xoaDanhMuc);
router.get('/danh-muc', DanhMucController.getDanhSachDanhMuc);

export default router;
