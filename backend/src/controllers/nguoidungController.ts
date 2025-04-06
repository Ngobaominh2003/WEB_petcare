import { Request, Response } from "express";
import * as NguoiDungModel from "../models/NguoiDung";

// Thêm người dùng
export const createNguoiDung = async (req: Request, res: Response) => {
  try {
    const { tai_khoan_id, ho_ten, sdt, gioi_tinh } = req.body;
    const avata = req.file ? req.file.filename : null;

    await NguoiDungModel.createNguoiDung(
      parseInt(tai_khoan_id),
      ho_ten,
      sdt || null,
      gioi_tinh || null,
      avata
    );

    res.status(201).json({ message: "Người dùng đã được thêm thành công!" });
  } catch (error) {
    console.error(" Lỗi khi thêm người dùng:", error);
    res.status(500).json({ message: "Lỗi khi thêm người dùng", error });
  }
};

// Cập nhật thông tin người dùng
export const updateNguoiDung = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id, ho_ten, sdt, gioi_tinh } = req.body;
  const avata = req.file ? req.file.filename : null; // Lấy tên file ảnh từ multer

  // Nếu gioi_tinh không hợp lệ, gán là null
  const validGioiTinhValues = ['nam', 'nu', 'khac'];
  const gioiTinhValue = validGioiTinhValues.includes(gioi_tinh) ? gioi_tinh : null;

  try {
    await NguoiDungModel.updateNguoiDung(
      tai_khoan_id,
      ho_ten,
      sdt,
      gioiTinhValue,
      avata
    );
    res.status(200).json({ message: "Cập nhật người dùng thành công!" });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật người dùng", error });
  }
};


// Xóa người dùng theo nguoi_dung_id
export const deleteNguoiDung = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nguoi_dung_id } = req.params;

  try {
    await NguoiDungModel.deleteNguoiDung(parseInt(nguoi_dung_id));
    res.status(200).json({ message: "Người dùng đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ message: "Lỗi khi xóa người dùng", error });
  }
};

// Xóa người dùng theo tai_khoan_id
export const deleteNguoiDungByTaiKhoanId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tai_khoan_id } = req.params;

  try {
    await NguoiDungModel.deleteNguoiDungByTaiKhoanId(parseInt(tai_khoan_id));
    res
      .status(200)
      .json({ message: "Người dùng đã được xóa thành công theo tai_khoan_id" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng theo tai_khoan_id:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi xóa người dùng theo tai_khoan_id", error });
  }
};

// Tìm người dùng theo tai_khoan_id
export const getNguoiDungByTaiKhoanId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tai_khoan_id } = req.params;

  try {
    const nguoiDung = await NguoiDungModel.getNguoiDungByTaiKhoanId(
      parseInt(tai_khoan_id)
    );
    if (nguoiDung) {
      res.status(200).json(nguoiDung);
    } else {
      res.status(404).json({ message: "Người dùng không tìm thấy" });
    }
  } catch (error) {
    console.error("Lỗi khi tìm người dùng theo tai_khoan_id:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi tìm người dùng theo tai_khoan_id", error });
  }
};
