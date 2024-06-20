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
          img={
            "https://cdn.pnj.io/images/thumbnails/300/300/detailed/199/sp-gnddddw009977-nhan-nam-kim-cuong-vang-trang-14k-pnj-1.png"
          }
          text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
          price={"22,000,000đ"}
        ></ProductCard>
      </Col>
      <Col xs={2}>
        <ProductCard
          img={
            "https://cdn.pnj.io/images/thumbnails/300/300/detailed/199/sp-gnddddw009977-nhan-nam-kim-cuong-vang-trang-14k-pnj-1.png"
          }
          text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
          price={"22,000,000đ"}
        ></ProductCard>
      </Col>
      <Col xs={2}>
        <ProductCard
          img={
            "https://cdn.pnj.io/images/thumbnails/300/300/detailed/199/sp-gnddddw009977-nhan-nam-kim-cuong-vang-trang-14k-pnj-1.png"
          }
          text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
          price={"22,000,000đ"}
        ></ProductCard>
      </Col>
    </Row>
  );
}
