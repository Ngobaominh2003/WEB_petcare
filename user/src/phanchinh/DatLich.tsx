import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const DatLich: React.FC = () => {
  // State lưu thông tin form
  const [formData, setFormData] = useState({
    nguoi_dung_id: "",
    tenKhachHang: "",
    email: "",
    ngayDat: "",
    gioDat: "",
    dichVu: "",
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]); // Lưu trữ giờ còn trống
  const [dichVuOptions, setDichVuOptions] = useState<
    { value: string; label: string }[]
  >([]); // State để lưu danh sách dịch vụ

  // Lấy `nguoi_dung_id` từ localStorage khi component khởi tạo
  useEffect(() => {
    const nguoiDungId = localStorage.getItem("nguoi_dung_id");
    if (nguoiDungId) {
      setFormData((prev) => ({ ...prev, nguoi_dung_id: nguoiDungId }));
    }
  }, []);

  // Lấy danh sách dịch vụ từ API khi component được khởi tạo
  useEffect(() => {
    const fetchDichVuOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dich-vu/dieu-kien"
        );
        const options = response.data.map((dichVu: any) => ({
          value: dichVu.dich_vu_id, // Đảm bảo `id` là tên trường khóa chính trong dữ liệu dịch vụ
          label: dichVu.ten_dich_vu, // Đảm bảo `ten_dich_vu` là tên trường dịch vụ trong dữ liệu
        }));
        setDichVuOptions(options);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      }
    };

    fetchDichVuOptions();
  }, []);

  // Các giờ có sẵn để chọn
  const gioOptions = availableTimes.map((time) => ({
    value: time,
    label: time,
  }));

  // Hàm lấy giờ trống trong ngày từ API
  const fetchAvailableTimes = async (ngayDat: string) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/datlich/thoi_gian_trong",
        { params: { ngay_dat: ngayDat } }
      );
      setAvailableTimes(response.data.availableTimes);
    } catch (error) {
      console.error("Lỗi khi lấy giờ trống:", error);
    }
  };

  // Khi người dùng chọn ngày, gọi API để lấy giờ trống
  useEffect(() => {
    if (formData.ngayDat) {
      fetchAvailableTimes(formData.ngayDat);
    }
  }, [formData.ngayDat]);

  // Hàm xử lý thay đổi các trường
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form data before submission:", formData); // Kiểm tra giá trị formData

    try {
      const response = await axios.post("http://localhost:5000/api/datlich", {
        nguoi_dung_id: formData.nguoi_dung_id,
        ten_kh: formData.tenKhachHang,
        email_kh: formData.email,
        ngay_dat: formData.ngayDat,
        gio_dat: formData.gioDat,
        dich_vu_id: formData.dichVu,
        trang_thai: "chờ xác nhận",
      });
      alert(response.data.message || "Tạo lịch đặt thành công!");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Lỗi khi tạo lịch đặt:", error.response.data);
        alert(
          `Lỗi khi tạo lịch đặt: ${
            error.response.data.message || error.message
          }`
        );
      } else {
        console.error("Lỗi không xác định:", error);
        alert("Lỗi không xác định đã xảy ra.");
      }
    }
  };

  return (
    <div className="col-lg-5 form-section">
      <div className="py-5 px-4 px-sm-5">
        <form className="py-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control border-0 p-4"
              placeholder="Tên khách hàng"
              required
              value={formData.tenKhachHang}
              onChange={(e) => handleChange("tenKhachHang", e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control border-0 p-4"
              placeholder="Email của bạn"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="form-group">
            <div
              className="input-group date"
              id="date"
              data-target-input="nearest"
            >
              <input
                type="date"
                className="form-control border-0 p-4 datetimepicker-input"
                placeholder="Reservation Date"
                value={formData.ngayDat}
                onChange={(e) => handleChange("ngayDat", e.target.value)}
              />
              <div className="input-group-append" data-target="#date">
                <div className="input-group-text">
                  <i className="fa fa-calendar"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <Select
              options={gioOptions}
              onChange={(option) => handleChange("gioDat", option?.value)}
              placeholder="Chọn giờ"
              className="border-0"
              classNamePrefix="select"
              menuPortalTarget={document.body}
            />
          </div>
          <div className="form-group">
            <Select
              options={dichVuOptions}
              onChange={(option) => handleChange("dichVu", option?.value)}
              placeholder="Chọn dịch vụ"
              className="border-0"
              classNamePrefix="select"
              required
            />
          </div>

          <div>
            <button
              className="btn btn-dark btn-block border-0 py-3"
              type="submit"
            >
              Đặt Ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DatLich;
