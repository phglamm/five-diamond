import { useState, useEffect } from "react";
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
import "./CartPage.css";
import { ShoppingCartOutlined, RollbackOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Fetch cart items from the API
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

  // Function to delete an item from the cart
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

  // Function to update the quantity of an item in the cart
  const updateQuantity = async (id, amount) => {
    try {
      const response = await api.put(`cart/add/${id}`);
      setCartItems((prevItems) => {
        return prevItems.reduce((acc, item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + amount;
            if (newQuantity > 0) {
              // If the new quantity is greater than zero, update the quantity
              acc.push({ ...item, quantity: newQuantity });
            } else {
              // If the new quantity is zero or less, remove the item from the cart
              deleteCart(id);
            }
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error("Không đủ sản phẩm trong kho");
    }
  };

  // Calculate total, shipping cost, and discount amount
  const total = cartItems.reduce(
    (acc, item) => acc + item.productLine.finalPrice * item.quantity,
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

  // Handle checkout process
  const handleProceedToCheckout = async () => {
    try {
      const response = await api.get("cart/check");
      console.log(response);
      navigate(routes.checkout, { state: { cartItems, finalTotal } }); // <-- Navigate to CheckOut with cartItems
    } catch (error) {
      toast.error(error.response.data);
      console.log(error.response.data);
    }
  };

  // Navigate back to home page
  const handleClick = () => {
    navigate(routes.home);
  };

  // Apply discount code

  return (
    <div className="page-container">
      <Header />
      <Container className="container">
        <Row>
          <Col md={8} className="Col8 col-md-8">
            <h4>
              <ShoppingCartOutlined /> Giỏ hàng ({totalItems} sản phẩm)
            </h4>
            <div className="continue-btn">
              <Button
                variant="light"
                className="w-100 mt-2"
                type="button"
                onClick={handleClick}
              >
                <RollbackOutlined /> Tiếp tục mua hàng
              </Button>
            </div>
            {user.role === "ADMIN" ||
            user.role === "SALES" ||
            user.role === "DELIVERY" ||
            user.role === "MANAGER" ? (
              <>
                {" "}
                <div>
                  {" "}
                  <h2>Chỉ có khách hàng mới có thể mua hàng</h2>
                </div>
                <Card>
                  <ListGroup variant="flush">
                    {cartItems?.map((item) => (
                      <ListGroup.Item key={item.id} className="order-item">
                        <div className="product-details">
                          <Image
                            src={item.productLine.imgURL}
                            alt={item.productLine.name}
                            className="product-image"
                          />
                          <div className="order-item-details">
                            <h5>{item.productLine.name}</h5>
                            <p>Mã Sản Phẩm: {item.productLine.id}</p>
                            <p>Kích thước: {item.productLine.size}</p>
                            <div className="quantity-control">
                              <ButtonGroup>
                                <Button
                                  variant="light"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  -
                                </Button>
                                <div className="quantity-div">
                                  <h3 className="quantity">{item.quantity}</h3>
                                </div>
                                <Button
                                  variant="light"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  +
                                </Button>
                              </ButtonGroup>
                            </div>
                            <div>
                              <span className="price-text">
                                Giá tiền:{" "}
                                <span style={{ color: "red" }}>
                                  {(
                                    item.productLine?.finalPrice * item.quantity
                                  ).toLocaleString()}
                                  đ
                                </span>
                              </span>
                              <span>
                                Tạm tính:{" "}
                                <span style={{ color: "red" }}>
                                  {(
                                    item.productLine?.finalPrice * item.quantity
                                  ).toLocaleString()}
                                  đ
                                </span>
                              </span>
                            </div>
                            <span>
                              Thành tiền:{" "}
                              <span style={{ color: "red" }}>
                                {(
                                  item.productLine?.finalPrice * item.quantity
                                ).toLocaleString()}
                                đ
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
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              </>
            ) : (
              <Card>
                <ListGroup variant="flush">
                  {cartItems?.map((item) => (
                    <ListGroup.Item key={item.id} className="order-item">
                      <div className="product-details">
                        <Image
                          src={item.productLine.imgURL}
                          alt={item.productLine.name}
                          className="product-image"
                        />
                        <div className="order-item-details">
                          <h5>{item.productLine.name}</h5>
                          <p>Mã Sản Phẩm: {item.productLine.id}</p>
                          <p>Kích thước: {item.productLine.size}</p>
                          <div className="quantity-control">
                            <ButtonGroup>
                              <Button
                                variant="light"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                -
                              </Button>
                              <div className="quantity-div">
                                <h3 className="quantity">{item.quantity}</h3>
                              </div>
                              <Button
                                variant="light"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </Button>
                            </ButtonGroup>
                          </div>
                          <div>
                            <span className="price-text">
                              Giá tiền:{" "}
                              <span style={{ color: "red" }}>
                                {(
                                  item.productLine?.finalPrice * item.quantity
                                ).toLocaleString()}
                                đ
                              </span>
                            </span>
                            <span>
                              Tạm tính:{" "}
                              <span style={{ color: "red" }}>
                                {(
                                  item.productLine?.finalPrice * item.quantity
                                ).toLocaleString()}
                                đ
                              </span>
                            </span>
                          </div>
                          <span>
                            Thành tiền:{" "}
                            <span style={{ color: "red" }}>
                              {(
                                item.productLine?.finalPrice * item.quantity
                              ).toLocaleString()}
                              đ
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
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            )}
          </Col>
          <Col md={4} className="col-md-4">
            {user.role === "ADMIN" ||
            user.role === "SALES" ||
            user.role === "DELIVERY" ||
            user.role === "MANAGER" ? (
              <div className="Col4">
                <Card>
                  <Card.Header>
                    <h4>Tổng Tiền</h4>
                  </Card.Header>
                  <Card.Body>
                    <h5>
                      Tạm tính:{" "}
                      <span style={{ color: "black", float: "right" }}>
                        {total?.toLocaleString()} VNĐ
                      </span>
                    </h5>
                    <hr className="solid"></hr>
                    <h5>
                      Vận chuyển:{" "}
                      <span style={{ color: "black", float: "right" }}>
                        {shippingCost === 0
                          ? "Miễn phí vận chuyển"
                          : `${shippingCost?.toLocaleString()} VNĐ`}{" "}
                      </span>
                    </h5>
                    <hr className="solid"></hr>
                    {discountAmount > 0 && (
                      <>
                        <h5>
                          Giảm giá:{" "}
                          <span style={{ color: "black", float: "right" }}>
                            -{discountAmount.toLocaleString()} VNĐ
                          </span>
                        </h5>
                        <hr className="solid" />
                      </>
                    )}
                    <h5>
                      Thanh toán:{" "}
                      <span style={{ color: "black", float: "right" }}>
                        {finalTotal.toLocaleString()} VNĐ
                      </span>
                    </h5>
                    <hr className="solid" />

                    <Button
                      style={{ background: "#ce0303", marginTop: "15px" }}
                      className="w-100 btn-proceed-to-checkout"
                      type="button"
                      onClick={handleProceedToCheckout}
                      disabled
                    >
                      Tiến hành đặt hàng
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ) : (
              <div className="Col4">
                <Card>
                  <Card.Header>
                    <h4>Tổng Tiền</h4>
                  </Card.Header>
                  <Card.Body>
                    <h5>
                      Tạm tính:{" "}
                      <span style={{ color: "black", float: "right" }}>
                        {total?.toLocaleString()} VNĐ
                      </span>
                    </h5>
                    {/* <hr className="solid"></hr> */}
                    {/* <h5>
                      Vận chuyển:{" "}
                      <span style={{ color: "black", float: "right" }}>
                        {shippingCost === 0
                          ? "Miễn phí vận chuyển"
                          : `${shippingCost?.toLocaleString()} VNĐ`}{" "}
                      </span>
                    </h5> */}
                    <hr className="solid"></hr>
                    <h5>
                      Thanh toán:{" "}
                      <span style={{ color: "black", float: "right" }}>
                        {finalTotal.toLocaleString()} VNĐ
                      </span>
                    </h5>
                    <hr className="solid" />
                    {/* <div className="d-flex">
                      <input
                        type="text"
                        className="form-control mr-2"
                        placeholder="Mã giảm giá/Quà tặng"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <Button
                        style={{ background: "#614A4A" }}
                        className="apply-button"
                        onClick={handleApplyDiscount}
                      >
                        Áp dụng
                      </Button>
                    </div> */}
                    {cartItems.length !== 0 ? (
                      <Button
                        style={{ background: "#ce0303", marginTop: "15px" }}
                        className="w-100 btn-proceed-to-checkout"
                        type="button"
                        onClick={handleProceedToCheckout}
                      >
                        Tiến hành đặt hàng
                      </Button>
                    ) : (
                      <Button
                        style={{ background: "#ce0303", marginTop: "15px" }}
                        className="w-100 btn-proceed-to-checkout"
                        type="button"
                        onClick={handleProceedToCheckout}
                        disabled
                      >
                        Tiến hành đặt hàng
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
