import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/productCard/productCard";
import Footer from "../../components/Footer/Footer";
import Banner from "../../components/Banner/banner";
import RowProduct from "../../components/RowProduct/rowProduct";
import "./GuestPage.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import api from "../../config/axios";

export default function GuestPage() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const handleCollectionClick = () => {
    navigate(routes.bstset1);
  };

  async function fetchProduct() {
    const response = await api.get("product-line");
    setProduct(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  // Lấy 5 sản phẩm đầu tiên
  const firstFiveProducts = product.slice(0, 15);
  const specialpro = firstFiveProducts.filter(
    (itemSpecial) => itemSpecial.deleted === false
  );

  return (
    <div>
      <Header />
      <Container>
        <Banner
          className="banner"
          pic1={
            "https://drive.google.com/thumbnail?id=1MurUr0y927Uox0YDBla75YskE3phVUJ1&sz=w1000"
          }
          pic2={
            "https://drive.google.com/thumbnail?id=1URfmW1gg8-XLmPFOugwEw9KfWVcV19w3&sz=w1000"
          }
          pic3={
            "https://drive.google.com/thumbnail?id=1oUTZ3-4CHOUwC_WYcW2h_MJjQ0WE43HP&sz=w1000"
          }
          pic4={
            "https://drive.google.com/thumbnail?id=1-FggdgvD3FjG_XqeVj2WI2_gIvA9UBPa&sz=w1000"
          }
        />

        <Row>
          {specialpro.map((item, index) => (
            <Col key={index} className="product-card-item">
              <ProductCard
                img={item.imgURL}
                text={item.name}
                price={item.price.toLocaleString() + "đ"}
                pageType="guest-page"
                id={item.id}
              />
            </Col>
          ))}
        </Row>

        <Row>
          <Col>
            <h4 className="Top-title">SẢN PHẨM NỔI BẬT</h4>
          </Col>
        </Row>
        <RowProduct
          banner={
            "https://drive.google.com/thumbnail?id=1EG3EKHpm1-MJKmZ_GrwAm7uvsZtvEWee&sz=w1000"
          }
        />
        <RowProduct
          banner={
            "https://drive.google.com/thumbnail?id=1EG3EKHpm1-MJKmZ_GrwAm7uvsZtvEWee&sz=w1000"
          }
        />
        <RowProduct
          banner={
            "https://drive.google.com/thumbnail?id=1EG3EKHpm1-MJKmZ_GrwAm7uvsZtvEWee&sz=w1000"
          }
        />
      </Container>
      <Footer />
    </div>
  );
}
