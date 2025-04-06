import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

interface BaiViet {
  bai_viet_id: number;
  tieu_de: string;
  noi_dung: string;
  hinh_anh: string;
  ngay_tao: string;
  trang_thai: string;
}

const DSBlog: React.FC = () => {
  const [baiViets, setBaiViets] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBaiViets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/baiviet`);
        setBaiViets(response.data);
        setLoading(false);
      } catch (err) {
        setError('Lỗi khi tải bài viết');
        setLoading(false);
      }
    };

    fetchBaiViets();
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const approvedBaiViets = baiViets.filter(baiViet => baiViet.trang_thai === 'đã duyệt');

  if (approvedBaiViets.length === 0) {
    return <p>Không có bài viết đã duyệt.</p>;
  }

  return (
    <div>
      <Header />
      <Navbar />
      <div className="container pt-5" style={{ marginTop: '245px' }}>
        <div className="d-flex flex-column text-center mb-5 pt-5">
          <h4 className="text-secondary mb-3">Blog Chăm Sóc Thú Cưng</h4>
          <h1 className="display-4 m-0">
            <span className="text-primary">Cập Nhật</span> Mỗi Ngày
          </h1>
        </div>
        <div className="row pb-3">
          {approvedBaiViets.map((baiViet) => (
            <div className="col-lg-4 mb-4" key={baiViet.bai_viet_id}>
              <div className="card border-0 mb-2">
                <img
                  className="card-img-top"
                  src={`http://localhost:5000/img/${baiViet.hinh_anh}`}
                  alt={baiViet.tieu_de}
                />
                <div className="card-body bg-light p-4">
                  <h4 className="card-title text-truncate">{baiViet.tieu_de}</h4>
                  <p>{baiViet.noi_dung.slice(0, 100)}...</p>
                  <Link
                    className="font-weight-bold"
                    to={`/Blog2/${baiViet.bai_viet_id}`}
                  >
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default DSBlog;
