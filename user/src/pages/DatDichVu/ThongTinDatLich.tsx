import React, { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  onNext: () => void;
  onBack: () => void;
  setDatLichInfo: React.Dispatch<React.SetStateAction<any>>;
};

const ThongTinDatLich: React.FC<Props> = ({
  onNext,
  onBack,
  setDatLichInfo,
}) => {
  const [thuCungList, setThuCungList] = useState<any[]>([]);
  const [nguoiDung, setNguoiDung] = useState<any | null>(null);
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const storedEmail = localStorage.getItem("email");
  const [formInfo, setFormInfo] = useState({
    ho_ten: "",
    sdt: "",

    dia_chi: "",
  });
  useEffect(() => {
    if (nguoiDung) {
      setFormInfo({
        ho_ten: nguoiDung.ho_ten || "",
        sdt: nguoiDung.sdt || "",

        dia_chi: nguoiDung.dia_chi || "",
      });
    }
  }, [nguoiDung]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const taiKhoanId = localStorage.getItem("tai_khoan_id");

    if (taiKhoanId) {
      axios
        .get(`http://localhost:5000/api/thu-cung/tai-khoan/${taiKhoanId}`)

        .then((res) => {
          console.log("Danh sách thú cưng:", res.data);
          setThuCungList(res.data);
        });

      axios
        .get(`http://localhost:5000/api/nguoidung/tai-khoan/${taiKhoanId}`)
        .then((res) => {
          setNguoiDung(res.data);
        });
    }
  }, []);

  const handleNext = () => {
    const ngay = (document.getElementById("booking-date") as HTMLInputElement)
      .value;
    const gio = (
      document.querySelector(
        "input[name='time-slot']:checked"
      ) as HTMLInputElement
    )?.value;
    const ngayGio = `${ngay} ${gio}:00`;

    const note = (
      document.getElementById("service-note") as HTMLTextAreaElement
    )?.value;
    const selectedPackage = (
      document.getElementById("service-package") as HTMLSelectElement
    )?.value;
    const selectedThuCung = thuCungList.find(
      (pet) => pet.thu_cung_id === selectedPetId
    );

    localStorage.setItem(
      "datLichInfo",
      JSON.stringify({
        thu_cung_id: selectedPetId,
        ten_thu_cung: selectedThuCung?.ten || "",
        ngay_gio: ngayGio,
        ghi_chu: note,
        goi_dich_vu: selectedPackage,
        ho_ten: formInfo.ho_ten,
        sdt: formInfo.sdt,

        dia_chi: formInfo.dia_chi,
      })
    );
    setDatLichInfo({
      thu_cung_id: selectedPetId,
      ten_thu_cung: selectedThuCung?.ten || "",
      ngay_gio: ngayGio,
      ghi_chu: note,
      goi_dich_vu: selectedPackage,
      ho_ten: nguoiDung?.ho_ten || "",
      sdt: nguoiDung?.sdt || "",
      dia_chi: nguoiDung?.dia_chi || "",
      email: storedEmail || "",
    });

    onNext();
  };

  return (
    <div className="datdichvu-booking-form">
      <div className="datdichvu-booking-step active" id="step-2">
        <div className="datdichvu-step-header">
          <h2>Thông tin đặt lịch</h2>
          <p>Chọn thú cưng, ngày và giờ cho dịch vụ</p>
        </div>

        <div className="datdichvu-booking-info">
          {/* Chọn thú cưng */}
          <div className="datdichvu-form-section">
            <h3>Chọn thú cưng</h3>
            <div className="datdichvu-pet-selection">
              {thuCungList.length === 0 ? (
                <p>Không có thú cưng nào được tìm thấy.</p>
              ) : (
                thuCungList.map((thuCung, idx) => (
                  <div className="datdichvu-pet-card" key={thuCung.thu_cung_id}>
                    <div className="datdichvu-pet-image">
                      <img
                        src={`http://localhost:5000/img/${
                          thuCung.hinh_anh || "placeholder.png"
                        }`}
                        alt={thuCung.ten}
                      />
                    </div>
                    <div className="datdichvu-pet-info">
                      <h4>{thuCung.ten}</h4>
                      <p>
                        {thuCung.loai} - {thuCung.tuoi} tuổi
                      </p>
                    </div>
                    <div className="datdichvu-pet-select">
                      <input
                        type="radio"
                        name="pet"
                        id={`pet-${idx}`}
                        value={thuCung.thu_cung_id}
                        onChange={() => setSelectedPetId(thuCung.thu_cung_id)}
                      />

                      <label htmlFor={`pet-${idx}`} />
                    </div>
                  </div>
                ))
              )}

              <div className="datdichvu-pet-card datdichvu-add-pet">
                <div className="datdichvu-add-pet-icon">
                  <i className="fas fa-plus-circle" />
                </div>
                <p>Thêm thú cưng mới</p>
              </div>
            </div>
          </div>

          {/* Ngày và giờ */}
          <div className="datdichvu-form-section">
            <h3>Chọn ngày và giờ</h3>
            <div className="datdichvu-date-time-selection">
              <div className="datdichvu-form-group">
                <label htmlFor="booking-date">Ngày đặt lịch</label>
                <input
                  type="date"
                  id="booking-date"
                  name="booking-date"
                  defaultValue="2025-05-15"
                  required
                />
              </div>
              <div className="datdichvu-form-group">
                <label>Thời gian có sẵn</label>
                <div className="datdichvu-time-slots">
                  {[
                    "09:00",
                    "10:00",
                    "11:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                  ].map((time, idx) => (
                    <div key={time} className="datdichvu-time-slot">
                      <input
                        type="radio"
                        name="time-slot"
                        id={`time-${idx}`}
                        value={time}
                        defaultChecked={time === "14:00"}
                      />
                      <label htmlFor={`time-${idx}`}>{time}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="datdichvu-form-section">
            <h3>Thông tin liên hệ</h3>
            <div className="datdichvu-contact-info">
              <div className="datdichvu-form-row">
                <div className="datdichvu-form-group">
                  <label htmlFor="contact-name">Họ và tên</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="contact-name"
                    value={formInfo.ho_ten}
                    onChange={(e) =>
                      setFormInfo((prev) => ({
                        ...prev,
                        ho_ten: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="datdichvu-form-group">
                  <label htmlFor="contact-phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="contact-phone"
                    value={formInfo.sdt}
                    onChange={(e) =>
                      setFormInfo((prev) => ({ ...prev, sdt: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="datdichvu-form-group">
                <label>Email</label>
                <input type="email" value={storedEmail || ""} readOnly />
              </div>
              <div className="datdichvu-form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  value={formInfo.dia_chi}
                  onChange={(e) =>
                    setFormInfo((prev) => ({
                      ...prev,
                      dia_chi: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="datdichvu-step-actions">
          <button
            onClick={onBack}
            className="datdichvu-btn datdichvu-btn-outline"
          >
            Quay lại
          </button>
          <button
            onClick={handleNext}
            className="datdichvu-btn datdichvu-btn-primary"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThongTinDatLich;
