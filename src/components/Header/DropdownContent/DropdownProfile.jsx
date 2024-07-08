import { useState } from "react";
import { Col } from "react-bootstrap";
import {
  ShoppingCartOutlined,
  UserSwitchOutlined,
  TruckOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { routes } from "../../../routes";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../../../redux/features/counterSlice";
import "./DropdownProfile.css";

export default function DropdownProfile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={`dropdownProfile ${dropdownOpen ? "open" : ""}`}>
      <Col xs={12} className="Header-profile">
        <div className="profile-title-wrapper">
          <Link to={routes.profile} className="profile-wrapper">
            <UserSwitchOutlined className="profile-icon" />
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

        {/* Conditional rendering based on user role */}
        {user && user.role === "ADMIN" && (
          <div className="profile-title-wrapper">
            <Link to={routes.adminchart} className="profile-wrapper">
              <DashboardOutlined className="profile-icon" />
              <p>TRANG QUẢN TRỊ</p>
            </Link>
          </div>
        )}
        {user && user.role === "MANAGER" && (
          <div className="profile-title-wrapper">
            <Link to={routes.adminchart} className="profile-wrapper">
              <TeamOutlined className="profile-icon" />
              <p>TRANG QUẢN LÝ</p>
            </Link>
          </div>
        )}

        <div className="profile-title-wrapper">
          <Link
            to={routes.login}
            className="profile-wrapper"
            onClick={handleLogout}
          >
            <LogoutOutlined className="profile-icon" />
            <p>ĐĂNG XUẤT</p>
          </Link>
        </div>
      </Col>
    </div>
  );
}
