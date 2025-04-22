import { Request, Response } from 'express';
import { thuCungModel } from '../models/ThuCung';
import { handleImageUpload } from '../middleware/upload';

const extractHinhAnh = (req: Request, thuCung: any): string | null => {
  if (req.file) return handleImageUpload(req.file);
  return thuCung.hinh_anh || null;
};

export const themThuCung = async (req: Request, res: Response) => {
  try {
    const thuCung = req.body;
    const hinh_anh = extractHinhAnh(req, thuCung);

    const thuCungWithImage = { ...thuCung, hinh_anh };
    const result = await thuCungModel.themThuCung(thuCungWithImage);

    res.status(200).json({ message: "Thú cưng đã được thêm", result });
  } catch (err) {
    console.error("Error when adding pet:", err);
    res.status(500).json({ message: "Lỗi khi thêm thú cưng" });
  }
};

export const capNhatThuCung = async (req: Request, res: Response) => {
  const thuCungId = parseInt(req.params.id, 10);
  const thuCung = req.body;

  try {
    const hinh_anh = req.file ? req.file.filename : thuCung.hinh_anh || null;

    const thuCungWithImage = { ...thuCung, hinh_anh };

    const result = await thuCungModel.capNhatThuCung(thuCungId, thuCungWithImage);

    res.status(200).json({ message: "Thú cưng đã được cập nhật", result });
  } catch (err) {
    console.error("Error when updating pet:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật thú cưng" });
  }
};


export const xoaThuCung = async (req: Request, res: Response) => {
  const thuCungId = parseInt(req.params.id, 10);
  try {
    const result = await thuCungModel.xoaThuCung(thuCungId);
    res.status(200).json({ message: "Thú cưng đã được xóa", result });
  } catch (err) {
    console.error("Error when deleting pet:", err);
    res.status(500).json({ message: "Lỗi khi xóa thú cưng" });
  }
};

export const getThuCungTheoTaiKhoanId = async (req: Request, res: Response) => {
  const taiKhoanId = parseInt(req.params.taiKhoanId, 10);
  try {
    const result = await thuCungModel.getThuCungTheoTaiKhoanId(taiKhoanId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error when getting pets:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách thú cưng" });
  }
};
