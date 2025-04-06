import express from 'express';
import * as PhongController from '../controllers/phongController';

const router = express.Router();

router.get('/phong', PhongController.getAllPhong);
router.get('/phong/:phong_id', PhongController.getPhongById);
router.get('/phongtrong', PhongController.getPhongTrong);
router.post('/phong', PhongController.createPhong);
router.put('/phong/:phong_id', PhongController.updatePhong);
router.put('/phong/status/:phong_id', PhongController.updatePhongStatus);
router.delete('/phong/:phong_id', PhongController.deletePhong);

export default router;
