import express from "express";
import * as datLichController from "../controllers/datlichController";

const router = express.Router();


router.post("/dat-lich", datLichController.taoDatLich);
router.get("/dat-lich", datLichController.getTatCaDatLich);
router.get("/dat-lich/:id", datLichController.getDatLichTheoId);
router.get("/dat-lich/tai-khoan/:id", datLichController.getDatLichTheoTaiKhoanId);
router.put("/dat-lich/:id", datLichController.capNhatDatLich);
router.patch("/dat-lich/:id/trang-thai", datLichController.capNhatTrangThai);
router.delete("/dat-lich/:id", datLichController.xoaDatLich);

export default router;
