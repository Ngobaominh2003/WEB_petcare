import express from 'express';
import * as UserController from '../controllers/userController';

const router = express.Router();


router.post('/create', UserController.createUser);
router.put('/update', UserController.updateUser);
router.delete('/delete/:tai_khoan_id', UserController.deleteUser);
router.post('/login', UserController.login);
router.get('/users', UserController.getAllUsers);
router.get('/users/:tai_khoan_id', UserController.getUserById);

export default router;
