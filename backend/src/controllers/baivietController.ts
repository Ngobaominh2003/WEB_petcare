import { Request, Response } from 'express';
import * as BaiVietModel from '../models/BaiViet'; // Import các phương thức từ model

// Lấy danh sách tất cả bài viết
export const getAllBaiViet = async (req: Request, res: Response) => {
    try {
        const baiViets = await BaiVietModel.getAllBaiViet();
        res.status(200).json(baiViets);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài viết', error });
    }
};

// Lấy bài viết theo nguoi_dung_id
export const getBaiVietByNguoiDung = async (req: Request, res: Response) => {
    const { nguoi_dung_id } = req.params;

    try {
        const baiViets = await BaiVietModel.getBaiVietByNguoiDung(Number(nguoi_dung_id));
        res.status(200).json(baiViets);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy bài viết của người dùng', error });
    }
};

// Lấy bài viết theo bai_viet_id
export const getBaiVietById = async (req: Request, res: Response) => {
    const { bai_viet_id } = req.params;

    try {
        // Use the model to fetch the post by ID
        const baiViet = await BaiVietModel.getBaiVietById(Number(bai_viet_id));

        // Check if the post exists
        if (!baiViet) {
            return res.status(404).json({ message: 'Bài viết không tồn tại' });
        }

        // Return the blog post
        res.status(200).json(baiViet);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy bài viết', error });
    }
};



// Tạo bài viết mới
export const createBaiViet = async (req: Request, res: Response) => {
    const { nguoi_dung_id, tieu_de, noi_dung } = req.body;
    const hinh_anh = req.file ? req.file.filename : null; // Nếu có file, lấy tên file

    if (!tieu_de || !nguoi_dung_id) {
        return res.status(400).json({ message: 'Tiêu đề và người dùng là bắt buộc' });
    }

    try {
        await BaiVietModel.createBaiViet(nguoi_dung_id, tieu_de, noi_dung, hinh_anh);
        res.status(201).json({ message: 'Bài viết đã được tạo thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo bài viết', error });
    }
};

// Cập nhật bài viết
export const updateBaiViet = async (req: Request, res: Response) => {
    const { bai_viet_id } = req.params;
    const { tieu_de, noi_dung, trang_thai } = req.body;
    const hinh_anh = req.file ? req.file.filename : null; // Nếu có tệp, lấy tên tệp

    console.log('Tệp hình ảnh nhận được:', req.file); // Log thông tin tệp

    // Kiểm tra tiêu đề (bắt buộc)
    if (!tieu_de) {
        return res.status(400).json({ message: 'Tiêu đề là bắt buộc' });
    }

    try {
        // Cập nhật bài viết với các giá trị có sẵn
        await BaiVietModel.updateBaiViet(
            Number(bai_viet_id),
            tieu_de,
            noi_dung,
            hinh_anh,
            trang_thai // Có thể là undefined hoặc null
        );
        res.status(200).json({ message: 'Bài viết đã được cập nhật thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật bài viết:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật bài viết', error });
    }
};




// Xóa bài viết
export const deleteBaiViet = async (req: Request, res: Response) => {
    const { bai_viet_id } = req.params;

    try {
        await BaiVietModel.deleteBaiViet(Number(bai_viet_id));
        res.status(200).json({ message: 'Bài viết đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa bài viết', error });
    }
};
