import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';


const Contact: React.FC = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <>
                {/* Contact Start */}
                <div className="container-fluid pt-5">
                    <div className="d-flex flex-column text-center mb-5 pt-5">
                        <h4 className="text-secondary mb-3">Contact Us</h4>
                        <h1 className="display-4 m-0">
                            Contact For <span className="text-primary">Any Query</span>
                        </h1>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8 mb-5">
                            <div className="contact-form">
                                <div id="success" />
                                <form name="sentMessage" id="contactForm" noValidate>
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control p-4"
                                            id="name"
                                            placeholder="Your Name"
                                            required
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="email"
                                            className="form-control p-4"
                                            id="email"
                                            placeholder="Your Email"
                                            required
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control p-4"
                                            id="subject"
                                            placeholder="Subject"
                                            required
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <textarea
                                            className="form-control p-4"
                                            rows={6}
                                            id="message"
                                            placeholder="Message"
                                            required
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary py-3 px-5"
                                            type="submit"
                                            id="sendMessageButton"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 mb-n2 p-0">
                            <iframe
                                style={{ width: "100%", height: 500, border: 0 }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59729.55352929679!2d106.02228897932214!3d20.665628419016894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135c12ae1ec71a3%3A0x4d32999e6a9bb398!2zVHAuIEjGsG5nIFnDqm4sIEjGsG5nIFnDqm4sIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1731547267075!5m2!1svi!2s"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="col-12 mb-n2 p-0">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59587.95149175388!2d105.76447294688771!3d21.0228019733831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1731547601970!5m2!1svi!2s"
                                style={{ width: "100%", height: 450, border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>


                    </div>
                </div>
                {/* Contact End */}
                {/* Footer Start */}
                <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-md-5">
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

export default Contact;