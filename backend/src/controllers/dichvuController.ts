import { Request, Response } from 'express';
import { hienThiTatCaDichVu, timKiemDichVu, themDichVu, suaDichVu, xoaDichVu } from '../models/DichVu';  // Đảm bảo bạn nhập đúng đường dẫn


export const getAllDichVu = async (req: Request, res: Response): Promise<void> => {
    try {
        const dichVuList = await hienThiTatCaDichVu();
        res.status(200).json(dichVuList);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách dịch vụ.', error: error instanceof Error ? error.message : error });
    }
};

export const searchDichVu = async (req: Request, res: Response): Promise<void> => {
    const { tenDichVu } = req.query as { tenDichVu: string };

    try {
        const ketQua = await timKiemDichVu(tenDichVu);
        res.status(200).json(ketQua);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tìm kiếm dịch vụ.', error: error instanceof Error ? error.message : error });
    }
};

export const addDichVu = async (req: Request, res: Response): Promise<void> => {
    const { tenDichVu, moTa, gia } = req.body;
    const logo = req.file ? req.file.filename : null;

    try {
        const newDichVuId = await themDichVu(tenDichVu, moTa, logo, gia);
        res.status(201).json({ message: 'Dịch vụ mới đã được thêm.', dichVuId: newDichVuId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm dịch vụ.', error: error instanceof Error ? error.message : error });
    }
};


export const updateDichVu = async (req: Request, res: Response): Promise<void> => {
    const { dichVuId } = req.params;
    const { tenDichVu, moTa, gia } = req.body;
    const logo = req.file ? req.file.filename : null;

    try {
        const affectedRows = await suaDichVu(Number(dichVuId), tenDichVu, moTa, logo, gia);
        if (affectedRows > 0) {
            res.status(200).json({ message: `Dịch vụ với ID ${dichVuId} đã được cập nhật thành công.` });
        } else {
            res.status(404).json({ message: `Không tìm thấy dịch vụ với ID ${dichVuId}.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật dịch vụ.', error: error instanceof Error ? error.message : error });
    }
};

export const deleteDichVu = async (req: Request, res: Response): Promise<void> => {
    const { dichVuId } = req.params;

    try {
        const affectedRows = await xoaDichVu(Number(dichVuId));
        if (affectedRows > 0) {
            res.status(200).json({ message: `Dịch vụ với ID ${dichVuId} đã bị xóa.` });
        } else {
            res.status(404).json({ message: `Không tìm thấy dịch vụ với ID ${dichVuId}.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa dịch vụ.', error: error instanceof Error ? error.message : error });
    }
};
