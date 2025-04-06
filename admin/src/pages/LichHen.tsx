import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import DieuKhien from '../components/DieuKhien';
import axios from 'axios';
import LichHenAdd from './LichHenAdd';
import LichHenUpdate from './LichHenUpdate';

interface LichHen {
    dat_lich_id: number;
    ten_kh: string;
    email_kh: string;
    dich_vu_id: string;
    ngay_dat: string;
    gio_dat: string;
    trang_thai: 'chờ xác nhận' | 'đã xác nhận' | 'đã hủy';
}

interface DichVu {
    dich_vu_id: string;
    ten_dich_vu: string;
    gia:string;
}

const LichHenList: React.FC = () => {
    const [lichHenList, setLichHenList] = useState<LichHen[]>([]);
    const [dichVuList, setDichVuList] = useState<DichVu[]>([]);
    const [selectedLichHen, setSelectedLichHen] = useState<LichHen | null>(null);
    const getStatusStyle = (trangThai: string) => {
        switch (trangThai) {
            case 'chờ xác nhận':
                return { backgroundColor: '#ffcc00', color: '#fff' };
            case 'đã xác nhận':
                return { backgroundColor: '#4CAF50', color: '#fff' };
            case 'đã hủy':
                return { backgroundColor: '#f44336', color: '#fff' };
            default:
                return {};
        }
    };
    const fetchLichHenList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/datlich');
            const updatedList = response.data.map((lichHen: LichHen) => ({
                ...lichHen,
                ngay_dat: new Date(lichHen.ngay_dat).toLocaleDateString('vi-VN'),
            }));
            setLichHenList(updatedList);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách lịch hẹn:', error);
        }
    };

    const fetchDichVuList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dichvu');
            setDichVuList(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        }
    };

    useEffect(() => {
        fetchLichHenList();
        fetchDichVuList();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) {
            try {
                await axios.delete(`http://localhost:5000/api/datlich/${id}`);
                setLichHenList((prev) => prev.filter((lich) => lich.dat_lich_id !== id));
                alert('Xóa thành công');
            } catch (error) {
                console.error('Lỗi khi xóa lịch hẹn:', error);
                alert('Xóa không thành công');
            }
        }
    };

    const handleRowClick = (lichHen: LichHen) => {
        const filteredData = {
            dat_lich_id: lichHen.dat_lich_id,
            ten_kh: lichHen.ten_kh,
            email_kh: lichHen.email_kh,
            dich_vu_id: lichHen.dich_vu_id,
            ngay_dat: lichHen.ngay_dat,
            gio_dat: lichHen.gio_dat,
            trang_thai: lichHen.trang_thai,
        };
        setSelectedLichHen(filteredData);
    };

    const getTenDichVu = (dich_vu_id: string) => {
        const dichVu = dichVuList.find((dv) => dv.dich_vu_id === dich_vu_id);
        return dichVu ? dichVu.ten_dich_vu : 'Không xác định';
    };
   

    return (
        <div>
            <Navigation />
            <div className="main">
                <DieuKhien />
                <div className="details">
                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h2>Lịch Hẹn Chăm Sóc Thú Cưng</h2>
                            <button className="btn" onClick={fetchLichHenList}>
                                Làm Mới
                            </button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tên khách hàng</th>
                                    <th>Email</th>
                                    <th>Dịch vụ</th>
                                    <th>Ngày đặt</th>
                                    <th>Giờ đặt</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lichHenList.length > 0 ? (
                                    lichHenList.map((lichHen) => (
                                        <tr key={lichHen.dat_lich_id} onClick={() => handleRowClick(lichHen)}>
                                            <td>{lichHen.ten_kh}</td>
                                            <td>{lichHen.email_kh}</td>
                                            <td>{getTenDichVu(lichHen.dich_vu_id)}</td>
                    
                                            <td>{lichHen.ngay_dat}</td>
                                            <td>{lichHen.gio_dat}</td>
                                            <td>
                                                <span
                                                    className="status"
                                                    style={getStatusStyle(lichHen.trang_thai)}
                                                >
                                                    {lichHen.trang_thai}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(lichHen.dat_lich_id);
                                                    }}
                                                    style={{
                                                        backgroundColor: '#f44336',
                                                        color: '#fff',
                                                        padding: '5px 10px',
                                                        border: 'none',
                                                        borderRadius: '5px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center' }}>
                                            Không có lịch hẹn nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="details-container">
                    <LichHenUpdate selectedLichHen={selectedLichHen} refreshList={fetchLichHenList} />
                    <LichHenAdd />
                </div>
            </div>
        </div>
    );
};

export default LichHenList;
