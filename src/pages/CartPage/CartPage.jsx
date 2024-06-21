import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImCart } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import discountCodes from "./discountCodes";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  async function fetchCart() {
    try {
      const response = await api.get("cart");
      console.log(response.data);
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function deleteCart(id) {
    try {
      await api.delete(`cart/${id}`);
      setCartItems(cartItems.filter((item) => item.id !== id));
      toast.success("xóa khỏi giỏ hàng thành công");
    } catch (error) {
      console.log(error.response.data);
      toast.error("Không thể xóa khỏi giỏ hàng");
    }
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.productLine.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shippingCost =
    appliedDiscount && appliedDiscount.type === "shipping"
      ? appliedDiscount.value
      : 0;
  const discountAmount = appliedDiscount
    ? appliedDiscount.type === "percentage"
      ? (total * appliedDiscount.value) / 100
      : appliedDiscount.type === "fixed"
        ? appliedDiscount.value
        : 0
    : 0;

  const finalTotal = total - discountAmount + shippingCost;

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) => {
      return prevItems.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  const handleProceedToCheckout = () => {
    navigate(routes.checkout, { state: { cartItems, finalTotal } });
  };

  const handleClick = () => {
    navigate(routes.home);
  };

  const handleApplyDiscount = () => {
    const discount = discountCodes.find(
      (d) => d.code === discountCode.toUpperCase()
    );
    if (discount) {
      setAppliedDiscount(discount);
    } else {
      alert("Mã giảm giá không hợp lệ");
    }
  };

  return (
    <div className="cart-page-container">
      <Header />
      <Container className="cart-container">
        <Row>
          <Col md={8} className="cart-col8">
            <h5>
              <ImCart /> Giỏ hàng ({totalItems} sản phẩm)
            </h5>
            <div className="cart-continue-btn">
              <Button
                className="w-100 mt-2"
                variant="light"
                type="button"
                onClick={handleClick}
              >
                <IoMdArrowRoundBack /> Tiếp tục mua hàng
              </Button>
            </div>
            <Card>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="cart-order-item">
                    <div className="cart-product-details">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="cart-product-image"
                      />
                      <div className="cart-order-item-details">
                        <h5>{item.name}</h5>
                        <p>MSP: {item.code}</p>
                        <div className="cart-quantity-control">
                          {/* <ButtonGroup>
                            <Button
                              variant="outline-secondary"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </Button>
                            <span className="quantity">{item.quantity}</span>
                            <Button
                              variant="outline-secondary"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              +
                            </Button>
                          </ButtonGroup> */}
                        </div>
                        <div className="cart-price-info">
                          <span className="cart-price-text">
                            Giá tiền:{" "}
                            <span style={{ color: "red" }}>
                              {item.productLine.price.toLocaleString()}đ
                            </span>
                          </span>
                          <p>Mô tả: {item.productLine.description}</p>
                          <span
                            style={{
                              color: "#ce0303",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onClick={() => deleteCart(item.id)}
                          >
                            Xóa
                          </span>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={4} className="cart-col4">
            <div className="cart-summary">
              <Card>
                <Card.Header>
                  <h4>Tổng Tiền</h4>
                </Card.Header>
                <Card.Body>
                  <h5>
                    Tạm tính:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      {total.toLocaleString()} VNĐ
                    </span>
                  </h5>
                  <hr className="cart-solid"></hr>
                  <h5>
                    Vận chuyển:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      {shippingCost === 0
                        ? "Miễn phí vận chuyển"
                        : `${shippingCost.toLocaleString()} VNĐ`}
                    </span>
                  </h5>
                  <hr className="cart-solid"></hr>
                  <h5>
                    Thanh toán:{" "}
                    <span style={{ color: "black", float: "right" }}>
                      {finalTotal.toLocaleString()} VNĐ
                    </span>
                  </h5>
                  <hr className="solid" />
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control mr-2"
                      placeholder="Mã giảm giá/Quà tặng"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button
                      style={{ background: "#614A4A" }}
                      className="cart-apply-button"
                      onClick={handleApplyDiscount}
                    >
                      Áp dụng
                    </Button>
                  </div>
                  <Button
                    style={{ background: "#ce0303", marginTop: "15px" }}
                    className="w-100 cart-btn-proceed-to-checkout"
                    type="submit"
                    onClick={handleProceedToCheckout}
                  >
                    Tiến hành đặt hàng
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
