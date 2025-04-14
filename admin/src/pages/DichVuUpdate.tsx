import React, { useState, useEffect } from "react";
import axios from "axios";

interface DichVu {
  dich_vu_id: number;
  ten_dich_vu: string;
  mo_ta: string;
  logo?: string | File;
  gia: number;
  luot_dung: number;
  trang_thai: number;
  xet_duyet: string;
  tai_khoan_id: number;
  thoi_gian_hoan_thanh: string; // Thêm thoi_gian_hoan_thanh
}

interface NhaCungCap {
  tai_khoan_id: number;
  ten_nha_cung_cap: string;
}

interface DichVuUpdateProps {
  dichVuChon: DichVu | null;
}

const DichVuUpdate: React.FC<DichVuUpdateProps> = ({ dichVuChon }) => {
  const [formData, setFormData] = useState<DichVu>({
    dich_vu_id: 0,
    ten_dich_vu: "",
    mo_ta: "",
    logo: "",
    gia: 0,
    luot_dung: 0,
    trang_thai: 1,
    xet_duyet: "chờ duyệt",
    tai_khoan_id: 0,
    thoi_gian_hoan_thanh: "", // Thêm thoi_gian_hoan_thanh
  });
  const [nhaCungCapList, setNhaCungCapList] = useState<NhaCungCap[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái gửi form
  const [error, setError] = useState<string | null>(null); // Thông báo lỗi

  // Lấy danh sách nhà cung cấp
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dsnhacungcap")
      .then((response) => {
        setNhaCungCapList(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách nhà cung cấp:", error);
        setError("Lỗi khi lấy danh sách nhà cung cấp");
      });

    if (dichVuChon) {
      setFormData(dichVuChon); // Nếu có dịch vụ được chọn, cập nhật formData
    }
  }, [dichVuChon]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,  // Cập nhật giá trị khi thay đổi trường
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        logo: file,  // Lưu tệp vào logo
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) {
      alert("Dữ liệu không hợp lệ!");
      return;
    }

    setIsSubmitting(true);
    setError(null); // Reset lỗi

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof DichVu];

      if (value !== undefined) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, String(value));
        }
      }
    });

    try {
      await axios.put(
        `http://localhost:5000/api/dich-vu/cap-nhat/${formData.dich_vu_id}`,
        formDataToSend
      );
      alert("Dịch vụ đã được cập nhật thành công");
      window.location.reload();
    } catch (error) {
      setError("Lỗi khi cập nhật dịch vụ");
      console.error("Lỗi khi cập nhật dịch vụ:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật dịch vụ</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          {/* Tên dịch vụ */}
          <div className="form-group">
            <label htmlFor="ten_dich_vu">Tên dịch vụ:</label>
            <input
              type="text"
              id="ten_dich_vu"
              name="ten_dich_vu"
              value={formData.ten_dich_vu}
              onChange={handleInputChange}
              placeholder="Nhập tên dịch vụ"
              required
            />
          </div>

          {/* Mô tả */}
          <div className="form-group">
            <label htmlFor="mo_ta">Mô tả:</label>
            <textarea
              id="mo_ta"
              name="mo_ta"
              value={formData.mo_ta}
              onChange={handleInputChange}
              placeholder="Nhập mô tả dịch vụ"
              required
            />
          </div>

          {/* Giá */}
          <div className="form-group">
            <label htmlFor="gia">Giá:</label>
            <input
              type="number"
              id="gia"
              name="gia"
              value={formData.gia}
              onChange={handleInputChange}
              placeholder="Nhập giá dịch vụ"
              required
            />
          </div>

          {/* Nhà cung cấp */}
          <div className="form-group">
            <label htmlFor="tai_khoan_id">Tài khoản ID:</label>
            <select
              id="tai_khoan_id"
              name="tai_khoan_id"
              value={formData.tai_khoan_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn nhà cung cấp</option>
              {nhaCungCapList.map((nhaCungCap) => (
                <option key={nhaCungCap.tai_khoan_id} value={nhaCungCap.tai_khoan_id}>
                  {nhaCungCap.ten_nha_cung_cap}
                </option>
              ))}
            </select>
          </div>

          {/* Lượt dùng */}
          <div className="form-group">
            <label htmlFor="luot_dung">Lượt dùng:</label>
            <input
              type="number"
              id="luot_dung"
              name="luot_dung"
              value={formData.luot_dung}
              onChange={handleInputChange}
              placeholder="Nhập lượt dùng"
              required
            />
          </div>

          {/* Trạng thái */}
          <div className="form-group">
            <label htmlFor="trang_thai">Trạng thái:</label>
            <select
              id="trang_thai"
              name="trang_thai"
              value={formData.trang_thai}
              onChange={handleInputChange}
            >
              <option value={1}>Hoạt động</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>

          {/* Xét duyệt */}
          <div className="form-group">
            <label htmlFor="xet_duyet">Xét duyệt:</label>
            <select
              id="xet_duyet"
              name="xet_duyet"
              value={formData.xet_duyet}
              onChange={handleInputChange}
            >
              <option value="chờ duyệt">Chờ duyệt</option>
              <option value="đã duyệt">Đã duyệt</option>
              <option value="không duyệt">Không duyệt</option>
            </select>
          </div>

          {/* Thời gian hoàn thành */}
          <div className="form-group">
            <label htmlFor="thoi_gian_hoan_thanh">Thời Gian Hoàn Thành:</label>
            <input
              type="text"
              id="thoi_gian_hoan_thanh"
              name="thoi_gian_hoan_thanh"
              value={formData.thoi_gian_hoan_thanh}
              onChange={handleInputChange}
              placeholder="Nhập thời gian hoàn thành dịch vụ (vd: 60 phút,2-8 tuần)"
              required
            />
          </div>

          {/* Logo */}
          <div className="form-group">
            <label htmlFor="logo">Logo:</label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.logo && typeof formData.logo === "string" && (
              <div>
                <img
                  src={`http://localhost:5000/img/${formData.logo}`}
                  alt="Logo hiện tại"
                  width="50"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Đang xử lý..." : "Cập nhật dịch vụ"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default DichVuUpdate;
