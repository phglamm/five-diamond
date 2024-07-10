import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import "./RingProductPage.css"; // Import CSS file

export default function RingProductPage() {
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
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
        (item) => item.category.name === "Nhẫn" && item.deleted === false
      );
      setProduct(ringProducts);
      setFilteredProducts(ringProducts);
      setLoading(false);
      console.log(ringProducts);
    } catch (error) {
      setError("Failed to fetch products");
      setLoading(false);
      console.error("Failed to fetch products:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    let updatedProducts = [...product];

    // Filter products
    if (filter) {
      updatedProducts = updatedProducts.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Sort products
    if (sort) {
      if (sort === "price-asc") {
        updatedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
      } else if (sort === "price-desc") {
        updatedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
      } else if (sort === "name-asc") {
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "name-desc") {
        updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    setFilteredProducts(updatedProducts);
  }, [filter, sort, product]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPage = Math.ceil(filteredProducts.length / pageSize);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show an error message if fetching fails
  }

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
        {paginatedProducts.length > 0 ? (
          <>
            <Row>
              {paginatedProducts.map((item, index) => (
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
