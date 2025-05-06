import type React from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DichVu from "../../phanchinh/DichVu";
import styles from "../../TaiKhoan/style/dichvu.module.css";

import { useState, useEffect } from "react";

const DSDichVu: React.FC = () => {
  const [tuKhoa, setTuKhoa] = useState("");
  const [danhMucList, setDanhMucList] = useState([]);
  const [filters, setFilters] = useState({
    danh_muc_id: "",
    loai_thu_cung: "",
    danh_gia_tu: "",
    gia_min: "",
    gia_max: "",
    sap_xep: "",
  });
  const [dichVuList, setDichVuList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/danh-muc")
      .then((res) => res.json())
      .then((data) => setDanhMucList(data))
      .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
  }, []);

  const [searchingKey, setSearchingKey] = useState("");

  function handleSearch(): void {
    setSearchingKey(tuKhoa.trim());
  }
  const handleFilter = async () => {
    const params = new URLSearchParams();
  
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
  
    try {
      const res = await fetch(`http://localhost:5000/api/dich-vu/loc?${params.toString()}`);
      const data = await res.json();
      setDichVuList(data);
      setSearchingKey(""); // xoá từ khóa tìm kiếm nếu đang lọc
    } catch (error) {
      console.error("Lỗi lọc dịch vụ:", error);
    }
  };
  

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className={styles.servicesHero}>
          <div className={styles.container}>
            <div className={styles.servicesHeroContent}>
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

        {/* Services Section */}
        <section className={styles.servicesSection}>
          <div className={styles.container}>
            <div className={styles.servicesLayout}>
              {/* Filters Sidebar */}
              <aside className={styles.servicesSidebar}>
                <div className={styles.filterCard}>
                  <div className={styles.filterHeader}>
                    <h3>Bộ lọc</h3>
                    <button className={styles.btnClearFilter}>
                      Xóa bộ lọc
                    </button>
                  </div>
                  <div className={styles.filterGroup}>
                    <h4>Danh mục</h4>
                    {danhMucList.map((dm: any) => (
                      <label
                        className={styles.filterOption}
                        key={dm.danh_muc_id}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={dm.danh_muc_id}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              danh_muc_id: e.target.value,
                            })
                          }
                        />
                        <span>{dm.ten_danh_muc}</span>
                      </label>
                    ))}
                  </div>

                  <div className={styles.filterGroup}>
                    <h4>Khoảng giá</h4>
                    <div className={styles.priceRange}>
                      <div className={styles.priceInputs}>
                        <input
                          type="number"
                          id="price-min"
                          placeholder="Tối thiểu"
                          onChange={(e) =>
                            setFilters({ ...filters, gia_min: e.target.value })
                          }
                        />
                        <span>-</span>
                        <input
                          type="number"
                          id="price-max"
                          placeholder="Tối đa"
                          onChange={(e) =>
                            setFilters({ ...filters, gia_max: e.target.value })
                          }
                        />
                      </div>
                      <button
                        className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm} ${styles.btnApplyPrice}`}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                  <div className={styles.filterGroup}>
                    <h4>Đánh giá</h4>
                    <div className={styles.filterOptions}>
                      <label className={styles.filterOption}>
                        <input
                          type="radio"
                          id="rating-5"
                          name="rating"
                          value="5"
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              danh_gia_tu: e.target.value,
                            })
                          }
                        />
                        <div className={styles.stars}>
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="radio"
                          id="rating-4"
                          name="rating"
                          value="4"
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              danh_gia_tu: e.target.value,
                            })
                          }
                        />
                        <div className={styles.stars}>
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="far fa-star" />
                          <span>&amp; trở lên</span>
                        </div>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="radio"
                          id="rating-3"
                          name="rating"
                          value="3"
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              danh_gia_tu: e.target.value,
                            })
                          }
                        />
                        <div className={styles.stars}>
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="far fa-star" />
                          <i className="far fa-star" />
                          <span>&amp; trở lên</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className={styles.filterActions}>
                    <button
                      className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
                      onClick={handleFilter}
                    >
                      Áp dụng bộ lọc
                    </button>
                  </div>
                </div>
              </aside>
              {/* Services Content */}
              <div className={styles.servicesContent}>
                <div className={styles.servicesHeader}>
                  <div className={styles.servicesCount}>
                    <p>
                      Hiển thị <span>12</span> dịch vụ
                    </p>
                  </div>
                  <div className={styles.servicesSort}>
                    <label htmlFor="sort-by">Sắp xếp theo:</label>
                    <select
                      id="sort-by"
                      onChange={(e) =>
                        setFilters({ ...filters, sap_xep: e.target.value })
                      }
                    >
                      <option value="">Phổ biến nhất</option>
                      <option value="gia_desc">Giá: Cao đến thấp</option>
                      <option value="gia_asc">Giá: Thấp đến cao</option>
                    </select>
                  </div>
                </div>
                <DichVu data={dichVuList} tuKhoa={searchingKey} />

                <div className={styles.pagination}>
                  <button className={styles.paginationBtn} disabled>
                    <i className="fas fa-chevron-left" />
                  </button>
                  <button
                    className={`${styles.paginationBtn} ${styles.active}`}
                  >
                    1
                  </button>
                  <button className={styles.paginationBtn}>2</button>
                  <button className={styles.paginationBtn}>3</button>
                  <button className={styles.paginationBtn}>
                    <i className="fas fa-chevron-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Providers Section */}
        <section className={styles.featuredProviders}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Nhà cung cấp nổi bật</h2>
              <p>Các nhà cung cấp dịch vụ chăm sóc thú cưng hàng đầu</p>
            </div>
            <div className={styles.providersGrid}>
              {/* Provider 1 */}
              <div className={styles.providerCard}>
                <div className={styles.providerCardHeader}>
                  <img
                    src="https://placehold.co/300x150/4CAF50/ffffff?text=Happy+Pets"
                    alt="Happy Pets"
                    className={styles.providerBanner}
                  />
                  <div className={styles.providerLogo}>
                    <img
                      src="https://placehold.co/80x80/4CAF50/ffffff?text=HP"
                      alt="Happy Pets"
                    />
                  </div>
                </div>
                <div className={styles.providerCardBody}>
                  <h3>Happy Pets</h3>
                  <div className={styles.providerRating}>
                    <div className={styles.stars}>
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                    </div>
                    <span>4.5 (250 đánh giá)</span>
                  </div>
                  <p className={styles.providerDescription}>
                    Dịch vụ chăm sóc thú cưng chuyên nghiệp với hơn 5 năm kinh
                    nghiệm.
                  </p>
                  <div className={styles.providerServices}>
                    <span className={styles.providerServiceTag}>Làm đẹp</span>
                    <span className={styles.providerServiceTag}>Spa</span>
                    <span className={styles.providerServiceTag}>Sức khỏe</span>
                  </div>
                </div>
                <div className={styles.providerCardFooter}>
                  <a href="#" className={`${styles.btn} ${styles.btnOutline}`}>
                    Xem chi tiết
                  </a>
                </div>
              </div>
              {/* Provider 2 */}
              <div className={styles.providerCard}>
                <div className={styles.providerCardHeader}>
                  <img
                    src="https://placehold.co/300x150/4CAF50/ffffff?text=PetHealth"
                    alt="PetHealth"
                    className={styles.providerBanner}
                  />
                  <div className={styles.providerLogo}>
                    <img
                      src="https://placehold.co/80x80/4CAF50/ffffff?text=PH"
                      alt="PetHealth"
                    />
                  </div>
                </div>
                <div className={styles.providerCardBody}>
                  <h3>PetHealth</h3>
                  <div className={styles.providerRating}>
                    <div className={styles.stars}>
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="far fa-star" />
                    </div>
                    <span>4.8 (180 đánh giá)</span>
                  </div>
                  <p className={styles.providerDescription}>
                    Phòng khám thú y chuyên nghiệp với đội ngũ bác sĩ giàu kinh
                    nghiệm.
                  </p>
                  <div className={styles.providerServices}>
                    <span className={styles.providerServiceTag}>Sức khỏe</span>
                    <span className={styles.providerServiceTag}>Khám bệnh</span>
                    <span className={styles.providerServiceTag}>
                      Tiêm phòng
                    </span>
                  </div>
                </div>
                <div className={styles.providerCardFooter}>
                  <a href="#" className={`${styles.btn} ${styles.btnOutline}`}>
                    Xem chi tiết
                  </a>
                </div>
              </div>
              {/* Provider 3 */}
              <div className={styles.providerCard}>
                <div className={styles.providerCardHeader}>
                  <img
                    src="https://placehold.co/300x150/4CAF50/ffffff?text=PetTraining"
                    alt="PetTraining"
                    className={styles.providerBanner}
                  />
                  <div className={styles.providerLogo}>
                    <img
                      src="https://placehold.co/80x80/4CAF50/ffffff?text=PT"
                      alt="PetTraining"
                    />
                  </div>
                </div>
                <div className={styles.providerCardBody}>
                  <h3>PetTraining</h3>
                  <div className={styles.providerRating}>
                    <div className={styles.stars}>
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="far fa-star" />
                    </div>
                    <span>4.2 (120 đánh giá)</span>
                  </div>
                  <p className={styles.providerDescription}>
                    Trung tâm huấn luyện thú cưng hàng đầu với các huấn luyện
                    viên chuyên nghiệp.
                  </p>
                  <div className={styles.providerServices}>
                    <span className={styles.providerServiceTag}>
                      Huấn luyện
                    </span>
                    <span className={styles.providerServiceTag}>Hành vi</span>
                    <span className={styles.providerServiceTag}>Vâng lời</span>
                  </div>
                </div>
                <div className={styles.providerCardFooter}>
                  <a href="#" className={`${styles.btn} ${styles.btnOutline}`}>
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DSDichVu;
// Removed conflicting local useEffect function
