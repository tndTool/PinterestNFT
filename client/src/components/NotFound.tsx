import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-4">404</h1>
          <h2 className="mb-4">Oops! Page not found</h2>
          <p className="lead">
            We can't seem to find the page you're looking for.
          </p>
          <Link to="/" className="btn btn-danger">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
