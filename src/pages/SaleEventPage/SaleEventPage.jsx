import React, { useState } from "react"; // Import useState
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Banner4 from "../../../public/assets/images/Banner/banner4.jpg";
import Banner5 from "../../../public/assets/images/Banner/banner5.png";
import Product2 from "../../../public/assets/images/product/product2.png";
import Product3 from "../../../public/assets/images/product/product3.png";
import Product4 from "../../../public/assets/images/product/product4.png";
import Product5 from "../../../public/assets/images/product/product5.png";
import "./SaleEventPage.css";
import OutlinedButtons from "../../components/Button/OutlineButton";
import BasicButton from "../../components/Button/myButton";
import { Container } from "react-bootstrap";
import MyBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { routes } from "../../routes";
import { Link } from 'react-router-dom';


function SaleEventPage() {

  return (
    <div>
      <Header />
      <Container>
        <MyBreadcrumb
          title1="KIẾN THỨC"
          link1={routes.blog}
          isChoice1={true}
          title2="CHÍNH SÁCH BẢO HÀNH"
          link2={routes.warrantyPolicy}
          title3="THÔNG TIN KHUYẾN MÃI"
          link3={routes.sale}
        />
        <div className="sale-banner">
          <img className="top-banner" src={Banner4} alt="Top Banner" />
        </div>
        <div>
          <h3 className="content-header">ƯU ĐÃI ĐỘC QUYỀN ONLINE</h3>
          <div className="sale-content">
            <p onClick={() => handleFilter("ring")}>NHẪN ƯU ĐÃI ĐẾN 20%</p>
            <p onClick={() => handleFilter("necklace")}>VÒNG CỔ ƯU ĐÃI ĐẾN 40%</p>
            <p onClick={() => handleFilter("diamond")}>KIM CƯƠNG ƯU ĐÃI 2%</p>
          </div>
          <div className="sale-content-img">
            <img src={Product2} /> {/* ring */}
            <img src={Product3} /> {/* bracelet */}
            <img src={Product4} /> {/* necklace */}
            <img src={Product5} /> {/* earring */}
          </div>
          <div className="button" id="outlined">
            <Link to={routes.saleProduct}>
              <OutlinedButtons text={"Xem tất cả"} />
            </Link>
          </div>
        </div>
        <div className="button" id="filled">
          <BasicButton color="primary" text2={"ƯU ĐÃI KHÁC"} />
        </div>
        <div className="sale-banner">
          <img className="bot-banner" src={Banner5} alt="Bottom Banner" />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default SaleEventPage;
