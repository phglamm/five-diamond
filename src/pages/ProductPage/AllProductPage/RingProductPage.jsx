import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import "./RingProductPage.css"; // Import file CSS

export default function RingProductPage() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`);
  };

  async function fetchProduct() {
    try {
      const response = await api.get("product-line");
      const ringProducts = response.data.filter(
        (item) => item.category.id === 3
      );
      setProduct(ringProducts);
      console.log(ringProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = product.slice(startIndex, endIndex);
  const totalPage = Math.ceil(product.length / pageSize);

  const firstFifteenProducts = product.slice(0, 15);
  const specialProducts = firstFifteenProducts.filter((item) => !item.deleted);

  return (
    <div>
      <Header />
      <Container>
        <div className="product-ring-banner" style={{ width: "100%" }}>
          <img
            src="https://drive.google.com/thumbnail?id=1URfmW1gg8-XLmPFOugwEw9KfWVcV19w3&sz=w1000"
            alt="Ring Banner"
            style={{ width: "100%" }}
          />
        </div>
        {specialProducts.length > 0 ? (
          <>
            <Row>
              {specialProducts.map((item, index) => (
                <Col
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="d-flex justify-content-center mb-4 product-card-item-ring"
                >
                  <ProductCard
                    img={item.imgURL}
                    text={item.name}
                    price={item.finalPrice.toLocaleString() + "đ"}
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
          </>
        ) : (
          <>Không có sản phẩm</>
        )}
      </Container>
      <Footer />
    </div>
  );
}
