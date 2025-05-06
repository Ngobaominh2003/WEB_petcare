// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Foorter from "../components/Footer";
import DatLich from "../phanchinh/DatLich";
import DSBlog from "../phanchinh/DSBlog";
import DSDichVu from "../phanchinh/DichVu";

interface ServiceType {
  dich_vu_id: number;
  ten_dich_vu: string;
  mo_ta: string;
  logo: string;
}
const HomePage: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/dich-vu/dieu-kien");
        if (!response.ok) {
          throw new Error("Failed to fetch services data");
        }
        const data = await response.json();
        setServices(data.slice(0, 6)); // Display only the first six services
      } catch (error) {
        setError("Error loading services. Please try again later.");
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <main >
        <div className="container-fluid p-0">
          <div
            id="header-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="w-100"
                  src="/img/carousel-1.jpg"
                  alt="First Slide"
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h3 className="text-white mb-3 d-none d-sm-block">
                      Dịch vụ thú cưng tốt nhất
                    </h3>
                    <h1 className="display-3 text-white mb-3">
                      Giữ thú cưng của bạn vui vẻ
                    </h1>
                    <h5 className="text-white mb-3 d-none d-sm-block">
                      Chúng tôi cam kết mang đến những trải nghiệm chăm sóc tốt
                      nhất, nơi mỗi thú cưng đều được chăm sóc tận tình và chu
                      đáo.
                    </h5>
                    <a
                      href=""
                      className="btn btn-lg btn-primary mt-3 mt-md-4 px-4"
                    >
                      Đặt Ngay
                    </a>
                    <a
                      href=""
                      className="btn btn-lg btn-secondary mt-3 mt-md-4 px-4"
                    >
                      Tìm Hiểu Thêm
                    </a>
                  </div>
                </div>
              </div>

              <div className="carousel-item">
                <img
                  className="w-100"
                  src="/img/carousel-2.jpg"
                  alt="Second Slide"
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h3 className="text-white mb-3 d-none d-sm-block">
                      Dịch vụ thú cưng tốt nhất
                    </h3>
                    <h1 className="display-3 text-white mb-3">
                      Spa & Chăm sóc thú cưng
                    </h1>
                    <h5 className="text-white mb-3 d-none d-sm-block">
                      Chúng tôi cam kết mang đến những trải nghiệm chăm sóc tốt
                      nhất, nơi mỗi thú cưng đều được chăm sóc tận tình và chu
                      đáo.
                    </h5>
                    <a
                      href=""
                      className="btn btn-lg btn-primary mt-3 mt-md-4 px-4"
                    >
                      Đặt Ngay
                    </a>
                    <a
                      href=""
                      className="btn btn-lg btn-secondary mt-3 mt-md-4 px-4"
                    >
                      Tìm Hiểu Thêm
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              className="carousel-control-prev"
              href="#header-carousel"
              data-slide="prev"
            >
              <div
                className="btn btn-primary rounded"
                style={{ width: "45px", height: "45px" }}
              >
                <span className="carousel-control-prev-icon mb-n2"></span>
              </div>
            </a>

            <a
              className="carousel-control-next"
              href="#header-carousel"
              data-slide="next"
            >
              <div
                className="btn btn-primary rounded"
                style={{ width: "45px", height: "45px" }}
              >
                <span className="carousel-control-next-icon mb-n2"></span>
              </div>
            </a>
          </div>
        </div>

        {/* Booking Start */}
        <div className="container-fluid bg-light">
          <div className="container">
            <div className="row align-items-center">
              {/* Phần Form */}
              <DatLich />

              {/* Phần Thông Tin Dịch Vụ */}
              <div className="col-lg-7 service-info-section py-5 py-lg-0 px-3 px-lg-5">
                <h4 className="text-secondary mb-3">
                  Bạn đang đi nghỉ phải không?
                </h4>
                <h1 className="display-4 mb-4">
                  Sách Cho <span className="text-primary">Thú Cưng</span>
                </h1>
                <p>
                  Nhưng với sự chăm chỉ, tôi sẽ mang chúng đến cho bạn. Dù phải
                  đối mặt với nỗi đau thực sự, tôi vẫn sẽ vượt qua và không ngần
                  ngại khiển trách anh ta.
                </p>
                <div className="row py-2">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-house font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">Gửi thú cưng</h5>
                      </div>
                      <p className="m-0 text-justify">
                        Chúng tôi chăm sóc thú cưng của bạn với tình yêu và sự
                        chu đáo, đảm bảo chúng luôn vui vẻ và thoải mái trong
                        quá trình vận chuyển.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-food font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">Cho thú cưng ăn</h5>
                      </div>
                      <p className="m-0 text-justify">
                        Chúng tôi đảm bảo thú cưng của bạn được ăn uống đầy đủ
                        với chế độ dinh dưỡng khoa học và cân đối.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-grooming font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">Chăm sóc thú cưng</h5>
                      </div>
                      <p className="m-0 text-justify">
                        Chúng tôi chăm sóc thú cưng của bạn mỗi ngày, đảm bảo
                        chúng luôn vui vẻ, thoải mái và khỏe mạnh.
                      </p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <h1 className="flaticon-toy font-weight-normal text-secondary m-0 mr-3"></h1>
                        <h5 className="text-truncate m-0">
                          Huấn luyện thú cưng
                        </h5>
                      </div>
                      <p className="m-0 text-justify">
                        Chúng tôi cung cấp dịch vụ huấn luyện thú cưng chuyên
                        nghiệp, giúp chúng học được những kỹ năng cần thiết.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Booking End */}
        <>
          {/* About Start */}
          <div className="container py-5">
            <div className="row py-5">
              <div className="col-lg-7 pb-5 pb-lg-0 px-3 px-lg-5">
                <h4 className="text-secondary mb-3">Về Chúng Tôi</h4>
                <h1 className="display-4 mb-4">
                  <span className="text-primary">Lưu Trú</span> &amp;{" "}
                  <span className="text-secondary">Chăm Sóc Ban Ngày</span>
                </h1>
                <h5 className="text-muted mb-3">
                  Luôn đồng hành và tận tâm. Sẵn sàng đáp ứng mọi nhu cầu. Dịch
                  vụ tốt nhất cho thú cưng của bạn.
                </h5>
                <p className="mb-4">
                  Chúng tôi cam kết mang đến cho thú cưng của bạn sự thoải mái
                  và vui vẻ nhất. Dịch vụ của chúng tôi luôn an toàn, chu đáo và
                  chuyên nghiệp. Chúng tôi hiểu rằng thú cưng là một thành viên
                  trong gia đình của bạn.
                </p>
                <ul className="list-inline">
                  <li>
                    <h5>
                      <i className="fa fa-check-double text-secondary mr-3" />
                      Tốt Nhất Trong Ngành
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <i className="fa fa-check-double text-secondary mr-3" />
                      Dịch Vụ Khẩn Cấp
                    </h5>
                  </li>
                  <li>
                    <h5>
                      <i className="fa fa-check-double text-secondary mr-3" />
                      Hỗ Trợ Khách Hàng 24/7
                    </h5>
                  </li>
                </ul>
                <a href="" className="btn btn-lg btn-primary mt-3 px-4">
                  Tìm Hiểu Thêm
                </a>
              </div>
              <div className="col-lg-5">
                <div className="row px-3">
                  <div className="col-12 p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/about-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-6 p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/about-2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="col-6 p-0">
                    <img
                      className="img-fluid w-100"
                      src="img/about-3.jpg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About End */}
          {/* Services Start */}
         
          {/* Services End */}
          {/* Features Start */}
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <img className="img-fluid w-100" src="img/feature.jpg" alt="" />
              </div>
              <div className="col-lg-7 py-5 py-lg-0 px-3 px-lg-5">
                <h4 className="text-secondary mb-3">Tại sao chọn chúng tôi?</h4>
                <h1 className="display-4 mb-4">
                  <span className="text-primary">Chăm Sóc Đặc Biệt</span> Cho
                  Thú Cưng
                </h1>
                <p className="m-0 text-justify">
                  Chúng tôi cung cấp dịch vụ chăm sóc đặc biệt dành riêng cho
                  thú cưng của bạn. Với đội ngũ nhân viên tận tâm và giàu kinh
                  nghiệm, chúng tôi cam kết mang đến chế độ chăm sóc cá nhân
                  hóa, từ dinh dưỡng đến vệ sinh. Mỗi thú cưng đều được quan tâm
                  và yêu thương, đảm bảo chúng luôn khỏe mạnh và hạnh phúc trong
                  môi trường thân thiện và an toàn.
                </p>
                <div className="row py-2">
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-4">
                      <h1 className="flaticon-cat font-weight-normal text-secondary m-0 mr-3" />
                      <h5 className="text-truncate m-0">
                        Tốt Nhất Trong Ngành
                      </h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center mb-4">
                      <h1 className="flaticon-doctor font-weight-normal text-secondary m-0 mr-3" />
                      <h5 className="text-truncate m-0">Dịch Vụ Khẩn Câp</h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <h1 className="flaticon-care font-weight-normal text-secondary m-0 mr-3" />
                      <h5 className="text-truncate m-0">Chăm Sóc Đặc Biệt</h5>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <h1 className="flaticon-dog font-weight-normal text-secondary m-0 mr-3" />
                      <h5 className="text-truncate m-0">Hỗ Trợ Khách Hàng</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Features End */}
          {/* Pricing Plan Start */}
          <div className="container-fluid bg-light pt-5 pb-4">
            <div className="container py-5">
              <div className="d-flex flex-column text-center mb-5">
                <h4 className="text-secondary mb-3">Kế Hoạch Giá Cả</h4>
                <h1 className="display-4 m-0">
                  Chọn Giá <span className="text-primary">Tốt Nhất</span>
                </h1>
              </div>
              <div className="row">
                {/* Basic Plan */}
                <div className="col-lg-4 mb-4">
                  <div className="card border-0">
                    <div className="card-header position-relative border-0 p-0 mb-4">
                      <img
                        className="card-img-top"
                        src="img/price-1.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"
                        style={{
                          top: 0,
                          left: 0,
                          zIndex: 1,
                          background: "rgba(0, 0, 0, .5)",
                        }}
                      >
                        <h3 className="text-primary mb-3">Basic</h3>
                        <h1 className="display-4 text-white mb-0">
                          <small
                            className="align-top"
                            style={{ fontSize: "22px", lineHeight: "45px" }}
                          >
                            $
                          </small>
                          49
                          <small
                            className="align-bottom"
                            style={{ fontSize: "16px", lineHeight: "40px" }}
                          >
                            / Tháng
                          </small>
                        </h1>
                      </div>
                    </div>
                    <div className="card-body text-center p-0">
                      <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Cho
                          Ăn
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Nội
                          Trú
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-times text-danger mr-2"></i>Spa &
                          Chăm Sóc
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-times text-danger mr-2"></i>Y Tế
                          Thú Y
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer border-0 p-0">
                      <a
                        href=""
                        className="btn btn-primary btn-block p-3"
                        style={{ borderRadius: 0 }}
                      >
                        Đăng ký ngay
                      </a>
                    </div>
                  </div>
                </div>
                {/* Standard Plan */}
                <div className="col-lg-4 mb-4">
                  <div className="card border-0">
                    <div className="card-header position-relative border-0 p-0 mb-4">
                      <img
                        className="card-img-top"
                        src="img/price-2.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"
                        style={{
                          top: 0,
                          left: 0,
                          zIndex: 1,
                          background: "rgba(0, 0, 0, .5)",
                        }}
                      >
                        <h3 className="text-secondary mb-3">Standard</h3>
                        <h1 className="display-4 text-white mb-0">
                          <small
                            className="align-top"
                            style={{ fontSize: "22px", lineHeight: "45px" }}
                          >
                            $
                          </small>
                          99
                          <small
                            className="align-bottom"
                            style={{ fontSize: "16px", lineHeight: "40px" }}
                          >
                            / Tháng
                          </small>
                        </h1>
                      </div>
                    </div>
                    <div className="card-body text-center p-0">
                      <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Cho
                          ăn
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Nội
                          Trú
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Spa
                          & Chăm Sóc
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-times text-danger mr-2"></i>Y Tế
                          Thú Y
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer border-0 p-0">
                      <a
                        href=""
                        className="btn btn-secondary btn-block p-3"
                        style={{ borderRadius: 0 }}
                      >
                        Đăng Ký Ngay
                      </a>
                    </div>
                  </div>
                </div>
                {/* Premium Plan */}
                <div className="col-lg-4 mb-4">
                  <div className="card border-0">
                    <div className="card-header position-relative border-0 p-0 mb-4">
                      <img
                        className="card-img-top"
                        src="img/price-3.jpg"
                        alt=""
                      />
                      <div
                        className="position-absolute d-flex flex-column align-items-center justify-content-center w-100 h-100"
                        style={{
                          top: 0,
                          left: 0,
                          zIndex: 1,
                          background: "rgba(0, 0, 0, .5)",
                        }}
                      >
                        <h3 className="text-primary mb-3">Premium</h3>
                        <h1 className="display-4 text-white mb-0">
                          <small
                            className="align-top"
                            style={{ fontSize: "22px", lineHeight: "45px" }}
                          >
                            $
                          </small>
                          149
                          <small
                            className="align-bottom"
                            style={{ fontSize: "16px", lineHeight: "40px" }}
                          >
                            / Tháng
                          </small>
                        </h1>
                      </div>
                    </div>
                    <div className="card-body text-center p-0">
                      <ul className="list-group list-group-flush mb-4">
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Cho
                          ăn
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Nội
                          Trú
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Spa
                          & Chăm Sóc
                        </li>
                        <li className="list-group-item p-2">
                          <i className="fa fa-check text-secondary mr-2"></i>Y
                          Tế Thú Y
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer border-0 p-0">
                      <a
                        href=""
                        className="btn btn-primary btn-block p-3"
                        style={{ borderRadius: 0 }}
                      >
                        Đăng Ký Ngay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pricing Plan End */}
          {/* Team Start */}
          <div className="container mt-5 pt-5 pb-3">
            <div className="d-flex flex-column text-center mb-5">
              <h4 className="text-secondary mb-3">Thành viên nhóm</h4>
              <h1 className="display-4 m-0">
                Gặp Gỡ <span className="text-primary">Thành viên nhóm</span>
              </h1>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="team card position-relative overflow-hidden border-0 mb-4">
                  <img className="card-img-top" src="img/team-1.jpg" alt="" />
                  <div className="card-body text-center p-0">
                    <div className="team-text d-flex flex-column justify-content-center bg-light">
                      <h5>Thángllie Ross</h5>
                      <i>Founder &amp; CEO</i>
                    </div>
                    <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="team card position-relative overflow-hidden border-0 mb-4">
                  <img className="card-img-top" src="img/team-2.jpg" alt="" />
                  <div className="card-body text-center p-0">
                    <div className="team-text d-flex flex-column justify-content-center bg-light">
                      <h5>Jennifer Page</h5>
                      <i>Chef Executive</i>
                    </div>
                    <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="team card position-relative overflow-hidden border-0 mb-4">
                  <img className="card-img-top" src="img/team-3.jpg" alt="" />
                  <div className="card-body text-center p-0">
                    <div className="team-text d-flex flex-column justify-content-center bg-light">
                      <h5>Kate Glover</h5>
                      <i>Doctor</i>
                    </div>
                    <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="team card position-relative overflow-hidden border-0 mb-4">
                  <img className="card-img-top" src="img/team-4.jpg" alt="" />
                  <div className="card-body text-center p-0">
                    <div className="team-text d-flex flex-column justify-content-center bg-light">
                      <h5>Lilly Fry</h5>
                      <i>Trainer</i>
                    </div>
                    <div className="team-social d-flex align-items-center justify-content-center bg-dark">
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center mr-2 px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a
                        className="btn btn-outline-primary rounded-circle text-center px-0"
                        style={{ width: 36, height: 36 }}
                        href="#"
                      >
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Team End */}
          {/* TestiThángnial Start */}
          
          {/* TestiThángnial End */}
          {/* Blog Start */}
          <DSBlog />
          {/* Blog End */}
          <Foorter />
          {/* Back to Top */}
          <a href="#" className="btn btn-lg btn-primary back-to-top">
            <i className="fa fa-angle-double-up" />
          </a>
          {/* JavaScript Libraries */}
          {/* Contact Javascript File */}
          {/* Template Javascript */}
        </>
      </main>
    </div>
  );
};

export default HomePage;
