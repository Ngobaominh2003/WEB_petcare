import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../style/styles.css";

const TKnguoidung: React.FC = () => {
  const [hoTen, setHoTen] = useState<string>("");
  const [sdt, setSdt] = useState<string>("");
  const [gioiTinh, setGioiTinh] = useState<"nam" | "nu" | "khac" | null>(null);
  const [avata, setAvata] = useState<string | null>(null); // dùng cho preview
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // file thực tế
  const [email, setEmail] = useState<string | null>(null);
  const [diaChi, setDiaChi] = useState<string>("");

  const [hasNguoiDung, setHasNguoiDung] = useState<boolean>(false);

  const taiKhoanId = localStorage.getItem("tai_khoan_id");
  const storedEmail = localStorage.getItem("email");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvata(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (taiKhoanId && storedEmail) {
      setEmail(storedEmail);
      axios
        .get(`http://localhost:5000/api/nguoidung/tai-khoan/${taiKhoanId}`)
        .then((response) => {
          const userData = response.data;
          if (userData) {
            setHoTen(userData.ho_ten || "");
            setSdt(userData.sdt || "");
            setGioiTinh(userData.gioi_tinh || null);
            setDiaChi(userData.dia_chi || "");

            setAvata(
              userData.avata
                ? `http://localhost:5000/img/${userData.avata}`
                : null
            );
            setHasNguoiDung(true);
          }
        })
        .catch((error) => {
          if (error.response?.status === 404) {
            setHasNguoiDung(false);
          } else {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
          }
        });
    }
  }, [taiKhoanId, storedEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taiKhoanId) {
      alert("Không tìm thấy tài khoản. Vui lòng đăng nhập lại.");
      return;
    }

    const formData = new FormData();
    formData.append("tai_khoan_id", taiKhoanId);
    formData.append("ho_ten", hoTen);
    formData.append("sdt", sdt);
    formData.append("dia_chi", diaChi);

    formData.append("gioi_tinh", gioiTinh || "null"); // Nếu gioi_tinh là null, sẽ gửi giá trị "null"
    if (avatarFile) {
      formData.append("avata", avatarFile);
    }

    const request = hasNguoiDung
      ? axios.put(`http://localhost:5000/api/nguoidung`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axios.post(`http://localhost:5000/api/nguoidung`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then(() => {
        alert(
          hasNguoiDung
            ? "Cập nhật thông tin thành công!"
            : "Thêm người dùng thành công!"
        );
        if (!hasNguoiDung) setHasNguoiDung(true);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
  };

  return (
    <div>
      <div className="tab-content active" id="profile">
        <div className="card">
          <div className="card-header">
            <h2>Thông tin cá nhân</h2>
            <p>Xem và cập nhật thông tin cá nhân của bạn</p>
          </div>
          <div className="card-body">
            <div className="profile-info">
              <div className="avatar-container">
                <div
                  className="avatar"
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                >
                  {avata ? (
                    <img
                      src={avata}
                      alt="Avatar"
                      style={{ borderRadius: "50%", width: 100, height: 100 }}
                    />
                  ) : (
                    <i
                      className="fas fa-user-circle"
                      style={{ fontSize: "100px" }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button className="avatar-edit">
                  <i className="fas fa-edit" />
                </button>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Họ và Tên</label>
                    <input
                      type="text"
                      id="firstName"
                      value={hoTen}
                      placeholder="Họ và tên"
                      onChange={(e) => setHoTen(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-icon">
                    <i className="fas fa-envelope" />
                    <input
                      type="email"
                      id="email"
                      value={email || ""}
                      placeholder="Email"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <div className="input-icon">
                    <i className="fas fa-phone" />
                    <input
                      type="tel"
                      id="phone"
                      value={sdt}
                      placeholder="Số điện thoại"
                      onChange={(e) => setSdt(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="diaChi">Địa chỉ</label>
                  <div className="input-icon">
                    <i className="fas fa-map-marker-alt" />
                    <input
                      type="text"
                      id="diaChi"
                      value={diaChi}
                      placeholder="Địa chỉ của bạn"
                      onChange={(e) => setDiaChi(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="gender">Giới tính</label>
                  <div className="gender-options">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="nam"
                        checked={gioiTinh === "nam"}
                        onChange={() => setGioiTinh("nam")}
                      />
                      Nam
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="nu"
                        checked={gioiTinh === "nu"}
                        onChange={() => setGioiTinh("nu")}
                      />
                      Nữ
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="khac"
                        checked={gioiTinh === "khac"}
                        onChange={() => setGioiTinh("khac")}
                      />
                      Khác
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
      {/* Tab Bảo mật có thể được thêm sau */}
    </div>
  );
};

export default TKnguoidung;
