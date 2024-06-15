import React from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../productCard/productCard";
import "./rowProduct.css";

export default function RowProduct({ banner }) {
  return (
    <Row className="rowProduct">
      <Col xs={6}>
        <div className="rowBanner">
          <img src={banner} alt="" />
        </div>
      </Col>
      <Col xs={2}>
        <ProductCard
          img={product1}
          text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
          price={"22,000,000đ"}
        ></ProductCard>
      </Col>
      <Col xs={2}>
        <ProductCard
          img={product1}
          text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
          price={"22,000,000đ"}
        ></ProductCard>
      </Col>
      <Col xs={2}>
        <ProductCard
          img={product1}
          text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
          price={"22,000,000đ"}
        ></ProductCard>
      </Col>
    </Row>
  );
}
