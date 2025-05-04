import React, { useState, useEffect } from "react";
import axios from "axios";

interface BaiVietUpdateProps {
  baiVietChon: {
    bai_viet_id: number;
    tai_khoan_id: number;
    tieu_de: string | null;
    noi_dung: string;
    hinh_anh: string | null;
    ngay_dang: Date;
    trang_thai: "hien" | "an";
    xet_duyet: "chờ duyệt" | "đã duyệt" | "không duyệt";
  } | null;
}

const BaiVietUpdate: React.FC<BaiVietUpdateProps> = ({ baiVietChon }) => {
  const [formData, setFormData] = useState({
    tieu_de: "",
    noi_dung: "",
    hinh_anh: null as File | null,
    trang_thai: "hien" as "hien" | "an",
    xet_duyet: "chờ duyệt" as "chờ duyệt" | "đã duyệt" | "không duyệt",
  });

  useEffect(() => {
    if (baiVietChon) {
      setFormData({
        tieu_de: baiVietChon.tieu_de || "",
        noi_dung: baiVietChon.noi_dung || "",
        hinh_anh: null,
        trang_thai: baiVietChon.trang_thai,
        xet_duyet: baiVietChon.xet_duyet,
      });
    }
  }, [baiVietChon]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, hinh_anh: e.target.files![0] }));
    }
  };

  const handleTrangThaiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      trang_thai: e.target.value as "hien" | "an",
    }));
  };

  const handleXetDuyetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      xet_duyet: e.target.value as "chờ duyệt" | "đã duyệt" | "không duyệt",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!baiVietChon) return;

    const formDataToSend = new FormData();
    formDataToSend.append("tieu_de", formData.tieu_de);
    formDataToSend.append("noi_dung", formData.noi_dung || "");
    formDataToSend.append("trang_thai", formData.trang_thai);
    formDataToSend.append("xet_duyet", formData.xet_duyet);
    if (formData.hinh_anh) {
      formDataToSend.append("hinh_anh", formData.hinh_anh);
    }

    console.log("Sending form:", {
      ...formData,
      hinh_anh: formData.hinh_anh?.name || null,
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/cap-nhat-bai-viet/${baiVietChon.bai_viet_id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Bài viết đã được cập nhật thành công!");
        window.location.reload();
      } else {
        alert("Đã xảy ra lỗi khi cập nhật bài viết.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      alert("Đã xảy ra lỗi khi cập nhật bài viết.");
    }
  };

  return (
    <div className="details">
      <div className="recentOrders">
        <div className="cardHeader">
          <h2>Cập nhật bài viết</h2>
        </div>

        <form className="add-user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tieu_de">Tiêu đề:</label>
            <input
              type="text"
              id="tieu_de"
              name="tieu_de"
              value={formData.tieu_de}
              onChange={handleInputChange}
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="noi_dung">Nội dung:</label>
            <textarea
              id="noi_dung"
              name="noi_dung"
              value={formData.noi_dung}
              onChange={handleInputChange}
              placeholder="Nhập nội dung bài viết"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hinh_anh">Hình ảnh:</label>
            <input
              type="file"
              id="hinh_anh"
              name="hinh_anh"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="trang_thai">Trạng thái hiển thị:</label>
            <select
              id="trang_thai"
              name="trang_thai"
              value={formData.trang_thai}
              onChange={handleTrangThaiChange}
            >
              <option value="hien">Hiện</option>
              <option value="an">Ẩn</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="xet_duyet">Trạng thái duyệt:</label>
            <select
              id="xet_duyet"
              name="xet_duyet"
              value={formData.xet_duyet}
              onChange={handleXetDuyetChange}
            >
              <option value="chờ duyệt">Chờ duyệt</option>
              <option value="đã duyệt">Đã duyệt</option>
              <option value="không duyệt">Không duyệt</option>
            </select>
          </div>

          <button type="submit" className="btn">
            Cập nhật bài viết
          </button>
        </form>
      </div>
    </div>
  );
};

export default BaiVietUpdate;
