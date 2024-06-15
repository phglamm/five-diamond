import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Popover, Steps } from 'antd';
import './TrackingPage.css';

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
    const [items, setItems] = useState([
        { name: "HOA TAI 18K AFEC0004382DDA1", msp: "AFEC0004382DDA1", quantity: 1, price: 42820000 },
        { name: "NHẪN ĐÍNH HÔN KIM CƯƠNG ENR3111W", msp: "ENR3111W", quantity: 1, price: 44520000 },
    ]);
    const [voucher, setVoucher] = useState(null); // Example: {code: 'DISCOUNT10', discount: 10}

    const calculateTotalPrice = () => {
        const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discount = voucher ? (subtotal * voucher.discount / 100) : 0;
        const total = subtotal - discount;
        return { subtotal, discount, total };
    };

    const { subtotal, discount, total } = calculateTotalPrice();

    return (
        <>
            <Header />
            <div className="tracking-container">
                <Container>
                    <Row>
                        <Col className="tracking-left-container" md={6}>
                            <h3 className="tracking-info">THÔNG TIN NGƯỜI MUA</h3>
                            <Form>
                                <Form.Group controlId="formFullName">
                                    <Form.Label>Họ Tên:</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập họ tên" />
                                </Form.Group>
                                <Form.Group controlId="formPhoneNumber">
                                    <Form.Label>Điện Thoại:</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập số điện thoại" />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="email" placeholder="Nhập email" />
                                </Form.Group>
                                <Form.Group controlId="formBirthDate">
                                    <Form.Label>Ngày Sinh:</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Địa chỉ:</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập địa chỉ" />
                                </Form.Group>
                            </Form>

                            <div className="tracking-payment">
                                <h3>HÌNH THỨC THANH TOÁN</h3>
                                <Form.Group className="payment-method" controlId="formPaymentMethod">
                                    <Form.Check type="radio" label="Thanh toán COD" name="paymentMethod" />
                                    <Form.Check type="radio" label="Thanh toán chuyển khoản" name="paymentMethod" />
                                </Form.Group>

                                <Form.Group controlId="formNote">
                                    <Form.Label>GHI CHÚ:</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Nhập ghi chú" />
                                </Form.Group>
                            </div>
                        </Col>

                        <Col className="tracking-right-container" md={6}>
                            <h3 className="order-info">THÔNG TIN ĐƠN HÀNG</h3>
                            <Card>
                                <Card.Body>
                                    {items.map((item, index) => (
                                        <Row key={index}>
                                            <Col className="product-info" xs={8}>
                                                <img src={`https://example.com/${item.msp}.jpg`} alt={item.name} />
                                                <p>{item.name}</p>
                                                <p>MSP: {item.msp}</p>
                                                <p>SỐ LƯỢNG: {item.quantity}</p>
                                            </Col>
                                            <hr />
                                            <Col className="price-info" xs={4} >
                                                <p>Giá tiền: {item.price.toLocaleString()}đ</p>
                                                <p>Tổng cộng: {(item.price * item.quantity).toLocaleString()}đ</p>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Row className="total-price">
                                        <Col xs={8}>
                                            <h5>Giảm giá: {discount.toLocaleString()}đ</h5>
                                            <h5>TỔNG Hóa Đơn: {total.toLocaleString()}đ</h5>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <div className="order-tracking">
                        <h3>THEO DÕI ĐƠN HÀNG</h3>
                        <Card>
                            <Card.Body className="order-tracking-content">
                                <p className="order-tracking-id">Mã ID: DM20241652003</p>
                                <hr />
                                <p className="shipping-info">
                                    Ngày giao hàng dự kiến: 16/05/2024
                                    <span className="separator">Giao hàng bởi: 5Diamond Express</span>
                                    <span className="separator">Trạng thái: Đang chờ lấy hàng</span>
                                </p>
                                <hr />

                                <h5>Hành trình đơn hàng</h5>
                                <Steps
                                    current={1}
                                    progressDot={customDot}
                                    items={[
                                        {
                                            title: 'Xác nhận',
                                            description: 'Your order has been confirmed.',
                                        },
                                        {
                                            title: 'Chờ lấy hàng',
                                            description: 'Your order is waiting to be picked up.',
                                        },
                                        {
                                            title: 'Chờ giao hàng',
                                            description: 'Your order is on the way.',
                                        },
                                        {
                                            title: 'Giao thành công',
                                            description: 'Your order has been delivered.',
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
}

export default TrackingPage;
