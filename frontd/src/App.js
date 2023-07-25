// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Propietario from './components/Propietarios';
import "bootswatch/dist/lux/bootstrap.min.css"
import CrearPropietario from './components/CrearPropietario';
import NavBar from './components/NavBar';
import EditarPropietario from './components/EditarPropietario';
import Construcciones from './components/Construcciones';
import CrearConstruccion from './components/CrearConstruccion';
import Terrenos from './components/Terrenos';
import CrearTerreno from './components/CrearTerreno';
import Predios from './components/Predios';
import EditarTerreno from './components/EditarTerreno';
import EditarConstruccion from './components/EditarConstruccion';
import Home from './components/Home';


const App = () => {
  return (
   
      <Router>
        <NavBar />
        <div className='container p-4'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/propietarios" element={<Propietario /> } />
            <Route path="/crearpropietarios" element={<CrearPropietario /> } />
            <Route path="/propietarios/EditarPropietario/:propietarioId" element={<EditarPropietario />} />
            <Route path="/Construcciones" element={<Construcciones /> } />
            <Route path="/CrearConstruccion" element={<CrearConstruccion /> } />
            <Route path="/Construcciones/EditarConstruccion/:construccionId" element={<EditarConstruccion /> } />
            <Route path="/terrenos" element={<Terrenos /> } />
            <Route path="/terrenos/EditarTerreno/:terrenoId" element={<EditarTerreno/>} />
            <Route path="/CrearTerreno" element={<CrearTerreno /> } />
            <Route path="/predios" element={<Predios /> } />
            
          </Routes>
        </div>
      </Router>
    
  );
};

export default App;

