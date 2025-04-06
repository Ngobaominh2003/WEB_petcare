import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../pages/css/Register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faUnlockAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu không khớp!');
            return;
        }

        const userData = {
            ten_dang_nhap: name, // Chắc chắn rằng bạn sử dụng đúng tên thuộc tính
            email,
            mat_khau: password, // Đảm bảo rằng thuộc tính trùng khớp với backend
        };

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            


            const data = await response.json();

            if (response.ok) {
                alert("Đăng ký thành công!");
                // Chuyển hướng hoặc xử lý sau khi đăng ký thành công
            } else {
                setErrorMessage(`Đăng ký thất bại: ${data.message}`);
            }
        } catch (error) {
            console.error('Lỗi:', error);
            setErrorMessage("Đã xảy ra lỗi trong quá trình đăng ký.");
        }
    };

    return (
        <div>
            <Header />
            <Navbar />
            <div className="register-container"style={{marginTop: "225px",}}>
                <h2>Sign Up Now</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <span className="icon">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter your E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span className="icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="icon">
                            <FontAwesomeIcon icon={faUnlockAlt} />
                        </span>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span className="icon">
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                    </div>

                    <button type="submit" className="register-btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
