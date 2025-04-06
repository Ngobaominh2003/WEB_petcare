import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import axios from "axios";
import './style/styles.css';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Thêm state để lưu thông báo thành công

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Gửi request đăng nhập đến server sử dụng Axios
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email, // Gửi email
        mat_khau: password, // Gửi mật khẩu
      });

      if (response.status === 200) {
        // Lưu thông tin email vào localStorage
        const tai_khoan_id = response.data.user.id; // Giả sử bạn có `id` trong dữ liệu người dùng
        const email = response.data.user.email; // Lấy email từ user

        localStorage.setItem("tai_khoan_id", tai_khoan_id); // Lưu tài khoản ID vào localStorage
        localStorage.setItem("email", email); // Lưu email vào localStorage

        // Kiểm tra xem email đã được lưu thành công hay chưa
        console.log("email được lưu:", localStorage.getItem("email"));

        // Lưu token và thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token); // Lưu token nếu có

        // Hiển thị dữ liệu trong localStorage dưới dạng JSON
        console.log(
          "Dữ liệu trong localStorage:",
          localStorage.getItem("user")
        );
        console.log("Token trong localStorage:", localStorage.getItem("token"));

        // Cập nhật thông báo thành công
        setSuccessMessage(
          "Đăng nhập thành công và thông tin đã được lưu vào localStorage."
        );

        // Bạn có thể chuyển hướng đến trang chính hoặc dashboard
        console.log("Đăng nhập thành công", response.data);
        window.location.href = "/"; // Chuyển hướng đến trang chính
      }
    } catch (error: any) {
      // Nếu có lỗi từ server, hiển thị thông báo lỗi
      if (error.response) {
        setError(error.response.data.message); // Lỗi từ API (ví dụ: email sai, mật khẩu sai)
      } else {
        setError("Lỗi kết nối với server"); // Lỗi kết nối
      }
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content" style={{ marginTop: "225px" }}>
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <h1>Đăng nhập</h1>
                <p>Chào mừng bạn quay trở lại với PetCare Connect</p>
              </div>
              <div className="auth-body">
                <form
                  className="auth-form"
                  id="login-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-icon">
                      <i className="fas fa-envelope" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Nhập email của bạn"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu</label>
                    <div className="input-icon">
                      <i className="fas fa-lock" />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Nhập mật khẩu của bạn"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  {error && <p className="error-message">{error}</p>}

                  {/* Hiển thị thông báo thành công */}
                  {successMessage && (
                    <p className="success-message">{successMessage}</p>
                  )}

                  <div className="form-options">
                    <div className="remember-me">
                      <input type="checkbox" id="remember" name="remember" />
                      <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                    </div>
                    <a href="#" className="forgot-password">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Đăng nhập
                  </button>
                </form>
              </div>
              <div className="auth-footer">
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <a href="register.html">Đăng ký ngay</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
