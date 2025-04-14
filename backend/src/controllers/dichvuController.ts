import { Request, Response } from "express";
import { dichVuModel } from "../models/DichVu";

// Controller thêm dịch vụ
export const themDichVu = async (req: Request, res: Response) => {
  try {
    const dichVu = req.body;

    console.log("Received data:", dichVu);  // In ra dữ liệu nhận được từ client

    // Kiểm tra nếu có logo được upload
    const logoPath = req.file ? req.file.filename : null;

    // Cập nhật logo vào dữ liệu dịch vụ
    const dichVuWithLogo = { ...dichVu, logo: logoPath };

    const result = await dichVuModel.themDichVu(dichVuWithLogo);
    res.status(200).json({ message: "Dịch vụ đã được thêm", result });
  } catch (err) {
    console.error("Error when adding service:", err);  // In ra lỗi để kiểm tra
    res.status(500).json({ message: "Lỗi khi thêm dịch vụ" });
  }
};


// Controller cập nhật dịch vụ
export const capNhatDichVu = async (req: Request, res: Response) => {
  const dichVuId = parseInt(req.params.id, 10);
  const dichVu = req.body;

  try {
    // Biến lưu đường dẫn logo
    let logoPath: string | null = null;

    // Kiểm tra nếu có logo mới được upload
    if (req.file) {
      logoPath = req.file.filename; // Nếu có logo mới, lưu đường dẫn logo mới
    } else {
      // Nếu không có logo mới (req.file là null), giữ nguyên logo cũ
      logoPath = dichVu.logo || null; // Nếu không có logo cũ trong dichVu, sẽ gán là null
    }

    // Cập nhật dịch vụ với hoặc không có logo mới
    const dichVuWithLogo = { ...dichVu, logo: logoPath };

    // Gọi model để cập nhật dịch vụ
    const result = await dichVuModel.capNhatDichVu(dichVuId, dichVuWithLogo);

    res.status(200).json({ message: "Dịch vụ đã được cập nhật thành công", result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: `Lỗi khi cập nhật dịch vụ: ${err.message}` });
    } else {
      res.status(500).json({ message: "Lỗi không xác định khi cập nhật dịch vụ" });
    }
  }
};

// Controller lấy danh sách tất cả dịch vụ
export const getDanhSachDichVu = async (req: Request, res: Response) => {
  try {
    const result = await dichVuModel.getDanhSachDichVu();
    res.status(200).json(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        message: `Lỗi khi hiển thị danh sách dịch vụ: ${err.message}`,
      });
    } else {
      res
        .status(500)
        .json({ message: "Lỗi không xác định khi hiển thị danh sách dịch vụ" });
    }
  }
};

// Controller lấy dịch vụ theo tai_khoan_id
export const getDichVuTheoTaiKhoanId = async (req: Request, res: Response) => {
  const taiKhoanId = parseInt(req.params.taiKhoanId, 10);
  try {
    const result = await dichVuModel.getDichVuTheoTaiKhoanId(taiKhoanId);
    res.status(200).json(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        message: `Lỗi khi lấy dịch vụ theo tai_khoan_id: ${err.message}`,
      });
    } else {
      res.status(500).json({
        message: "Lỗi không xác định khi lấy dịch vụ theo tai_khoan_id",
      });
    }
  }
};

// Controller xóa dịch vụ
export const xoaDichVu = async (req: Request, res: Response) => {
  const dichVuId = parseInt(req.params.id, 10);
  try {
    const result = await dichVuModel.xoaDichVu(dichVuId);
    res.status(200).json({ message: "Dịch vụ đã được xóa", result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: `Lỗi khi xóa dịch vụ: ${err.message}` });
    } else {
      res.status(500).json({ message: "Lỗi không xác định khi xóa dịch vụ" });
    }
  }
};

// Controller tìm dịch vụ theo tên gần đúng
export const timDichVuTheoTen = async (req: Request, res: Response) => {
  const { tenDichVu } = req.query;
  if (!tenDichVu || typeof tenDichVu !== "string") {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp từ khóa tìm kiếm hợp lệ" });
  }
  try {
    const result = await dichVuModel.timDichVuTheoTen(tenDichVu);
    res.status(200).json(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: `Lỗi khi tìm dịch vụ: ${err.message}` });
    } else {
      res.status(500).json({ message: "Lỗi không xác định khi tìm dịch vụ" });
    }
  }
};
// Controller lấy danh sách dịch vụ theo điều kiện
export const getDichVuTheoDieuKien = async (req: Request, res: Response) => {
  try {
    const result = await dichVuModel.getDichVuTheoDieuKien();
    res.status(200).json(result); // Trả về danh sách dịch vụ
  } catch (err: unknown) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ message: `Lỗi khi lấy danh sách dịch vụ: ${err.message}` });
    } else {
      res
        .status(500)
        .json({ message: "Lỗi không xác định khi lấy danh sách dịch vụ" });
    }
  }
};
