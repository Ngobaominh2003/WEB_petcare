import express from 'express';
import * as thongKeController from '../controllers/thongkeController';

const router = express.Router();

// 1. Tổng quan thu nhập (cards)
router.get('/thong-ke/tong-quan', thongKeController.getTongQuan);

// 2. Biểu đồ thu nhập 6 tháng
router.get('/thong-ke/bieu-do', thongKeController.getBieuDo);

// 3. Lịch sử giao dịch (thu nhập / chi phí)
router.get('/thong-ke/lich-su', thongKeController.getLichSu);

// 4. Thêm bản thống kê
router.post('/thong-ke', thongKeController.createThongKe);

// 5. Cập nhật thống kê
router.put('/thong-ke/:id', thongKeController.updateThongKe);

// 6. Xoá thống kê
router.delete('/thong-ke/:id', thongKeController.deleteThongKe);

router.post('/tu-dong', thongKeController.autoThongKe);

export default router;
