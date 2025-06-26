"use client"
import React from 'react';
import Link from 'next/link';

import '../../app/globals.css';

const HeroSection = () => {
  return (
    <div className='heroContainer'>
      <video autoPlay loop muted playsInline className='herovideo'>
        <source src="/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='heroContent'>
        <h1>Welcome to The Travel Blog</h1>
        <p>Explore the world with us!</p>
        <Link href="/blogs">
          <button className="heroButton">EXPLORE </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;