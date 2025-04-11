import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import DieuKhien from "../components/DieuKhien";
import NguoiDung from "./NguoiDung";
import NhaCungCap from "./NhaCungCap";
import TaiKhoan from "./TaiKhoan";
import axios from "axios";

const UserCT: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any | null>(null);
  const [nguoiDung, setNguoiDung] = useState<any>({
    tai_khoan_id: Number(id),
    ho_ten: "",
    sdt: "",
    gioi_tinh: null,
    avata: "",
  });

  const [nhaCungCap, setNhaCungCap] = useState<any | null>({
    tai_khoan_id: Number(id),
    ten_nha_cung_cap: "",
    ma_so_thue: "",
    loai_hinh: "",
    mo_ta: null,
    giay_phep_kinh_doanh: "",
  }); // Khởi tạo state với giá trị mặc định trống
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        setUser(userRes.data);

        const nguoiDungRes = await axios.get(
          `http://localhost:5000/api/nguoidung/tai-khoan/${id}`
        );
        setNguoiDung(nguoiDungRes.data);

        const nhaCungCapRes = await axios.get(
          `http://localhost:5000/api/nhacungcap/tai-khoan/${id}`
        );
        setNhaCungCap(nhaCungCapRes.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tài khoản:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) return <div>Đang tải thông tin...</div>;

  return (
    <div>
      <Navigation />
      <div className="main">
        <DieuKhien />
        <div className="details">
          {user && <TaiKhoan taiKhoanData={user} />}
          <NguoiDung
            tai_khoan_id={user?.tai_khoan_id}
            nguoiDung={nguoiDung}
            setNguoiDung={setNguoiDung}
          />
          <NhaCungCap
            tai_khoan_id={user?.tai_khoan_id}
            nhaCungCap={nhaCungCap}
            setNhaCungCap={setNhaCungCap}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCT;
