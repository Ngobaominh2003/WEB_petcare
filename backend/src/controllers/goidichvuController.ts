import { Request, Response } from 'express';
import connection from '../config/db';
import { getAllGoiDichVu, createGoiDichVu as addGoiDichVu } from '../models/GoiDichVu';

// Lấy danh sách tất cả các gói dịch vụ
export const fetchGoiDichVu = async (req: Request, res: Response) => {
  try {
    const goiDichVuList = await getAllGoiDichVu();
    res.status(200).json(goiDichVuList);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi khi lấy danh sách gói dịch vụ:', error.message);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: error.message });
    } else {
      console.error('Lỗi không xác định:', error);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
  }
};


const MAX_DECIMAL_VALUE = 99999999.99;
// Tạo gói dịch vụ mới
export const createGoiDichVu = async (req: Request, res: Response) => {
    console.log('Dữ liệu nhận được từ client:', req.body); // Log để kiểm tra dữ liệu từ client

    const { ten_goi, mo_ta, gia_1_thang, gia_6_thang, gia_1_nam } = req.body;

    try {
        if (!ten_goi || !mo_ta || !gia_1_thang || !gia_6_thang || !gia_1_nam) {
            throw new Error('Các trường thông tin bắt buộc không được để trống');
        }

        // Kiểm tra giá trị vượt quá giới hạn của DECIMAL(10,2)
        if (gia_1_thang > MAX_DECIMAL_VALUE || gia_6_thang > MAX_DECIMAL_VALUE || gia_1_nam > MAX_DECIMAL_VALUE) {
            throw new Error(`Giá trị của các trường giá không được vượt quá ${MAX_DECIMAL_VALUE}. Vui lòng nhập giá trị hợp lệ.`);
        }

        const [result]: any = await connection.query(
            'INSERT INTO goi_dich_vu (ten_goi, mo_ta, gia_1_thang, gia_6_thang, gia_1_nam) VALUES (?, ?, ?, ?, ?)',
            [ten_goi, mo_ta, gia_1_thang, gia_6_thang, gia_1_nam]
        );

        res.status(201).json({ message: 'Gói dịch vụ đã được tạo thành công', id: result.insertId });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Lỗi khi tạo gói dịch vụ:', error.message);
            res.status(400).json({ message: error.message }); // Trả về lỗi chi tiết cho người dùng
        } else {
            console.error('Lỗi không xác định:', error);
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
        }
    }
};

// Sửa gói dịch vụ
export const updateGoiDichVu = async (req: Request, res: Response) => {
  const { id } = req.params; // ID của gói dịch vụ cần sửa
  const { ten_goi, mo_ta, gia_1_thang, gia_6_thang, gia_1_nam } = req.body;

  try {
    if (!ten_goi || !gia_1_thang || !gia_6_thang || !gia_1_nam) {
      return res.status(400).json({ message: 'Các trường bắt buộc không được để trống' });
    }

    const [result]: any = await connection.query(
      'UPDATE goi_dich_vu SET ten_goi = ?, mo_ta = ?, gia_1_thang = ?, gia_6_thang = ?, gia_1_nam = ? WHERE goi_dich_vu_id = ?',
      [ten_goi, mo_ta, gia_1_thang, gia_6_thang, gia_1_nam, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy gói dịch vụ' });
    }

    res.status(200).json({ message: 'Cập nhật gói dịch vụ thành công' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi khi cập nhật gói dịch vụ:', error.message);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: error.message });
    }
  }
};


// Xóa gói dịch vụ
export const deleteGoiDichVu = async (req: Request, res: Response) => {
  const { id } = req.params; // ID của gói dịch vụ cần xóa

  try {
    const [result]: any = await connection.query(
      'DELETE FROM goi_dich_vu WHERE goi_dich_vu_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy gói dịch vụ' });
    }

    res.status(200).json({ message: 'Xóa gói dịch vụ thành công' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Lỗi khi xóa gói dịch vụ:', error.message);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: error.message });
    }
  }
};
