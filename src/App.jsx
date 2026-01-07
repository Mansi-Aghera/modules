import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Bed from "./pages/Bed";

import "./App.css";
import Faqs from "./pages/Faqs";
import Counsellor from "./pages/counsellor";
import Testimonials from "./pages/Testimonials";
import Course from "./pages/Course";

function App() {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

      <div className="content flex-grow-1">
        <Navbar />

        <div className="container-fluid mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bed" element={<Bed />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/counsellor" element={<Counsellor />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/course" element={<Course />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;   // ✅ MOST IMPORTANT
