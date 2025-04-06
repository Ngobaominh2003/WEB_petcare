import express from 'express';
import { getAllDichVu, searchDichVu, addDichVu, updateDichVu, deleteDichVu } from '../controllers/dichvuController';
import { upload } from '../middleware/upload';

const router = express.Router();

router.get('/dichvu', getAllDichVu);
router.get('/dichvu/search', searchDichVu);
router.post('/dichvu', upload.single('logo'), addDichVu);
router.put('/dichvu/:dichVuId', upload.single('logo'), updateDichVu); // New route for updating a service
router.delete('/dichvu/:dichVuId', deleteDichVu);

export default router;
