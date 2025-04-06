import express from 'express';

import {
  fetchGoiDichVu,
  createGoiDichVu,
  updateGoiDichVu,  // Import hàm cập nhật
  deleteGoiDichVu   // Import hàm xóa
} from '../controllers/goidichvuController';

const router = express.Router();

// Định nghĩa các route cho gói dịch vụ
router.get('/goidichvu', fetchGoiDichVu); // Lấy tất cả gói dịch vụ
router.post('/goidichvu', createGoiDichVu); // Tạo gói dịch vụ mới
router.put('/goidichvu/:id', updateGoiDichVu); // Cập nhật gói dịch vụ theo ID
router.delete('/goidichvu/:id', deleteGoiDichVu); // Xóa gói dịch vụ theo ID

export default router;
