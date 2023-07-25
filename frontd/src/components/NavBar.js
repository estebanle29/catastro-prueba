import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div>
            <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">Predios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/terrenos">Terrrenos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/propietarios">Propietarios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/Construcciones">Construcciones</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
