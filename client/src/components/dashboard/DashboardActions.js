import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn">
        Edit Profile
      </Link>
    </div>
  );
};
export default DashboardActions;
