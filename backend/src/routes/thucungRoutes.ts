import express from "express";
import * as ThuCungController from "../controllers/thucungController";
import { upload } from "../middleware/upload"; // Sử dụng multer để upload file

const router = express.Router();

// === Thêm – Cập nhật – Xoá ===
router.post("/thu-cung/them", upload.single("hinh_anh"), ThuCungController.themThuCung);
router.put("/thu-cung/update/:id", upload.single("hinh_anh"), ThuCungController.capNhatThuCung);
router.delete("/thu-cung/xoa/:id", ThuCungController.xoaThuCung);

// === Hiển thị danh sách thú cưng ===
router.get("/thu-cung/tai-khoan/:taiKhoanId", ThuCungController.getThuCungTheoTaiKhoanId);

export default router;
