//TrackingPage
import React, { useRef } from "react";
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
                                    <Row>
                                        <Col className="product-info" xs={8}>
                                            <img src="https://product.hstatic.net/200000567741/product/alpk000435f2cz1_1_67aad3227a2b430d84d15a88609dd920_1024x1024.jpg" />
                                            <p>HOA TAI 18K AFEC0004382DDA1</p>
                                            <p>MSP: AFEC0004382DDA1</p>
                                            <p>SỐ LƯỢNG: 1</p>
                                        </Col>
                                        <hr />
                                        <Col className="price-info" xs={4} >
                                            <p>Giá tiền: 42,820,000đ</p>
                                            <p>Tạm tính: 42,820,000đ</p>
                                            <p>Thành tiền: 42,820,000đ</p>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="product-info" xs={8}>
                                            <img src="https://product.hstatic.net/200000567741/product/afrk000423f1cz1_1_db12b314251d4b80b603f34517f830ab_1024x1024.jpg" />
                                            <p>NHẪN ĐÍNH HÔN KIM CƯƠNG ENR3111W</p>
                                            <p>MSP: ENR3111W</p>
                                            <p>SỐ LƯỢNG: 1</p>
                                        </Col>
                                        <hr />
                                        <Col className="price-info" xs={4} >
                                            <p>Giá tiền: 44,520,000đ</p>
                                            <p>Tạm tính: 44,520,000đ</p>
                                            <p>Thành tiền: 44,520,000đ</p>
                                        </Col>
                                    </Row>
                                    <Row className="total-price">
                                        <Col xs={8}>
                                            <h5>TỔNG CỘNG: ...đ</h5>
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
                                    current={0}
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
            </div >
            <Footer />
        </>
    );
}

export default TrackingPage;