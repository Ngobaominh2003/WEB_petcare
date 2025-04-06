import { Request, Response } from 'express';
import * as ThongKeModel from '../models/ThongKe';

// Controller: Lấy tổng doanh thu
export const getTotalRevenueController = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await ThongKeModel.getTotalRevenue();
    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error('Lỗi khi lấy tổng doanh thu:', error);
    res.status(500).json({ message: 'Không thể lấy tổng doanh thu.' });
  }
};

// Controller: Lấy tổng số hóa đơn
export const getTotalOrdersController = async (req: Request, res: Response) => {
  try {
    const totalOrders = await ThongKeModel.getTotalOrders();
    res.status(200).json({ totalOrders });
  } catch (error) {
    console.error('Lỗi khi lấy tổng số hóa đơn:', error);
    res.status(500).json({ message: 'Không thể lấy tổng số hóa đơn.' });
  }
};

// Controller: Lấy số hóa đơn chưa thanh toán
export const getUnpaidOrdersController = async (req: Request, res: Response) => {
  try {
    const unpaidOrders = await ThongKeModel.getUnpaidOrders();
    res.status(200).json({ unpaidOrders });
  } catch (error) {
    console.error('Lỗi khi lấy số hóa đơn chưa thanh toán:', error);
    res.status(500).json({ message: 'Không thể lấy số hóa đơn chưa thanh toán.' });
  }
};

// Controller: Lấy thống kê doanh thu hàng ngày
export const getDailyRevenueController = async (req: Request, res: Response) => {
    try {
      const data = await ThongKeModel.getDailyRevenue(); // Hàm trả về dữ liệu
      const sortedData = data.sort((a: { ngay: string }, b: { ngay: string }) =>
        new Date(b.ngay).getTime() - new Date(a.ngay).getTime()
      ); // Sắp xếp giảm dần
      const last7Days = sortedData.slice(0, 7).reverse(); // Lấy 7 ngày gần nhất và đảo ngược để hiển thị từ cũ -> mới
      res.status(200).json({ dailyRevenue: last7Days });
    } catch (error) {
      console.error('Lỗi khi lấy doanh thu 7 ngày gần nhất:', error);
      res.status(500).json({ message: 'Không thể lấy dữ liệu doanh thu 7 ngày gần nhất.' });
    }
  };
  

// Controller: Lấy thống kê doanh thu hàng tháng
export const getMonthlyRevenueController = async (req: Request, res: Response) => {
  try {
    const monthlyRevenue = await ThongKeModel.getMonthlyRevenue();
    res.status(200).json({ monthlyRevenue });
  } catch (error) {
    console.error('Lỗi khi lấy doanh thu hàng tháng:', error);
    res.status(500).json({ message: 'Không thể lấy doanh thu hàng tháng.' });
  }
};

// Controller: Lấy thống kê doanh thu hàng năm
export const getYearlyRevenueController = async (req: Request, res: Response) => {
  try {
    const yearlyRevenue = await ThongKeModel.getYearlyRevenue();
    res.status(200).json({ yearlyRevenue });
  } catch (error) {
    console.error('Lỗi khi lấy doanh thu hàng năm:', error);
    res.status(500).json({ message: 'Không thể lấy doanh thu hàng năm.' });
  }
};
