import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRoutes from './routes/taikhoanRoutes';
import nguoidungRoutes from './routes/nguoidungRoutes';
import nhacungcapRoutes from './routes/nhacungcapRoutes';
import dichvuRoutes from './routes/dichvuRoutes';  
import goidichvuRoutes from './routes/goidichvuRoutes'; 
import baivietRoutes from './routes/baivietRoutes'; 
import datlichtRoutes from './routes/datlichRouter'; 
import phongRoutes from './routes/phongRouter'; 
import datphongRoutes from './routes/datphongRouter'; 
import hoadonRoutes from './routes/hoadonRouter'; 
import thongkeRouters from './routes/thongkeRouter'; 

import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  // Cho phép các nguồn gốc khác nhau truy cập
app.use(express.json());  // Parse request body dưới dạng JSON



// Định nghĩa route để phục vụ các file tĩnh từ thư mục img
app.use('/img', express.static(path.join('D:/DoAnTotNghiep/backend/src/img')));


 // Sử dụng các route từ file userRoutes
app.use('/api', userRoutes);
app.use('/api', nguoidungRoutes); 
app.use('/api', nhacungcapRoutes);
app.use('/api', dichvuRoutes);
app.use('/api', goidichvuRoutes);
app.use('/api', baivietRoutes);
app.use('/api', datlichtRoutes); 
app.use('/api', phongRoutes);
app.use('/api', datphongRoutes);
app.use('/api', hoadonRoutes);
app.use('/api', thongkeRouters);
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