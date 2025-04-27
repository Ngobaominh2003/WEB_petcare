import { Request, Response } from "express";
import * as NguoiDungModel from "../models/NguoiDung";

// Thêm người dùng
export const createNguoiDung = async (req: Request, res: Response) => {
  try {
    const { tai_khoan_id, ho_ten, sdt, gioi_tinh, dia_chi } = req.body;

    const avata = req.file ? req.file.filename : null;

    await NguoiDungModel.createNguoiDung(
      tai_khoan_id,
      ho_ten,
      sdt,
      gioi_tinh,
      avata,
      dia_chi // <== BẠN PHẢI TRUYỀN THÊM THAM SỐ NÀY
    );
    

    res.status(201).json({ message: "Người dùng đã được thêm thành công!" });
  } catch (error) {
    console.error(" Lỗi khi thêm người dùng:", error);
    res.status(500).json({ message: "Lỗi khi thêm người dùng", error });
  }
};

// Cập nhật thông tin người dùng
export const updateNguoiDung = async (req: Request, res: Response): Promise<void> => {
  const { tai_khoan_id, ho_ten, sdt, gioi_tinh, dia_chi } = req.body;
  const newAvata = req.file ? req.file.filename : null;

  const validGioiTinhValues = ['nam', 'nu', 'khac'];
  const gioiTinhValue = validGioiTinhValues.includes(gioi_tinh) ? gioi_tinh : null;

  try {
    // Lấy thông tin người dùng hiện tại
    const nguoiDungHienTai = await NguoiDungModel.getNguoiDungByTaiKhoanId(tai_khoan_id);

    if (!nguoiDungHienTai) {
      res.status(404).json({ message: "Không tìm thấy người dùng." });
      return;
    }

    const avataToUpdate = newAvata || nguoiDungHienTai.avata; // Nếu không có file mới thì giữ avata cũ

    await NguoiDungModel.updateNguoiDung(
      tai_khoan_id,
      ho_ten,
      sdt,
      gioiTinhValue,
      avataToUpdate,
      dia_chi
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
