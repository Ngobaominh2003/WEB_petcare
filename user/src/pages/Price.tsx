import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import DatLich from "../phanchinh/DatLich";
import Footer from "../components/Footer";

const About: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <>
        <div className="container-fluid bg-light pt-5 pb-4">
          <div className="container py-5">
            <div className="d-flex flex-column text-center mb-5">
              <h4 className="text-secondary mb-3">Bảng Giá</h4>
              <h1 className="display-4 m-0">
                Chọn Lựa <span className="text-primary">Gói Phù Hợp Nhất</span>
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
                          / Mo
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="card-body text-center p-0">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Feeding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Boarding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-times text-danger mr-2"></i>Spa &
                        Grooming
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-times text-danger mr-2"></i>
                        Veterinary Medicine
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer border-0 p-0">
                    <a
                      href=""
                      className="btn btn-primary btn-block p-3"
                      style={{ borderRadius: 0 }}
                    >
                      Signup Now
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
                          / Mo
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="card-body text-center p-0">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Feeding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Boarding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>Spa &
                        Grooming
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-times text-danger mr-2"></i>
                        Veterinary Medicine
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer border-0 p-0">
                    <a
                      href=""
                      className="btn btn-secondary btn-block p-3"
                      style={{ borderRadius: 0 }}
                    >
                      Signup Now
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
                          / Mo
                        </small>
                      </h1>
                    </div>
                  </div>
                  <div className="card-body text-center p-0">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Feeding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Boarding
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>Spa &
                        Grooming
                      </li>
                      <li className="list-group-item p-2">
                        <i className="fa fa-check text-secondary mr-2"></i>
                        Veterinary Medicine
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer border-0 p-0">
                    <a
                      href=""
                      className="btn btn-primary btn-block p-3"
                      style={{ borderRadius: 0 }}
                    >
                      Signup Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
        {/* Footer Start */}
        <Footer />
        {/* Footer End */}
        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary back-to-top">
          <i className="fa fa-angle-double-up" />
        </a>
        {/* JavaScript Libraries */}
        {/* Contact Javascript File */}
        {/* Template Javascript */}
      </>
    </div>
  );
};

export default About;
