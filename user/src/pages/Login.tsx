import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../pages/css/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setLoading(true); // Bắt đầu trạng thái tải

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          mat_khau: matKhau,
        }),
      });

      if (!response.ok) {
        throw new Error('Đăng nhập không thành công! Vui lòng kiểm tra lại thông tin.');
      }

      const { nguoi_dung_id, vai_tro } = await response.json();


      // Lưu thông tin nguoi_dung_id vào localStorage
      localStorage.setItem('nguoi_dung_id', nguoi_dung_id);

      // Kiểm tra xem nguoi_dung_id đã được lưu thành công hay chưa
      console.log('Nguoi_dung_id được lưu:', localStorage.getItem('nguoi_dung_id'));


      // Điều hướng dựa trên vai trò của người dùng
      if (vai_tro === 'quản trị' || vai_tro === 'nhân viên') {
        navigate('/Admin'); // Điều hướng đến trang quản trị
      } else {
        navigate('/HomePage'); // Điều hướng đến trang chính
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };


  return (
    <div>
      <Header />
      <Navbar />
      <div className="login-container"style={{marginTop: "225px",}}>
        <h1>Đăng nhập ngay</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Nhập E-mail của bạn"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              required
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
            />
            <span className="icon">
              <FontAwesomeIcon icon={faUnlockAlt} />
            </span>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" />
            <label>Nhớ mật khẩu</label>
            <a href="#" className="forgot-password">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>

          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faGooglePlus} /></a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
