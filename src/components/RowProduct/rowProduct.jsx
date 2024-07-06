/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import ProductCard from "../productCard/productCard";
import "./rowProduct.css";

export default function RowProduct({ banner, products }) {
  // Filter products based on the collection's imgURL
  const filteredProducts = products.filter(
    (product) =>
      product.collection !== null && product.collection.imgURL === banner
  );

  return (
    <Row className="rowProduct">
      <Col xs={6}>
        <div className="rowBanner">
          <img src={banner} alt="Collection Banner" />
        </div>
      </Col>
      {filteredProducts.slice(0, 3).map((product, index) => (
        <Col key={index} xs={2}>
          <ProductCard
            id={product.id}
            img={product.imgURL} // Assuming imgURL is part of product data
            text={product.name} // Assuming name is part of product data
            price={`${product.finalPrice.toLocaleString()}đ`} // Assuming finalPrice is part of product data
          />
        </Col>
      ))}
    </Row>
  );
}
