import { Request, Response } from 'express';
import * as ThongKeModel from '../models/ThongKe';

// 1. GET /api/thong-ke/tong-quan
export const getTongQuan = async (req: Request, res: Response) => {
  const { tai_khoan_id } = req.query;
  if (!tai_khoan_id) return res.status(400).json({ message: 'Thiếu tai_khoan_id' });

  try {
    const data = await ThongKeModel.getTongQuan(Number(tai_khoan_id));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// 2. GET /api/thong-ke/bieu-do
export const getBieuDo = async (req: Request, res: Response) => {
  const { tai_khoan_id } = req.query;
  if (!tai_khoan_id) return res.status(400).json({ message: 'Thiếu tai_khoan_id' });

  const data = await ThongKeModel.getBieuDoThuNhap(Number(tai_khoan_id)) as any[];
res.json(data.reverse());

};

// 3. GET /api/thong-ke/lich-su
export const getLichSu = async (req: Request, res: Response) => {
  const { tai_khoan_id, loai = 'all' } = req.query;
  if (!tai_khoan_id) return res.status(400).json({ message: 'Thiếu tai_khoan_id' });

  try {
    const data = await ThongKeModel.getLichSuGiaoDich(Number(tai_khoan_id), String(loai));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
};

// 4. POST /api/thong-ke
export const createThongKe = async (req: Request, res: Response) => {
  try {
    const result = await ThongKeModel.addThongKe(req.body);
    res.status(201).json({ message: 'Thêm thống kê thành công', insertId: (result as any).insertId });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm thống kê', error });
  }
};

// 5. PUT /api/thong-ke/:id
export const updateThongKe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await ThongKeModel.updateThongKe(Number(id), req.body);
    res.json({ message: 'Cập nhật thống kê thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật', error });
  }
};

// 6. DELETE /api/thong-ke/:id
export const deleteThongKe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await ThongKeModel.deleteThongKe(Number(id));
    res.json({ message: 'Xoá thống kê thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xoá', error });
  }
};
export const autoThongKe = async (req: Request, res: Response) => {
  try {
    const result = await ThongKeModel.tinhThongKeTuDong();
    res.json({ message: `Đã thống kê tự động cho ${result.inserted} dịch vụ.` });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thống kê tự động', error });
  }
};
