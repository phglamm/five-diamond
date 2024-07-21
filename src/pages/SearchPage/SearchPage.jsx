import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import api from "../../config/axios";
import ProductCard from "../../components/productCard/productCard";
import { Select } from "antd";

function SearchPage() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch products and categories
  async function fetchProduct() {
    try {
      const response = await api.get("product-line");
      setProduct(response.data);
      // console.log(response.data);

      const uniqueCategories = [
        ...new Set(response.data.map((item) => item.category.id)),
      ];
      const categoriesData = uniqueCategories.map((id) => {
        const category = response.data.find(
          (item) => item.category.id === id
        ).category;
        return { id: category.id, name: category.name };
      });
      setCategories(categoriesData);
    } catch (error) {
      console.error("Đã có lỗi:", error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  // Function to group products into rows with 6 products each
  const groupProductsInRows = (products, productsPerRow) => {
    const rows = [];
    for (let i = 0; i < products.length; i += productsPerRow) {
      rows.push(products.slice(i, i + productsPerRow));
    }
    return rows;
  };

  // Function to filter products by selected category
  const filteredProducts = selectedCategory
    ? product.filter((item) => item.category.id === selectedCategory)
    : product;

  const productRows = groupProductsInRows(filteredProducts, 6);

  return (
    <div>
      <Header />
      <Container>
        {/* Category filter */}
        <div className="category-filter">
          <Select
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        {/* Display products */}
        {productRows.map((row, rowIndex) => (
          <Row key={rowIndex} className="product-card-row">
            {row.map((item) => (
              <Col key={item.id} className="product-card-item" md={2} xs={6}>
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
        ))}
      </Container>
      <Footer />
    </div>
  );
}

export default SearchPage;
