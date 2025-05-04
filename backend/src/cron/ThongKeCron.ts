// src/cron/thongKeCron.ts
import cron from 'node-cron';
import { tinhThongKeTuDong } from '../models/ThongKe';

// Chạy lúc 01:00 sáng mỗi ngày
cron.schedule('0 1 * * *', async () => {
  console.log('[CRON] Đang chạy thống kê tự động...');
  try {
    const result = await tinhThongKeTuDong();
    console.log(`[CRON] Đã thống kê tự động cho ${result.inserted} dịch vụ.`);
  } catch (error) {
    console.error('[CRON] Lỗi khi thống kê tự động:', error);
  }
});

// Nếu cần: export hàm để kiểm soát hoặc khởi động thủ công
export const startThongKeCron = () => {
  console.log('[CRON] Lên lịch thống kê thành công.');
};
