import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./OrderConfirmPage.css";
import { Container } from "react-bootstrap";
import { EnvironmentFilled } from "@ant-design/icons";

export default function OrderConfirmation() {
  const [order, setOrder] = useState({ id: "", price: "", shipmentId: "" });

  useEffect(() => {
    // Mock API call to fetch order details
    const fetchOrderDetails = async () => {
      // Replace with actual API call
      const response = await fetch("/api/order"); // Example endpoint
      const data = await response.json();
      setOrder({ id: data.id, price: data.price, shipmentId: data.shipmentId });
    };

    fetchOrderDetails();
  }, []);

  return (
    <Container fluid className="success-payment-wrapper">
      <div className="success-payment">
        <div className="success-payment-logo">
          <img
            src="https://drive.google.com/thumbnail?id=1TID9g_LphvHeN1htPBH_0zoxe0o1CqaE&sz=w1000"
            alt="Logo"
          />
        </div>
        <FontAwesomeIcon icon={faCircleCheck} className="success-check-icon" />
        <h1 className="success-payment-title">ĐẶT HÀNG THÀNH CÔNG</h1>
        <div className="success-payment-info">
          {/* <p>Mã đơn hàng: {order.id}</p>

          <p>Mã vận chuyển: {order.shipmentId}</p>

          <p>Đã chi trả: {order.price}</p> */}
        </div>
        <div className="success-payment-buttons">
          <Link to="/lich-su-mua-hang" className="btn order-details">
            <span className="btn-content">
              <FontAwesomeIcon icon={faArrowLeft} className="btn-icon" />
              <span>Chi tiết đơn hàng</span>
            </span>
          </Link>
          <Link to="/" className="btn continue-shopping">
            <span className="btn-content">
              <span>Tiếp tục mua hàng</span>
              <FontAwesomeIcon icon={faArrowRight} className="btn-icon" />
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
}
