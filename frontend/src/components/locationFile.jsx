import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import CustomNavbar from "../shared/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { statesOfIndia } from "../auth/states";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LocationFile = () => {
  const [locations, setLocations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const springProps = useSpring({
    to: { opacity: 1, transform: "scale(1)" },
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/`);
        const data = response.data;
        const uniqueLocations = new Set(data.map((user) => user.state));
        setLocations([...uniqueLocations]);
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    };
    fetchLocations();
  }, []);

  const handleStateClick = async (state) => {
    if (locations.includes(state)) {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/?state=${encodeURIComponent(state)}`
        );
        const data = response.data.map((user) => ({
          ...user,
          skills: user.skills ? user.skills.split(", ") : [],
          desired_skills: user.desired_skills
            ? user.desired_skills.split(", ")
            : [],
          profile_picture: `${API_URL}/api/users/profile-picture/${encodeURIComponent(
            user.email
          )}`,
        }));
        if (data.length > 0) {
          navigate("/location-profile-view", {
            state: { searchType: "location", searchTerm: state, profiles: data },
          });
          setShowAlert(false);
        } else {
          setAlertMessage(
            `No users found in ${state}. Be the first to sign up and barter your skills!`
          );
          setShowAlert(true);
        }
      } catch (error) {
        console.error("Error fetching users by state", error);
        setAlertMessage(
          "An error occurred while fetching user profiles. Please try again later."
        );
        setShowAlert(true);
      }
    } else {
      setAlertMessage(
        `No users found in ${state}. Be the first to sign up and barter your skills!`
      );
      setShowAlert(true);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="locations-page py-5">
        <h1 className="text-center mb-5 text-white fw-bold">
          Locations For Skill Bartering
        </h1>
        <div className="container">
          <div className="row">
            {statesOfIndia.map((state, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <animated.div
                  style={springProps}
                  className="location-card"
                  onClick={() => handleStateClick(state)}
                >
                  <div className="state-icon">{state.charAt(0)}</div>
                  <h3 className="state-name">{state}</h3>
                  <p className="state-desc">Explore users in this state</p>
                </animated.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAlert && (
        <Modal show={showAlert} onHide={() => setShowAlert(false)}>
          <Modal.Header closeButton>
            <Modal.Title>No Users Found</Modal.Title>
          </Modal.Header>
          <Modal.Body>{alertMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAlert(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <style>{`
        body {
          font-family: 'Roboto', sans-serif;
          background: url(https://w.wallhaven.cc/full/ne/wallhaven-neojdw.jpg);
        }

        .locations-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .location-card {
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

        .location-card:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 12px 35px rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
        }

        .state-icon {
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

        .state-name {
          color: #fff;
          margin-bottom: 8px;
        }

        .state-desc {
          color: rgba(255,255,255,0.8);
          text-align: center;
          font-size: 14px;
        }

        @media(max-width:768px){
          .location-card{
            height: 220px;
            padding: 20px 10px;
          }
          .state-icon{
            width:70px;
            height:70px;
            font-size:24px;
          }
        }
      `}</style>
    </>
  );
};

export default LocationFile;
