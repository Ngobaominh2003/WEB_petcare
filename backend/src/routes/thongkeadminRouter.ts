// routes/thongKeRoutes.ts
import express from "express";
import * as ThongKeController from "../controllers/thongkeadminController";

const router = express.Router();

router.get("/thong-ke/tong-quat", ThongKeController.getThongKeTongQuat);
router.get("/thong-ke/doanh-thu-thang", ThongKeController.getDoanhThuTheoThang);
router.get("/thong-ke/don-hang-gan-day", ThongKeController.getDonHangGanDay);
router.get("/thong-ke/phan-bo-san-pham", ThongKeController.getPhanBoSanPham);

export default router;
