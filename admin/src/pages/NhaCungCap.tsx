import React from "react";
import axios from "axios";

interface NhaCungCapProps {
  tai_khoan_id: number;
  nhaCungCap: {
    ten_nha_cung_cap: string;
    ma_so_thue: string;
    dia_chi: string;
    loai_hinh: string;
    mo_ta: string | null;
    giay_phep_kinh_doanh?: File | string;
  };

  setNhaCungCap: React.Dispatch<React.SetStateAction<any>>;
}

const NhaCungCap: React.FC<NhaCungCapProps> = ({
  tai_khoan_id,
  nhaCungCap,
  setNhaCungCap,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNhaCungCap((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNhaCungCap((prev: any) => ({
        ...prev,
        giay_phep_kinh_doanh: e.target.files![0],
      }));
    }
  };

  const handleSave = async () => {
    if (!tai_khoan_id) {
      alert(
        "Không tìm thấy tài khoản. Vui lòng đảm bảo tài khoản đã được tạo."
      );
      return;
    }

    const {
      ten_nha_cung_cap,
      ma_so_thue,
      loai_hinh,
      dia_chi,
      mo_ta,
      giay_phep_kinh_doanh,
    } = nhaCungCap;

    if (
      !ten_nha_cung_cap?.trim() ||
      !ma_so_thue?.trim() ||
      !loai_hinh?.trim() ||
      !dia_chi?.trim() ||
      !giay_phep_kinh_doanh
    ) {
      alert(
        "Vui lòng điền đầy đủ thông tin (trừ mô tả) và tải lên Giấy phép kinh doanh."
      );
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("tai_khoan_id", tai_khoan_id.toString());
    formDataToSend.append("ten_nha_cung_cap", ten_nha_cung_cap);
    formDataToSend.append("ma_so_thue", ma_so_thue);
    formDataToSend.append("dia_chi", dia_chi);
    formDataToSend.append("loai_hinh", loai_hinh);
    if (mo_ta) formDataToSend.append("mo_ta", mo_ta);
    if (typeof giay_phep_kinh_doanh !== "string") {
      formDataToSend.append("giay_phep_kinh_doanh", giay_phep_kinh_doanh);
    }

    try {
      const checkRes = await axios.get(
        `http://localhost:5000/api/nhacungcap/tai-khoan/${tai_khoan_id}`
      );
      if (checkRes.data) {
        await axios.put(
          "http://localhost:5000/api/nhacungcap",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Cập nhật nhà cung cấp thành công!");
        return;
      }
    } catch (checkErr) {
      try {
        await axios.post(
          "http://localhost:5000/api/nhacungcap",
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Thêm nhà cung cấp thành công!");
      } catch (createErr) {
        console.error("Lỗi khi thêm nhà cung cấp:", createErr);
        alert("Đã xảy ra lỗi khi thêm nhà cung cấp.");
      }
    }
  };

  return (
    <form
      className="add-user-form"
      onSubmit={(e) => {
        e.preventDefault(); // Ngăn reload trang
        handleSave();
      }}
    >
      <h3>Thông tin Nhà Cung Cấp</h3>

      <div className="form-group">
        <label>Tên nhà cung cấp:</label>
        <input
          type="text"
          name="ten_nha_cung_cap"
          value={nhaCungCap?.ten_nha_cung_cap || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mã số thuế:</label>
        <input
          type="text"
          name="ma_so_thue"
          value={nhaCungCap?.ma_so_thue || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Loại hình:</label>
        <select
          name="loai_hinh"
          value={nhaCungCap?.loai_hinh || ""}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn loại hình --</option>
          <option value="ca_nhan">Cá nhân</option>
          <option value="ho_kinh_doanh">Hộ kinh doanh</option>
          <option value="cong_ty">Công ty</option>
        </select>
      </div>
      <div className="form-group">
        <label>Địa chỉ:</label>
        <input
          type="text"
          name="dia_chi"
          value={nhaCungCap?.dia_chi || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mô tả:</label>
        <textarea
          name="mo_ta"
          value={nhaCungCap?.mo_ta || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Giấy phép kinh doanh:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required={!nhaCungCap?.giay_phep_kinh_doanh}
        />
        {nhaCungCap?.giay_phep_kinh_doanh &&
          typeof nhaCungCap.giay_phep_kinh_doanh === "string" && (
            <img
              src={`http://localhost:5000/img/${nhaCungCap.giay_phep_kinh_doanh}`}
              alt="Giấy phép kinh doanh"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          )}
      </div>

      <button className="btn" type="submit">
        Lưu thông tin
      </button>
    </form>
  );
};

export default NhaCungCap;
