import React, { useRef, useState } from 'react';
import { FaLinkedin, FaEnvelope, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './OurTeam.css';

const teamMembers = [
  {
    name: "Paridhi Bansal",
    email: "paridhibansal018@gmail.com",
    linkedin: "http://www.linkedin.com/in/paridhi-bansal",
    github: "https://github.com/Paridhi017-b",
    photo: "/images/paridhi.jpg"
  },
  {
    name: "Vandana Pandey",
    email: "vandanapandey1407@gmail.com",
    linkedin: "https://www.linkedin.com/in/vandana-pandey-152491252",
    github: "https://github.com/Vandana140-p",
    photo: "/images/vandana.jpg" 
  },
  {
    name: "Renuka Singh",
    email: "renukasingh1208@gmail.com",
    linkedin: "https://linkedin.com/in/renuka-singh",
    github: "https://github.com/Renuka120804",
    photo: "/images/renuka.jpg"
  }
];

const OurTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === teamMembers.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? teamMembers.length - 1 : prevIndex - 1
    );
  };

  const handleEmailClick = (email, name) => {
    const subject = encodeURIComponent('Regarding AgroFresh Project');
    const body = encodeURIComponent(`Hello ${name},\n\n`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="team-page">
      <div className="team-header">
        <h1>Our Team</h1>
        <p>Computer Science Students from SVVV Indore</p>
      </div>

      <div className="carousel-container">
        <div 
          className="carousel-track" 
          ref={carouselRef}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {teamMembers.map((member, index) => (
            <div key={index} className="member-slide">
              <div className="member-photo-container">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="member-photo"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/images/default-profile.jpg';
                  }}
                />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <div className="contact-links">
                  <button 
                    onClick={() => handleEmailClick(member.email, member.name)}
                    className="contact-button email"
                    aria-label={`Email ${member.name}`}
                  >
                    <FaEnvelope /> Email
                  </button>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-button linkedin"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-button github"
                    aria-label={`${member.name}'s GitHub profile`}
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="carousel-button prev" 
          onClick={prevSlide}
          aria-label="Previous team member"
        >
          <FaChevronLeft />
        </button>
        <button 
          className="carousel-button next" 
          onClick={nextSlide}
          aria-label="Next team member"
        >
          <FaChevronRight />
        </button>

        <div className="carousel-dots">
          {teamMembers.map((_, index) => (
            <button
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;