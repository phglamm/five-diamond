import React, { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
// import Banner from "../../../components/Banner/banner";

export default function SearchProduct() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(""); // Add state for sorting order
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
    price: ""
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
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setProduct(sortedProducts);
  };

  //FILTER
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      if (type === "gender" || type === "category") {
        if (updatedFilters[type].includes(value)) {
          updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
        } else {
          updatedFilters[type].push(value);
        }
      } else if (type === "price") {
        updatedFilters[type] = value;
      }
      return updatedFilters;
    });
  };

  const applyFilters = (products) => {
    let filteredProducts = [...products];

    // gender
    if (filters.gender.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.gender.includes(product.gender)
      );
    }

    //  category
    if (filters.category.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.category.includes(product.category)
      );
    }

    //  price
    if (filters.price) {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;
        switch (filters.price) {
          case "under1m":
            return price < 1000000;
          case "1mto2m":
            return price >= 1000000 && price < 2000000;
          case "2mto3m":
            return price >= 2000000 && price < 3000000;
          case "3mto5m":
            return price >= 3000000 && price < 5000000;
          case "above5m":
            return price >= 5000000;
          default:
            return true;
        }
      });
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
      <Container>
        <h1>Kết quả tìm kiếm</h1>

        <Row>
          <Col md={3}>
            <h3>Bộ lọc</h3>
            <Form.Group>
              <Form.Label>Giới Tính</Form.Label>
              {["Nữ", "Nam"].map((gender) => (
                <Form.Check
                  key={gender}
                  type="checkbox"
                  label={gender}
                  value={gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
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
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                />
              ))}
            </Form.Group>
            <Form.Group>
              <Form.Label>Giá</Form.Label>
              {[
                { label: "Dưới 1tr", value: "under1m" },
                { label: "Từ 1tr đến 2tr", value: "1mto2m" },
                { label: "Từ 2tr đến 3tr", value: "2mto3m" },
                { label: "Từ 3tr đến 5tr", value: "3mto5m" },
                { label: "Trên 5tr", value: "above5m" },
              ].map((price) => (
                <Form.Check
                  key={price.value}
                  type="radio"
                  name="price"
                  label={price.label}
                  value={price.value}
                  onChange={(e) => handleFilterChange("price", e.target.value)}
                />
              ))}
            </Form.Group>
          </Col>


          <Col md={9}>
            <Col xs={2}>
              <Form.Select aria-label="Sort by price" onChange={handleSortChange} value={sortOrder}>
                <option value="none">Sort by</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </Form.Select>
            </Col>

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
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
