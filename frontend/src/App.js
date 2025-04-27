import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import HODDashboard from "./components/HODDashboard";
import FacultyDashboard from "./components/FacultyDashboard";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/hod-dashboard" element={<HODDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
