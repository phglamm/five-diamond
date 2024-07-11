import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";
import "primeicons/primeicons.css";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import { selectUser } from "../../redux/features/counterSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import DropdownContent from "./DropdownContent/DropdownContent";
import { Button } from "antd";

import DropdownProfile from "./DropdownContent/DropdownProfile";

export default function Header() {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMouseOverProduct = () => {
    setIsProductDropdownOpen(true);
  };
  const handleMouseLeaveProduct = () => {
    setIsProductDropdownOpen(false);
  };

  const handleMouseOverProfile = () => {
    setIsProfileDropdownOpen(true);
  };
  const handleMouseLeaveProfile = () => {
    setIsProfileDropdownOpen(false);
  };

  const user = useSelector(selectUser);

  return (
    <Container fluid className="Header" id="header">
      <Row className="Top-header">
        <Col xs={4} className="Header-left">
          <div className="Header-left-component">
            <i className="pi pi-phone"></i>
            <p>1800 1168</p>
          </div>
          <div className="Header-left-component">
            <i className="pi pi-building"></i>
            <p>HỆ THỐNG SHOWROOM</p>
          </div>
          <div className="Header-left-component">
            <i className="pi pi-map"></i>
            <p>HỆ THỐNG PHÂN PHỐI</p>
          </div>
        </Col>

        <Col xs={3} className="Header-logo">
          <Link to={routes.home}>
            <img
              src={
                "https://drive.google.com/thumbnail?id=1TID9g_LphvHeN1htPBH_0zoxe0o1CqaE&sz=w1000"
              }
              alt=""
            />
          </Link>
        </Col>
        <Col xs={2} className="Header-search">
          <SearchBar
            placeholder={"Tìm kiếm sản phẩm ..."}
            icon={"pi pi-search"}
          />
        </Col>

        {user ? (
          <Col
            className="Header-navigation dropdownContainer"
            onMouseOver={handleMouseOverProfile}
            onMouseLeave={handleMouseLeaveProfile}
          >
            <span
              className="pi pi-user"
              style={{ fontSize: "1.5rem", paddingRight: "10px" }}
            ></span>
            <div
              style={{
                marginLeft: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {user.firstname} {user.lastname}
            </div>
            {isProfileDropdownOpen && (
              <div className="dropdownWrapper">
                <DropdownProfile />
              </div>
            )}
          </Col>
        ) : (
          <Col xs={2} className="Header-login">
            <Link to={routes.login}>
              <Button className="authen-button">Đăng nhập</Button>
            </Link>
            <Link to={routes.register}>
              <Button className="authen-button">Đăng ký</Button>
            </Link>
          </Col>
        )}
      </Row>

      <Col className="Bottom-header">
        <Col className="Header-navigation">
          <Link to={routes.about}>Giới Thiệu</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.bst}>Bộ Sưu Tập</Link>
        </Col>
        <Col
          className="Header-navigation" // <--- Changed to div and added class
          onMouseLeave={handleMouseLeaveProduct} // <--- Added onMouseLeave to parent container
        >
          <div
            className="dropdownContainer"
            onMouseOver={handleMouseOverProduct}
          >
            <Link to="">Sản Phẩm Về Kim Cương</Link>
            {isProductDropdownOpen && (
              <div className="dropdownWrapper">
                <DropdownContent />
              </div>
            )}
          </div>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.size}>Hướng Dẫn Đo Ni</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.blog}>Kiến Thức</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.diamondprice}>Bảng Giá Kim Cương</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.faq}>Câu Hỏi Thường Gặp</Link>
        </Col>
      </Col>
    </Container>
  );
}
