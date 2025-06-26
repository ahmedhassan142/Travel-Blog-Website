"use client";
import React, { useState } from 'react';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../globals.css'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message. Please try again later.');
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitSuccess(false), 5000);
  }
};
  return (
    <div className="contactContainer">
      <div className="contactHeader">
        <h1>Get In Touch</h1>
        <p>Have questions about your next adventure? We'd love to hear from you!</p>
      </div>

      <div className="contactContent">
        {/* Contact Form */}
        <div className="contactFormContainer">
          <form onSubmit={handleSubmit} className="contactForm">
            <div className="formGroup">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="submitButton"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FaPaperPlane className="buttonIcon" />
                  Send Message
                </>
              )}
            </button>

            {submitSuccess && (
              <div className="successMessage">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="contactInfo">
          <div className="infoCard">
            <div className="infoIcon">
              <FaMapMarkerAlt />
            </div>
            <h3>Our Location</h3>
            <p>123 Travel Street<br />Wanderlust City, WC 12345</p>
          </div>

          <div className="infoCard">
            <div className="infoIcon">
              <FaPhone />
            </div>
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon-Fri: 9am-5pm</p>
          </div>

          <div className="infoCard">
            <div className="infoIcon">
              <FaEnvelope />
            </div>
            <h3>Email Us</h3>
            <p>hello@worldtravelguy.com</p>
            <p>response within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <div className="mapContainer">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291234!2d-73.987844924537!3d40.74844097138996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactPage;