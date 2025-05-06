import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../TaiKhoan/style/dichvu.module.css";

const TimDichVu: React.FC = () => {
  const [tuKhoa, setTuKhoa] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (tuKhoa.trim()) {
      navigate(`/DichVu?ten=${encodeURIComponent(tuKhoa)}`);
    }
  };

  return (
    <section className={styles.TimDichVu}>
      <div className={styles.container}>
        <div className={styles.TimDichVuContent}>
          <h1>Dịch vụ chăm sóc thú cưng</h1>
          <p>
            Khám phá các dịch vụ chăm sóc thú cưng chất lượng cao từ các nhà
            cung cấp uy tín
          </p>
          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ..."
                value={tuKhoa}
                onChange={(e) => setTuKhoa(e.target.value)}
              />
              <button className={styles.searchBtn} onClick={handleSearch}>
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimDichVu;
