import "../DropdownContent/DropdownContent.css";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { routes } from "../../../routes";
export default function DropdownContent() {
  return (
    <Row className="dropdown">
      <Col xs={4} md={3} className="dropdownItem">
        <div className="dropdownLink">
          <h3 className="dropdownLink-tilte">Trang Sức Kim Cương</h3>
          <Link to={routes.nhan}>Nhẫn Kim Cương</Link>
          <Link to={routes.vongco}>Dây Chuyền Kim Cương</Link>
          <Link to={routes.khuyentai}>Khuyên tai kim cương</Link>
          <Link to={routes.vongtay}>Lắc Tay, Vòng Tay Kim Cương</Link>
        </div>
      </Col>
      {/* <Col xs={4} md={3} className="dropdownItem">
        <div className="dropdownLink">
          <h3>Mức Giá</h3>
          <Link to="">5-10 Triệu</Link>
          <Link to="">10-20 Triệu</Link>
          <Link to="">20-30 Triệu</Link>
          <Link to="">30-50 Triệu</Link>
          <Link to="">50-100 Triệu</Link>
          <Link to="">100-300 Triệu</Link>
        </div>
      </Col> */}
      <Col xs={4} md={6} className="dropdownItem">
        <img
          src="https://file.hstatic.net/200000567741/collection/3_trang_suc_kim_cuong_thuong_hang_1920x450_95418a2d9fd14a9abd22e71a7d3cb316.jpeg"
          alt=""
        />
      </Col>
    </Row>
  );
}
