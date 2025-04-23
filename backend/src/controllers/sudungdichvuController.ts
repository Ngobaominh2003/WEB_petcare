import { Request, Response } from "express";
import { suDungDichVuModel } from "../models/SuDungDichVu";

// Ghi nhận một lượt sử dụng dịch vụ
export const ghiNhanSuDung = async (req: Request, res: Response) => {
  const { dich_vu_id, ngay_su_dung } = req.body;

  if (!dich_vu_id) {
    return res.status(400).json({ message: "Thiếu thông tin dich_vu_id" });
  }

  try {
    const result = await suDungDichVuModel.ghiNhanSuDung(dich_vu_id, ngay_su_dung);
    res.status(201).json({ message: "Đã ghi nhận lượt sử dụng", result });
  } catch (err) {
    console.error("Lỗi khi ghi nhận sử dụng dịch vụ:", err);
    res.status(500).json({ message: "Lỗi khi ghi nhận sử dụng dịch vụ" });
  }
};

// Lấy lịch sử sử dụng dịch vụ (có thể lọc theo dịch vụ và ngày)
export const getLichSuSuDung = async (req: Request, res: Response) => {
  const { dich_vu_id, ngay_su_dung } = req.query;

  try {
    const result = await suDungDichVuModel.getLichSuSuDung({
      dich_vu_id: dich_vu_id ? parseInt(dich_vu_id as string, 10) : undefined,
      ngay_su_dung: ngay_su_dung as string | undefined,
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử sử dụng dịch vụ:", err);
    res.status(500).json({ message: "Lỗi khi lấy lịch sử sử dụng dịch vụ" });
  }
};
