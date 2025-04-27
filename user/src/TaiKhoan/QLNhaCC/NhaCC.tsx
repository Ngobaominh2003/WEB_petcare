import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../style/styles.css";

const NhaCC: React.FC = () => {
  const [tenNhaCungCap, setTenNhaCungCap] = useState<string>("");
  const [maSoThue, setMaSoThue] = useState<string>("");
  const [diaChi, setDiaChi] = useState<string>("");
  const [loaiHinh, setLoaiHinh] = useState<
    "ca_nhan" | "ho_kinh_doanh" | "cong_ty" | null
  >(null);
  const [moTa, setMoTa] = useState<string | null>(null);
  const [giayPhepKinhDoanh, setGiayPhepKinhDoanh] = useState<string | null>(
    null
  ); // Preview ảnh
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // File ảnh giấy phép kinh doanh thực tế
  const [hasNhaCungCap, setHasNhaCungCap] = useState<boolean>(false);

  const taiKhoanId = localStorage.getItem("tai_khoan_id");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setGiayPhepKinhDoanh(URL.createObjectURL(file)); // Hiển thị ảnh preview
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taiKhoanId) {
      alert("Không tìm thấy tài khoản. Vui lòng đăng nhập lại.");
      return;
    }

    const formData = new FormData();
    formData.append("tai_khoan_id", taiKhoanId);
    formData.append("ten_nha_cung_cap", tenNhaCungCap);
    formData.append("ma_so_thue", maSoThue);
    formData.append("dia_chi", diaChi);
    formData.append("loai_hinh", loaiHinh || "ca_nhan"); // Nếu loai_hinh là null, sẽ gửi giá trị mặc định
    formData.append("mo_ta", moTa || "");
    if (avatarFile) {
      formData.append("giay_phep_kinh_doanh", avatarFile); // Thêm file ảnh giấy phép kinh doanh
    }

    const request = hasNhaCungCap
      ? axios.put("http://localhost:5000/api/nhacungcap", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axios.post("http://localhost:5000/api/nhacungcap", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then(() => {
        alert(
          hasNhaCungCap
            ? "Cập nhật thông tin nhà cung cấp thành công!"
            : "Thêm nhà cung cấp thành công!"
        );
        if (!hasNhaCungCap) setHasNhaCungCap(true);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
  };

  useEffect(() => {
    if (taiKhoanId) {
      axios
        .get(`http://localhost:5000/api/nhacungcap/tai-khoan/${taiKhoanId}`)
        .then((response) => {
          const nhaCungCapData = response.data;
          if (nhaCungCapData) {
            setTenNhaCungCap(nhaCungCapData.ten_nha_cung_cap || "");
            setMaSoThue(nhaCungCapData.ma_so_thue || "");
            setDiaChi(nhaCungCapData.dia_chi || "");
            setLoaiHinh(nhaCungCapData.loai_hinh || null);
            setMoTa(nhaCungCapData.mo_ta || null);
            setGiayPhepKinhDoanh(
              nhaCungCapData.giay_phep_kinh_doanh
                ? `http://localhost:5000/img/${nhaCungCapData.giay_phep_kinh_doanh}`
                : null
            );
            setHasNhaCungCap(true);
          }
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            setHasNhaCungCap(false);
          } else {
            console.error("Lỗi khi lấy thông tin nhà cung cấp:", error);
          }
        });
    }
  }, [taiKhoanId]);

  return (
    <div className="tab-content" id="business">
      <div className="card">
        <div className="card-header">
          <h2>Thông tin doanh nghiệp</h2>
          <p>Cập nhật thông tin doanh nghiệp của bạn</p>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="businessName">Tên doanh nghiệp</label>
            <input
              type="text"
              id="businessName"
              value={tenNhaCungCap}
              onChange={(e) => setTenNhaCungCap(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessType">Loại hình doanh nghiệp</label>
            <select
              id="businessType"
              value={loaiHinh || "ca_nhan"}
              onChange={(e) =>
                setLoaiHinh(
                  e.target.value as "ca_nhan" | "ho_kinh_doanh" | "cong_ty"
                )
              }
            >
              <option value="ca_nhan">Cá nhân</option>
              <option value="ho_kinh_doanh">Hộ kinh doanh</option>
              <option value="cong_ty">Công ty</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="taxId">Mã số thuế</label>
            <input
              type="text"
              id="taxId"
              value={maSoThue}
              onChange={(e) => setMaSoThue(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessAddress">Địa chỉ kinh doanh</label>
            <input
              type="text"
              id="businessAddress"
              value={diaChi}
              onChange={(e) => setDiaChi(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessDescription">Mô tả doanh nghiệp</label>
            <textarea
              id="businessDescription"
              rows={4}
              value={moTa || ""}
              onChange={(e) => setMoTa(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessLicense">Giấy phép kinh doanh</label>
            <input
              type="file"
              id="businessLicense"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {giayPhepKinhDoanh && (
              <div>
                <p>Ảnh Giấy phép kinh doanh:</p>
                <img
                  src={giayPhepKinhDoanh}
                  alt="Giấy phép kinh doanh"
                  style={{ width: 200, height: 200 }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default NhaCC;
