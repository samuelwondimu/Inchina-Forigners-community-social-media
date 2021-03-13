import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
      <Link to="/edit-profile" className="btn">
        Edit Profile
      </Link>
    </div>
  );
};
export default DashboardActions;
