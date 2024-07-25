import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePreviousRoute } from '../contexts/PreviousRouteContext';

const LinkWithPreviousRoute = ({ to, children, ...props }) => {
  const location = useLocation();
  const { setPreviousRoute } = usePreviousRoute();

  const handleClick = () => {
    setPreviousRoute(location.pathname);
  };

  return (
    <Link to={to} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default LinkWithPreviousRoute;
