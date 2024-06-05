import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <p>Welcome to Expense Tracker</p>
      <p>
        Your porifle is incomplete.
        <Link to="/complete-profile">Complete Now</Link>
      </p>
      <hr />
    </div>
  );
};

export default Welcome;
