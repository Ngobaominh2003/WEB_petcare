import { Request, Response } from "express";
import { hoaDonModel } from "../models/HoaDon";

// Tạo hóa đơn mới
export const taoHoaDon = async (req: Request, res: Response) => {
  try {
    const hoaDon = req.body;
    const result = await hoaDonModel.taoHoaDon(hoaDon);
    res.status(201).json({ message: "Tạo hóa đơn thành công", result });
  } catch (err) {
    console.error("Lỗi khi tạo hóa đơn:", err);
    res.status(500).json({ message: "Lỗi khi tạo hóa đơn" });
  }
};

// Lấy danh sách hóa đơn (có thể lọc theo tài khoản ID và trạng thái)
export const getDanhSachHoaDon = async (req: Request, res: Response) => {
  const { tai_khoan_id, trang_thai } = req.query;

  try {
    const result = await hoaDonModel.getDanhSachHoaDon(
      tai_khoan_id ? parseInt(tai_khoan_id as string, 10) : undefined,
      trang_thai as string
    );
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách hóa đơn:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách hóa đơn" });
  }
};

// Xem chi tiết hóa đơn theo ID
export const getHoaDonTheoId = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await hoaDonModel.getHoaDonTheoId(id);
    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi khi lấy hóa đơn:", err);
    res.status(500).json({ message: "Lỗi khi lấy hóa đơn" });
  }
};

// Cập nhật trạng thái hóa đơn
export const capNhatTrangThai = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { trang_thai } = req.body;

  if (!["đã thanh toán", "chưa thanh toán", "hủy"].includes(trang_thai)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" });
  }

  try {
    const result = await hoaDonModel.capNhatTrangThai(id, trang_thai);
    res.status(200).json({ message: "Cập nhật trạng thái thành công", result });
  } catch (err) {
    console.error("Lỗi khi cập nhật trạng thái hóa đơn:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái hóa đơn" });
  }
};

// Xóa hóa đơn
export const xoaHoaDon = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await hoaDonModel.xoaHoaDon(id);
    res.status(200).json({ message: "Đã xóa hóa đơn", result });
  } catch (err) {
    console.error("Lỗi khi xóa hóa đơn:", err);
    res.status(500).json({ message: "Lỗi khi xóa hóa đơn" });
  }
};
