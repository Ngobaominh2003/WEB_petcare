import express from 'express';
import * as ThongKeController from '../controllers/thongkeController';

const router = express.Router();

// Định nghĩa các route thống kê
router.get('/revenue/total', ThongKeController.getTotalRevenueController); // Tổng doanh thu
router.get('/orders/total', ThongKeController.getTotalOrdersController); // Tổng số hóa đơn
router.get('/orders/unpaid', ThongKeController.getUnpaidOrdersController); // Số hóa đơn chưa thanh toán
router.get('/daily', ThongKeController.getDailyRevenueController); // Doanh thu hàng ngày
router.get('/monthly', ThongKeController.getMonthlyRevenueController); // Doanh thu hàng tháng
router.get('/yearly', ThongKeController.getYearlyRevenueController); // Doanh thu hàng năm

export default router;
