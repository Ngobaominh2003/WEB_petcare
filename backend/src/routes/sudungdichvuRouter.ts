import express from "express";
import * as suDungDichVuController from "../controllers/sudungdichvuController";

const router = express.Router();

// Ghi nhận một lượt sử dụng dịch vụ
router.post("/su-dung-dich-vu", suDungDichVuController.ghiNhanSuDung);
// Lấy lịch sử sử dụng dịch vụ (có thể lọc theo dịch vụ và ngày)
router.get("/su-dung-dich-vu", suDungDichVuController.getLichSuSuDung);

export default router;
