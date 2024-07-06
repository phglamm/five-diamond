import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import Banner from "../../../components/Banner/banner";
import api from '../../../config/axios';

export default function NecklaceProductPage() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`);
  };

  // Fetch and filter products
  async function fetchProduct() {
    const response = await api.get('http://157.245.145.162:8080/api/product-line');
    // Filter products with name containing "vòng tay"
    const filteredData = response.data.filter(item => item.name.toLowerCase().includes("bông tai"));
    setProduct(filteredData);
    console.log(filteredData);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const filteredProducts = selectedCategory
    ? product.filter((product) => product.category === selectedCategory)
    : product;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPage = Math.ceil(filteredProducts.length / pageSize);

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
          pic1={"https://drive.google.com/thumbnail?id=1_6da1JV9G2H7NgXhg32Pa2uCLlSmXKAN&sz=w1000"}
          pic2={"https://drive.google.com/thumbnail?id=1Qt-XgPqKgIPbSicW0gvSUZq9V582tJKb&sz=w1000"}
          pic3={"https://drive.google.com/thumbnail?id=1M_88t0hYEllOUjTcq8hnxiBDBGNRQxtp&sz=w1000"}
          pic4={"https://drive.google.com/thumbnail?id=1_6da1JV9G2H7NgXhg32Pa2uCLlSmXKAN&sz=w1000"}
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
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
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