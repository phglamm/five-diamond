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

    const [selectedProvince, setSelectedProvince] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");
    const [deliveryStandard, setDeliveryStandard] = useState(false);
    const [deliveryTime, setDeliveryTime] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState("");

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setDistricts([
            "District 1",
            "District 2",
            "District 3",
            // Add more districts based on the selected province
        ]);
        setSelectedDistrict("");
        setWards([]);
        setSelectedWard("");
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setWards([
            "Ward 1",
            "Ward 2",
            "Ward 3",
            // Add more wards based on the selected district
        ]);
        setSelectedWard("");
    };

    const handleDeliveryStandardChange = () => {
        setDeliveryStandard(!deliveryStandard);
        if (!deliveryStandard) setDeliveryTime(false);
    };

    const handleDeliveryTimeChange = () => {
        setDeliveryTime(!deliveryTime);
        if (!deliveryTime) setDeliveryStandard(false);
    };

    const handleDeliveryOptionChange = (e) => {
        setDeliveryOption(e.target.value);
    };

    const deliveryOptions = [
        { value: "Giao Nhanh", label: "Giao Nhanh" },
        { value: "Hỏa Tốc", label: "Hỏa Tốc" },
    ];

    const getOptionLabel = (option) => {
        if (deliveryOption === "Hỏa Tốc" && option.value === "Hỏa Tốc") {
            return "2 ngày";
        }

        if (deliveryOption === "Giao Nhanh" && option.value === "Giao Nhanh") {
            return "5 ngày";
        }

        return option.label;
    };

    return (
        <>
            <Header />
            <div className="tracking-container">
                <Container>
                    <Row>
                        <Col className="tracking-left-container" md={8}>

                            <h4 className="tracking-header">THÔNG TIN NGƯỜI MUA</h4>
                            <Form.Group as={Row} controlId="formFullName" className="align-items-center">
                                <Form.Label column md={2} className="form-label">Họ Tên:</Form.Label>
                                <Col md={10}>
                                    <Form.Control type="text" placeholder="Nhập họ tên" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPhoneNumber" className="align-items-center">
                                <Form.Label column md={2} className="form-label">Điện Thoại:</Form.Label>
                                <Col md={10}>
                                    <Form.Control type="text" placeholder="Nhập số điện thoại" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formEmail" className="align-items-center">
                                <Form.Label column md={2} className="form-label">Email:</Form.Label>
                                <Col md={10}>
                                    <Form.Control type="text" placeholder="Nhập email" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formBirthDate" className="align-items-center">
                                <Form.Label column md={2} className="form-label">Ngày Sinh:</Form.Label>
                                <Col md={10}>
                                    <Form.Control type="date" />
                                </Col>
                            </Form.Group>


                            <div className="tracking-delivery-method">

                                <h4>PHƯƠNG THỨC NHẬN HÀNG</h4>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group controlId="formProvince">
                                            <Form.Control as="select" value={selectedProvince} onChange={handleProvinceChange}>
                                                <option value="">Chọn Tỉnh/TP</option>
                                                {provinces.map((province) => (
                                                    <option key={province} value={province}>
                                                        {province}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formDistrict">
                                            <Form.Control as="select" value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
                                                <option value="">Chọn Quận/Huyện</option>
                                                {districts.map((district) => (
                                                    <option key={district} value={district}>
                                                        {district}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group controlId="formWard">
                                            <Form.Control as="select" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} disabled={!selectedDistrict}>
                                                <option value="">Chọn Phường/Xã</option>
                                                {wards.map((ward) => (
                                                    <option key={ward} value={ward}>
                                                        {ward}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="formAddress">
                                    <Form.Label className="form-label"></Form.Label>
                                    <Form.Control type="text" placeholder="Nhập địa chỉ" />
                                </Form.Group>
                            </div>

                            <div className="tracking-payment">
                                <h3 className="tracking-header">HÌNH THỨC THANH TOÁN</h3>
                                <Form.Group className="tracking-payment-method" controlId="formPaymentMethod">
                                    <Form.Check type="radio" label="Thanh toán COD" name="paymentMethod" />
                                    <Form.Check type="radio" label="Thanh toán chuyển khoản" name="paymentMethod" />
                                </Form.Group>
                            </div>

                            <div className="tracking-note">
                                <h3 className="tracking-header">GHI CHÚ</h3>
                                <Form.Group controlId="formNote">
                                    <Form.Control as="textarea" rows={3} placeholder="Để lại lời nhắn" />
                                </Form.Group>
                            </div>
                        </Col>

                        <Col className="tracking-right-container" md={4}>
                            <h3 className="tracking-header">THÔNG TIN ĐƠN HÀNG</h3>
                            <div className="tracking-order-item">
                                {items.map((item, index) => (
                                    <div className="order-item" key={index}>
                                        <img src={`https://example.com/${item.msp}.jpg`} alt="Product Image" className="product-image" />
                                        <div className="order-item-details">
                                            <p>{item.name}</p>
                                            <p>MSP: {item.msp}</p>
                                            <p>SỐ LƯỢNG: {item.quantity}</p>
                                            <p>Giá bán: {item.price.toLocaleString()}đ</p>
                                            <p>Tạm tính: {(item.price * item.quantity).toLocaleString()}đ</p>
                                        </div>
                                    </div>
                                ))}
                                <h5>Tạm tính: {subtotal.toLocaleString()}đ</h5>
                                <Form.Group controlId="formVoucher">
                                    <p>Mã giảm giá/Voucher</p>
                                    <Form.Control type="text" />
                                </Form.Group>
                                <h5>Giảm giá: {discount.toLocaleString()}đ</h5>
                                <h5>Tổng tiền: {total.toLocaleString()}đ</h5>
                            </div>

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

