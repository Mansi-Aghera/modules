import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";

import "./App.css";
import Faqs from "./pages/Faqs";
import Testimonials from "./pages/Testimonials";
import Course from "./pages/Course";
import Articles from "./pages/Articles";
import Module from "./pages/Module";

function App() {
  return (
    <div className="d-flex min-vh-100 app-layout">
      <Sidebar />

      <div className="content flex-grow-1 app-main">
        <Navbar />

        <div className="container-fluid mt-4 app-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/course" element={<Course />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/modules" element={<Module />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;   // ✅ MOST IMPORTANT
