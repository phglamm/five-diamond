import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/productCard/productCard";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/banner";
import RowProduct from "../../components/RowProduct/rowProduct";
import "./GuestPage.css";
export default function GuestPage() {
  return (
    <div>
      <Header/>
      <Container>
        <Banner
          className="banner"
          pic1={"https://drive.google.com/thumbnail?id=1MurUr0y927Uox0YDBla75YskE3phVUJ1&sz=w1000"}
          pic2={"https://drive.google.com/thumbnail?id=1URfmW1gg8-XLmPFOugwEw9KfWVcV19w3&sz=w1000"}
          pic3={"https://drive.google.com/thumbnail?id=1oUTZ3-4CHOUwC_WYcW2h_MJjQ0WE43HP&sz=w1000"}
          pic4={"https://drive.google.com/thumbnail?id=1-FggdgvD3FjG_XqeVj2WI2_gIvA9UBPa&sz=w1000"}
        />

        <Row>
          <Col>
            <ProductCard
              img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            />
          </Col>
          <Col>
            <ProductCard
              img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            />
          </Col>

          <Col>
            <ProductCard
              img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            />
          </Col>
          <Col>
            <ProductCard
              img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            />
          </Col>
          <Col>
            <ProductCard
              img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
              text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
              price={"22,000,000đ"}
              pageType="guest-page"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className="Top-title">SẢN PHẨM NỔI BẬT</h4>
          </Col>
        </Row>
        <RowProduct banner={"https://drive.google.com/thumbnail?id=1EG3EKHpm1-MJKmZ_GrwAm7uvsZtvEWee&sz=w1000"}></RowProduct>
        <RowProduct banner={"https://drive.google.com/thumbnail?id=1EG3EKHpm1-MJKmZ_GrwAm7uvsZtvEWee&sz=w1000"}></RowProduct>
        <RowProduct banner={"https://drive.google.com/thumbnail?id=1EG3EKHpm1-MJKmZ_GrwAm7uvsZtvEWee&sz=w1000"}></RowProduct>
      </Container>

      <Footer/>
    </div>
  );
}
