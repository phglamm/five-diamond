import React from "react";
import { Helmet } from "react-helmet";
import "./ErrorPage.css";
import error from "/assets/images/Error/error.png";

const ErrorPage = () => {
  return (
    <div className="mainbox">
      <Helmet>
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
      </Helmet>
      <div className="content">
        <div className="err">𝟒</div>
        <img src={error} alt="Your Image" className="my-image" />
        <div className="err2">𝟒</div>
      </div>
      <div className="msg">
        Đi đâu đây? Tìm kim cương
        <p>
          Kim cương có ở <a href="/">đây</a> nè
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
