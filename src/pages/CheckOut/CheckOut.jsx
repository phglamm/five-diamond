import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckOut.css";
import { routes } from "../../routes";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { order } from "../../redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { selectUser } from "../../redux/features/counterSlice";

export default function CheckOut() {
  const location = useLocation();
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const user = useSelector(selectUser);

  let { cartItems, finalTotal } = location.state || {
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

    // check name
    const nameRegex = /^[a-zA-ZÀ-ỹẠ-ỹ\s]*$/; // Chấp nhận chữ cái thường và hoa, bao gồm dấu và khoảng trắng
    if (!form.name.value) {
      formErrors.name = "Họ Tên là bắt buộc";
    } else if (!nameRegex.test(form.name.value)) {
      formErrors.name =
        "Họ Tên chỉ được chứa chữ cái và khoảng trắng, không có số và ký tự đặc biệt";
    }

    // check phone
    const phoneRegex = /^[0-9]+$/;
    if (!form.phone.value) {
      formErrors.phone = "Điện Thoại là bắt buộc";
    } else if (!phoneRegex.test(form.phone.value)) {
      formErrors.phone = "Điện Thoại chỉ được chứa số";
    }

    // check address
    if (!address) {
      formErrors.address = "Địa chỉ là bắt buộc";
    }

    setErrors(formErrors);

    // display fail by toast
    Object.keys(formErrors).forEach((key) => {
      toast.error(formErrors[key]);
    });

    return Object.keys(formErrors).length === 0;
  };

  const handleApplyDiscount = async () => {
    try {
      const response = await api.get(`promotion/code/${discountCode}`);
      console.log(response.data);
      setDiscount(response.data.discountPercentage);
    } catch (error) {
      toast.error("Mã giảm giá không tồn tại hoặc không thể sử dụng được nữa");
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const form = event.currentTarget;
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
        console.log(data);

        const amount = String(finalTotal - (finalTotal * discount) / 100);
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
                    defaultValue={`${user.lastname} ${user.firstname} `}
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
                    defaultValue={user.phone}
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
                    defaultValue={user.address}
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
                    </div>
                  </div>
                ))
              )}
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
                  className="apply-button"
                  onClick={handleApplyDiscount}
                  value={discountCode}
                  onChange={(e) => {
                    setDiscountCode(e.target.value);
                  }}
                >
                  Áp dụng
                </Button>
              </div>
              <div style={{ marginLeft: "8px", marginTop: "12px" }}>
                <h6>
                  Tạm tính:{" "}
                  <span style={{ color: "red" }}>
                    {finalTotal.toLocaleString()} VNĐ
                  </span>
                </h6>
                <h6>
                  Số tiền đã giảm:{" "}
                  <span style={{ color: "red" }}>
                    {((finalTotal * discount) / 100).toLocaleString()} VNĐ
                  </span>
                </h6>
              </div>
              <h5>
                Thành tiền:{" "}
                <span style={{ color: "red" }}>
                  {(
                    finalTotal -
                    (finalTotal * discount) / 100
                  ).toLocaleString()}{" "}
                  VNĐ
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
