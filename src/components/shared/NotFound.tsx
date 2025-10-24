import React from "react";
import { Link } from "react-router-dom";
import ErrorSVG from "../ui/ErrorSVG";
import Header from "./Header";

const NotFound: React.FC = () => {
  return (
    <div className="error not-found-container">
      <Header />
      <main className="not-found-main">
        <div className="error-svg-wrapper">
          <ErrorSVG />
        </div>
        <h1 className="not-found-title">Sorry. Page Not Found</h1>
        <p className="not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="button-group">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            Go back
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
