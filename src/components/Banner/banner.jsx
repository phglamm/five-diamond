/* eslint-disable react/prop-types */
import { Carousel } from "antd";
import "./banner.css";

const Banner = ({ pic1, pic2, pic3, pic4 }) => (
  <div className="banner">
    <Carousel autoplay>
      <div className="banner-slide">
        <img src={pic1} alt="" className="banner-img" />
      </div>
      <div className="banner-slide">
        <img src={pic2} alt="" className="banner-img" />
      </div>
      <div className="banner-slide">
        <img src={pic3} alt="" className="banner-img" />
      </div>
      {/* <div className="banner-slide">
        <img src={pic4} alt="" className="banner-img" />
      </div> */}
    </Carousel>
  </div>
);
export default Banner;
