import express from 'express';
import * as HoaDonController from '../controllers/hoadonController';

const router = express.Router();

// Đăng ký các route cho hóa đơn
router.get('/hoadon', HoaDonController.getAllInvoicesController);
router.get('/hoadon/:nguoiDungId/:ngayTao', HoaDonController.getInvoicesByUserIdAndDateController);
router.delete('/hoadon/:hoaDonId', HoaDonController.deleteInvoiceController);

export default router;
