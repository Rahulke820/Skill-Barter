import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { skillsOptions } from "../auth/skills";

const SkillsPage = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/`);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  const springProps = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 200, friction: 20 },
  });

  const handleSkillClick = (skill) => {
    const skillProfiles = profiles.filter((profile) => {
      if (Array.isArray(profile.skills)) return profile.skills.includes(skill);
      else if (profile.skills) return profile.skills.split(", ").includes(skill);
      return false;
    });

    if (skillProfiles.length > 0) {
      navigate("/skill-profile-view", {
        state: { searchType: "skill", searchTerm: skill, profiles: skillProfiles },
      });
    } else {
      alert(`No users found with the skill: ${skill}`);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="skills-page py-5">
        <h1 className="text-center mb-5 text-white fw-bold">Skills For Bartering</h1>
        <div className="container">
          <div className="row">
            {skillsOptions.map((skill, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <animated.div
                  style={springProps}
                  className="skill-card"
                  onClick={() => handleSkillClick(skill)}
                >
                  <div className="skill-icon">{skill.charAt(0)}</div>
                  <h3 className="skill-name">{skill}</h3>
                  <p className="skill-desc">Learn more about {skill}</p>
                </animated.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        body {
          font-family: 'Roboto', sans-serif;
          background: url(https://w.wallhaven.cc/full/ne/wallhaven-neojdw.jpg);
        }

        .skills-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .skill-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          padding: 25px 15px;
          text-align: center;
          height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          cursor: pointer;
        }

        .skill-card:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 35px rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
        }

        .skill-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #fff;
          background: linear-gradient(135deg, #0a0511ff, #9c8790ff);
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
        }

        .skill-name {
          color: #fff;
          margin-bottom: 8px;
        }

        .skill-desc {
          color: rgba(255,255,255,0.8);
          text-align: center;
          font-size: 14px;
        }

        @media(max-width:768px){
          .skill-card{
            height: 220px;
            padding: 20px 10px;
          }
          .skill-icon{
            width:70px;
            height:70px;
            font-size:24px;
          }
        }
      `}</style>
    </>
  );
};

export default SkillsPage;
