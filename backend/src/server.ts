import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRouter from './routes/taikhoanRouter';
import nguoidungRouter from './routes/nguoidungRouter';
import nhacungcapRouter from './routes/nhacungcapRouter';
import dichvuRouter from './routes/dichvuRouter';  
import danhmucRouter from './routes/daivietRouter'; 
import goidichvuRouter from './routes/goidichvuRouter'; 
import baivietRouter from './routes/baivietRouter'; 
import datlichtRouter from './routes/datlichRouter'; 
import phongRouter from './routes/phongRouter'; 
import thucungRouter from './routes/thucungRouter'; 
import datphongRouter from './routes/datphongRouter'; 
import hoadonRouter from './routes/hoadonRouter'; 
import thongkeRouterr from './routes/thongkeRouter'; 
import sudungdichvuRouterr from './routes/sudungdichvuRouter'; 

import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  // Cho phép các nguồn gốc khác nhau truy cập
app.use(express.json());  // Parse request body dưới dạng JSON



// Định nghĩa route để phục vụ các file tĩnh từ thư mục img
app.use('/img', express.static(path.join('D:/DoAnToNghiep01/backend/src/img')));


 // Sử dụng các route từ file userRoutes
app.use('/api', userRouter);
app.use('/api', nguoidungRouter); 
app.use('/api', nhacungcapRouter);
app.use('/api', dichvuRouter);
app.use('/api', thucungRouter);
app.use('/api', danhmucRouter);
app.use('/api', goidichvuRouter);
app.use('/api', baivietRouter);
app.use('/api', datlichtRouter); 
app.use('/api', phongRouter);
app.use('/api', datphongRouter);
app.use('/api', hoadonRouter);
app.use('/api', thongkeRouterr);
app.use('/api', sudungdichvuRouterr);
// Route kiểm tra server hoạt động



// Xử lý route không tồn tại (404)
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

// Xử lý lỗi tổng quát
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});