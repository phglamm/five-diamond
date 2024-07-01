import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckOut.css";
import { routes } from "../../routes";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { order } from "../../redux/features/orderSlice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default function CheckOut() {
  const location = useLocation();

  const { cartItems, finalTotal } = location.state || {
    cartItems: [],
    finalTotal: 0,
  };
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const validateForm = () => {
    const formErrors = {};
    const form = document.forms[0];

    // Kiểm tra họ tên
    const nameRegex = /^[A-Z][a-zA-Z\s]*$/;
    if (!form.name.value) {
      formErrors.name = "Họ Tên là bắt buộc";
    } else if (!nameRegex.test(form.name.value)) {
      formErrors.name = "Họ Tên chỉ được chứa chữ cái viết hoa, không có số và ký tự đặc biệt";
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]+$/;
    if (!form.phone.value) {
      formErrors.phone = "Điện Thoại là bắt buộc";
    } else if (!phoneRegex.test(form.phone.value)) {
      formErrors.phone = "Điện Thoại chỉ được chứa số";
    }

    // Kiểm tra địa chỉ
    if (!address) {
      formErrors.address = "Địa chỉ là bắt buộc";
    }

    setErrors(formErrors);

    // Hiển thị lỗi bằng toast
    Object.keys(formErrors).forEach((key) => {
      toast.error(formErrors[key]);
    });

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (validateForm()) {
      try {
        const form = event.currentTarget;
        const data = {
          fullname: form.name.value,
          phone: form.phone.value,
          address: form.address.value,
          note: form.note.value,
          cartItems: cartItems,
          totalAmount: finalTotal,
        };
        const amount = String(finalTotal);
        console.log(amount);

        const response = await api.post("wallet/vnpay", {
          amount: amount,
        });
        console.log(data);
        console.log(response.data);
        toast.success("Đặt Hàng Thành Công");
        window.location.assign(response.data);
        dispatch(order(data));
      } catch (error) {
        toast.error("Đặt Hàng Thất bại");
        console.log(error.response.data);
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="page-container checkout-page">
      <Header />
      <Container className="container">
        <Form onSubmit={handleSubmit}>
          <Row className="Rowall">
            <Col md={8} className="Col8">
              <h4>THÔNG TIN NGƯỜI MUA</h4>
              <Form.Group
                as={Row}
                controlId="formFullName"
                className="align-items-center"
              >
                <Form.Label column md={2} className="form-label">
                  Họ Tên:
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Nhập họ tên"
                    isInvalid={!!errors.name}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback> */}
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPhoneNumber"
                className="align-items-center"
              >
                <Form.Label column md={2} className="form-label">
                  Điện Thoại:
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    name="phone"
                    type="text"
                    placeholder="Nhập số điện thoại"
                    isInvalid={!!errors.phone}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback> */}
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formAddress"
                className="align-items-center"
              >
                <Form.Label column md={2} className="form-label">
                  Địa Chỉ:
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    name="address"
                    type="text"
                    placeholder="Nhập địa chỉ"
                    isInvalid={!!errors.address}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {/* {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )} */}
                </Col>
              </Form.Group>

              <h4>HÌNH THỨC THANH TOÁN</h4>
              <Form.Group controlId="formPaymentMethod">
                <h5>•Thanh toán chuyển khoản</h5>
                <div>
                  <p>
                    Quý khách vui lòng kiểm tra sự nguyên vẹn của gói hàng và
                    tem niêm phong, trước khi thanh toán tiền mặt và nhận hàng
                    <br />
                    + Tên tài khoản: Công ty Cổ phần 10TRACK
                    <br />
                    + Số tài khoản: 00000000000000000000
                    <br />+ Ngân hàng: Vietcombank – Chi nhánh Tân Định, TPHCM
                  </p>
                </div>
              </Form.Group>
              <div className="checkout-note">
                <h4>GHI CHÚ</h4>
                <Form.Group
                  as={Row}
                  controlId="formNote"
                  className="align-items-center"
                >
                  <Col md={10}>
                    <Form.Control
                      as="textarea"
                      name="note"
                      rows={3}
                      placeholder="Để lại lời nhắn"
                    />
                  </Col>
                </Form.Group>
              </div>
            </Col>

            <Col md={4}>
              <h4>THÔNG TIN ĐƠN HÀNG</h4>

              {cartItems.length === 0 ? (
                <Alert variant="info">Giỏ hàng trống.</Alert>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <img
                      src={item.productLine.imgURL}
                      alt={item.productLine.name}
                      className="checkout-image"
                    />
                    <div className="cart-item-details">
                      <div className="cart-item-name">
                        {item.productLine.name}
                      </div>
                      <div className="cart-item-quantity">
                        Số lượng: {item.quantity}
                      </div>
                      <div className="cart-item-price">
                        Đơn giá: {item.productLine.price.toLocaleString()} đ
                      </div>
                      <div className="cart-item-total">
                        Thành tiền:{" "}
                        {(
                          item.productLine.price * item.quantity
                        ).toLocaleString()}{" "}
                        đ
                      </div>
                    </div>
                  </div>
                ))
              )}
              <h5>
                Tổng giá:{" "}
                <span style={{ color: "red" }}>
                  {finalTotal.toLocaleString()} VNĐ
                </span>
              </h5>
            </Col>
          </Row>
          <div className="button-confirmback">
            <Button
              className="button-back"
              onClick={() => navigate(routes.cart)}
            >
              TRỞ LẠI
            </Button>
            <Button className="button-confirm" type="submit">
              HOÀN TẤT ĐẶT HÀNG
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
