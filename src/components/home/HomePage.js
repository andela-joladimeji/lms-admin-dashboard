import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div>
        <li>Link to <Link to="review-dashboard">View Review Dashboard</Link></li>
    </div>
  );
};

export default HomePage;
