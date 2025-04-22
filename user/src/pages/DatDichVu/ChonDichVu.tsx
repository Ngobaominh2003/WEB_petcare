//src/pages/DatDichVu/ChonDichVu.tsx
import { useNavigate } from "react-router-dom";

type Props = {
  onNext: () => void;
};

const ChonDichVu: React.FC<Props> = ({ onNext }) => {
  const navigate = useNavigate();

  return (
    <div className="datdichvu-booking-form">
      <div className="datdichvu-booking-step active" id="step-1">
        <div className="datdichvu-step-header">
          <h2>Chọn dịch vụ</h2>
          <p>Chọn dịch vụ bạn muốn đặt lịch</p>
        </div>

        <div className="datdichvu-content-row">
          <div className="datdichvu-service-selection">
            <div className="datdichvu-service-card selected">
              <div className="datdichvu-service-image">
                <img
                  src="https://placehold.co/400x300/4CAF50/ffffff?text=Tắm+và+cắt+tỉa+lông"
                  alt="Tắm và cắt tỉa lông cho chó"
                />
              </div>
              <div className="datdichvu-service-details">
                <h3>Tắm và cắt tỉa lông cho chó</h3>
                <div className="datdichvu-service-provider">
                  <img
                    src="https://placehold.co/50x50/4CAF50/ffffff?text=HP"
                    alt="Happy Pets"
                    className="datdichvu-provider-avatar"
                  />
                  <span>Happy Pets</span>
                </div>
                <div className="datdichvu-service-rating">
                  <div className="datdichvu-stars">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star-half-alt" />
                  </div>
                  <span>4.5 (120 đánh giá)</span>
                </div>
                <div className="datdichvu-service-price">
                  <span className="datdichvu-price">250.000 - 500.000 VNĐ</span>
                </div>
              </div>
              <div className="datdichvu-service-select">
                <input
                  type="radio"
                  name="service"
                  id="service-1"
                  value="service-1"
                  defaultChecked
                />
                <label htmlFor="service-1">Đã chọn</label>
              </div>
            </div>

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
                  defaultValue=""
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
            onClick={onNext}
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
