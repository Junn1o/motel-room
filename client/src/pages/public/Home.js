import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import '../../assets/css/style.css';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app ">
      
      <div className={`navigation-container  ${scrolled ? 'fixed-navbar' : ''}`} >
      <Header   />
      </div>
      <div className='w-full flex flex-col items-center justify-start  from-red-100 via-gray-300 to-blue-500 bg-gradient-to-br'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;