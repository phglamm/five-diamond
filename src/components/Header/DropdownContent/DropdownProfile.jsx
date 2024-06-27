import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { ImCart } from "react-icons/im";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import { useSelector } from "react-redux";
import { selectUser, logout } from "../../../redux/features/counterSlice";
import { useDispatch } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import "./DropdownProfile.css";

export default function DropdownProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dropdownProfile">
      <Col xs={12} className="Header-login">
        <Link to={routes.profile} className="profile-name">
          <span className="pi pi-user" style={{ fontSize: "1.5rem" }}></span>
          <p className="username">
            Thông tin tài khoản
          </p>
        </Link>
        <div className="cart-wrapper">
          <Link to={routes.cart} className="cart-button">
            <ImCart className="cart-icon" />
            <p style={{fontWeight:"bold"}}>Giỏ hàng</p>
          </Link>
        </div>
        <Link to={routes.login} className="logout-button">
          <IoLogOut />
          <p onClick={handleLogout} style={{fontWeight:"bold"}}>Đăng Xuất</p>
        </Link>
      </Col>
    </div>
  );
}
