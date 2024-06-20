import "../DropdownContent/DropdownContent.css";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
export default function DropdownContent() {
  return (
    <Row className="dropdown">
      <Col xs={4} md={3} className="dropdownItem">
        <div className="dropdownLink">
          <h3>Trang Sức Kim Cương</h3>
          <Link to="">Nhẫn Kim Cương</Link>
          <Link to="">Vòng cổ Kim Cương</Link>
          <Link to="">Khuyên tai kim cương</Link>
          <Link to="">Mặt Dây Chuyền Kim Cương</Link>
          <Link to="">Lắc Tay, Vòng Tay Kim Cương</Link>
          <Link to="">Vỏ Nhẫn Kim Cương</Link>
          <Link to="">Vỏ Mặt Dây Chuyền Kim Cương</Link>
        </div>
      </Col>
      <Col xs={4} md={3} className="dropdownItem">
        <div className="dropdownLink">
          <h3>Mức Giá</h3>
          <Link to="">5-10 Triệu</Link>
          <Link to="">10-20 Triệu</Link>
          <Link to="">20-30 Triệu</Link>
          <Link to="">30-50 Triệu</Link>
          <Link to="">50-100 Triệu</Link>
          <Link to="">100-300 Triệu</Link>
        </div>
      </Col>
      <Col xs={4} md={6} className="dropdownItem">
        {/* <img src={dropdownimg} alt="" /> */}
      </Col>
    </Row>
  );
}
