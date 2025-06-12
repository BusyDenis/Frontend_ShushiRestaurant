import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The requested page does not exist.</p>
      <Link to="/" className="btn btn-gold">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound; 