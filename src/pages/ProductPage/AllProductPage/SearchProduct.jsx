import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import Banner from "../../../components/Banner/banner";

export default function SearchProduct() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.SearchProduct) {
      setProduct(location.state.SearchProduct);
    }
  }, [location.state]);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    navigate(`/search-product?page=${value}`, {
      state: { SearchProduct: product },
    });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = product.slice(startIndex, endIndex);
  const totalPage = Math.ceil(product.length / pageSize);

  return (
    <div>
      <Header />
      <Container>
        <Banner
          className="cuff-product-banner"
          pic1={
            "https://drive.google.com/thumbnail?id=1A9fon2204BjSZX1b3bdyd5i5hJJMBXua&sz=w1000"
          }
          pic2={
            "https://drive.google.com/thumbnail?id=1sISfa-6lHVx5BVr4lLFeUMGu5DyYiZXH&sz=w1000"
          }
          pic3={
            "https://drive.google.com/thumbnail?id=1-0i9YcpfGil7K29pcPkYwm87-XF7qfFm&sz=w1000"
          }
        />
        <Row>
          {paginatedProducts.map((item, index) => (
            <Col key={index} className="product-card-item">
              <ProductCard
                img={item.imgURL}
                text={item.name}
                price={`${item.price.toLocaleString()}đ`}
                pageType="guest-page"
                id={item.id}
              />
            </Col>
          ))}
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <BasicPagination
            count={totalPage}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
