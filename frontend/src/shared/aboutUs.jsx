// src/components/AboutUs.jsx
import React from "react";
import CustomNavbar from "../shared/Navbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaUsers, FaHandsHelping, FaLightbulb, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  const founderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQkQUdXGCOfdBmv7bCMtVo7YME6lPIcaVGFg&s"; // Replace with your founder image

  return (
    <>
      <CustomNavbar />

      {/* Hero Section */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          minHeight: "60vh",
          background:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620') center/cover no-repeat",
          padding: "40px 20px",
        }}
      >
        <h1
          className="animate__animated animate__fadeInDown"
          style={{ fontWeight: "bold", fontSize: "3rem" }}
        >
          About <span style={{ color: "#F83002" }}>SkillBarter</span>
        </h1>
        <p
          className="mt-3 animate__animated animate__fadeInUp"
          style={{ maxWidth: "700px", fontSize: "1.2rem" }}
        >
          Redefining the way people connect, learn, and grow — one skill at a
          time.
        </p>
      </div>

      {/* About Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="p-4 shadow-lg border-0 rounded-4 animate__animated animate__fadeInUp">
              <Card.Body>
                <h2
                  style={{
                    color: "#6A38C2",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Who We Are
                </h2>
                <p className="mt-3" style={{ lineHeight: "1.7" }}>
                  At <strong>SkillBarter</strong>, we believe knowledge is most
                  powerful when it’s shared. Our platform enables people to
                  barter their skills instead of traditional transactions,
                  fostering collaboration, trust, and mutual growth. We’re a
                  community-driven hub where professionals, learners, and
                  creators unite to exchange knowledge, build networks, and
                  empower each other.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Founder Section */}
      <Container className="my-5">
        <h2
          className="text-center mb-4"
          style={{ color: "#F83002", fontWeight: "bold" }}
        >
          Meet Our Founder
        </h2>
        <Row className="justify-content-center text-center">
          <Col md={4}>
            <Card
              className="p-3 border-0 shadow-lg rounded-4 founder-card"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <Card.Img
                variant="top"
                src={founderImage}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "0 auto",
                  border: "5px solid #6A38C2",
                }}
              />
              <Card.Body>
                <h4 style={{ color: "#6A38C2", fontWeight: "bold" }}>TechVerse</h4>
                <p>
                  TechVerse is the visionary behind SkillBarter. With a passion for
                  learning and a deep belief in the power of community, he
                  founded SkillBarter to empower individuals through free skill
                  exchange and collaboration.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Mission & Vision */}
      <Container className="my-5">
        <Row className="text-center">
          <Col md={6} className="mb-4">
            <Card className="p-4 shadow border-0 rounded-4 h-100">
              <FaRocket size={40} color="#F83002" />
              <h4 className="mt-3" style={{ color: "#F83002" }}>
                Our Mission
              </h4>
              <p>
                To create a global community where knowledge flows freely,
                bridging the gap between skill seekers and providers for mutual
                success.
              </p>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="p-4 shadow border-0 rounded-4 h-100">
              <FaLightbulb size={40} color="#6A38C2" />
              <h4 className="mt-3" style={{ color: "#6A38C2" }}>
                Our Vision
              </h4>
              <p>
                To redefine learning by making skill-sharing the foundation of
                growth, innovation, and opportunity worldwide.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Core Values */}
      <Container className="my-5">
        <h2
          className="text-center mb-4"
          style={{ color: "#6A38C2", fontWeight: "bold" }}
        >
          Our Core Values
        </h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="p-4 shadow border-0 rounded-4 text-center h-100">
              <FaUsers size={40} color="#F83002" />
              <h5 className="mt-3">Collaboration</h5>
              <p>
                Bringing people together to share, learn, and grow as a
                community.
              </p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="p-4 shadow border-0 rounded-4 text-center h-100">
              <FaHandsHelping size={40} color="#6A38C2" />
              <h5 className="mt-3">Empowerment</h5>
              <p>
                Enabling individuals to achieve personal and professional goals
                through skill exchange.
              </p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="p-4 shadow border-0 rounded-4 text-center h-100">
              <FaLightbulb size={40} color="#F8B400" />
              <h5 className="mt-3">Innovation</h5>
              <p>
                Encouraging creative problem-solving and real-world learning
                experiences.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call To Action */}
      <div
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(120deg, #6A38C2, #F83002)",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>Join Us Today</h2>
        <p className="mt-3" style={{ maxWidth: "700px", margin: "0 auto" }}>
          Be part of our growing community and start bartering your skills
          today. Whether you’re here to teach, learn, or connect, SkillBarter is
          the place for you.
        </p>
        <button
          className="btn btn-light mt-3 px-4 py-2"
          style={{ borderRadius: "30px", fontWeight: "bold" }}
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default AboutUs;
