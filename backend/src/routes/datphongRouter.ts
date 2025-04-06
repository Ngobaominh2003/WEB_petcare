import express from 'express';
import * as DatPhongController from '../controllers/datphongController';

const router = express.Router();

router.get('/datphong', DatPhongController.getAllDatPhong);
router.get('/datphong/:dat_phong_id', DatPhongController.getDatPhongById);
router.get('/datphong/user/:nguoi_dung_id', DatPhongController.getDatPhongByNguoiDungId);
router.post('/datphong', DatPhongController.createDatPhong);
router.put('/datphong/:dat_phong_id', DatPhongController.updateDatPhong);
router.delete('/datphong/:dat_phong_id', DatPhongController.deleteDatPhong);


export default router;
