import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Popover, Steps } from "antd";
import { useParams } from "react-router-dom";
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!orderDetail) {
    return <></>;
  }

  function handleProgress() {
    if (orderDetail.orderStatus === "PENDING") {
      return 0;
    } else if (orderDetail.orderStatus === "CONFIRMED") {
      return 1;
    } else if (orderDetail.orderStatus === "PROCESSING") {
      return 2;
    } else if (orderDetail.orderStatus === "SHIPPED") {
      return 3;
    } else if (orderDetail.orderStatus === "DELIVERED") {
      return 4;
    }
  }

  const getStatus = () => {
    switch (orderDetail.orderStatus) {
      case "PENDING":
        return "Chờ xử lý";
      case "CONFIRM":
        return "Đã xử lý";
      case "PROCESSING":
        return "Đang chuẩn bị hàng";
      case "SHIPPED":
        return "Đang giao hàng";
      case "DELIVERED":
        return "Đã giao hàng";
      default:
        return "Chờ xử lý";
    }
  };
  return (
    <>
      <Header />
      <div className="tracking-page">
        <Container className="tracking-container">
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

              <Form.Group controlId="formAddress">
                <Form.Label className="form-label"></Form.Label>
                <Form.Control
                  type="text"
                  value={orderDetail?.address}
                  readOnly
                />
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
              <h4>GHI CHÚ</h4>

              <Form.Group controlId="formNote">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Không có lời nhắn"
                  value={orderDetail?.note}
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <h4>THÔNG TIN ĐƠN HÀNG</h4>
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
                Phí vận chuyển: <span>Freeship</span>
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
                <span className="order-tracking-id">Mã ID: {orderDetail.id}</span>
                <hr />
                <span className="shipping-info">
                  Ngày đặt hàng: {formatDate(orderDetail.orderDate)}
                  <span className="tracking-separator">
                    Giao hàng bởi: 5Diamond Express
                  </span>
                  <span className="tracking-separator">
                    Trạng thái: {getStatus(orderDetail.orderStatus)}
                  </span>
                </span>
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
