import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import Navigation from '../components/Navigation'; 
import DieuKhien from '../components/DieuKhien'; 
import DichVuUpdate from './DichVuUpdate'; 
import DichVuAdd from './DichVuAdd'; 

interface DichVuType { 
  dich_vu_id: number; 
  ten_dich_vu: string; 
  mo_ta: string; 
  gia: number; 
  logo: string; 
}

const DichVu: React.FC = () => { 
  const [danhSachDichVu, setDanhSachDichVu] = useState<DichVuType[]>([]); 
  const [dichVuChon, setDichVuChon] = useState<DichVuType | null>(null); 
  const navigate = useNavigate(); 

  const fetchDanhSachDichVu = () => { 
    fetch('http://localhost:5000/api/dichvu') 
      .then((response) => { 
        if (!response.ok) { 
          throw new Error('Lỗi khi lấy dữ liệu từ API'); 
        } 
        return response.json(); 
      }) 
      .then((data) => { 
        console.log('Dữ liệu nhận từ API:', data); 
        setDanhSachDichVu(data); 
      }) 
      .catch((error) => console.error('Lỗi khi lấy danh sách dịch vụ:', error)); 
  }; 

  useEffect(() => { 
    fetchDanhSachDichVu(); 
  }, []); 

  const handleRowClick = (dichVu: DichVuType) => { 
    setDichVuChon(dichVu); 
  }; 

  const handleDelete = (dichVuId: number) => { 
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?'); 

    if (confirmDelete) { 
      fetch(`http://localhost:5000/api/dichvu/${dichVuId}`, { 
        method: 'DELETE', 
      }) 
        .then((response) => { 
          if (response.ok) { 
            fetchDanhSachDichVu(); 
            alert('Dịch vụ đã được xóa thành công.'); 
          } else { 
            alert('Lỗi khi xóa dịch vụ. Vui lòng thử lại.'); 
            console.error('Lỗi khi xóa dịch vụ'); 
          } 
        }) 
        .catch((error) => { 
          alert('Lỗi khi xóa dịch vụ. Vui lòng thử lại.'); 
          console.error('Lỗi khi xóa dịch vụ:', error); 
        }); 
    } 
  }; 

  return ( 
    <div> 
      <Navigation /> 
      <div className="main"> 
        <DieuKhien /> 

        <div className="details"> 
          <div className="recentOrders"> 
            <div className="cardHeader"> 
              <h2>Dịch Vụ Chăm Sóc Thú Cưng</h2> 
              <a href="#" className="btn">Xem Tất Cả</a> 
            </div> 

            <table > 
              <thead> 
                <tr> 
                  <th>Tên dịch vụ</th> 
                  <th>Mô tả</th> 
                  <th>Giá</th> 
                  <th>Logo</th> 
                  <th>Hành động</th> 
                </tr> 
              </thead> 
              <tbody> 
                {danhSachDichVu.length > 0 ? ( 
                  danhSachDichVu.map((dichVu) => ( 
                    <tr 
                      key={dichVu.dich_vu_id} 
                      onClick={() => handleRowClick(dichVu)} 
                      style={{ cursor: 'pointer' }} 
                    > 
                      <td>{dichVu.ten_dich_vu || 'Không có tên'}</td> 
                      <td>{dichVu.mo_ta || 'Không có mô tả'}</td> 
                      <td>{ (dichVu.gia) } VND</td> 
                      <td> 
                        <img src={`http://localhost:5000/img/${dichVu.logo}`} alt={dichVu.ten_dich_vu} width="50" /> 
                      </td> 
                      <td> 
                        <button 
                          className="delete-btn" 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            handleDelete(dichVu.dich_vu_id); 
                          }} 
                        > 
                          Xóa 
                        </button> 
                      </td> 
                    </tr> 
                  )) 
                ) : ( 
                  <tr> 
                    <td colSpan={5}>Không có dịch vụ nào để hiển thị</td> 
                  </tr> 
                )} 
              </tbody> 
            </table> 
          </div> 
        </div> 

        <div className="details-container"> 
          <DichVuUpdate dichVuChon={dichVuChon} /> 
          <DichVuAdd  /> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

export default DichVu;
