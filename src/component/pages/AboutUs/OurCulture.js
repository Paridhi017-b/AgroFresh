import React from 'react';
import Navbar from '../../Navbar';
import './OurCulture.css';
import Footer from '../../Footer';

const cultureValues = [
  {
    title: "Practice Humility",
    subtitle: "By being genuine and helpful",
    description: "We openly acknowledge our weaknesses and constantly seek feedback to learn from everyone around us.",
    icon: "🧠",
    color: "culture-sky-card",
  },
  {
    title: "Disagree & Commit",
    subtitle: "United in purpose",
    description: "We encourage diverse perspectives but unite behind decisions to drive our mission forward.",
    icon: "🤝",
    color: "culture-mint-card",
  },
  {
    title: "Be Positive",
    subtitle: "Fuel for progress",
    description: "We maintain optimism and tackle challenges with energy and smiles.",
    icon: "😊",
    color: "culture-butter-card",
  },
  {
    title: "Always Work Hard",
    subtitle: "Entrepreneurial spirit",
    description: "We take ownership, avoid shortcuts, and go above-and-beyond to deliver results.",
    icon: "🚀",
    color: "culture-peach-card",
  },
  {
    title: "Integrity Forever",
    subtitle: "When no one's watching",
    description: "We uphold honesty and ethical behavior in all actions, both visible and invisible.",
    icon: "🛡️",
    color: "culture-lavender-card",
  },
  {
    title: "Deliver Results",
    subtitle: "Mission-focused execution",
    description: "We align on clear goals and overcome obstacles to achieve impactful outcomes.",
    icon: "🎯",
    color: "culture-blush-card",
  },
  {
    title: "Do More With Less",
    subtitle: "Resourceful by design",
    description: "We maximize every asset and optimize costs without compromising quality.",
    icon: "💎",
    color: "culture-ice-card",
  }
];

export default function OurCulture() {
  return (
    <div className="culture-page">
      <section className="culture-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Our Culture Code</h1>
            <p className="lead">The DNA that makes us who we are</p>
            <p className="subtext">These principles guide every decision, interaction, and innovation at AgroStar</p>
          </div>
          <div className="hero-decoration">
            <div className="deco-circle"></div>
            <div className="deco-square"></div>
            <div className="deco-dots">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="deco-dot"
                  style={{
                    transform: `rotate(${i * 30}deg) translate(120px) rotate(-${i * 30}deg)`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="core-values">
        <div className="section-header">
          <h2>Our 7 Cultural Pillars</h2>
          
          <div className="divider">
            <div className="divider-inner"></div>
          </div>
          
          <p className="section-description">
            More than just words - these are the behaviors we live by daily to drive our mission forward
          </p>
        </div>

        <div className="values-grid">
          {cultureValues.map((value, index) => (
            <div
              key={index}
              className={`value-card ${value.color} ${index === 6 ? 'centered-card' : ''}`}
            >
              <div className="card-bg-pattern"></div>
              <div className="card-content">
                <div className="card-icon">{value.icon}</div>
                <div className="card-text">
                  <h3>{value.title}</h3>
                  <h4>{value.subtitle}</h4>
                  <p>{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}