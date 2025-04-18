import React from "react";
import { useNavigate } from "react-router-dom"; // 🆕 Import useNavigate
import "./ContactUs.css";
const ContactUs = () => {
  const navigate = useNavigate(); // 🆕 Initialize navigate

  return (
    <div>
    
      {/* Contact Section */}
      <main className="contact-container">
        <h1 className="contact-title">We’re Here to Help!</h1>
        <p className="contact-subtitle">
          Reach out to us via live chat, phone, or email. We're always happy to assist you!
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <img src="/chat.png" alt="Chat" />
            <h3>Live Chat</h3>
            <p>Talk to our agents directly for quick support.</p>
            <span className="small-text">Mon–Sun: 6am–4pm PT</span>
          </div>
          <div className="contact-card">
            <img src="/call.png" alt="Call" />
            <h3>Call Us</h3>
            <p>+1 (888) 701-9899</p>
            <span className="small-text">Mon–Fri: 6am–4pm PT</span>
          </div>
          <div className="contact-card">
            <img src="/email.png" alt="Email" />
            <h3>Email Us</h3>
            <p>Send us your queries and we’ll get back to you.</p>
            <span className="small-text">All days: 6am–4pm PT</span>
          </div>
        </div>

        {/* Form Section */}
        <section className="form-section">
          <div className="form-text">
            <h2>Send us a message</h2>
            <p>
              Fill out the form below, and our team will get in touch with you shortly.
            </p>
          </div>
          <form className="contact-form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Your Message" rows="5"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;