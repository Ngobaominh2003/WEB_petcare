import React from "react";
import axios from "axios";

interface NguoiDungProps {
  tai_khoan_id: number; // Nhận từ component cha
  nguoiDung: {
    ho_ten: string;
    sdt?: string;
    gioi_tinh: "nam" | "nu" | "khac" | null;
    avata?: File | string;
  };
  setNguoiDung: React.Dispatch<React.SetStateAction<any>>;
}

const NguoiDung: React.FC<NguoiDungProps> = ({
  tai_khoan_id,
  nguoiDung,
  setNguoiDung,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNguoiDung((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNguoiDung((prev: any) => ({
        ...prev,
        avata: e.target.files![0],
      }));
    }
  };

  const handleSave = async () => {
    if (!tai_khoan_id) {
      alert(
        "Không tìm thấy tai_khoan_id. Vui lòng đảm bảo tài khoản đã được tạo."
      );
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("tai_khoan_id", tai_khoan_id.toString());
    formDataToSend.append("ho_ten", nguoiDung.ho_ten || "");
    formDataToSend.append("gioi_tinh", nguoiDung.gioi_tinh || "");
    if (nguoiDung.sdt) formDataToSend.append("sdt", nguoiDung.sdt);
    if (nguoiDung.avata && typeof nguoiDung.avata !== "string") {
      formDataToSend.append("avata", nguoiDung.avata);
    }

    try {
      const checkRes = await axios.get(
        `http://localhost:5000/api/nguoidung/tai-khoan/${tai_khoan_id}`
      );
      if (checkRes.data) {
        // Nếu tồn tại thì cập nhật
        await axios.put("http://localhost:5000/api/nguoidung", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Cập nhật người dùng thành công!");
        return;
      }
    } catch (checkErr) {
      // Nếu không tồn tại thì thêm mới
      try {
        await axios.post(
          "http://localhost:5000/api/nguoidung",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Thêm người dùng thành công!");
      } catch (createError) {
        console.error("Lỗi khi thêm người dùng:", createError);
        alert("Đã xảy ra lỗi khi thêm.");
      }
    }
  };

  return (
    <div className="add-user-form">
      <h3>Thông tin Người Dùng</h3>

      <div className="form-group">
        <label>Họ tên:</label>
        <input
          type="text"
          name="ho_ten"
          value={nguoiDung?.ho_ten || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Số điện thoại:</label>
        <input
          type="text"
          name="sdt"
          value={nguoiDung?.sdt || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Giới tính:</label>
        <select
          name="gioi_tinh"
          value={nguoiDung?.gioi_tinh || ""}
          onChange={handleChange}
        >
          <option value="">Chọn giới tính</option>
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
          <option value="khac">Khác</option>
        </select>
      </div>

      <div className="form-group">
        <label>Avatar:</label>
        <input
          type="file"
          name="avata"
          accept="image/*"
          onChange={handleFileChange}
        />
        {nguoiDung?.avata && typeof nguoiDung.avata === "string" && (
          <img
            src={`http://localhost:5000/img/${nguoiDung.avata}`}
            alt="Avatar"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        )}
      </div>

      <button className="btn" onClick={handleSave}>
        Lưu thông tin
      </button>
    </div>
  );
};

export default NguoiDung;
