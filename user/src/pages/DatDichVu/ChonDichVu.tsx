//src/pages/DatDichVu/ChonDichVu.tsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
type Props = {
  onNext: () => void;
  setChonDichVuInfo: React.Dispatch<React.SetStateAction<any>>;
};

const ChonDichVu: React.FC<Props> = ({ onNext, setChonDichVuInfo }) => {

  const [dichVu, setDichVu] = useState<any | null>(null);
  const [ghiChu, setGhiChu] = useState<string>("");

  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("dichVuDaChon");
    if (data) {
      setDichVu(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("dichVuDaChon");
    if (data) {
      const dichVu = JSON.parse(data);
      console.log("Dịch vụ đã chọn:", dichVu); // dùng dữ liệu ở đây
      // bạn có thể setState để hiển thị tên, giá, mô tả...
    }
  }, []);
  const handleNext = () => {
    if (dichVu) {
      const taiKhoanId = localStorage.getItem("tai_khoan_id");
  
      // 1. Lưu vào localStorage
      localStorage.setItem(
        "chonDichVuInfo",
        JSON.stringify({
          dich_vu_id: dichVu.dich_vu_id,
          tai_khoan_id: taiKhoanId ? parseInt(taiKhoanId) : null,
          so_tien: dichVu.gia,
          ghi_chu: ghiChu,
        })
      );
  
      // 2. Cập nhật state cha
      setChonDichVuInfo({
        dich_vu_id: dichVu.dich_vu_id,
        tai_khoan_id: taiKhoanId ? parseInt(taiKhoanId) : null,
        so_tien: dichVu.gia,
        ghi_chu: ghiChu,
      });
  
      // 3. Chuyển bước
      onNext();
    }
  };
  
  return (
    <div className="datdichvu-booking-form">
      <div className="datdichvu-booking-step active" id="step-1">
        <div className="datdichvu-step-header">
          <h2>Chọn dịch vụ</h2>
          <p>Chọn dịch vụ bạn muốn đặt lịch</p>
        </div>

        <div className="datdichvu-content-row">
          <div className="datdichvu-service-selection">
            {dichVu && (
              <div className="datdichvu-service-card selected">
                <div className="datdichvu-service-image">
                  <img
                    src={`http://localhost:5000/img/${dichVu.logo}`}
                    alt={dichVu.ten_dich_vu}
                  />
                </div>
                <div className="datdichvu-service-details">
                  <h3>{dichVu.ten_dich_vu}</h3>
                  <div className="datdichvu-service-provider">
                    <img
                      src={
                        dichVu.avata
                          ? `http://localhost:5000/img/${dichVu.avata}`
                          : "https://placehold.co/50x50"
                      }
                      alt="Provider"
                      className="datdichvu-provider-avatar"
                    />
                    <span>{dichVu.ten_nha_cung_cap || "Không rõ"}</span>
                  </div>
                  <div className="datdichvu-service-rating">
                    <div className="datdichvu-stars">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                    <span>{dichVu.luot_dung} đánh giá</span>
                  </div>
                  <div className="datdichvu-service-price">
                    <span className="datdichvu-price">
                      {dichVu.gia.toLocaleString()} VNĐ
                    </span>
                  </div>
                </div>
                <div className="datdichvu-service-select">
                  <label>Đã chọn</label>
                </div>
              </div>
            )}

            <div className="datdichvu-service-options">
              <div className="datdichvu-form-group">
                <label htmlFor="service-package">Gói dịch vụ</label>
                <select
                  id="service-package"
                  name="service-package"
                  defaultValue="standard"
                >
                  <option value="basic">Gói cơ bản - 250.000 VNĐ</option>
                  <option value="standard">Gói tiêu chuẩn - 350.000 VNĐ</option>
                  <option value="premium">Gói cao cấp - 500.000 VNĐ</option>
                </select>
              </div>

              <div className="datdichvu-package-details">
                <h4>Chi tiết gói dịch vụ</h4>
                <ul>
                  <li>
                    <i className="fas fa-check" /> Tắm sạch với sản phẩm chuyên
                    dụng
                  </li>
                  <li>
                    <i className="fas fa-check" /> Sấy khô và chải lông
                  </li>
                  <li>
                    <i className="fas fa-check" /> Cắt tỉa lông theo yêu cầu
                  </li>
                  <li>
                    <i className="fas fa-check" /> Cắt móng và vệ sinh tai
                  </li>
                  <li>
                    <i className="fas fa-check" /> Xịt thơm và thắt nơ/khăn
                    quàng (tùy chọn)
                  </li>
                </ul>
              </div>

              <div className="datdichvu-form-group">
                <label htmlFor="service-note">Ghi chú thêm</label>
                <textarea
                  id="service-note"
                  name="service-note"
                  rows={3}
                  placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú cho nhà cung cấp dịch vụ"
                  value={ghiChu}
                  onChange={(e) => setGhiChu(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="datdichvu-step-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="datdichvu-btn datdichvu-btn-outline"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="datdichvu-btn datdichvu-btn-primary"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChonDichVu;
