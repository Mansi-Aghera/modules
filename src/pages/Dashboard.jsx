import React from "react";

function Dashboard() {
  return (
    <div className="container-fluid bg-light">
    <div className="row">
      <div className="col-md-4">
        <div className="card text-white bg-primary mb-3">
          <div className="card-body">
            <h5 className="card-title">Users</h5>
            <p className="card-text">120</p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-white bg-success mb-3">
          <div className="card-body">
            <h5 className="card-title">Orders</h5>
            <p className="card-text">75</p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card text-white bg-warning mb-3">
          <div className="card-body">
            <h5 className="card-title">Revenue</h5>
            <p className="card-text">₹50,000</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
