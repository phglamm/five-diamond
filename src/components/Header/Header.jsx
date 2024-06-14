import logo from "/assets/images/Logo/logo.png";
import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";
import { ImCart } from "react-icons/im";
import "primeicons/primeicons.css";
import BasicButton from "../Button/myButton";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DropdownContent from "./DropdownContent/DropdownContent";


export default function Header() {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

  const handleMouseOverProduct = () => {
    setIsProductDropdownOpen(true);
  };
  const handleMouseLeaveProduct = () => {
    setIsProductDropdownOpen(false);
  };

  const handleMouseOverCart = () => {
    setIsCartDropdownOpen(true);
  };
  const handleMouseLeaveCart = () => {
    setIsCartDropdownOpen(false);
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container fluid className="Header" id="header">
      <Row className="Top-header">
<<<<<<< HEAD
        {user && (user.role === "SALES" || user.role === "DELIVERY") ? (
          <Col xs={4} className="Header-left">
            <div className="Header-left-component">
              <Link to={routes.saleStaff} className="sale-staff">
                <p>Theo Dõi Đơn Hàng Cần Xử Lý</p>
              </Link>
            </div>
            <div className="Header-left-component">
              <Link to={routes.deliveryStaff} className="sale-staff">
                <p>Theo Dõi Đơn Hàng Cần Giao Đi</p>
              </Link>
            </div>
          </Col>
        ) : (
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
        )}

=======
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
>>>>>>> newnhat
        <Col xs={3} className="Header-logo">
          <Link to={routes.home}>
            <img src={logo} alt="Logo" />
          </Link>
        </Col>
        <Col xs={2} className="Header-search">
          <SearchBar
            placeholder={"Tìm Kiếm Sản Phẩm"}
            icon={"pi pi-search"}
          />
        </Col>

        {user ? (
          <Col xs={3} className="Header-login">
            <Link to={routes.profile} className="profile-name">
<<<<<<< HEAD
              <span
                className="pi pi-user"
                style={{ fontSize: "1.5rem" }}
              ></span>
              <p className="username">
                {user.firstname} {user.lastname}
              </p>
=======
              <div
                className="cart-wrapper"
                // onMouseOver={handleMouseOverCart}
                // onMouseLeave={handleMouseLeaveCart}
              >
                <Link to={routes.cart} className="cart-button">
                  <ImCart className="cart-icon" />
                </Link>
                {/* {isCartDropdownOpen && <CartDropdown />} */}
              </div>
              <span className="pi pi-user" style={{ fontSize: "1.5rem" }}></span>
              <p className="username">{user.firstname} {user.lastname}</p>
>>>>>>> newnhat
            </Link>
            <Link to={routes.login}>
              <BasicButton
                text={"Đăng Xuất"}
                icon={"pi pi-sign-in"}
                onClick={handleLogout}
              />
            </Link>
          </Col>
        ) : (
          <Col xs={3} className="Header-login">
            <Link to={routes.login}>
              <BasicButton text={"Đăng nhập"} icon={"pi pi-user"} />
            </Link>
            <Link to={routes.register}>
<<<<<<< HEAD
              <BasicButton
                text={"Đăng ký"}
                icon={"pi pi-sign-in"}
              ></BasicButton>
=======
              <BasicButton text={"Đăng ký"} icon={"pi pi-sign-in"} />
>>>>>>> newnhat
            </Link>
          </Col>
        )}
      </Row>

      <Row className="Bottom-header">
        <Col className="Header-navigation">
          <Link to={routes.about}>Giới Thiệu</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.bst}>Bộ Sưu Tập</Link>
        </Col>
        <Col
          className="Header-navigation dropdownContainer"
          onMouseOver={handleMouseOverProduct}
          onMouseLeave={handleMouseLeaveProduct}
        >
          <Link to="">Sản Phẩm Về Kim Cương</Link>
          {isProductDropdownOpen && (
            <div className="dropdownWrapper">
              <DropdownContent />
            </div>
          )}
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
      </Row>
    </Container>
  );
}
