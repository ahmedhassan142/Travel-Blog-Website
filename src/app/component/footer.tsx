"use client";
import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';
import '../globals.css'

const Footer = () => {
  return (
    <footer className="footer mt-80">
      <div className="footerContainer">
        {/* Newsletter Section */}
        <div className="newsletter">
          <h3>Join Our Travel Community</h3>
          <p>Get exclusive travel tips and updates delivered to your inbox</p>
          <form className="newsletterForm">
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="footerGrid">
          {/* About Section */}
          <div className="footerColumn">
            <h4>About Us</h4>
            <p className='text-black'>Sharing unforgettable travel experiences and hidden gems around the world since 2015.</p>
            <div className="socialIcons">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="Pinterest"><FaPinterest /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footerColumn">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blogs">Blog</Link></li>
              <li><Link href="/destinations">Destinations</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="footerColumn">
            <h4>Popular Destinations</h4>
            <ul>
              <li><Link href="/destinations/bali">Bali, Indonesia</Link></li>
              <li><Link href="/destinations/paris">Paris, France</Link></li>
              <li><Link href="/destinations/kyoto">Kyoto, Japan</Link></li>
              <li><Link href="/destinations/new-york">New York, USA</Link></li>
              <li><Link href="/destinations/cape-town">Cape Town, South Africa</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footerColumn">
            <h4>Contact Us</h4>
            <ul className="contactInfo">
              <li>✉️ hello@worldtravelguy.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Travel Street, Wanderlust City</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copyright">
          <p>© {new Date().getFullYear()} The World Travel Guy. All rights reserved.</p>
          <div className="legalLinks">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;