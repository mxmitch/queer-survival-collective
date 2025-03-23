import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Default export
import Home from "./pages/Home"; // Default export
import Kanban from "./pages/Kanban"; // Default export
import About from "./pages/About"; // Default export
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from 'react';
import './styles/App.css'; // Import the CSS file


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanban" element={<Kanban/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;

