import { Request, Response } from "express";
import { danhGiaModel } from "../models/DanhGia";

// POST /api/danh-gia – Tạo đánh giá mới
export const themDanhGia = async (req: Request, res: Response) => {
  try {
    const { tai_khoan_id, dich_vu_id, diem, binh_luan } = req.body;
    const hinh_anh = req.file ? req.file.filename : null;

    console.log("req.file:", req.file);  // kiểm tra xem ảnh có được nhận
    console.log("req.body:", req.body);  // kiểm tra các trường khác

    if (!tai_khoan_id || !dich_vu_id || !diem) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const result = await danhGiaModel.themDanhGia({
      tai_khoan_id: parseInt(tai_khoan_id),
      dich_vu_id: parseInt(dich_vu_id),
      diem: parseInt(diem),
      binh_luan: binh_luan || "",
      hinh_anh,
    });

    res.status(201).json({ message: "Đã tạo đánh giá", result });
  } catch (err) {
    console.error("Lỗi tạo đánh giá:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi tạo đánh giá" });
  }
};



// GET /api/danh-gia – Lấy tất cả đánh giá (có thể lọc)
export const getDanhSachDanhGia = async (req: Request, res: Response) => {
  try {
    const { dich_vu_id, tai_khoan_id } = req.query;

    const result = await danhGiaModel.getDanhSachDanhGia(
      dich_vu_id ? parseInt(dich_vu_id as string) : undefined,
      tai_khoan_id ? parseInt(tai_khoan_id as string) : undefined
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi lấy danh sách đánh giá:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy danh sách" });
  }
};

// GET /api/danh-gia/:id – Xem chi tiết một đánh giá
export const getDanhGiaTheoId = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await danhGiaModel.getDanhGiaTheoId(id);

    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy đánh giá" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi lấy chi tiết đánh giá:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi lấy chi tiết" });
  }
};

// PUT /api/danh-gia/:id – Cập nhật đánh giá
export const capNhatDanhGia = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { diem, binh_luan } = req.body;

  try {
    const result = await danhGiaModel.capNhatDanhGia(id, { diem, binh_luan });

    res.status(200).json({ message: "Cập nhật đánh giá thành công", result });
  } catch (err) {
    console.error("Lỗi cập nhật đánh giá:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi cập nhật đánh giá" });
  }
};

// DELETE /api/danh-gia/:id – Xoá đánh giá
export const xoaDanhGia = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await danhGiaModel.xoaDanhGia(id);

    res.status(200).json({ message: "Xoá đánh giá thành công", result });
  } catch (err) {
    console.error("Lỗi xoá đánh giá:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi xoá đánh giá" });
  }
};

// GET /api/danh-gia/thong-ke/:dich_vu_id – Thống kê đánh giá
export const thongKeDanhGia = async (req: Request, res: Response) => {
  const dich_vu_id = parseInt(req.params.dich_vu_id, 10);
  if (isNaN(dich_vu_id)) {
    return res.status(400).json({ message: "ID dịch vụ không hợp lệ" });
  }

  try {
    const result = await danhGiaModel.thongKeDanhGia(dich_vu_id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi thống kê đánh giá:", err);
    res.status(500).json({ message: "Lỗi máy chủ khi thống kê đánh giá" });
  }
};
