import { Request, Response } from "express";
import { baoCaoDanhGiaModel } from "../models/BaoCaoDanhGia";
import { danhGiaModel } from "../models/DanhGia";

// POST /api/bao-cao-danh-gia
export const themBaoCao = async (req: Request, res: Response) => {
  try {
    const { danh_gia_id, tai_khoan_id, ly_do } = req.body;

    if (!danh_gia_id || !tai_khoan_id || !ly_do) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const result = await baoCaoDanhGiaModel.themBaoCao({ danh_gia_id, tai_khoan_id, ly_do });
    res.status(201).json({ message: "Đã gửi báo cáo", result });
  } catch (err) {
    console.error("Lỗi gửi báo cáo:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi gửi báo cáo" });
  }
};

// GET /api/bao-cao-danh-gia
export const getDanhSachBaoCao = async (req: Request, res: Response) => {
  try {
    const { trang_thai } = req.query;
    const result = await baoCaoDanhGiaModel.getDanhSachBaoCao(trang_thai as string);
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi lấy danh sách báo cáo:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// GET /api/bao-cao-danh-gia/:id
export const getBaoCaoTheoId = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await baoCaoDanhGiaModel.getBaoCaoTheoId(id);
    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi lấy báo cáo:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// PUT /api/bao-cao-danh-gia/:id
export const capNhatTrangThai = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { trang_thai } = req.body;

    if (!["chờ xử lý", "đã xử lý", "bỏ qua"].includes(trang_thai)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    const result = await baoCaoDanhGiaModel.capNhatTrangThai(id, trang_thai);
    res.status(200).json({ message: "Đã cập nhật trạng thái báo cáo", result });
  } catch (err) {
    console.error("Lỗi cập nhật trạng thái báo cáo:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

// DELETE /api/bao-cao-danh-gia/:id/xoa-danh-gia
export const xuLyBaoCaoVaXoaDanhGia = async (req: Request, res: Response) => {
  const bao_cao_id = parseInt(req.params.id, 10);
  try {
    const baoCao = await baoCaoDanhGiaModel.getBaoCaoTheoId(bao_cao_id);
    if (!baoCao) {
      return res.status(404).json({ message: "Không tìm thấy báo cáo" });
    }

    await danhGiaModel.xoaDanhGia(baoCao.danh_gia_id);
    await baoCaoDanhGiaModel.capNhatTrangThai(bao_cao_id, "đã xử lý");

    res.status(200).json({ message: "Đã xóa đánh giá và cập nhật trạng thái báo cáo" });
  } catch (err) {
    console.error("Lỗi xử lý báo cáo:", err);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
