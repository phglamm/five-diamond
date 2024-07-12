import React, { useState } from "react"; // Import useState
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./SaleEventPage.css";
import OutlinedButtons from "../../components/Button/OutlineButton";
import { Container } from "react-bootstrap";
import MyBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import { Button } from "antd";

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
          <img
            className="top-banner"
            src={
              "https://drive.google.com/thumbnail?id=1-FggdgvD3FjG_XqeVj2WI2_gIvA9UBPa&sz=w1000"
            }
            alt="Top Banner"
          />
        </div>
        <div>
          <h3 className="content-header">ƯU ĐÃI ĐỘC QUYỀN ONLINE</h3>
          <div className="sale-content">
            <p onClick={""}>NHẪN ƯU ĐÃI ĐẾN 20%</p>
            <p onClick={""}>VÒNG CỔ ƯU ĐÃI ĐẾN 40%</p>
            <p onClick={""}>KIM CƯƠNG ƯU ĐÃI 2%</p>
          </div>
          <div className="sale-content-img">
            <img
              src={
                "https://drive.google.com/thumbnail?id=1vbIO90dmDa8B2ZB_1s-mBwBjTSyxSilx&sz=w1000"
              }
            />{" "}
            {/* ring */}
            <img
              src={
                "https://drive.google.com/thumbnail?id=1dKqFivVaUujuOJWGAebYB4bg3490mU9v&sz=w1000"
              }
            />{" "}
            {/* bracelet */}
            <img
              src={
                "https://drive.google.com/thumbnail?id=1JjCe0RqJsSG1IvAuxPsuUp79EZzH2Qin&sz=w1000"
              }
            />{" "}
            {/* necklace */}
            <img
              src={
                "https://drive.google.com/thumbnail?id=10BpnBo91lyNTmnwWsCmoaCxagXnsnU6l&sz=w1000"
              }
            />{" "}
            {/* earring */}
          </div>
          <div className="button" id="outlined">
            {/* <Link to={routes.saleProduct}>
              <OutlinedButtons text={"Xem tất cả"} />
            </Link> */}
          </div>
        </div>
        <div className="button" id="filled">
          <Button>Ưu Đãi Khác</Button>
        </div>
        <div className="sale-banner">
          <img
            className="bot-banner"
            src={
              "https://drive.google.com/thumbnail?id=18MDfsinnO1ggNqEu21BgPF3EFW_jnTNo&sz=w1000"
            }
            alt="Bottom Banner"
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default SaleEventPage;
