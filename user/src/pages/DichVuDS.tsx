import type React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DichVu from "../phanchinh/DichVu";
import styles from "../TaiKhoan/style/dichvu.module.css";

const DSDichVu: React.FC = () => {
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
                    id="service-search"
                  />
                  <button className={styles.searchBtn}>
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
                    <div className={styles.filterOptions}>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="category-grooming"
                          name="category"
                          defaultValue="grooming"
                        />
                        <span>Làm đẹp</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="category-spa"
                          name="category"
                          defaultValue="spa"
                        />
                        <span>Spa</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="category-health"
                          name="category"
                          defaultValue="health"
                        />
                        <span>Sức khỏe</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="category-training"
                          name="category"
                          defaultValue="training"
                        />
                        <span>Huấn luyện</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="category-boarding"
                          name="category"
                          defaultValue="boarding"
                        />
                        <span>Trông giữ</span>
                      </label>
                    </div>
                  </div>
                  <div className={styles.filterGroup}>
                    <h4>Loại thú cưng</h4>
                    <div className={styles.filterOptions}>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="pet-dog"
                          name="pet"
                          defaultValue="dog"
                        />
                        <span>Chó</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="pet-cat"
                          name="pet"
                          defaultValue="cat"
                        />
                        <span>Mèo</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="pet-bird"
                          name="pet"
                          defaultValue="bird"
                        />
                        <span>Chim</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="pet-small"
                          name="pet"
                          defaultValue="small"
                        />
                        <span>Thú nhỏ</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="pet-reptile"
                          name="pet"
                          defaultValue="reptile"
                        />
                        <span>Bò sát</span>
                      </label>
                      <label className={styles.filterOption}>
                        <input
                          type="checkbox"
                          id="pet-fish"
                          name="pet"
                          defaultValue="fish"
                        />
                        <span>Cá</span>
                      </label>
                    </div>
                  </div>
                  <div className={styles.filterGroup}>
                    <h4>Khoảng giá</h4>
                    <div className={styles.priceRange}>
                      <div className={styles.priceInputs}>
                        <input
                          type="number"
                          id="price-min"
                          placeholder="Tối thiểu"
                        />
                        <span>-</span>
                        <input
                          type="number"
                          id="price-max"
                          placeholder="Tối đa"
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
                          defaultValue={5}
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
                          defaultValue={4}
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
                          defaultValue={3}
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
                    <select id="sort-by">
                      <option value="popular">Phổ biến nhất</option>
                      <option value="rating">Đánh giá cao nhất</option>
                      <option value="price-low">Giá: Thấp đến cao</option>
                      <option value="price-high">Giá: Cao đến thấp</option>
                      <option value="newest">Mới nhất</option>
                    </select>
                  </div>
                </div>
                <DichVu />
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
