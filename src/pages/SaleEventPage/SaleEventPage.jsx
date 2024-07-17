import React, { useState, useEffect } from "react"; // Import useState
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./SaleEventPage.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"; // Import icons
import { Container } from "react-bootstrap";
import MyBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import api from "../../config/axios"
import { Row } from "react-bootstrap";
import PromotionCard from "../../components/PromotionCard/PromotionCard";

function SaleEventPage() {
  const [promotion, setPromotion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  // Fetch promotions
  async function fetchPromotion() {
    const response = await api.get("promotion");
    const filter = response.data.filter((item) => item.deleted === false);
    setPromotion(filter);
    console.log(response.data);
  }

  // Use effect to fetch promotions on mount
  useEffect(() => {
    fetchPromotion();
  }, []);

  //pagination voucher
  const nextPromotion = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === promotion.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPromotion = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? promotion.length - 1 : prevIndex - 1
    );
  };

  const getVisiblePromotions = () => {
    if (promotion.length <= 3) {
      return promotion;
    }
    if (currentIndex + 3 <= promotion.length) {
      return promotion.slice(currentIndex, currentIndex + 3);
    }
    return [
      ...promotion.slice(currentIndex),
      ...promotion.slice(0, (currentIndex + 3) % promotion.length),
    ];
  };

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
          {/* <div className="button" id="outlined">
            <Link to={routes.saleProduct}>
              <OutlinedButtons text={"Xem tất cả"} />
            </Link>
          </div> */}
        </div>

        <Row>
          <div className="promotion-carousel" >
            <FaAngleLeft onClick={prevPromotion} className="carousel-arrow" />
            <div className="sale-content">
              {getVisiblePromotions().map((promo) => (
                <PromotionCard
                  key={promo.id}
                  code={promo.code}
                  discountPercentage={promo.discountPercentage}
                  endDate={new Date(promo.endDate).toLocaleDateString()}
                />
              ))}
            </div>
            <FaAngleRight onClick={nextPromotion} className="carousel-arrow" />
          </div>
        </Row>



        {/* 
        <div className="sale-banner">
          <img
            className="bot-banner"
            src={
              "https://drive.google.com/thumbnail?id=18MDfsinnO1ggNqEu21BgPF3EFW_jnTNo&sz=w1000"
            }
            alt="Bottom Banner"
          />
        </div> */}
      </Container>
      <Footer />
    </div>
  );
}

export default SaleEventPage;
