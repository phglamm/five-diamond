import { useState, useEffect } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import Banner from "../../../components/Banner/banner";
import api from "../../../config/axios";

export default function PiercingProductPage() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const response = await api.get("product-line/available");
    setProduct(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    fetchProduct();
  }, []);
  const filteredProducts = selectedCategory
    ? product.filter((product) => product.category === selectedCategory)
    : product;

  // const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPage = Math.ceil(filteredProducts.length / pageSize);

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
          className="cuff-product-banner"
          pic1={
            "https://drive.google.com/thumbnail?id=1_6da1JV9G2H7NgXhg32Pa2uCLlSmXKAN&sz=w1000"
          }
          pic2={
            "https://drive.google.com/thumbnail?id=1Qt-XgPqKgIPbSicW0gvSUZq9V582tJKb&sz=w1000"
          }
          pic3={
            "https://drive.google.com/thumbnail?id=1M_88t0hYEllOUjTcq8hnxiBDBGNRQxtp&sz=w1000"
          }
          pic4={
            "https://drive.google.com/thumbnail?id=1_6da1JV9G2H7NgXhg32Pa2uCLlSmXKAN&sz=w1000"
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
          {specialpro.map((item, index) => (
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
