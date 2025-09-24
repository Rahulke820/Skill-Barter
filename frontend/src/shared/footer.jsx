// src/components/Footer.jsx
import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-wrapper text-white position-relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="floating-shapes">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <Container className="pt-5 pb-4 position-relative">
        <Row className="gy-4">
          {/* About Section */}
          <Col md={4}>
            <div className="glass-card p-3 rounded-4 h-100">
              <h4 className="fw-bold">Skill Barter</h4>
              <p style={{ fontSize: "15px", lineHeight: "1.7" }}>
                A creative hub where skills are currency. Connect, learn, and
                grow with a global community of innovators and creators.
              </p>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={4}>
            <div className="glass-card p-3 rounded-4 h-100 text-center">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="footer-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/skills" className="footer-link">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="/contact" className="footer-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </Col>

          {/* Newsletter */}
          <Col md={4}>
            <div className="glass-card p-3 rounded-4 h-100 text-center">
              <h5 className="fw-bold mb-3">Stay Updated</h5>
              <Form className="d-flex flex-column align-items-center gap-2">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="shadow-sm"
                  style={{
                    borderRadius: "25px",
                    maxWidth: "250px",
                    border: "none",
                  }}
                />
                <Button
                  type="submit"
                  className="subscribe-btn"
                  style={{
                    borderRadius: "25px",
                    fontWeight: "600",
                  }}
                >
                  Subscribe
                </Button>
              </Form>
            </div>
          </Col>
        </Row>

        {/* Social Icons */}
        <section className="mt-5 d-flex justify-content-center gap-4 flex-wrap">
          <Button variant="light" className="social-btn" href="#!" aria-label="Facebook">
            <FaFacebookF />
          </Button>
          <Button variant="light" className="social-btn" href="#!" aria-label="Twitter">
            <FaTwitter />
          </Button>
          <Button variant="light" className="social-btn" href="#!" aria-label="Instagram">
            <FaInstagram />
          </Button>
          <Button variant="light" className="social-btn" href="#!" aria-label="LinkedIn">
            <FaLinkedin />
          </Button>
        </section>
      </Container>

      {/* Copyright */}
      <div className="footer-bottom text-center p-3">
        © {new Date().getFullYear()} <strong>Skill Barter</strong> — All Rights Reserved
      </div>

      {/* Styles */}
      <style>{`
        /* Background Animation */
        .footer-wrapper {
          background : url(https://w.wallhaven.cc/full/ne/wallhaven-neojdw.jpg) ;
          // background-size: 300% 300%;
          // animation: gradientShift 12s ease infinite;
          // border-top-left-radius: 30px;
          // border-top-right-radius: 30px;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        // /* Floating Shapes */
        // .floating-shapes span {
        //   position: absolute;
        //   width: 60px;
        //   height: 60px;
        //   background: rgba(255, 255, 255, 0.1);
        //   border-radius: 50%;
        //   animation: floatAnim 8s linear infinite;
        // }
        // .floating-shapes span:nth-child(1) {
        //   top: 20%; left: 10%; animation-delay: 0s;
        // }
        // .floating-shapes span:nth-child(2) {
        //   bottom: 15%; right: 20%; animation-delay: 3s;
        // }
        // .floating-shapes span:nth-child(3) {
        //   top: 40%; right: 10%; animation-delay: 6s;
        // }
        @keyframes floatAnim {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }

        /* Glassmorphism Cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }

        /* Links */
        .footer-link {
          color: #fff;
          text-decoration: none;
          display: block;
          margin: 6px 0;
          transition: color 0.3s ease, transform 0.2s ease;
        }
        .footer-link:hover {
          color: #ffeb3b;
          transform: translateX(5px);
        }

        /* Social Buttons */
        .social-btn {
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: #6f42c1 !important;
          background-color: #fff !important;
          border-radius: 50%;
          box-shadow: 0 6px 15px rgba(0,0,0,0.25);
          transition: all 0.4s ease;
        }
        .social-btn:hover {
          transform: rotate(20deg) scale(1.2);
          box-shadow: 0 12px 25px rgba(0,0,0,0.4);
          background: linear-gradient(135deg, #08050fff, #ff7eb3) !important;
          color: #fff !important;
        }

        /* Subscribe Button */
        .subscribe-btn {
          background: linear-gradient(135deg, #0f070aff, #f3eee7ff);
          border: none;
          color: #fff;
          transition: all 0.3s ease;
        }
        .subscribe-btn:hover {
          background: linear-gradient(135deg, #070509ff, #ece0e5ff);
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        /* Bottom Bar */
        .footer-bottom {
          background-color: rgba(255, 255, 255, 0.1);
          font-size: 14px;
          font-weight: 500;
          margin-top: 30px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
