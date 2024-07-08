import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { Button, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import "./SearchProduct.css";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";

export default function SearchProduct() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
    shape: [],
    cut: [],
    clarity: [],
    origin: [],
    collection: [],
    price: [],
  });
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortProducts = (products, order) => {
    return products.sort((a, b) => {
      if (order === "asc") {
        return a.finalPrice - b.finalPrice;
      } else if (order === "desc") {
        return b.finalPrice - a.finalPrice;
      }
      return 0;
    });
  };

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[type].includes(value)) {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[type].push(value);
      }
      return updatedFilters;
    });
  };

  const removeFilterTag = (type, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      updatedFilters[type] = updatedFilters[type].filter(
        (item) => item !== value
      );
      return updatedFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      gender: [],
      category: [],
      shape: [],
      cut: [],
      clarity: [],
      origin: [],
      collection: [],
      price: [],
    });
  };

  const applyFilters = (products) => {
    return products.filter((product) => {
      return (
        (filters.gender.length === 0 ||
          filters.gender.includes(product.gender)) &&
        (filters.category.length === 0 ||
          filters.category.includes(product.category)) &&
        (filters.shape.length === 0 || filters.shape.includes(product.shape)) &&
        (filters.cut.length === 0 || filters.cut.includes(product.cut)) &&
        (filters.clarity.length === 0 ||
          filters.clarity.includes(product.clarity)) &&
        (filters.origin.length === 0 ||
          filters.origin.includes(product.origin)) &&
        (filters.collection.length === 0 ||
          filters.collection.includes(product.collection))
        //   &&
        // (filters.price.length === 0 ||
        //   filters.price.some((priceFilter) => {
        //     if (priceFilter === "under1m") return product.finalPrice < 1000000;
        //     if (priceFilter === "1mto2m")
        //       return (
        //         product.finalPrice >= 1000000 && product.finalPrice < 2000000
        //       );
        //     if (priceFilter === "2mto3m")
        //       return (
        //         product.finalPrice >= 2000000 && product.finalPrice < 3000000
        //       );
        //     if (priceFilter === "3mto5m")
        //       return (
        //         product.finalPrice >= 3000000 && product.finalPrice < 5000000
        //       );
        //     if (priceFilter === "above5m") return product.finalPrice >= 5000000;
        //     return false;
        //   }))
      );
    });
  };

  const filteredAndSortedProducts = sortProducts(
    applyFilters(product),
    sortOrder
  );
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    endIndex
  );
  const totalPage = Math.ceil(filteredAndSortedProducts.length / pageSize);

  // Filter mappings
  const filterMappings = {
    gender: { Nữ: "FEMALE", Nam: "MALE" },
    category: {
      Nhẫn: "ring",
      "Vòng cổ": "necklace",
      "Khuyên tay": "earring",
      "Vòng tay": "bracelet",
    },
    // price: {
    //   "Dưới 1tr": "under1m",
    //   "Từ 1tr đến 2tr": "1mto2m",
    //   "Từ 2tr đến 3tr": "2mto3m",
    //   "Từ 3tr đến 5tr": "3mto5m",
    //   "Trên 5tr": "above5m",
    // },
    shape: {
      Round: "ROUND",
      Oval: "OVAL",
      Cushion: "CUSHION",
      Pear: "PEAR",
      Emerald: "EMERALD",
      Princess: "PRINCESS",
      Radiant: "RADIANT",
      Heart: "HEART",
      Marquise: "MARQUISE",
      Assher: "ASSHER",
    },
    cut: {
      Excellent: "EXCELLENT",
      "Very Good": "VERY GOOD",
      Good: "GOOD",
      Fair: "FAIR",
      Poor: "POOR",
    },
    clarity: {
      VVS1: "VVS1",
      VVS2: "VVS2",
      VS1: "VS1",
      VS2: "VS2",
      SI1: "SI1",
      SI2: "SI2",
      I1: "I1",
      I2: "I2",
      I3: "I3",
    },
    origin: { "Tự nhiên": "NATURAL", "Nhân tạo": "ARTIFICIAL" },
  };

  return (
    <div>
      <Header />
      <Container className="search-product-container">
        <Row>
          <Col md={3}>
            <div className="filter-section">
              <div className="filter-section-header">
                <h3>Bộ lọc</h3>
                <Button onClick={clearAllFilters} className="clear-button">
                  Lọc lại
                </Button>
              </div>

              <div className="tag-container">
                {Object.keys(filters).flatMap((key) =>
                  filters[key].map((value) => (
                    <Tag
                      key={`${key}-${value}`}
                      closable
                      onClick={() => removeFilterTag(key, value)}
                      className="tag"
                    >
                      {Object.entries(filterMappings[key]).find(
                        ([displayText, dbValue]) => dbValue === value
                      )?.[0] || value}
                    </Tag>
                  ))
                )}
              </div>

              <div className="filter-main">
                <div className="filter-part">
                  <Form.Group>
                    <Form.Label className="filter-part-label">Giới Tính</Form.Label>
                    {Object.entries(filterMappings.gender).map(
                      ([displayText, dbValue]) => (
                        <Form.Check
                          key={dbValue}
                          type="checkbox"
                          label={<span className="form-check-label">{displayText}</span>}
                          value={dbValue}
                          checked={filters.gender.includes(dbValue)}
                          onChange={(e) =>
                            handleFilterChange("gender", e.target.value)}
                          className="form-check"

                        />
                      )
                    )}
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label className="filter-part-label">Chủng Loại</Form.Label>
                    {Object.entries(filterMappings.category).map(
                      ([displayText, dbValue]) => (
                        <Form.Check
                          key={dbValue}
                          type="checkbox"
                          label={<span className="form-check-label">{displayText}</span>}
                          value={dbValue}
                          checked={filters.category.includes(dbValue)}
                          onChange={(e) =>
                            handleFilterChange("category", e.target.value)}
                          className="form-check"

                        />
                      )
                    )}
                  </Form.Group>
                  {/* <Form.Group>
                <Form.Label classname="filter-part-label">Giá</Form.Label>
                {Object.entries(filterMappings.price).map(
                  ([displayText, dbValue]) => (
                    <Form.Check
                      key={dbValue}
                      type="checkbox"
                      label={displayText}
                      value={dbValue}
                      checked={filters.price.includes(dbValue)}
                      onChange={(e) =>
                        handleFilterChange("price", e.target.value)
                      }
                      className="form-check"
                    />
                  )
                )}
              </Form.Group> */}
                  <hr />
                  <Form.Group>
                    <Form.Label className="filter-part-label">Hình Dáng</Form.Label>
                    {Object.entries(filterMappings.shape).map(
                      ([displayText, dbValue]) => (
                        <Form.Check
                          key={dbValue}
                          type="checkbox"
                          label={<span className="form-check-label">{displayText}</span>}
                          value={dbValue}
                          checked={filters.shape.includes(dbValue)}
                          onChange={(e) =>
                            handleFilterChange("shape", e.target.value)}
                          className="form-check"

                        />
                      )
                    )}
                  </Form.Group>
                </div>
                <div className="filter-part">
                  <Form.Group>
                    <Form.Label className="filter-part-label">Độ Cắt</Form.Label>
                    {Object.entries(filterMappings.cut).map(
                      ([displayText, dbValue]) => (
                        <Form.Check
                          key={dbValue}
                          type="checkbox"
                          label={<span className="form-check-label">{displayText}</span>}
                          value={dbValue}
                          checked={filters.cut.includes(dbValue)}
                          onChange={(e) =>
                            handleFilterChange("cut", e.target.value)}
                          className="form-check"

                        />
                      )
                    )}
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label className="filter-part-label">Độ Tinh Khiết</Form.Label>
                    {Object.entries(filterMappings.clarity).map(
                      ([displayText, dbValue]) => (
                        <Form.Check
                          key={dbValue}
                          type="checkbox"
                          label={<span className="form-check-label">{displayText}</span>}
                          value={dbValue}
                          checked={filters.clarity.includes(dbValue)}
                          onChange={(e) =>
                            handleFilterChange("clarity", e.target.value)}
                          className="form-check"

                        />
                      )
                    )}
                  </Form.Group>
                  <hr />
                  <Form.Group>
                    <Form.Label className="filter-part-label">Nguồn Gốc</Form.Label>
                    {Object.entries(filterMappings.origin).map(
                      ([displayText, dbValue]) => (
                        <Form.Check
                          key={dbValue}
                          type="checkbox"
                          label={<span className="form-check-label">{displayText}</span>}
                          value={dbValue}
                          checked={filters.origin.includes(dbValue)}
                          onChange={(e) =>
                            handleFilterChange("origin", e.target.value)}
                          className="form-check"

                        />
                      )
                    )}
                  </Form.Group>
                </div>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="search-product-header">
              <h1 className="search-product-title">Kết quả tìm kiếm</h1>
              <Col xs={3} className="search-product-sort">
                <Form.Select
                  aria-label="Sort by price"
                  onChange={handleSortChange}
                  value={sortOrder}
                >
                  <option value="none">Lọc theo</option>
                  <option value="asc">Giá: Thấp đến Cao</option>
                  <option value="desc">Giá: Cao đến Thấp</option>
                </Form.Select>
              </Col>
            </div>
            <Row>
              {paginatedProducts.map((item, index) => (
                <Col key={index} md={3} className="product-card-item">
                  <ProductCard
                    img={item.imgURL}
                    text={item.name}
                    price={`${item.finalPrice.toLocaleString()}đ`}
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
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
