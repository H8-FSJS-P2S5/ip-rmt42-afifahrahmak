import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Navbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/login")
    }
  return (
    <>
        <nav
      className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse"
      id="sidebar-menu"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active fw-bold" href="/" id="nav-home">
              <span className="icon material-symbols-outlined me-2"
              >directions_car</span
              >Home</a
            >
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/category" id="nav-company">
              <span className="icon material-symbols-outlined me-2"
              >category</span
              >Category</a
            >
          </li>
          
        </ul>
        <h6
          className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase"
        >
          <span>Account</span>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link">
              <span className="icon material-symbols-outlined me-2">person</span
              >Hej, <span id="username"></span></a
            >
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout} id="nav-logout">
              <span className="icon material-symbols-outlined me-2">logout</span
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </nav>
    </>

  )
}
