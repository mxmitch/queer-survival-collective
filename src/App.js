import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Default export
import Home from "./pages/Home"; // Default export
import KanbanBoard from "./components/KanbanBoard"; // Default export

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kanban" element={<KanbanBoard />} />
      </Routes>
    </Router>
  );
};

export default App;

