import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Popover, Steps } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import "./TrackingPage.css";
import api from "../../config/axios";
import { routes } from "../../routes";
import { selectUser } from "../../redux/features/counterSlice";
import { useSelector } from "react-redux";

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
  const user = useSelector(selectUser);

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
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!orderDetail) {
    return <></>;
  }

  const getLinkRoute = () => {
    if (user !== null) {
      if (user.role === "DELIVERY") {
        return routes.deliveryStaff;
      } else if (user.role === "SALES") {
        return routes.saleStaff;
      } else {
        return routes.home;
      }
    } else {
      return routes.home;
    }
  };
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

              <Form.Group
                as={Row}
                controlId="formAddress"
                className="align-items-center"
              >
                <Form.Label column md={2} className="form-label">
                  Địa chỉ
                </Form.Label>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Nhập địa chỉ"
                    value={orderDetail?.address}
                    readOnly
                  />
                </Col>
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
              {orderDetail.orderItems.map((orderItem) => {
                const productLine = orderItem.product.productLine;
                return (
                  <div
                    key={productLine?.id}
                    className="order-item"
                    style={{ marginTop: "5%" }}
                  >
                    <img
                      src={productLine?.imgURL}
                      alt="Product Image"
                      className="checkout-image"
                    />
                    <div className="order-item-details">
                      <h6>{productLine?.name}</h6>
                      <p>Mã SP: {productLine?.id}</p>
                      <p>Danh mục: {productLine?.category.name}</p>
                      <p>Giá: {productLine?.finalPrice.toLocaleString()} VNĐ</p>
                    </div>
                  </div>
                );
              })}

              <h5 style={{ marginTop: "5%" }}>
                Tổng tiền:{" "}
                <span style={{ color: "red" }}>
                  {orderDetail.totalAmount?.toLocaleString()}đ
                </span>
              </h5>
            </Col>
          </Row>

          <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            {orderDetail.orderStatus === "CANCELED" ? (
              <div className="order-canceled-container">
                <div className="order-canceled-content">
                  <div >
                    <CloseCircleOutlined className="order-canceled-icon" />
                  </div>
                  <h1 className="order-canceled-title">
                    Đơn hàng này đã bị hủy
                  </h1>
                  <p className="order-canceled-message">
                    Rất tiếc, đơn hàng của bạn đã bị hủy. Vui lòng liên hệ với
                    chúng tôi nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào.
                  </p>
                  <div className="order-canceled-action">
                    <Link
                      to={getLinkRoute()}
                      className="order-canceled-link"
                      prefetch={false}
                    >
                      Quay lại trang chủ
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="order-tracking">
                <h4>THEO DÕI ĐƠN HÀNG</h4>
                <Card
                  className={
                    orderDetail.orderStatus === "CANCELED"
                      ? "order-canceled"
                      : ""
                  }
                >
                  <Card.Body className="order-tracking-content">
                    <span className="order-tracking-id">
                      Mã đơn hàng: {orderDetail.id}
                    </span>
                    <hr />
                    <span className="shipping-info">
                      Ngày đặt hàng: {formatDate(orderDetail.orderDate)}
                      <span className="tracking-separator">
                        Giao hàng bởi: 5Diamond Express
                      </span>
                      <span className="tracking-separator">
                        Trạng thái: {getStatus(orderDetail.orderStatus)}
                      </span>
                      <span className="tracking-separator">
                        Nhận hàng vào ngày:{" "}
                        {formatDate(orderDetail.shippingDate)}
                      </span>
                    </span>
                    <hr />
                    <h5>Hành trình đơn hàng</h5>
                    <Steps
                      current={handleProgress()}
                      progressDot={customDot}
                      items={[
                        { title: "Đặt hàng", description: "Hoàn tất đặt hàng" },
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
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default TrackingPage;
