import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { ImCart } from "react-icons/im";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import { useSelector } from "react-redux";
import { selectUser, logout } from "../../../redux/features/counterSlice";
import { useDispatch } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import "./DropdownProfile.css";

export default function DropdownProfile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={`dropdownProfile ${dropdownOpen ? "open" : ""}`}>
      <Col xs={12} className="Header-profile">
        <Link to={routes.profile} className="profile-name">
          <span className="pi pi-user" style={{ fontSize: "1.5rem" }}></span>
          <p className="username">
            THÔNG TIN TÀI KHOẢN
          </p>
        </Link>
        <div className="order-history-wrapper">
          <Link to={routes.orderhistory}>
            <TbTruckDelivery style={{ fontSize: '2rem'}} />
            <p style={{ fontWeight: "bold", paddingTop: '15px', paddingLeft: '10px', fontSize: '15px' }}>
              LỊCH SỬ MUA HÀNG
            </p>
          </Link>
        </div>

        <Link to={routes.login} className="logout-button">
          <IoLogOut style={{ fontSize: '2rem', marginLeft: '15px' }} />
          <p onClick={handleLogout} style={{ fontWeight: "bold", paddingTop: '15px', paddingLeft: '10px', fontSize: '15px' }}>ĐĂNG XUẤT</p>
        </Link>
      </Col>
    </div>
  );
}
