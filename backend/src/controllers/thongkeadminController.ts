import { Request, Response } from "express";
import * as ThongKeAdmin from "../models/ThongKeAdmin";

// 1. GET /api/thong-ke/tong-quat
export const getThongKeTongQuat = async (req: Request, res: Response) => {
  try {
    const data = await ThongKeAdmin.layThongKeTongQuat();
    res.json(data);
  } catch (error) {
    console.error("Lỗi lấy thống kê tổng quát:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 2. GET /api/thong-ke/doanh-thu-thang
export const getDoanhThuTheoThang = async (req: Request, res: Response) => {
  try {
    const data = await ThongKeAdmin.layDoanhThuTheoThang();
    res.json(data);
  } catch (error) {
    console.error("Lỗi lấy doanh thu theo tháng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 3. GET /api/thong-ke/don-hang-gan-day
export const getDonHangGanDay = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const data = await ThongKeAdmin.layDonHangGanDay(limit);
    res.json(data);
  } catch (error) {
    console.error("Lỗi lấy đơn hàng gần đây:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 4. GET /api/thong-ke/phan-bo-san-pham
export const getPhanBoSanPham = async (req: Request, res: Response) => {
  try {
    const data = await ThongKeAdmin.layPhanBoTheoDanhMuc();
    res.json(data);
  } catch (error) {
    console.error("Lỗi lấy phân bổ sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
