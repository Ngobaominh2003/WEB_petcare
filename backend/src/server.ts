import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// Routers
import userRouter from './routes/taikhoanRouter';
import nguoidungRouter from './routes/nguoidungRouter';
import nhacungcapRouter from './routes/nhacungcapRouter';
import thucungRouter from './routes/thucungRouter';

import dichvuRouter from './routes/dichvuRouter';
import danhmucRouter from './routes/danhmucRouter';
import sudungdichvuRouter from './routes/sudungdichvuRouter';

import datlichtRouter from './routes/datlichRouter';
import hoadonRouter from './routes/hoadonRouter';

import baivietRouter from './routes/baivietRouter';
import binhluanbaivietRouter from './routes/binhluanbaivietRouter';

import danhgiaRouter from './routes/danhgiaRouter';
import baocaodanhgiaRouter from './routes/baocaodanhgiaRouter';

import thongbaoRouter from './routes/thongbaoRouter';
import thongkeRouter from './routes/thongkeRouter';
import thongkeadminRouter from './routes/thongkeadminRouter';

// Cron Jobs
import './cron/ThongKeCron';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware cấu hình chung
app.use(cors());
app.use(express.json());

// Phục vụ file ảnh tĩnh
app.use('/img', express.static(path.join('D:/DoAnToNghiep01/backend/src/img')));

// === Đăng nhập, tài khoản, người dùng ===
app.use('/api', userRouter);
app.use('/api', nguoidungRouter);
app.use('/api', nhacungcapRouter);

// === Dịch vụ và danh mục ===
app.use('/api', dichvuRouter);
app.use('/api', danhmucRouter);
app.use('/api', sudungdichvuRouter);

// === Đặt lịch và hóa đơn ===
app.use('/api', datlichtRouter);
app.use('/api', hoadonRouter);

// === Thú cưng ===
app.use('/api', thucungRouter);

// === Bài viết và bình luận ===
app.use('/api', baivietRouter);
app.use('/api', binhluanbaivietRouter);

// === Đánh giá và báo cáo ===
app.use('/api', danhgiaRouter);
app.use('/api', baocaodanhgiaRouter);

// === Thông báo và thống kê ===
app.use('/api', thongbaoRouter);
app.use('/api', thongkeRouter);
app.use('/api', thongkeadminRouter);

// === Route kiểm tra & lỗi ===
// 404 - Route không tồn tại
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

// 500 - Lỗi hệ thống
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// === Khởi động server ===
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
