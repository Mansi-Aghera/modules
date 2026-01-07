import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar bg-dark text-white p-3">
      <h4 className="text-center">Admin Panel</h4>

      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/bed">
            Bed
          </Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link text-white" to="/faqs">
            FAQS
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/counsellor">
            Counsellor
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/testimonials">
            Testimonials
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/course">
            Course
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
