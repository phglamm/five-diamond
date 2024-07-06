import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Col, Container, Row, Form } from "react-bootstrap";
import "./CollectionSet.css";
import ProductCard from "../../components/productCard/productCard";
import api from "../../config/axios";
import { Link, useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function CollectionDetail() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const productsPerPage = 8;

  async function fetchCollectionById() {
    try {
      const response = await api.get(`collection/${id}`);
      setCollection(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchCollectionById();
  }, [id]);

  async function fetchProductByCollection() {
    try {
      const response = await api.get("product-line");
      setProduct(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchProductByCollection();
  }, [id]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filterProducts = (products) => {
    if (!filter) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const sortProducts = (products) => {
    if (sort === "price-asc") {
      return products.sort((a, b) => a.finalPrice - b.finalPrice);
    }
    if (sort === "price-desc") {
      return products.sort((a, b) => b.finalPrice - a.finalPrice);
    }
    if (sort === "name-asc") {
      return products.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-desc") {
      return products.sort((a, b) => b.name.localeCompare(a.name));
    }
    return products;
  };

  const productByCollection = sortProducts(
    filterProducts(
      product.filter((product) => product.collection?.id === collection?.id)
    )
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productByCollection.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productByCollection.length / productsPerPage);

  const handlePageChange = (event, value) => setCurrentPage(value);

  if (!collection) {
    return <div>Không có bộ sưu tập này</div>;
  }

  return (
    <div>
      <Header />
      <Container>
        <div className="set-banner">
          <img src={collection.imgURL} alt={collection.name} />
        </div>
        <h3 className="collection-set-header">{collection.name}</h3>
        <div className="filter-sort-container">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={filter}
            onChange={handleFilterChange}
          />
          <Form.Select value={sort} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </Form.Select>
        </div>
        <Row>
          {currentProducts.map((product) => (
            <Col key={product.id} sm={6} md={3}>
              <Link to={`/chi-tiet-san-pham/${product.id}`}>
                <ProductCard
                  img={product.imgURL}
                  text={product.name}
                  price={product.finalPrice}
                  pageType="guest-page"
                  id={product.id}
                />
              </Link>
            </Col>
          ))}
        </Row>
        <Stack spacing={2} alignItems="center">
          <Pagination
            className="custom-pagination"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            classes={{
              root: 'pagination-root',
              ul: 'pagination-ul',
              item: 'pagination-item',
              outlined: 'pagination-outlined',
              rounded: 'pagination-rounded',
              selected: 'pagination-selected',
              ellipsis: 'pagination-ellipsis',
              textPrimary: 'pagination-text-primary',
              textSecondary: 'pagination-text-secondary',
            }}
          />
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

export default CollectionDetail;
