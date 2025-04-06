import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import DieuKhien from "../components/DieuKhien";
import AddUser from "./UserAdd";
import UserUpdate from "./UserUpdate";
import axios from "axios";

interface User {
  tai_khoan_id: number;
  ten_dang_nhap: string;
  mat_khau: string;
  email: string;
  vai_tro: "quan_tri" | "nguoi_dung" | "nha_cung_cap";
  trang_thai: "hoat_dong" | "khoa";
  trang_thai_xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xóa người dùng
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("Xóa người dùng thành công");
      fetchUsers(); // ✅ Tải lại danh sách người dùng
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      alert("Không thể xóa người dùng");
    }
  };

  // Chọn người dùng để xem chi tiết hoặc sửa
  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  // Hiển thị loader trong khi tải dữ liệu
  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />

        {/* ================ Danh sách người dùng ================= */}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>USER</h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Tên Đăng Nhập</td>
                  <td>Email</td>
                  <td>Vai Trò</td>
                  <td>Trạng Thái</td>
                  <td>Trạng Thái Duyệt</td>
                  <td>Hành Động</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.tai_khoan_id} onClick={() => handleRowClick(user)}>
                    <td>{user.tai_khoan_id}</td>
                    <td>{user.ten_dang_nhap}</td>
                    <td>{user.email}</td>
                    <td>{user.vai_tro}</td>
                    <td>{user.trang_thai}</td>
                    <td>{user.trang_thai_xet_duyet}</td>
                    <td>
                      <button
                        className="btn delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUser(user.tai_khoan_id);
                        }}
                      >
                        Xóa
                      </button>
                      <button
                        className="btn view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(JSON.stringify(user, null, 2)); // Hoặc mở modal chi tiết
                        }}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Container để hiển thị chi tiết và thêm người dùng */}
        <div className="details-container">
          <UserUpdate user={selectedUser} />
          <AddUser />
        </div>
      </div>
    </div>
  );
};

export default Users;
