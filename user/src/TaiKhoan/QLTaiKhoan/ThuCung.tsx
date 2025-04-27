import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import NguoiDungMenu from "../../components/NguoiDungMenu";
import { showSuccess, showError, showWarn } from "../../utils/toast";
import axios from "axios";
import "../style/styles.css";

const ThuCung: React.FC = () => {
  const [pets, setPets] = useState<any[]>([]); // State để lưu danh sách thú cưng
  const [loading, setLoading] = useState(true); // State loading
  const navigate = useNavigate(); // Khởi tạo navigate

  // Lấy tai_khoan_id từ localStorage
  const taiKhoanId = localStorage.getItem("tai_khoan_id");

  // Hàm lấy danh sách thú cưng
  const fetchPets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/thu-cung/tai-khoan/${taiKhoanId}`
      );
      setPets(response.data);
    } catch (err) {
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };
  // Xử lý xóa dịch vụ
  const handleDelete = async (petId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thú cưng này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/thu-cung/xoa/${petId}`);
        setPets((prevPets) =>
          prevPets.filter((pet) => pet.thu_cung_id !== petId)
        );
        showSuccess("🎉 Thú cưng đã được xóa thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa thú cưng:", error);
        showError("❌ Lỗi khi xóa thú cưng. Vui lòng thử lại.");
      }
    }
  };

  // Gọi fetchPets khi component được mount
  useEffect(() => {
    if (taiKhoanId) {
      fetchPets();
    } else {
      console.error("Không tìm thấy tai_khoan_id trong localStorage");
    }
  }, [taiKhoanId]);

  // Hàm chuyển đến trang thêm thú cưng
  const handleAddPet = () => {
    navigate("/thu-cung/add"); // Chuyển đến trang ThuCungAdd
  };

  // Hàm chuyển đến trang chỉnh sửa thú cưng
  const handleEditPet = (pet: any) => {
    navigate(`/thu-cung/update/${pet.thu_cung_id}`, { state: pet }); // Truyền toàn bộ pet qua state
  };
  return (
    <div>
      <Header />
      <Navbar />
      <main className="main-content" >
        <div className="container">
          <div className="account-layout">
            {/* Sidebar */}
            <NguoiDungMenu />
            {/* Content Area */}
            <div className="account-content">
              <div className="page-header-with-actions">
                <div>
                  <h1>Thú cưng của tôi</h1>
                  <p>Quản lý thông tin thú cưng của bạn</p>
                </div>
                <button className="btn btn-primary" onClick={handleAddPet}>
                  <i className="fas fa-plus-circle" />
                  Thêm thú cưng
                </button>
              </div>
              <div className="pets-grid">
                {loading ? (
                  <p>Đang tải dữ liệu...</p>
                ) : pets.length === 0 ? (
                  <p>Không có thú cưng nào.</p>
                ) : (
                  pets.map((pet) => (
                    <div className="pet-card" key={pet.thu_cung_id}>
                      <div className="pet-card-header">
                        <h2>{pet.ten}</h2>
                        <p>{pet.loai}</p>
                      </div>
                      <div className="pet-card-body">
                        <div className="pet-info">
                          <img
                            src={
                              pet.hinh_anh
                                ? `http://localhost:5000/img/${pet.hinh_anh}`
                                : "https://placehold.co/100x100/4CAF50/ffffff?text=Pet"
                            }
                            alt={pet.ten}
                            className="pet-image"
                          />

                          <div className="pet-details">
                            <p>
                              <span>Tuổi:</span> {pet.tuoi} tuổi
                            </p>
                            <p>
                              <span>Giới tính:</span> {pet.gioi_tinh}
                            </p>
                            <p>
                              <span>Cân nặng:</span> {pet.can_nang} kg
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pet-card-footer">
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleEditPet(pet)}
                        >
                          <i className="fas fa-edit" />
                          Chỉnh sửa
                        </button>

                        <button
                          className="btn btn-outline btn-sm btn-danger"
                          onClick={() => handleDelete(pet.thu_cung_id)}
                        >
                          <i className="fas fa-trash" />
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThuCung;
