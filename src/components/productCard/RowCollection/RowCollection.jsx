import { Col, Row } from "react-bootstrap";
import "./RowCollection.css";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
export default function RowCollection({
  collectionImage,
  collectionTitle,
  collectionDesc,
  collectionLink,
}) {
  return (
    <div className="row-Collection">
      <Row className="Collection">
        <Col xs={6} className="row-center">
          <img src={collectionImage} alt="" />
        </Col>
        <Col xs={6} className="row-center">
          <h4 className="Collection-title">{collectionTitle}</h4>
          <p className="Collection-desc">{collectionDesc}</p>
          <Link to={collectionLink} className="collectionLink">
            <Button
              label="Xem Chi Tiết"
              outlined
              className="collectionButton"
            />
          </Link>
        </Col>
      </Row>
    </div>
  );
}
