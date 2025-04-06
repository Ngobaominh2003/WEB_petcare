import React from 'react';

const Footer: React.FC = () => {
    return (
        <>
            {/* Footer Start */}
            <div className="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
                <div className="row pt-5">
                    <div className="col-lg-4 col-md-12 mb-5">
                        <h1 className="mb-3 display-5 text-capitalize text-white">
                            <span className="text-primary">Pet</span>Lover
                        </h1>
                        <p className="m-0 text-justify">
                            Chúng tôi tự hào cung cấp dịch vụ chăm sóc thú cưng chuyên nghiệp, đảm
                            bảo thú cưng của bạn luôn vui vẻ và khỏe mạnh. Với kinh nghiệm dày dạn
                            và tình yêu thương dành cho động vật, đội ngũ của chúng tôi cam kết mang
                            đến sự chăm sóc tận tâm và an toàn. Đến với chúng tôi, bạn sẽ nhận được
                            dịch vụ chất lượng, giúp thú cưng của bạn phát triển toàn diện và hạnh
                            phúc.
                        </p>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <h5 className="text-primary mb-4">Liên Hệ</h5>
                                <p>
                                    <i className="fa fa-map-marker-alt mr-2" />
                                    123 Street, New York, USA
                                </p>
                                <p>
                                    <i className="fa fa-phone-alt mr-2" />
                                    +012 345 67890
                                </p>
                                <p>
                                    <i className="fa fa-envelope mr-2" />
                                    info@example.com
                                </p>
                                <div className="d-flex justify-content-start mt-4">
                                    <a
                                        className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                                        style={{ width: 36, height: 36 }}
                                        href="#"
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                                        style={{ width: 36, height: 36 }}
                                        href="#"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                                        style={{ width: 36, height: 36 }}
                                        href="#"
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                    <a
                                        className="btn btn-outline-light rounded-circle text-center mr-2 px-0"
                                        style={{ width: 36, height: 36 }}
                                        href="#"
                                    >
                                        <i className="fab fa-instagram" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="text-primary mb-4">Liên Kết Phổ Biến</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <a className="text-white mb-2" href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Home
                                    </a>
                                    <a className="text-white mb-2" href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Giới Thiệu Về Chúng Tôi
                                    </a>
                                    <a className="text-white mb-2" href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Dịch Vụ Của Chúng Tôi
                                    </a>
                                    <a className="text-white mb-2" href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Đội Ngũ Của Chúng Tôi
                                    </a>
                                    <a className="text-white" href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Liên Hệ Với Chúng Tôi
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="text-primary mb-4">Bản Tin</h5>
                                <form action="">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control border-0"
                                            placeholder="Your Email"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-lg btn-primary btn-block border-0"
                                            type="submit"
                                        >
                                            Nộp Ngay
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="container-fluid text-white py-4 px-sm-3 px-md-5"
                style={{ background: '#111111' }}
            >
                <div className="row">
                    <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                        <p className="m-0 text-white">
                            ©{' '}
                            <a className="text-white font-weight-bold" href="#">
                                Your Site Name
                            </a>
                            . All Rights Reserved. Designed by{' '}
                            <a
                                className="text-white font-weight-bold"
                                href="https://htmlcodex.com"
                            >
                                
                            </a>
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-right">
                        <ul className="nav d-inline-flex">
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">
                                    Privacy
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">
                                    Terms
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">
                                    FAQs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white py-0" href="#">
                                    Help
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Footer End */}
        </>
    );
};

export default Footer;
