import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import "./CollectionSet.css";
import ProductCard from "../../components/productCard/productCard";
import api from "../../config/axios";
import { Link, useParams } from "react-router-dom";

function CollectionDetail() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null); // Initialize as null
  const [product, setProduct] = useState([]);

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

  // Filter products by collection
  const productByCollection = product.filter(
    (product) => product.collection?.id === collection?.id
  );

  // Check loading or error states before rendering

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
        <Row>
          {productByCollection.map((product) => (
            <Col key={product.id}>
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
      </Container>
      <Footer />
    </div>
  );
}

export default CollectionDetail;
