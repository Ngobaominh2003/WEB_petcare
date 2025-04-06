// src/routes/datLichRouter.ts

import express from 'express';
import * as DatLichController from '../controllers/datlichController';

const router = express.Router();

// Định nghĩa các route
router.get('/datlich', DatLichController.getAllDatLich);
router.get('/datlich/nguoidung/:nguoi_dung_id', DatLichController.getDatLichByNguoiDungId);
router.get('/datlich/thoi_gian_trong', DatLichController.getAvailableTimes);
router.post('/datlich', DatLichController.createDatLich);
router.put('/datlich/:dat_lich_id', DatLichController.updateDatLich);
router.delete('/datlich/:dat_lich_id', DatLichController.deleteDatLich);


export default router;
