import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DichVuAdd = ({ serviceId = null }) => {
    const [formData, setFormData] = useState({
        ten_dich_vu: '',
        mo_ta: '',
        gia: '',
        logo: null as File | null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Nếu có serviceId, lấy dữ liệu hiện tại để điền vào form
        if (serviceId) {
            axios.get(`http://localhost:5000/api/dichvu/${serviceId}`)
                .then(response => {
                    const { ten_dich_vu, mo_ta, gia, logo } = response.data;
                    setFormData({
                        ten_dich_vu,
                        mo_ta,
                        gia,
                        logo: null // Xử lý file riêng biệt
                    });
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu dịch vụ:', error);
                });
        }
    }, [serviceId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            logo: e.target.files && e.target.files[0] ? e.target.files[0] : null,
        });
    };

    // Xử lý việc gửi form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const data = new FormData();
        data.append('tenDichVu', formData.ten_dich_vu || ''); 
        data.append('moTa', formData.mo_ta || '');
        data.append('gia', formData.gia || '');
        if (formData.logo) {
            data.append('logo', formData.logo);
        } else {
            data.append('logo', ''); // Đặt chuỗi rỗng nếu không có file được chọn
        }

        try {
    let response;
    if (serviceId) {
        // Update existing service
        response = await axios.put(`http://localhost:5000/api/dichvu/${serviceId}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Dịch vụ đã được cập nhật thành công!');
    } else {
        // Add new service
        response = await axios.post('http://localhost:5000/api/dichvu', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Dịch vụ mới đã được thêm thành công!');
    }
    setFormData({ ten_dich_vu: '', mo_ta: '', gia: '', logo: null });
} catch (err: any) {
    setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi thêm/cập nhật dịch vụ.');
    console.error('Lỗi khi thêm/cập nhật dịch vụ:', err);
} finally {
    setIsSubmitting(false);
}

    };

    // Xác nhận trước khi xóa dịch vụ
    const handleDeleteService = () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
            // Người dùng nhấn "OK", thực hiện hành động xóa
            axios.delete(`http://localhost:5000/api/dichvu/${serviceId}`)
                .then(() => {
                    alert('Dịch vụ đã được xóa thành công!');
                })
                .catch(error => {
                    console.error('Lỗi khi xóa dịch vụ:', error);
                    setError('Có lỗi xảy ra khi xóa dịch vụ.');
                });
        } else {
            // Người dùng nhấn "Cancel", không làm gì cả
            console.log('Hủy xóa dịch vụ');
        }
    };

    return (
        <div className="details">
            <div className="recentOrders">
                <div className="cardHeader">
                    <h2>{serviceId ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ'}</h2>
                </div>

                <form className="add-user-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ten_dich_vu">Tên dịch vụ:</label>
                        <input
                            type="text"
                            id="ten_dich_vu"
                            name="ten_dich_vu"
                            placeholder="Nhập tên dịch vụ"
                            value={formData.ten_dich_vu}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mo_ta">Mô tả:</label>
                        <textarea
                            id="mo_ta"
                            name="mo_ta"
                            placeholder="Nhập mô tả dịch vụ"
                            value={formData.mo_ta}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gia">Giá:</label>
                        <input
                            type="number"
                            id="gia"
                            name="gia"
                            placeholder="Nhập giá dịch vụ"
                            value={formData.gia}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="logo">Logo:</label>
                        <input
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button type="submit" className="btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang xử lý...' : serviceId ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ'}
                    </button>

                    {serviceId && (
                        <button type="button" className="btn delete-btn" onClick={handleDeleteService}>
                            Xóa dịch vụ
                        </button>
                    )}

                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default DichVuAdd;
