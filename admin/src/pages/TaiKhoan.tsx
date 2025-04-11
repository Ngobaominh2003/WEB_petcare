import React from "react";

interface TaiKhoanProps {
  taiKhoanData: {
    ten_dang_nhap: string;
    email: string;
    vai_tro: "quan_tri" | "nguoi_dung" | "nha_cung_cap";
    trang_thai: "hoat_dong" | "khoa";
    trang_thai_xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
  };
}

const TaiKhoan: React.FC<TaiKhoanProps> = ({ taiKhoanData }) => {
  return (
    <div className="add-user-form">
      <h3>Thông tin Tài Khoản</h3>
      <div className="form-group">
        <label>Tên đăng nhập:</label>
        <input type="text" value={taiKhoanData.ten_dang_nhap} disabled />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={taiKhoanData.email} disabled />
      </div>
      <div className="form-group">
        <label>Vai trò:</label>
        <input type="text" value={taiKhoanData.vai_tro} disabled />
      </div>
      <div className="form-group">
        <label>Trạng thái:</label>
        <input type="text" value={taiKhoanData.trang_thai} disabled />
      </div>
      <div className="form-group">
        <label>Trạng thái xét duyệt:</label>
        <input type="text" value={taiKhoanData.trang_thai_xet_duyet} disabled />
      </div>
    </div>
  );
};

export default TaiKhoan;
