import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import BlogDetail from '../phanchinh/BlogDetail';


const Blog2: React.FC = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <>
                {/* Detail Start */}
                <div className="container py-5"style={{marginTop: "225px",}}>
                    <div className="row pt-5">
                        <BlogDetail/>
                        <div className="col-lg-4 mt-5 mt-lg-0">
                            <div className="mb-5">
                                <form action="">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Keyword"
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text bg-transparent text-primary">
                                                <i className="fa fa-search" />
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="mb-5">
                                <h3 className="mb-4">Categories</h3>
                                <ul className="list-group">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Web Design
                                        <span className="badge badge-primary badge-pill">150</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Web Development
                                        <span className="badge badge-primary badge-pill">131</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Online Marketing
                                        <span className="badge badge-primary badge-pill">78</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Keyword Research
                                        <span className="badge badge-primary badge-pill">56</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        Email Marketing
                                        <span className="badge badge-primary badge-pill">98</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-5">
                                <img src="img/blog-1.jpg" alt="" className="img-fluid" />
                            </div>
                            <div className="mb-5">
                                <h3 className="mb-4">Recent Post</h3>
                                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                                    <img
                                        className="img-fluid"
                                        src="img/blog-1.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <div className="d-flex flex-column pl-3">
                                        <a className="text-dark mb-2" href="">
                                            Lorem ipsum dolor sit amet consec adipis elit
                                        </a>
                                        <div className="d-flex">
                                            <small className="mr-3">
                                                <i className="fa fa-user text-muted" /> Admin
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-folder text-muted" /> Web Design
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-comments text-muted" /> 15
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                                    <img
                                        className="img-fluid"
                                        src="img/blog-2.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <div className="d-flex flex-column pl-3">
                                        <a className="text-dark mb-2" href="">
                                            Lorem ipsum dolor sit amet consec adipis elit
                                        </a>
                                        <div className="d-flex">
                                            <small className="mr-3">
                                                <i className="fa fa-user text-muted" /> Admin
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-folder text-muted" /> Web Design
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-comments text-muted" /> 15
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                                    <img
                                        className="img-fluid"
                                        src="img/blog-3.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <div className="d-flex flex-column pl-3">
                                        <a className="text-dark mb-2" href="">
                                            Lorem ipsum dolor sit amet consec adipis elit
                                        </a>
                                        <div className="d-flex">
                                            <small className="mr-3">
                                                <i className="fa fa-user text-muted" /> Admin
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-folder text-muted" /> Web Design
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-comments text-muted" /> 15
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                                    <img
                                        className="img-fluid"
                                        src="img/blog-1.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <div className="d-flex flex-column pl-3">
                                        <a className="text-dark mb-2" href="">
                                            Lorem ipsum dolor sit amet consec adipis elit
                                        </a>
                                        <div className="d-flex">
                                            <small className="mr-3">
                                                <i className="fa fa-user text-muted" /> Admin
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-folder text-muted" /> Web Design
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-comments text-muted" /> 15
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                                    <img
                                        className="img-fluid"
                                        src="img/blog-2.jpg"
                                        style={{ width: 80, height: 80 }}
                                        alt=""
                                    />
                                    <div className="d-flex flex-column pl-3">
                                        <a className="text-dark mb-2" href="">
                                            Lorem ipsum dolor sit amet consec adipis elit
                                        </a>
                                        <div className="d-flex">
                                            <small className="mr-3">
                                                <i className="fa fa-user text-muted" /> Admin
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-folder text-muted" /> Web Design
                                            </small>
                                            <small className="mr-3">
                                                <i className="fa fa-comments text-muted" /> 15
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <img src="img/blog-2.jpg" alt="" className="img-fluid" />
                            </div>
                            <div className="mb-5">
                                <h3 className="mb-4">Tag Cloud</h3>
                                <div className="d-flex flex-wrap m-n1">
                                    <a href="" className="btn btn-outline-primary m-1">
                                        Design
                                    </a>
                                    <a href="" className="btn btn-outline-primary m-1">
                                        Development
                                    </a>
                                    <a href="" className="btn btn-outline-primary m-1">
                                        Marketing
                                    </a>
                                    <a href="" className="btn btn-outline-primary m-1">
                                        SEO
                                    </a>
                                    <a href="" className="btn btn-outline-primary m-1">
                                        Writing
                                    </a>
                                    <a href="" className="btn btn-outline-primary m-1">
                                        Consulting
                                    </a>
                                </div>
                            </div>
                            <div className="mb-5">
                                <img src="img/blog-3.jpg" alt="" className="img-fluid" />
                            </div>
                            <div>
                                <h3 className="mb-4">Plain Text</h3>
                                Aliquyam sed lorem stet diam dolor sed ut sit. Ut sanctus erat ea est
                                aliquyam dolor et. Et no consetetur eos labore ea erat voluptua et. Et
                                aliquyam dolore sed erat. Magna sanctus sed eos tempor rebum dolor,
                                tempor takimata clita sit et elitr ut eirmod.
                            </div>
                        </div>
                    </div>
                </div>
                {/* Detail End */}
                {/* Footer Start */}
                <div className="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
                    <div className="row pt-5">
                        <div className="col-lg-4 col-md-12 mb-5">
                            <h1 className="mb-3 display-5 text-capitalize text-white">
                                <span className="text-primary">Pet</span>Lover
                            </h1>
                            <p className="m-0">
                                Ipsum amet sed vero et lorem stet eos ut, labore sed sed stet sea est
                                ipsum ut. Volup amet ea sanct ipsum, dolore vero lorem no duo eirmod.
                                Eirmod amet ipsum no ipsum lorem clita ut. Ut sed sit lorem ea lorem
                                sed, amet stet sit sea ea diam tempor kasd kasd. Diam nonumy etsit
                                tempor ut sed diam sed et ea
                            </p>
                        </div>
                        <div className="col-lg-8 col-md-12">
                            <div className="row">
                                <div className="col-md-4 mb-5">
                                    <h5 className="text-primary mb-4">Get In Touch</h5>
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
                                    <h5 className="text-primary mb-4">Popular Links</h5>
                                    <div className="d-flex flex-column justify-content-start">
                                        <a className="text-white mb-2" href="#">
                                            <i className="fa fa-angle-right mr-2" />
                                            Home
                                        </a>
                                        <a className="text-white mb-2" href="#">
                                            <i className="fa fa-angle-right mr-2" />
                                            About Us
                                        </a>
                                        <a className="text-white mb-2" href="#">
                                            <i className="fa fa-angle-right mr-2" />
                                            Our Services
                                        </a>
                                        <a className="text-white mb-2" href="#">
                                            <i className="fa fa-angle-right mr-2" />
                                            Our Team
                                        </a>
                                        <a className="text-white" href="#">
                                            <i className="fa fa-angle-right mr-2" />
                                            Contact Us
                                        </a>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5">
                                    <h5 className="text-primary mb-4">Newsletter</h5>
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
                                                Submit Now
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
                    style={{ background: "#111111" }}
                >
                    <div className="row">
                        <div className="col-md-6 text-center text-md-left mb-3 mb-md-0">
                            <p className="m-0 text-white">
                                ©{" "}
                                <a className="text-white font-weight-bold" href="#">
                                    Your Site Name
                                </a>
                                . All Rights Reserved. Designed by
                                <a
                                    className="text-white font-weight-bold"
                                    href="https://htmlcodex.com"
                                >
                                    HTML Codex
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

export default Blog2;