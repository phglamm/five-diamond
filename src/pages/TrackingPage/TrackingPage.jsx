import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Popover, Steps } from "antd";
import { useLocation, useParams } from "react-router-dom";
import "./TrackingPage.css";
import api from "../../config/axios";

const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        Step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const TrackingPage = () => {
  const location = useLocation();
  const { state } = location;
  const { name, phone, address, province, district, ward, note } = state || {};

  const items = [
    {
      name: "HOA TAI 18K AFEC0004382DDA1",
      msp: "AFEC0004382DDA1",
      quantity: 1,
      price: 42820000,
    },
    {
      name: "NHẪN ĐÍNH HÔN KIM CƯƠNG ENR3111W",
      msp: "ENR3111W",
      quantity: 1,
      price: 44520000,
    },
  ];
  const voucher = null; // Example: {code: 'DISCOUNT10', discount: 10}

  const calculateTotalPrice = () => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discount = voucher ? (subtotal * voucher.discount) / 100 : 0;
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  const { subtotal, discount, total } = calculateTotalPrice();
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        const response = await api.get(`order/${id}`);
        setOrderDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrderDetail();
  }, []);

  if (!orderDetail) {
    return <></>;
  }

  function handleProgress() {
    if (orderDetail.orderStatus === "PENDING") {
      return 1;
    } else if (orderDetail.orderStatus === "CONFIRM") {
      return 2;
    } else if (orderDetail.orderStatus === "PROCESSING") {
      return 3;
    } else if (orderDetail.orderStatus === "SHIPPING") {
      return 4;
    } else if (orderDetail.orderStatus === "DELIVERED") {
      return 5;
    }
  }
  return (
    <>
      <Header />
      <div className="page-container tracking-page">
        <Container>
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
                    type="text"
                    placeholder="Nhập họ tên"
                    value={orderDetail?.fullname}
                    readOnly
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
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={orderDetail?.phone}
                    readOnly
                  />
                </Col>
              </Form.Group>

              <h4>PHƯƠNG THỨC NHẬN HÀNG</h4>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formProvince">
                    <Form.Control value={province} readOnly>
                      {/* <option value="">Chọn Tỉnh/TP</option> */}
                      {/* Render province options */}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formDistrict">
                    <Form.Control value={district} readOnly>
                      {/* <option value="">Chọn Quận/Huyện</option> */}
                      {/* Render district options */}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formWard">
                    <Form.Control value={ward} readOnly>
                      {/* <option value="">Chọn Xã/Phường</option> */}
                      {/* Render ward options */}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formAddress">
                <Form.Label className="form-label"></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
                  value={orderDetail?.address}
                  readOnly
                />
              </Form.Group>

              {/* <h4>THỜI GIAN NHẬN HÀNG</h4>
                            <Form.Group controlId="formDeliveryTime">
                                <div className="box">
                                    <div>
                                        <Form.Check
                                            type="checkbox"
                                            id="formDeliveryTime-time1"
                                            label="Nhận hàng tiêu chuẩn"
                                            name="time1"
                                            checked={deliveryOption === "Giao Nhanh"}
                                            readOnly
                                        />
                                    </div>
                                    <div className="time2">
                                        <Form.Check
                                            type="checkbox"
                                            id="formDeliveryTime-time2"
                                            label="Nhận hàng đặc biệt"
                                            name="time2"
                                            checked={deliveryOption === "Hỏa Tốc"}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </Form.Group> */}

              <h4>HÌNH THỨC THANH TOÁN</h4>
              <Form.Group controlId="formPaymentMethod">
                <h5>•Thanh toán chuyển khoản</h5>
                <div>
                  <p>
                    Quý khách vu6i lòng kiểm tra sự nguyên vẹn của gói hàng và
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
              <h4>GHI CHÚ</h4>

              <Form.Group controlId="formNote">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Để lại lời nhắn"
                  value={orderDetail?.note}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <h4>THÔNG TIN ĐƠN HÀNG</h4>
              {/* {items.map((item) => (
                <div key={item.msp} className="order-item">
                  <img
                    src={`https://example.com/${item.msp}.jpg`}
                    alt="Product Image"
                    className="checkout-image"
                  />
                  <div className="order-item-details">
                    <h6>{item.name}</h6>
                    <p>Mã SP: {item.msp}</p>
                    <p>Số lượng: {item.quantity}</p>
                    <p>
                      Giá: {(item.price * item.quantity).toLocaleString()} VNĐ
                    </p>
                  </div>
                </div>
              ))} */}
              <h5>
                Tạm tính:{" "}
                <span style={{ color: "red" }}>
                  {orderDetail.totalAmount?.toLocaleString()}đ
                </span>
              </h5>
              <Form.Group controlId="formVoucher">
                <p>Mã giảm giá/Voucher</p>
                <Form.Control type="text" readOnly />
              </Form.Group>
              <p>
                Phí vận chuyển: <span>50,000đ</span>
              </p>
              <h5>
                Tổng tiền:{" "}
                <span style={{ color: "red" }}>
                  {orderDetail.totalAmount?.toLocaleString()}đ
                </span>
              </h5>
            </Col>
          </Row>
          <div className="order-tracking">
            <h3>THEO DÕI ĐƠN HÀNG</h3>
            <Card>
              <Card.Body className="order-tracking-content">
                <p className="order-tracking-id">Mã ID: {orderDetail.id}</p>
                <hr />
                <p className="shipping-info">
                  Ngày giao hàng dự kiến: {orderDetail.shippingDate}
                  <span className="separator">
                    Giao hàng bởi: 5Diamond Express
                  </span>
                  <span className="separator">
                    Trạng thái: {orderDetail.orderStatus}
                  </span>
                </p>
                <hr />

                <h5>Hành trình đơn hàng</h5>
                <Steps
                  current={handleProgress()}
                  progressDot={customDot}
                  items={[
                    {
                      title: "Đặt hàng",
                      description: "Hoàn tất đặt hàng",
                    },
                    {
                      title: "Xác nhận đơn hàng",
                      description: "Đơn hàng đã được xác nhận",
                    },
                    {
                      title: "Đang xử lý",
                      description: "Đơn hàng đang được xử lý",
                    },
                    {
                      title: "Đang giao hàng",
                      description: "Đơn hàng đang được giao",
                    },
                    {
                      title: "Đã giao hàng",
                      description: "Đơn hàng đã được giao",
                    },
                  ]}
                />
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default TrackingPage;
