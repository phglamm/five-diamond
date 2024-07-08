import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Tag } from 'antd';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import './SearchProduct.css';
import BasicPagination from "../../../components/BasicPagination/BasicPagination";

export default function SearchProduct() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(""); // Add state for sorting order
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
    shape: [],
    size: [],
    cut: [],
    clarity: [],
    origin: [],
    collection: [],
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

  //SORTER
  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    sortProducts(order);
  };

  const sortProducts = (order) => {
    let sortedProducts = [...product];
    if (order === "asc") {
      sortedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
    } else if (order === "desc") {
      sortedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
    }
    setProduct(sortedProducts);
  };


  //FILTER
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (["gender", "category", "shape", "size", "cut", "clarity", "origin", "collection"].includes(type)) {
        if (updatedFilters[type].includes(value)) {
          updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
        } else {
          updatedFilters[type].push(value);
        }
      }
      return updatedFilters;
    });
  };


  const removeFilterTag = (type, value) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (Array.isArray(updatedFilters[type])) {
        updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
      } else {
        updatedFilters[type] = "";
      }
      return updatedFilters;
    });
  };


  const clearAllFilters = () => {
    setFilters({
      gender: [],
      category: [],
      shape: [],
      size: [],
      cut: [],
      clarity: [],
      origin: [],
      collection: [],
    });
  };

  const applyFilters = (products) => {
    let filteredProducts = [...products];

    // gender
    if (filters.gender.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.gender.includes(product.gender));
    }

    // category
    if (filters.category.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.category.includes(product.category));
    }


    // shape
    if (filters.shape.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.shape.includes(product.shape));
    }

    // size
    if (filters.size.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.size.includes(product.size));
    }

    // cut
    if (filters.cut.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.cut.includes(product.cut));
    }

    // clarity
    if (filters.clarity.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.clarity.includes(product.clarity));
    }

    // origin
    if (filters.origin.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.origin.includes(product.origin));
    }

    // collection
    if (filters.collection.length > 0) {
      filteredProducts = filteredProducts.filter((product) => filters.collection.includes(product.collection));
    }

    return filteredProducts;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = product.slice(startIndex, endIndex);
  const totalPage = Math.ceil(product.length / pageSize);

  return (
    <div>
      <Header />
      <Container className="search-product-container">
        <Row>
          <Col md={4}>
            <div className="filter-section">
              <div className="filter-section-header">
                <h3>Bộ lọc</h3>
                <Button
                  onClick={clearAllFilters}
                  className="clear-button"
                >
                  Xóa tất cả
                </Button>
              </div>

              <div className="tag-container">
                {Object.keys(filters).map((key) => {
                  if (Array.isArray(filters[key])) {
                    return filters[key].map((value) => (
                      <Tag
                        key={`${key}-${value}`}
                        closable
                        onClose={() => removeFilterTag(key, value)}
                        className="tag"
                      >
                        {value}
                      </Tag>
                    ));
                  } else if (filters[key]) {
                    return (
                      <Tag
                        key={`${key}-${filters[key]}`}
                        closable
                        onClose={() => removeFilterTag(key, filters[key])}
                        className="tag"
                      >
                        {filters[key]}
                      </Tag>
                    );
                  }
                  return null;
                })}
              </div>



              <Form.Group>
                <Form.Label>Giới Tính</Form.Label>
                {["Nữ", "Nam"].map((gender) => (
                  <Form.Check
                    key={gender}
                    type="checkbox"
                    label={gender}
                    value={gender}
                    checked={filters.gender.includes(gender)}
                    onChange={(e) => handleFilterChange("gender", e.target.value)}
                    className="form-check"
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Chủng Loại</Form.Label>
                {["Nhẫn", "Vòng cổ", "Khuyên tay", "Vòng tay"].map((category) => (
                  <Form.Check
                    key={category}
                    type="checkbox"
                    label={category}
                    value={category}
                    checked={filters.category.includes(category)}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                    className="form-check"
                  />
                ))}
              </Form.Group>

              <Form.Group>
                <Form.Label>Hình dạng</Form.Label>
                {["Round", "Oval", "Cushion", "Pear", "Emerald", "Princess", "Radiant", "Heart", "Marquise", "Assher"].map((shape) => (
                  <Form.Check
                    key={shape}
                    type="checkbox"
                    label={shape}
                    value={shape}
                    checked={filters.shape.includes(shape)}
                    onChange={(e) => handleFilterChange("shape", e.target.value)}
                    className="form-check"
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Kích thước</Form.Label>
                {["1", "2", "3"].map((size) => (
                  <Form.Check
                    key={size}
                    type="checkbox"
                    label={size}
                    value={size}
                    checked={filters.size.includes(size)}
                    onChange={(e) => handleFilterChange("size", e.target.value)}
                    className="form-check"
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Độ cắt</Form.Label>
                {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((cut) => (
                  <Form.Check
                    key={cut}
                    type="checkbox"
                    label={cut}
                    value={cut}
                    checked={filters.cut.includes(cut)}
                    onChange={(e) => handleFilterChange("cut", e.target.value)}
                    className="form-check"
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Độ tinh khiết</Form.Label>
                {["VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"].map((clarity) => (
                  <Form.Check
                    key={clarity}
                    type="checkbox"
                    label={clarity}
                    value={clarity}
                    checked={filters.clarity.includes(clarity)}
                    onChange={(e) => handleFilterChange("clarity", e.target.value)}
                    className="form-check"
                  />
                ))}
              </Form.Group>
              <Form.Group>
                <Form.Label>Nguồn gốc</Form.Label>
                {["Tự nhiên", "Nhân tạo"].map((origin) => (
                  <Form.Check
                    key={origin}
                    type="checkbox"
                    label={origin}
                    value={origin}
                    checked={filters.origin.includes(origin)}
                    onChange={(e) => handleFilterChange("origin", e.target.value)}
                    className="form-check"
                  />
                ))}
              </Form.Group>
            </div>
          </Col>
          <Col md={8}>
            <h1>Kết quả tìm kiếm</h1>
            <Col xs={2}>
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
