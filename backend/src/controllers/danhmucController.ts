import { Request, Response } from "express";
import { DanhMucModel } from "../models/DanhMuc";

// Controller thêm danh mục dịch vụ
export const themDanhMuc = async (req: Request, res: Response) => {
  try {
    const danhMuc = req.body;
    const result = await DanhMucModel.themDanhMuc(danhMuc);
    res.status(200).json({ message: "Danh mục đã được thêm", result });
  } catch (err) {
    console.error("Error when adding category:", err);
    res.status(500).json({ message: "Lỗi khi thêm danh mục" });
  }
};

// Controller cập nhật danh mục dịch vụ
export const capNhatDanhMuc = async (req: Request, res: Response) => {
  const danhMucId = parseInt(req.params.id, 10);
  const danhMuc = req.body;

  try {
    const result = await DanhMucModel.capNhatDanhMuc(danhMucId, danhMuc);
    res.status(200).json({ message: "Danh mục đã được cập nhật thành công", result });
  } catch (err) {
    console.error("Error when updating category:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật danh mục" });
  }
};

// Controller xóa danh mục dịch vụ
export const xoaDanhMuc = async (req: Request, res: Response) => {
  const danhMucId = parseInt(req.params.id, 10);

  try {
    const result = await DanhMucModel.xoaDanhMuc(danhMucId);
    res.status(200).json({ message: "Danh mục đã được xóa", result });
  } catch (err) {
    console.error("Error when deleting category:", err);
    res.status(500).json({ message: "Lỗi khi xóa danh mục" });
  }
};

// Controller lấy danh sách danh mục dịch vụ
export const getDanhSachDanhMuc = async (req: Request, res: Response) => {
  try {
    const result = await DanhMucModel.getDanhSachDanhMuc();
    res.status(200).json(result);  // Trả về danh sách danh mục dịch vụ
  } catch (err) {
    console.error("Error when fetching categories:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục" });
  }
};
