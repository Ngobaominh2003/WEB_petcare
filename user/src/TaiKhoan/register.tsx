import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./style/styles.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
    role: "user", // Default role is 'user'
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox specially
    });
  };

  // Handle form submission
  // Ví dụ thay đổi giá trị vai_tro trước khi gửi lên API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra mật khẩu có khớp không
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Kiểm tra điều khoản đã được đồng ý chưa
    if (!formData.terms) {
      alert("Bạn cần đồng ý với điều khoản sử dụng.");
      return;
    }

    // Đảm bảo vai_tro là một trong các giá trị hợp lệ
    const vai_tro = formData.role === "user" ? "nguoi_dung" : formData.role;

    try {
      // Gửi yêu cầu POST tới API
      const response = await axios.post("http://localhost:5000/api/create", {
        ten_dang_nhap: formData.firstName + formData.lastName, // Tạo tên đăng nhập từ họ và tên
        mat_khau: formData.password,
        email: formData.email,
        vai_tro: vai_tro, // Sử dụng giá trị vai_tro hợp lệ
      });

      // On success, show success message
      alert("Tạo tài khoản thành công: " + response.data.tai_khoan_id);
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
      alert("Có lỗi xảy ra khi tạo tài khoản.");
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h1>Đăng ký tài khoản</h1>
                <p>
                  Tham gia cùng PetCare Connect để kết nối với dịch vụ chăm sóc
                  thú cưng tốt nhất
                </p>
              </div>
              <div className="auth-body">
                <form className="auth-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="user-first-name">Họ</label>
                      <input
                        type="text"
                        id="user-first-name"
                        name="firstName"
                        placeholder="Nhập họ của bạn"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user-last-name">Tên</label>
                      <input
                        type="text"
                        id="user-last-name"
                        name="lastName"
                        placeholder="Nhập tên của bạn"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="user-email">Email</label>
                    <input
                      type="email"
                      id="user-email"
                      name="email"
                      placeholder="Nhập email của bạn"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="user-password">Mật khẩu</label>
                    <input
                      type="password"
                      id="user-password"
                      name="password"
                      placeholder="Tạo mật khẩu"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="user-confirm-password">
                      Xác nhận mật khẩu
                    </label>
                    <input
                      type="password"
                      id="user-confirm-password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="user-terms"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="user-terms">
                        Tôi đồng ý với <a href="#">Điều khoản sử dụng</a> và{" "}
                        <a href="#">Chính sách bảo mật</a>
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Đăng ký tài khoản
                  </button>
                </form>
              </div>
              <div className="auth-footer">
                <p>
                  Bạn đã có tài khoản? <a href="login.html">Đăng nhập</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
