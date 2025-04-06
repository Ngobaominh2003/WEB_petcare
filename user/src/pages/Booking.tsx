import React, { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    so_phong: "",
    phong_id: "",
    ngay_bat_dau: "",
    ngay_ket_thuc: "",
    can_nang: "Dưới 5 kg",
    tien: "", // Giá tổng
  });

  const [rooms, setRooms] = useState<any[]>([]); // Danh sách phòng
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải danh sách phòng
  const navigate = useNavigate();

  const weightToPrice: { [key: string]: number } = {
    "Dưới 5 kg": 120000,
    "Từ 6kg - 10kg": 150000,
    "Từ 11kg - 15kg": 180000,
  };

  // Tính tổng tiền mỗi khi các trường thay đổi
  const calculateTotalPrice = () => {
    if (formData.ngay_bat_dau && formData.ngay_ket_thuc && formData.can_nang) {
      const startDate = new Date(formData.ngay_bat_dau);
      const endDate = new Date(formData.ngay_ket_thuc);
      const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24); // Tính số ngày

      const pricePerDay = weightToPrice[formData.can_nang] || 0;
      const totalPrice = days * pricePerDay;

      setFormData((prevData) => ({
        ...prevData,
        tien: totalPrice.toString(),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        tien: "",
      }));
    }
  };

  // Xử lý khi giá trị của các trường thay đổi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Lấy danh sách phòng từ API
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/phongtrong");
        if (response.status === 200) {
          setRooms(response.data);
        } else {
          alert("Không thể lấy danh sách phòng!");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phòng:", error);
        alert("Đã xảy ra lỗi khi lấy danh sách phòng.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Tính tổng tiền mỗi khi thay đổi ngày bắt đầu, ngày kết thúc hoặc cân nặng
  useEffect(() => {
    calculateTotalPrice();
  }, [formData.ngay_bat_dau, formData.ngay_ket_thuc, formData.can_nang]);

  // Hàm xử lý khi nhấn nút "Đặt phòng"
  const handleBooking = () => {
    let errorMessage = "";

    // Kiểm tra nếu chưa chọn số phòng
    if (!formData.phong_id) {
      errorMessage += "Vui lòng chọn số phòng.\n";
    }

    // Kiểm tra nếu ngày bắt đầu không có giá trị
    if (!formData.ngay_bat_dau) {
      errorMessage += "Vui lòng chọn ngày bắt đầu.\n";
    }

    // Kiểm tra nếu ngày kết thúc không có giá trị
    if (!formData.ngay_ket_thuc) {
      errorMessage += "Vui lòng chọn ngày kết thúc.\n";
    }

    // Nếu có lỗi, hiển thị thông báo và không chuyển trang
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // Nếu không có lỗi, chuyển trang và truyền dữ liệu sang trang ThanhToan
    navigate("/ThanhToan", {
      state: {
        phong_id: formData.phong_id,
        ngay_bat_dau: formData.ngay_bat_dau,
        ngay_ket_thuc: formData.ngay_ket_thuc,
        can_nang: formData.can_nang,
        tien: formData.tien,
      },
    });
  };

  return (
    <div className="full-page-container">
      {/* Header và Navbar */}
      <Header />
      <Navbar />

      {/* Nội dung chính */}
      <div className="booking-container" style={{ marginTop: "225px" }}>
        <header className="header">
          <h1 className="header-title">
            ĐẶT PHÒNG KHÁCH SẠN CHO THÚ CƯNG TẠI PETLOVE
          </h1>
        </header>

        <div className="main-content">
          <div className="left-section">
            <iframe
              src="https://www.youtube.com/embed/p6UDKjmWp1Y"
              title="Fago Pet Video"
              className="video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="thumbnails">
              {Array.from({ length: 4 }).map((_, index) => (
                <img
                  key={index}
                  src={`https://via.placeholder.com/150?text=Image+${index + 1}`}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail"
                />
              ))}
            </div>
          </div>

          <div className="right-section">
            <div>
              <h2 className="sub-title">Tiện ích</h2>
              <ul className="list">
                <li>Camera theo dõi 24/24</li>
                <li>2-3 bữa mỗi ngày</li>
                <li>Vệ sinh chuồng mỗi ngày</li>
                <li>Vui chơi mỗi ngày 2 lần</li>
                <li>Phòng có điều hòa 24/7</li>
                <li>Cung cấp hình ảnh và video của các bé mỗi ngày</li>
              </ul>
            </div>
            <div>
              <h2 className="sub-title">Ưu đãi</h2>
              <ul className="list">
                <li>3 ngày giảm 10% phí dịch vụ spa và grooming</li>
                <li>7 ngày giảm 5% phí khách sạn và 20% phí spa</li>
                <li>15 ngày giảm 5% phí dịch vụ khách sạn + tặng 1 lần tắm</li>
                <li>30 ngày giảm 5% phí khách sạn + tặng 2 lần tắm + miễn phí đưa đón (&lt;5km)</li>
                <li>Gửi từ 2 bé trở lên giảm 5% phí dịch vụ khách sạn</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="booking-form">
      <h1 className="booking-form-title">ĐẶT PHÒNG KHÁCH SẠN CHO THÚ CƯNG</h1>

      {/* Chọn số phòng */}
      <div>
        <label htmlFor="phong_id" className="weight-label">
          Chọn số phòng:
        </label>
        <select
          id="phong_id"
          name="phong_id"
          value={formData.phong_id}
          onChange={handleChange}
        >
          <option value="">Chọn phòng</option>
          {rooms.map((room) => (
            <option key={room.phong_id} value={room.phong_id}>
              {room.so_phong}
            </option>
          ))}
        </select>
      </div>

      {/* Chọn cân nặng */}
      <div>
        <label htmlFor="weight" className="weight-label">
          Chọn cân nặng:
        </label>
        <select
          id="weight"
          name="can_nang"
          value={formData.can_nang}
          onChange={handleChange}
          className="select"
        >
          <option value="Dưới 5 k">Dưới 5kg</option>
          <option value="Từ 6kg - 10kg">Từ 6kg - 10kg</option>
          <option value="Từ 11kg - 15kg">Từ 11kg - 15kg</option>
        </select>
      </div>

      {/* Ngày bắt đầu */}
      <div>
        <label htmlFor="start-date" className="date-label">
          Ngày bắt đầu:
        </label>
        <input
          type="date"
          id="start-date"
          name="ngay_bat_dau"
          value={formData.ngay_bat_dau}
          onChange={handleChange}
          className="date-input"
        />
      </div>

      {/* Ngày kết thúc */}
      <div>
        <label htmlFor="end-date" className="date-label">
          Ngày kết thúc:
        </label>
        <input
          type="date"
          id="end-date"
          name="ngay_ket_thuc"
          value={formData.ngay_ket_thuc}
          onChange={handleChange}
          className="date-input"
        />
      </div>

      {/* Hiển thị giá */}
      <h2 className="price">
        Giá: <span>{formData.tien ? formData.tien.toLocaleString() : "0"}đ</span>
      </h2>

      {/* Nút đặt phòng */}
      <button className="button" onClick={handleBooking}>
        Đặt phòng ngay
      </button>
    </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Booking;
