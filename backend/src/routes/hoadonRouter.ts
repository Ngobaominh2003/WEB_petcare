import express from "express";
import * as hoaDonController from "../controllers/hoadonController";

const router = express.Router();


router.post("/hoa-don", hoaDonController.taoHoaDon);
// lấy danh sach, lây theo Tai_khoan_id, lấy theo Trang_thai, lấy theo Tai_khoan_id và Trang_thai
router.get("/hoa-don", hoaDonController.getDanhSachHoaDon);
router.get("/hoa-don/:id", hoaDonController.getHoaDonTheoId);
router.patch("/hoa-don/:id/trang-thai", hoaDonController.capNhatTrangThai);
router.delete("/hoa-don/:id", hoaDonController.xoaHoaDon);

export default router;
