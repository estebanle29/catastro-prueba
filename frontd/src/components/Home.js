import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/catastro_logo.png'; 

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Catastro Logo" className="logo" />
        <h1>Catastro</h1>
      </header>
      <main className="home-main">
        <div className="home-buttons">
          <Link to="/predios" className="home-btn">
            Predios
          </Link>
          <Link to="/propietarios" className="home-btn">
            Propietarios
          </Link>
          <Link to="/construcciones" className="home-btn">
            Construcciones
          </Link>
          <Link to="/terrenos" className="home-btn">
            Terrenos
          </Link>
        </div>
      </main>
      
    </div>
  );
};

export default Home;
