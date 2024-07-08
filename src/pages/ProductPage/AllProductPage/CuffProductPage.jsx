import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import Banner from "../../../components/Banner/banner";
import api from "../../../config/axios";

export default function RingProductPage() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  // Placeholder for filter and sort state
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  // Handle filter change
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    // Apply filtering logic
  };

  // Handle sort change
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSort(value);
    // Apply sorting logic
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`);
  };

  async function fetchProduct() {
    try {
      const response = await api.get("product-line");
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const filteredProducts = product.filter(
    (product) => product.category.name === "vòng tay"
    // Apply additional filters based on `filter` state
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPage = Math.ceil(filteredProducts.length / pageSize);

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

        <div className="filter-sort-container">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={filter}
            onChange={handleFilterChange}
          />
          <Form.Select value={sort} onChange={handleSortChange}>
            <option value="">Lọc theo</option>
            <option value="price-asc">Giá: Thấp tới Cao</option>
            <option value="price-desc">Giá: Cao tới Thấp</option>
            <option value="name-asc">A-Z</option>
            <option value="name-desc">Z-A</option>
          </Form.Select>
        </div>

        <Row>
          {paginatedProducts.map((item, index) => (
            <Col key={index} className="product-card-item">
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
      </Container>
      <Footer />
    </div>
  );
}
