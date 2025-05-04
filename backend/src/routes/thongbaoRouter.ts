import { Router } from "express";
import * as thongbaoController from "../controllers/thongbaoController";

const router = Router();

router.post("/thong-bao", thongbaoController.create);
router.get("/thong-bao", thongbaoController.getByTaiKhoan);
router.put("/thong-bao/:id/doc", thongbaoController.markAsReadController);
router.delete("/thong-bao/da-doc", thongbaoController.deleteAllDaDoc);
router.delete("/thong-bao/:id", thongbaoController.remove);

router.get("/thong-bao/chua-doc", thongbaoController.countUnread);

export default router;
