import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NguoiDungMenu from "../../components/NguoiDungMenu";
import "../style/styles.css"; // hoặc import "./cachthanhtoan.css"

interface PhuongThuc {
  id: number;
  loai: string;
  chi_tiet: string;
  mac_dinh: boolean;
}

const CachThanhToan: React.FC = () => {
  const [phuongThucList, setPhuongThucList] = useState<PhuongThuc[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    loai: "",
    chi_tiet: "",
    mac_dinh: false,
  });

  useEffect(() => {
    const data: PhuongThuc[] = [
      { id: 1, loai: "Ví MoMo", chi_tiet: "SĐT: 0912345678", mac_dinh: true },
      { id: 2, loai: "Thẻ ATM", chi_tiet: "**** 9831", mac_dinh: false },
    ];
    setPhuongThucList(data);
  }, []);

  const handleAddPhuongThuc = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: PhuongThuc = {
      id: Date.now(),
      loai: formData.loai,
      chi_tiet: formData.chi_tiet,
      mac_dinh: formData.mac_dinh,
    };
    setPhuongThucList([...phuongThucList, newItem]);
    setFormData({ loai: "", chi_tiet: "", mac_dinh: false });
    setShowForm(false);
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="account-layout">
            <NguoiDungMenu />
            <div className="account-content">
              <div className="page-header">
                <h1>Phương thức thanh toán</h1>
                <p>Quản lý các phương thức thanh toán của bạn</p>
              </div>

              <div className="cachthanhtoan-payment-container">
                {phuongThucList.map((pt) => (
                  <div key={pt.id} className="cachthanhtoan-payment-card">
                    <div className="cachthanhtoan-card-header">
                      <h3 className="cachthanhtoan-card-title">{pt.loai}</h3>
                      {pt.mac_dinh && (
                        <span className="cachthanhtoan-badge-default">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p className="cachthanhtoan-card-detail">{pt.chi_tiet}</p>
                    <div className="cachthanhtoan-card-actions">
                      <button className="cachthanhtoan-btn-edit">Sửa</button>
                      <button className="cachthanhtoan-btn-delete">Xoá</button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="cachthanhtoan-btn-add"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "✖ Đóng" : "+ Thêm phương thức mới"}
              </button>

              {showForm && (
                <form
                  className="cachthanhtoan-form"
                  onSubmit={handleAddPhuongThuc}
                >
                  <input
                    type="text"
                    placeholder="Loại phương thức (VD: Ví MoMo)"
                    value={formData.loai}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, loai: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Chi tiết (VD: SĐT, số thẻ...)"
                    value={formData.chi_tiet}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, chi_tiet: e.target.value })
                    }
                  />
                  <label className="cachthanhtoan-checkbox-group">
                    <input
                      type="checkbox"
                      checked={formData.mac_dinh}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mac_dinh: e.target.checked,
                        })
                      }
                    />
                    Đặt làm mặc định
                  </label>
                  <button type="submit" className="cachthanhtoan-submit-btn">
                    Lưu phương thức
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CachThanhToan;
