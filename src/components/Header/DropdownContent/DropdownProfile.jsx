import React from "react";
import { Col } from "react-bootstrap";
import { ShoppingCartOutlined, UserOutlined, TruckOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../../redux/features/counterSlice";
import "./DropdownProfile.css";

export default function DropdownProfile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dropdownProfile">
      <Col xs={12} className="Header-profile">

        <div className="profile-title-wrapper">
          <Link to={routes.profile} className="profile-wrapper">
            <UserOutlined className="profile-icon" />
            <p>THÔNG TIN CÁ NHÂN</p>
          </Link>
        </div>
        <div className="profile-title-wrapper">
          <Link to={routes.cart} className="profile-wrapper">
            <ShoppingCartOutlined className="profile-icon" />
            <p>GIỎ HÀNG</p>
          </Link>
        </div>
        <div className="profile-title-wrapper">
          <Link to={routes.orderhistory} className="profile-wrapper">
            <TruckOutlined className="profile-icon" />
            <p>LỊCH SỬ MUA HÀNG</p>
          </Link>
        </div>
        <div className="profile-title-wrapper">
          <Link to={routes.login} className="profile-wrapper" onClick={handleLogout}>
            <LogoutOutlined className="profile-icon" />
            <p>ĐĂNG XUẤT</p>
          </Link>
        </div>
      </Col>
    </div>
  );
}
