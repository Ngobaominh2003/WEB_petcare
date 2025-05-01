import express from "express";
import * as baoCaoDanhGiaController from "../controllers/baoCaoDanhGiaController";

const router = express.Router();
router.post("/bao-cao-danh-gia", baoCaoDanhGiaController.themBaoCao);
router.get("/bao-cao-danh-gia", baoCaoDanhGiaController.getDanhSachBaoCao);
router.get("/bao-cao-danh-gia/:id", baoCaoDanhGiaController.getBaoCaoTheoId);
router.patch("/bao-cao-danh-gia/:id", baoCaoDanhGiaController.capNhatTrangThai);
router.delete("/bao-cao-danh-gia/:id/xoa-danh-gia", baoCaoDanhGiaController.xuLyBaoCaoVaXoaDanhGia);

export default router;
