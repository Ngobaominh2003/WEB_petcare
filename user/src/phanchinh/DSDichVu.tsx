import React, { useState, useEffect } from 'react';
import DatLich1 from '../pages/DatLich1';

interface DSDichVuType {
    dich_vu_id: number;
    ten_dich_vu: string;
    mo_ta: string;
    logo: string;
}

const DSDichVu: React.FC = () => {
    const [DSDichVus, setDSDichVus] = useState<DSDichVuType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý hiển thị modal
    const [selectedDichVu, setSelectedDichVu] = useState<DSDichVuType | null>(null); // Lưu dịch vụ được chọn

    useEffect(() => {
        const fetchDSDichVus = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/dichvu');
                if (!response.ok) {
                    throw new Error('Failed to fetch DSDichVus data');
                }
                const data = await response.json();
                setDSDichVus(data.slice(0, )); // Hiển thị 6 dịch vụ đầu tiên
            } catch (error) {
                setError('Error loading DSDichVus. Please try again later.');
                console.error('Error fetching DSDichVus:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDSDichVus();
    }, []);

    const handleDatLich = (dichVu: DSDichVuType) => {
        setSelectedDichVu(dichVu); // Lưu dịch vụ được chọn
        setIsModalOpen(true); // Hiển thị form đặt lịch
    };

    const closeModal = () => {
        setIsModalOpen(false); // Đóng form đặt lịch
        setSelectedDichVu(null); // Xóa dịch vụ được chọn
    };

    return (
        <div className="container-fluid bg-light pt-5" style={{ marginTop: '245px' }}>
            <div className="container py-5">
                <div className="d-flex flex-column text-center mb-5">
                    <h4 className="text-secondary mb-3">Dịch Vụ Của Chúng Tôi</h4>
                    <h1 className="display-4 m-0">
                        <span className="text-primary">Dịch Vụ</span> Thú Cưng Cao Cấp
                    </h1>
                </div>
                <div className="DSDichVu-list row pb-3">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        DSDichVus.map((dichVu) => (
                            <div key={dichVu.dich_vu_id} className="col-md-6 col-lg-4 mb-4">
                                <div className="DSDichVu-block d-flex flex-column text-center bg-white mb-2 p-3 p-sm-5">
                                    <h3 className="display-3 font-weight-normal text-secondary mb-3">
                                        <img
                                            src={`http://localhost:5000/img/${dichVu.logo}`}
                                            alt={dichVu.ten_dich_vu}
                                            width="80"
                                            height="80"
                                        />
                                    </h3>
                                    <h3 className="mb-3">{dichVu.ten_dich_vu}</h3>
                                    <p className="description">
                                        {dichVu.mo_ta || 'No description available'}
                                    </p>
                                    <div className="button-group">
                                        <button
                                            className="btn btn-primary text-uppercase font-weight-bold mr-2"
                                            onClick={() => handleDatLich(dichVu)}
                                        >
                                            Đặt Lịch
                                        </button>
                                        <a className="btn btn-secondary text-uppercase font-weight-bold" href="#">
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Hiển thị modal đặt lịch nếu trạng thái mở */}
            {isModalOpen && (
                <DatLich1
                    dichVu={selectedDichVu}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default DSDichVu;
