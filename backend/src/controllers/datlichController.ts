import { Request, Response } from "express";
import { datLichModel } from "../models/DatLich";

// Tạo lịch hẹn mới
export const taoDatLich = async (req: Request, res: Response) => {
  try {
    const datLich = req.body;
    const result: any = await datLichModel.taoDatLich(datLich);
    res.status(201).json({
      insertId: result.insertId,
      message: "Đặt lịch thành công"
    });
  } catch (err) {
    console.error("Lỗi khi tạo lịch hẹn:", err);
    res.status(500).json({ message: "Lỗi khi tạo lịch hẹn" });
  }
};

// Lấy tất cả lịch hẹn
export const getTatCaDatLich = async (req: Request, res: Response) => {
  try {
    const result = await datLichModel.getTatCaDatLich();
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách lịch hẹn:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách lịch hẹn" });
  }
};

// Lấy chi tiết lịch hẹn theo ID
export const getDatLichTheoId = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await datLichModel.getDatLichTheoId(id);
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi khi lấy lịch hẹn:", err);
    res.status(500).json({ message: "Lỗi khi lấy lịch hẹn" });
  }
};

// Lấy lịch hẹn theo tài khoản
export const getDatLichTheoTaiKhoanId = async (req: Request, res: Response) => {
  const taiKhoanId = parseInt(req.params.id, 10);
  try {
    const result = await datLichModel.getDatLichTheoTaiKhoanId(taiKhoanId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi khi lấy lịch theo tài khoản:", err);
    res.status(500).json({ message: "Lỗi khi lấy lịch theo tài khoản" });
  }
};

// Cập nhật thông tin lịch hẹn
export const capNhatDatLich = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;
  try {
    const result = await datLichModel.capNhatDatLich(id, data);
    res.status(200).json({ message: "Cập nhật thành công", result });
  } catch (err) {
    console.error("Lỗi khi cập nhật lịch:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật lịch" });
  }
};

// Cập nhật trạng thái lịch hẹn
export const capNhatTrangThai = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { trang_thai } = req.body;
  if (
    !["chờ xác nhận", "đã xác nhận", "hoàn thành", "hủy"].includes(trang_thai)
  ) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" });
  }

  try {
    const result = await datLichModel.capNhatTrangThai(id, trang_thai);
    res.status(200).json({ message: "Trạng thái đã được cập nhật", result });
  } catch (err) {
    console.error("Lỗi khi cập nhật trạng thái:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái" });
  }
};

// Xoá lịch hẹn
export const xoaDatLich = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await datLichModel.xoaDatLich(id);
    res.status(200).json({ message: "Xoá lịch thành công", result });
  } catch (err) {
    console.error("Lỗi khi xoá lịch:", err);
    res.status(500).json({ message: "Lỗi khi xoá lịch" });
  }
};
