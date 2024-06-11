import { Col, Container, Row } from "react-bootstrap";
import banner1 from "../../../public/assets/images/Banner/banner1.jpg";
import banner2 from "../../../public/assets/images/Banner/banner2.jpg";
import banner3 from "../../../public/assets/images/Banner/banner3.jpg";
import banner4 from "../../../public/assets/images/Banner/banner4.jpg";
import product1 from "../../../public/assets/images/product/product1.png";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/productCard/productCard";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/banner";
import RowProduct from "../../components/RowProduct/rowProduct";
import "./GuestPage.css";
import rowbanner1 from "../../../public/assets/images/rowBanner/rowbanner1.jpg";

export default function GuestPage() {
  return (
    <div>
      <Header></Header>
      <Container>
        <Banner
          className="banner"
          pic1={banner1}
          pic2={banner2}
          pic3={banner3}
          pic4={banner4}
        ></Banner>

        <Row>
          <Col>
            <ProductCard
              img={product1}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            />
          </Col>
          <Col>
            <ProductCard
              img={product1}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            ></ProductCard>
          </Col>

          <Col>
            <ProductCard
              img={product1}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            ></ProductCard>
          </Col>
          <Col>
            <ProductCard
              img={product1}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            ></ProductCard>
          </Col>
          <Col>
            <ProductCard
              img={product1}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            ></ProductCard>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="Top-title">SẢN PHẨM NỔI BẬT</h4>
          </Col>
        </Row>
        <RowProduct banner={rowbanner1}></RowProduct>
        <RowProduct banner={rowbanner1}></RowProduct>
        <RowProduct banner={rowbanner1}></RowProduct>
      </Container>

      <Footer></Footer>
    </div>
  );
}
