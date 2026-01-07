import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="navbar-brand mb-0 h5">Admin Panel</span>
      <button className="btn btn-outline-danger btn-sm">Logout</button>
    </nav>
  );
}

export default Navbar;
