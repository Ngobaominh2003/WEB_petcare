import React, { useState } from 'react';

const GoiDichVuAdd = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        ten_goi: '',
        mo_ta: '',
        gia_1_thang: '',
        gia_6_thang: '',
        gia_1_nam: ''
    });

    // State to manage form submission status and errors
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
    
        const formattedData = {
            ...formData,
            gia_1_thang: parseFloat(formData.gia_1_thang) || 0,
            gia_6_thang: parseFloat(formData.gia_6_thang) || 0,
            gia_1_nam: parseFloat(formData.gia_1_nam) || 0,
        };
    
        console.log('Dữ liệu gửi lên server:', formattedData); // Thêm dòng này để kiểm tra dữ liệu gửi đi
    
        try {
            const response = await fetch('http://localhost:5000/api/goidichvu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to add service package');
            }
    
            // Reset form sau khi thêm thành công
            setFormData({ ten_goi: '', mo_ta: '', gia_1_thang: '', gia_6_thang: '', gia_1_nam: '' });
            alert('Gói dịch vụ đã được thêm thành công!');
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm gói dịch vụ.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="details">
            <div className="recentOrders">
                <div className="cardHeader">
                    <h2>Thêm Gói Dịch Vụ</h2>
                </div>

                <form className="add-user-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="ten_goi">Tên gói:</label>
                        <input
                            type="text"
                            id="ten_goi"
                            name="ten_goi"
                            placeholder="Nhập tên gói dịch vụ"
                            value={formData.ten_goi}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mo_ta">Mô tả:</label>
                        <textarea
                            id="mo_ta"
                            name="mo_ta"
                            placeholder="Nhập mô tả gói dịch vụ"
                            value={formData.mo_ta}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gia_1_thang">Giá 1 tháng:</label>
                        <input
                            type="number"
                            id="gia_1_thang"
                            name="gia_1_thang"
                            placeholder="Nhập giá 1 tháng"
                            value={formData.gia_1_thang}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gia_6_thang">Giá 6 tháng:</label>
                        <input
                            type="number"
                            id="gia_6_thang"
                            name="gia_6_thang"
                            placeholder="Nhập giá 6 tháng"
                            value={formData.gia_6_thang}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gia_1_nam">Giá 1 năm:</label>
                        <input
                            type="number"
                            id="gia_1_nam"
                            name="gia_1_nam"
                            placeholder="Nhập giá 1 năm"
                            value={formData.gia_1_nam}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang xử lý...' : 'Thêm Gói Dịch Vụ'}
                    </button>

                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default GoiDichVuAdd;
