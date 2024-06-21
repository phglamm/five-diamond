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
    <div className="page-container">
      <Header />
      <Container className="container">
        <Row>
          <Col md={8} className="Col8 col-md-8">
            <h4>
              <ImCart /> Giỏ hàng ({totalItems} sản phẩm)
            </h4>
            <div className="continue-btn">
              <Button
                className="w-100 mt-2"
                variant="light"
                type="button"
                onClick={handleClick}
              >
                <IoMdArrowRoundBack /> Tiếp tục mua hàng
              </Button>
            </div>
            {user.role === "ADMIN" ||
            user.role === "SALES" ||
            user.role === "DELIVERY" ? (
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
                            <p>MSP: {item.productLine.id}</p>
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
                                    item.productLine?.price * item.quantity
                                  ).toLocaleString()}
                                  đ
                                </span>
                              </span>
                              <span>
                                Tạm tính:{" "}
                                <span style={{ color: "red" }}>
                                  {(
                                    item.productLine?.price * item.quantity
                                  ).toLocaleString()}
                                  đ
                                </span>
                              </span>
                            </div>
                            <span>
                              Thành tiền:{" "}
                              <span style={{ color: "red" }}>
                                {(
                                  item.productLine?.price * item.quantity
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
                          <p>MSP: {item.productLine.id}</p>
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
                                  item.productLine?.price * item.quantity
                                ).toLocaleString()}
                                đ
                              </span>
                            </span>
                            <span>
                              Tạm tính:{" "}
                              <span style={{ color: "red" }}>
                                {(
                                  item.productLine?.price * item.quantity
                                ).toLocaleString()}
                                đ
                              </span>
                            </span>
                          </div>
                          <span>
                            Thành tiền:{" "}
                            <span style={{ color: "red" }}>
                              {(
                                item.productLine?.price * item.quantity
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
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
