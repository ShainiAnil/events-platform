import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./NavBar.css";
import closeIcon from "../../assets/closeIcon.png";
import menuIcon from "../../assets/menuIcon.png";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        EventVibe
      </Link>
      <div className="menu">
        <img
          className="menuBtn"
          src={menuOpen ? closeIcon : menuIcon}
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`menuItems ${menuOpen && "menuOpen"}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {user.role === "admin" && (
            <li>
              <NavLink to="/create-event">Create Event</NavLink>
            </li>
          )}
          {user ? (
            <>
            <li>
              <NavLink
                to="/my-events" >
                My Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  setUser("");
                }}
              >
                Logout
              </NavLink>
            </li>
            
            </>
            
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
