import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name}>
              {isLast ? (
                <span aria-current="page">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              ) : (
                <Link to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;