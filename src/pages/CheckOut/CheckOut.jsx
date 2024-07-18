import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Modal, ListGroup } from "react-bootstrap";
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
import { BiSolidDiscount } from "react-icons/bi";

export default function CheckOut() {
  const location = useLocation();
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [availableDiscounts, setAvailableDiscounts] = useState([]);
  const [copiedCode, setCopiedCode] = useState("");
  const user = useSelector(selectUser);

  let { cartItems, finalTotal } = location.state || {
    cartItems: [],
    finalTotal: 0,
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: `${user.lastname} ${user.firstname}`,
    phone: user.phone || "",
    address: user.address || "",
    note: "",
  });

  const dispatch = useDispatch();

  // Use useEffect to log formData changes
  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  useEffect(() => {
    // Fetch available discounts
    const fetchDiscounts = async () => {
      try {
        const response = await api.get("promotion");
        setAvailableDiscounts(response.data);
      } catch (error) {
        console.error('Failed to fetch discounts:', error);
      }
    };

    fetchDiscounts();
  }, []);

  // Validate form data
  const validateForm = () => {
    const formErrors = {};

    // Validate name
    const nameRegex = /^[a-zA-ZÀ-ỹẠ-ỹ\s]*$/;
    if (!formData.name) {
      formErrors.name = "Họ Tên là bắt buộc";
    } else if (!nameRegex.test(formData.name)) {
      formErrors.name =
        "Họ Tên chỉ được chứa chữ cái và khoảng trắng, không có số và ký tự đặc biệt";
    }

    // Validate phone
    const phoneRegex = /^[0-9]+$/;
    if (!formData.phone) {
      formErrors.phone = "Điện Thoại là bắt buộc";
    } else if (!phoneRegex.test(formData.phone)) {
      formErrors.phone = "Điện Thoại chỉ được chứa số";
    }

    // Validate address
    if (!formData.address) {
      formErrors.address = "Địa chỉ là bắt buộc";
    }

    // check address
    // const addressRegex = /^[a-zA-ZÀ-ỹẠ-ỹ0-9\s]*$/; // Chấp nhận chữ cái thường và hoa, bao gồm dấu và khoảng trắng
    // if (!form.address.value) {
    //   formErrors.address = "Địa chỉ là bắt buộc";
    // } else if (!addressRegex.test(form.address.value)) {
    //   formErrors.address =
    //     "Địa chỉ không được chứa ký tự đặc biệt";
    // }

    setErrors(formErrors);

    // Display error messages using toast
    if (Object.keys(formErrors).length > 0) {
      Object.keys(formErrors).forEach((key) => {
        toast.error(formErrors[key]);
      });
    }

    return Object.keys(formErrors).length === 0;
  };

  // Apply discount code
  const handleApplyDiscount = async () => {
    try {
      const response = await api.get(`promotion/code/${discountCode}`);
      console.log(response.data);
      setDiscount(response.data.discountPercentage);
    } catch (error) {
      toast.error("Mã giảm giá không tồn tại hoặc không thể sử dụng được nữa");
    }
  };

  // Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
      try {
        const amount = String(Math.ceil(finalTotal - finalTotal * discount));
        console.log(amount);
        const data = {
          fullname: formData.name,
          phone: formData.phone,
          address: formData.address,
          note: formData.note,
          cartItems: cartItems,
          totalAmount: amount,
          promotionCode: discountCode,
        };
        console.log(data);
        const response = await api.post("wallet/vnpay", { amount });
        console.log(response.data);
        window.location.assign(response.data);
        dispatch(order(data));
      } catch (error) {
        toast.error("Đặt Hàng Thất bại");
        console.log(error.response.data);
      }
    }
  };

  // Get total price of the cart items
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSelectDiscount = (code, discountPercentage) => {
    setDiscountCode(code);
    setDiscount(discountPercentage);
    setShowDiscountModal(false);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        toast.success("Mã giảm giá đã được sao chép!");
      })
      .catch((error) => {
        toast.error("Sao chép mã giảm giá thất bại.");
      });
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
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    isInvalid={!!errors.name}
                  />
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
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    isInvalid={!!errors.phone}
                  />
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
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    isInvalid={!!errors.address}
                  />
                </Col>
              </Form.Group>

              <h4>HÌNH THỨC THANH TOÁN</h4>
              <Form.Group controlId="formPaymentMethod">
                <h5>•Thanh toán chuyển khoản</h5>
                <div>
                  <p>
                    Quý khách vui lòng kiểm tra sự nguyên vẹn của gói hàng và
                    tem niêm phong, trước khi thanh toán tiền mặt và nhận hàng +
                    Tên tài khoản: CÔNG TY CP TẬP ĐOÀN VÀNG BẠC ĐÁ QUÝ
                    FIVEDIAMOND
                    <br />
                    + Số tài khoản: 1206866868
                    <br />
                    + Ngân hàng: Ngân hàng TMCP Đầu tư & Phát triển Việt Nam
                    (BIDV) - CN Sở Giao dịch 1<br />+ Nội dung chuyển khoản:{" "}
                    <em>“Tên người chuyển + Số điện thoại + Mã đơn hàng”</em>
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
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
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
                        Đơn giá: {item.productLine.finalPrice.toLocaleString()}{" "}
                        đ
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="d-flex">
                <h5><BiSolidDiscount /> 5Diamond Voucher</h5>
                <span
                  style={{ cursor: "pointer", color: "#2691fe", marginLeft: "8px" }} onClick={() => setShowDiscountModal(true)}
                >
                  Chọn mã giảm giá
                </span>
              </div>
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

      {/* Discount Code Modal */}
      <Modal
        show={showDiscountModal}
        onHide={() => setShowDiscountModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>5Diamond Voucher <BiSolidDiscount /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {availableDiscounts.map((discount) => (
              <ListGroup.Item
                key={discount.code}
                action
                onClick={() => handleSelectDiscount(discount.code, discount.discountPercentage)}
                className="custom-listgroup-item"
              >
                <div class="voucher-container">
                  <div class="voucher-card">
                    <div class="main-voucher">
                      <div class="co-img">
                        <img
                          src="https://drive.google.com/thumbnail?id=1TID9g_LphvHeN1htPBH_0zoxe0o1CqaE&sz=w1000"
                          alt="Coupon Image"
                        />
                      </div>
                      <div class="vertical"></div>
                      <div class="content">
                        <h2>FiveDiamond</h2>
                        <h1>{discount.discountPercentage}%<span>Coupon</span></h1>
                        <p> HSD: {new Date(discount.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div class="copy-button" onClick={(e) => e.stopPropagation()}>
                      <input id="copyvalue" type="text" readonly value={discount.code} />
                      {/* <button onclick="copyIt()" class="copybtn">COPY</button> */}
                      <button onClick={() => copyToClipboard(discount.code)} className="copybtn">
                        {copiedCode === discount.code ? "COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDiscountModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
