import express from "express";
import * as danhGiaController from "../controllers/danhgiaController";
import { upload } from '../middleware/upload';

const router = express.Router();


router.post("/danh-gia", upload.single("hinh_anh"), danhGiaController.themDanhGia);

// Lấy tất cả đánh giá (có thể lọc theo dich_vu_id hoặc tai_khoan_id)
router.get("/danh-gia", danhGiaController.getDanhSachDanhGia);
router.get("/danh-gia/:id", danhGiaController.getDanhGiaTheoId);
router.put("/danh-gia/:id", danhGiaController.capNhatDanhGia);
router.delete("/danh-gia/:id", danhGiaController.xoaDanhGia);
// Thống kê đánh giá của một dịch vụ
router.get("/danh-gia/thong-ke/:dich_vu_id", danhGiaController.thongKeDanhGia);

export default router;
