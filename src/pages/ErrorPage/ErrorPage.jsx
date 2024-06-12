import React from "react";
import "./ErrorPage.css";
import error from "/assets/images/Error/error.png";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

const ErrorPage = () => {
  return (
    <div className="mainbox">
      <style>{`
        body {
          background-color: #95c2de;
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600;900&display=swap"
        rel="stylesheet"
      />
      <script
        src="https://kit.fontawesome.com/4b9ba14b0f.js"
        crossOrigin="anonymous"
      ></script>

      <div className="content">
        <div className="err">𝟒</div>
        <img src={error} alt="Your Image" className="my-image" />
        <div className="err2">𝟒</div>
      </div>
      <div className="msg">
        <p>Page Not found</p>
        <Link to={routes.home} className="home-button">
          Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
