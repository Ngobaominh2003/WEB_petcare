import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Radio, Space, Card } from "antd";
import { BankOutlined, DollarCircleOutlined } from "@ant-design/icons";
import axios from 'axios';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Foorter from '../components/Footer';
import Footer from '../components/Footer';

const ThanhToan: React.FC = () => {
  const [formData, setFormData] = useState({
    nguoi_dung_id: '', // User ID
    ten_khach_hang: '', // Customer name
    email: '', // Customer email
    sdt: '', // Phone number
    phong_id: '', // Room ID
    ngay_bat_dau: '', // Start date
    ngay_ket_thuc: '', // End date
    can_nang: '', // Weight
    tien: '', // Amount
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("cod");

  const handlePaymentChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  const location = useLocation();
  const { so_phong, phong_id, ngay_bat_dau, ngay_ket_thuc, can_nang, tien } = location.state || {};

  // Lấy nguoi_dung_id từ localStorage khi component được mount
  useEffect(() => {
    const nguoi_dung_id = localStorage.getItem("nguoi_dung_id") || "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      nguoi_dung_id,
    }));
    console.log("Nguoi Dung ID:", nguoi_dung_id);
  }, []);


  // Cập nhật form data nếu cần
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra thông tin khách hàng và phòng
    if (!formData.ten_khach_hang || !formData.email || !phong_id) {
      alert('Vui lòng điền đầy đủ thông tin khách hàng và mã phòng!');
      return;
    }

    const submitData = {
      ...formData,
      phong_id,
      so_phong,
      ngay_bat_dau,
      ngay_ket_thuc,
      can_nang,
      tien,
    };

    try {
      // Gửi yêu cầu thêm đơn đặt phòng
      const response = await axios.post('http://localhost:5000/api/datphong', submitData);

      if (response.status === 201) { // Mã 201 cho việc tạo mới thành công
        alert('Thêm đơn đặt phòng thành công!');

        // Cập nhật trạng thái phòng
        const updateRoomResponse = await updateRoomStatus(phong_id);

        if (updateRoomResponse) {
          alert('Cập nhật trạng thái phòng thành công!');
        } else {
          alert('Đã xảy ra lỗi khi cập nhật trạng thái phòng!');
        }
      } else {
        alert('Đã xảy ra lỗi khi thêm đơn đặt phòng!');
      }
    } catch (error) {
      console.error('Lỗi khi thêm đơn đặt phòng:', error);
      alert('Đã xảy ra lỗi khi thêm đơn đặt phòng!');
    }
  };

  // Hàm cập nhật trạng thái phòng
  const updateRoomStatus = async (phong_id: string) => {
    try {
      const updateRoomResponse = await axios.put(
        `http://localhost:5000/api/phong/status/${phong_id}`,
        { trang_thai_phong: 'đã đặt' } // Cập nhật trạng thái phòng
      );

      if (updateRoomResponse.status === 200) {
        return true; // Trả về true khi cập nhật thành công
      } else {
        return false;
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái phòng:', error);
      return false; // Trả về false nếu có lỗi
    }
  };


  return (
    <div>
      <Header />
      <Navbar />
      <div className="payment-container" style={{ marginTop: "225px", }}>

        <div className="thanh-toan-section">
          <h3 className="thanh-toan-section-title">Thông Tin Giao Hàng</h3>
          <form className="thanh-toan-shipping-form">
            {/* Họ và Tên, Email, Số điện thoại */}
            <div className="thanh-toan-form-row">
              <input
                type="text"
                name="ten_khach_hang"
                className="thanh-toan-form-input"
                placeholder="Họ và Tên"
                required
                value={formData.ten_khach_hang}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="thanh-toan-form-input"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="sdt"
                className="thanh-toan-form-input"
                placeholder="Số điện thoại"
                required
                value={formData.sdt}
                onChange={handleChange}
              />
            </div>

            {/* Phương thức giao hàng và địa chỉ */}
            <div className="thanh-toan-form-row">
              <select className="thanh-toan-form-input thanh-toan-select-input" required>
                <option value="giao-hang-tan-noi">Giao hàng tận nơi</option>
                <option value="nhan-tai-cua-hang">Nhận tại cửa hàng</option>
              </select>
              <input
                type="text"
                className="thanh-toan-form-input"
                placeholder="Địa chỉ"
                required
              />
            </div>

            {/* Tỉnh, Quận, Phường */}
            <div className="thanh-toan-form-row">
              <input
                type="text"
                className="thanh-toan-form-input"
                placeholder="Nhập tỉnh/thành"
                required
              />
              <input
                type="text"
                className="thanh-toan-form-input"
                placeholder="Nhập quận/huyện"
                required
              />
              <input
                type="text"
                className="thanh-toan-form-input"
                placeholder="Nhập phường/xã"
                required
              />
            </div>
          </form>
        </div>

        <div className="payment-section">
          <h3 className="payment-section-title">Phương Thức Thanh Toán</h3>
          <Radio.Group
            onChange={handlePaymentChange}
            value={paymentMethod}
            className="payment-method-group"
          >
            <Space direction="vertical" className="payment-method-space">
              {/* Phương thức thanh toán tiền mặt */}
              <Card hoverable className="payment-card">
                <Radio value="cod" className="payment-radio">
                  <Space align="center">
                    <DollarCircleOutlined style={{ fontSize: "24px", color: "#4caf50" }} />
                    <div>
                      <h4 className="payment-title">Thanh toán tiền mặt tại quầy</h4>
                      <p className="payment-description">
                        Thanh toán trực tiếp tại quầy khi nhận hàng hoặc dịch vụ.
                      </p>
                    </div>
                  </Space>
                </Radio>
              </Card>

              {/* Phương thức thanh toán chuyển khoản */}
              <Card hoverable className="payment-card">
                <Radio value="transfer" className="payment-radio">
                  <Space align="center">
                    <BankOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                    <div>
                      <h4 className="payment-title">Thanh toán chuyển khoản ngân hàng</h4>
                      <p className="payment-description">
                        Chuyển khoản vào tài khoản ngân hàng theo thông tin cung cấp.
                      </p>
                    </div>
                  </Space>
                </Radio>
              </Card>
            </Space>
          </Radio.Group>
        </div>


        <div className="payment-container">
          <div className="section order-summary">
            <h3 className="section-title">Thông Tin Đơn Hàng</h3>
            <div className="order-item">
              <img src="/img/about-1.jpg" alt="product" className="order-image" />
              <div className="order-details">
                <p className="product-name">Khách Sạn Cho Mèo</p>
                <p className="product-price">{tien ? tien.toLocaleString() : "0"}đ</p>
              </div>
            </div>
          </div>

          <div className="section order-info-section">
            <h3 className="section-title">Chi Tiết Đơn Hàng</h3>
            <div className="order-info">
              <p><strong>Số phòng:</strong> {so_phong || 'Không xác định'}</p>
              <p><strong>Phòng ID:</strong> {phong_id || 'Không xác định'}</p>
              <p><strong>Ngày bắt đầu:</strong> {ngay_bat_dau || 'Không xác định'}</p>
              <p><strong>Ngày kết thúc:</strong> {ngay_ket_thuc || 'Không xác định'}</p>
              <p><strong>Cân nặng đã chọn:</strong> {can_nang || 'Không xác định'}</p>
              <p className="order-total"><strong>Tổng tiền:</strong> {tien ? `${tien.toLocaleString()} đ` : '0 đ'}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="order-form">
            <button type="submit" className="submit-button">
              Hoàn Tất Đơn Hàng
            </button>
          </form>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default ThanhToan;
