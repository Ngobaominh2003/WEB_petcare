import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Select from 'react-select';
import axios from 'axios';

// Đặt App element
ReactModal.setAppElement('#root');

interface DSDichVuType {
    dich_vu_id: number;
    ten_dich_vu: string;
}

interface DatLich1Props {
    isOpen: boolean;
    dichVu: DSDichVuType | null;
    onClose: () => void;
}

const DatLich1: React.FC<Partial<DatLich1Props>> = ({ isOpen = false, dichVu = null, onClose = () => { } }) => {
    const [formData, setFormData] = useState({
        nguoi_dung_id: '',
        tenKhachHang: '',
        email: '',
        ngayDat: '',
        gioDat: '',
        dichVuId: dichVu?.dich_vu_id || '',
        trang_thai: 'chờ xác nhận',
    });

    const [availableTimes, setAvailableTimes] = useState<string[]>([]); // Lưu giờ trống
    const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
    const [error, setError] = useState<string | null>(null); // Lưu lỗi

    // Lấy `nguoi_dung_id` từ localStorage khi component khởi tạo
    useEffect(() => {
        const nguoiDungId = localStorage.getItem('nguoi_dung_id') || '';
        setFormData((prev) => ({ ...prev, nguoi_dung_id: nguoiDungId }));
    }, []);

    // Cập nhật `dichVuId` khi `dichVu` thay đổi
    useEffect(() => {
        setFormData((prev) => ({ ...prev, dichVuId: dichVu?.dich_vu_id || '' }));
    }, [dichVu]);

    // Gọi API lấy giờ trống khi chọn ngày
    useEffect(() => {
        if (formData.ngayDat) {
            fetchAvailableTimes(formData.ngayDat);
        }
    }, [formData.ngayDat]);

    // Lấy giờ trống từ API
    const fetchAvailableTimes = async (ngayDat: string) => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/datlich/thoi_gian_trong', {
                params: { ngay_dat: ngayDat },
            });
            setAvailableTimes(response.data.availableTimes || []); // Đảm bảo giá trị trả về là mảng
        } catch (error) {
            console.error('Lỗi khi lấy giờ trống:', error);
            setError('Không thể tải giờ trống. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Các giờ có sẵn để chọn
    const gioOptions = availableTimes.map((time) => ({ value: time, label: time }));

    // Xử lý thay đổi form
    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Xử lý submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kiểm tra dữ liệu trước khi gửi
        if (!formData.tenKhachHang || !formData.email || !formData.ngayDat || !formData.gioDat || !formData.dichVuId) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            const requestData = {
                nguoi_dung_id: formData.nguoi_dung_id,
                ten_kh: formData.tenKhachHang,
                email_kh: formData.email,
                ngay_dat: formData.ngayDat,
                gio_dat: formData.gioDat,
                dich_vu_id: formData.dichVuId,
                trang_thai: formData.trang_thai,
            };

            console.log('Dữ liệu gửi:', requestData);

            const response = await axios.post('http://localhost:5000/api/datlich', requestData);
            alert(response.data.message || 'Tạo lịch đặt thành công!');
            onClose(); // Đóng modal nếu thành công
        } catch (error) {
            console.error('Lỗi khi tạo lịch đặt:', error);
            setError('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.');
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Form Đặt Lịch"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    padding: '20px',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
            }}
        >
            <h2>Đặt Lịch</h2>
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên khách hàng"
                            value={formData.tenKhachHang}
                            onChange={(e) => handleChange('tenKhachHang', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email của bạn"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            className="form-control"
                            value={formData.ngayDat}
                            onChange={(e) => handleChange('ngayDat', e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Select
                            options={gioOptions}
                            onChange={(option) => handleChange('gioDat', option?.value)}
                            placeholder="Chọn giờ"
                            isClearable
                        />
                    </div>
                    <div className="form-group">
                        Dịch vụ: <strong>{dichVu?.ten_dich_vu || 'Chưa chọn dịch vụ'}</strong>
                    </div>
                    <button type="submit" className="btn btn-success">
                        Xác Nhận
                    </button>
                    <button type="button" onClick={onClose} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                        Hủy
                    </button>
                </form>
            )}
        </ReactModal>
    );
};

export default DatLich1;
