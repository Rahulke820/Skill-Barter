import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../shared/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { skillsOptions } from "../auth/skills";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Slideshow images
const heroImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?fit=crop&w=1350&q=80",
];

function LandingPage() {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [forumPosts, setForumPosts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const wrapperRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Click outside search suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch forum posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/`);
        const formattedData = await Promise.all(
          response.data.map(async (user) => {
            const emailEncoded = user.email.replace("@", "%40");
            let profilePicture = "https://via.placeholder.com/150";
            try {
              const profilePicResponse = await axios.get(
                `${API_URL}/api/users/profile-picture/${emailEncoded}/`
              );
              profilePicture = `${API_URL}${profilePicResponse.data.profile_picture}`;
            } catch (err) {}
            return {
              id: user.id,
              name: user.full_name,
              location: `${user.city}, ${user.state}`,
              skills: user.skills ? user.skills.split(", ") : [],
              desiredSkills: user.desired_skills ? user.desired_skills.split(", ") : [],
              img: profilePicture,
            };
          })
        );
        setForumPosts(formattedData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Skill carousel
  const handlePrevClick = () => {
    setCurrentSkill((prev) => (prev - 1 + skillsOptions.length) % skillsOptions.length);
  };
  const handleNextClick = () => {
    setCurrentSkill((prev) => (prev + 1) % skillsOptions.length);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  const filteredSkills = skillsOptions.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slideshow auto-change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CustomNavbar />

      {/* Hero Section now covers full page */}
      <div className="hero-container position-relative">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="hero-slide"
            style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
          />
        </AnimatePresence>

        {/* Overlay for all content */}
        <div className="hero-overlay">
          {/* Heading */}
          <div className="text-center py-5">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="hero-text p-4 rounded-3"
            >
              <h1 className="fw-bold display-3">Find & Swap</h1>
              <h2 className="fw-semibold display-5 mt-2">Exchange Skills, Grow Together</h2>
              <p className="lead mt-3">Connect with professionals and learn new skills effortlessly.</p>
            </motion.div>
          </div>

          {/* Search Bar */}
          <div className="container text-center my-5">
            <div ref={wrapperRef} className="input-group search-bar mx-auto">
              <span className="input-group-text bg-white border-0">
                <SearchIcon style={{ color: "#495057" }} />
              </span>
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Search your dream skill..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {showSuggestions && searchTerm && (
                <div className="list-group suggestion-box">
                  {filteredSkills.map((skill, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className="list-group-item list-group-item-action"
                      onClick={() => {
                        setSearchTerm(skill);
                        setShowSuggestions(false);
                      }}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Skill Carousel */}
          <div className="d-flex justify-content-center align-items-center my-5">
            <button className="btn carousel-btn mx-2" onClick={handlePrevClick}>
              <ArrowBackIosNewIcon />
            </button>
            <motion.span
              key={currentSkill}
              className="skill-display px-4 py-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {skillsOptions[currentSkill]}
            </motion.span>
            <button className="btn carousel-btn mx-2" onClick={handleNextClick}>
              <ArrowForwardIosIcon />
            </button>
          </div>

          {/* Forum Cards */}
          <div className="container">
            <div className="row justify-content-center">
              {forumPosts.map((user) => (
                <motion.div key={user.id} whileHover={{ scale: 1.03 }} className="col-md-4 mb-4">
                  <div className="card professional-card p-4 h-100">
                    <img
                      src={user.img}
                      alt={user.name}
                      className="rounded-circle mb-3"
                      width="80"
                      height="80"
                    />
                    <h5 className="fw-bold">{user.name}</h5>
                    <p className="text-muted">{user.location}</p>
                    <p>
                      <strong>Skills:</strong> {user.skills.join(", ")}
                      <br />
                      <strong>Wants:</strong> {user.desiredSkills.join(", ")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
        }
        .hero-container {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center center;
          z-index: 1;
          filter: blur(6px);   /* Stronger blur across entire background */
          transform: scale(1.1);
        }
        .hero-overlay {
          position: relative;
          z-index: 2;
          padding-bottom: 50px;
          // background: rgba(0,0,0,0.25); /* Subtle overlay */
        }
        .hero-text h1, .hero-text h2, .hero-text p {
          color: #fff;
          text-shadow: 0 4px 12px rgba(0,0,0,0.6);
        }
        .search-bar {
          max-width: 700px;   /* smaller, centered */
          height: 50px;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .search-bar input {
          height: 50px;
          font-size: 16px;
          padding-left: 10px;
        }
        .input-group-text {
          height: 50px;
        }
        .carousel-btn {
          background-color: #ffffff;
          border: 1px solid #ced4da;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .skill-display {
          background: #e9ecef;
          border-radius: 25px;
          padding: 10px 25px;
          font-weight: 600;
          color: #495057;
        }
        .professional-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(15px);
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          color: #fff;
        }
        .professional-card:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .professional-card img {
          object-fit: cover;
          width: 80px;
        }
      `}</style>
    </>
  );
}

export default LandingPage;
