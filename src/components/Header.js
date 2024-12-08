import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Decode the token to get the username
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
    }
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage on logout
    localStorage.removeItem('token');
    setUsername('');
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <h1>Queer Survival Collective</h1>
      </div>
      {username ? (
        <div>
          <p>Logged in as: {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.link}>Home</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/kanban" style={styles.link}>Kanban Board</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.link}>About</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/login" style={styles.link}>Login</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/register" style={styles.link}>Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#673ab7",
    color: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "bold",
  },
};

export default Header;
