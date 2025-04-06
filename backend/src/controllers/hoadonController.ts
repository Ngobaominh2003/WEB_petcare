import { Request, Response } from 'express';
import * as HoaDonModel from '../models/HoaDon'; // Import tất cả từ HoaDonModel

// Controller lấy tất cả hóa đơn
export const getAllInvoicesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const invoices = await HoaDonModel.getAllInvoices();
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error('Lỗi khi lấy tất cả hóa đơn:', error);
    res.status(500).json({ success: false, message: 'Không thể lấy danh sách hóa đơn' });
  }
};

// Controller lấy hóa đơn theo ID người dùng và ngày tạo
export const getInvoicesByUserIdAndDateController = async (req: Request, res: Response): Promise<void> => {
  const { nguoiDungId, ngayTao } = req.params; // Lấy các tham số từ URL (ID người dùng và ngày tạo)

  try {
    const invoices = await HoaDonModel.getInvoicesByUserIdAndDate(Number(nguoiDungId), ngayTao);
    if (invoices.length === 0) {
      res.status(404).json({ success: false, message: 'Không có hóa đơn nào' });
      return;
    }
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error('Lỗi khi lấy hóa đơn theo ID người dùng và ngày tạo:', error);
    res.status(500).json({ success: false, message: 'Không thể lấy hóa đơn theo ID người dùng và ngày tạo' });
  }
};

// Controller xóa hóa đơn theo ID
export const deleteInvoiceController = async (req: Request, res: Response): Promise<void> => {
  const { hoaDonId } = req.params; // Lấy ID hóa đơn từ URL

  try {
    await HoaDonModel.deleteInvoice(Number(hoaDonId));
    res.status(200).json({ success: true, message: 'Hóa đơn đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa hóa đơn:', error);
    res.status(500).json({ success: false, message: 'Không thể xóa hóa đơn' });
  }
};
