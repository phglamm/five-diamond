import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Image, ButtonGroup } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { ImCart } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import './CartPage.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

export default function CartPage() {

    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // This would normally fetch data from an API or local storage
        const initialCartItems = [
            {
                id: 'AFEC000459D2DA1',
                name: 'Bông tai kim cương',
                price: 38050000,
                quantity: 1,
                image: 'https://tnj.vn/75169-large_default/nhan-bac-nu-dinh-da-10mm-nn0440.jpg',
                description: 'Bông tai kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.',
                code: 'AFEC000459D2DA1',
            },
            {
                id: 'AFPB001948F2HA1',
                name: 'Mặt dây nữ kim cương',
                price: 17370000,
                quantity: 1,
                image: 'https://lili.vn/wp-content/uploads/2022/10/Day-chuyen-bac-unisex-dinh-kim-cuong-Moissanite-dang-chuoi-da-LILI_054275_2.jpg',
                description: 'Mặt dây nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.',
                code: 'AFPB001948F2HA1',
            },
            {
                id: 'AFPB001948F8BA1',
                name: 'Dây chuyền nữ kim cương',
                price: 27790000,
                quantity: 1,
                image: 'https://lili.vn/wp-content/uploads/2022/06/Mat-day-chuyen-bac-nu-dinh-kim-cuong-Moissanite-tron-cach-dieu-LILI_413898_6-150x150.jpg',
                description: 'Dây chuyền nữ kim cương đính hạt lớn, thiết kế đẹp mắt và sang trọng.',
                code: 'AFPB001948F8BA1',
            },
        ];
        setCartItems(initialCartItems);
    }, []);

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const shippingCost = 0; // Miễn phí vận chuyển

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCartItems(prevItems => {
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

    const handleClick = () => {
        navigate(routes.home);
    }
    return (
<<<<<<< Updated upstream
        <div className="cart-page-container">
            <Header />
            <Container className="cart-container">
                <Row>
                    <Col md={8} className="cart-col8">
                        <h5><ImCart /> Giỏ hàng ({totalItems} sản phẩm)</h5>
                        <div className='cart-continue-btn'>
                            <Button
                                className="w-100 mt-2"
                                variant="light"
                                type="button"
                                onClick={handleClick}><IoMdArrowRoundBack /> Tiếp tục mua hàng</Button>
=======
        <div className="page-container">
            <Header />
            <Container className="container">
                <Row>
                    <Col md={8} className="Col8 col-md-8">
                        <h4><ImCart /> Giỏ hàng ({totalItems} sản phẩm)</h4>
                        <div className='continue-btn'>
>>>>>>> Stashed changes
                            <Button variant="light" className="w-100 mt-2" type="button"><IoMdArrowRoundBack /> Tiếp tục mua hàng</Button>
                        </div>

                        <Card>
                            <ListGroup variant="flush">
                                {cartItems.map(item => (
<<<<<<< Updated upstream
                                    <ListGroup.Item key={item.id} className="cart-order-item">
                                        <div className="cart-product-details">
                                            <Image src={item.image} alt={item.name} className="cart-product-image" />
                                            <div className="cart-order-item-details">
                                                <h5>{item.name}</h5>
                                                <p>MSP: {item.code}</p>
                                                <div className="cart-quantity-control">
=======
                                    <ListGroup.Item key={item.id} className="order-item">
                                        <div className="product-details">
                                            <Image src={item.image} alt={item.name} className="product-image" />
                                            <div className="order-item-details">
                                                <h5>{item.name}</h5>
                                                <p>MSP: {item.code}</p>
                                                <div className="quantity-control">
>>>>>>> Stashed changes
                                                    {/* <ButtonGroup>
                                                        <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                                                        <span className="quantity">{item.quantity}</span>
                                                        <Button variant="outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                                                    </ButtonGroup> */}
                                                </div>
<<<<<<< Updated upstream
                                                <div className="cart-price-info">
                                                    <span className="cart-price-text">Giá tiền: <span style={{ color: 'red' }}>{item.price.toLocaleString()}đ</span></span>
=======
                                                <div className="price-info">
                                                    <span className="price-text">Giá tiền: <span style={{ color: 'red' }}>{item.price.toLocaleString()}đ</span></span>
>>>>>>> Stashed changes
                                                    <span>Tạm tính: <span style={{ color: 'red' }}>{(item.price * item.quantity).toLocaleString()}đ</span></span>
                                                </div>
                                                <span>Thành tiền: <span style={{ color: 'red' }}>{(item.price * item.quantity).toLocaleString()}đ</span></span>
                                                <p>Mô tả: {item.description}</p>
<<<<<<< Updated upstream
                                                <span style={{ color: '#ce0303', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => removeItem(item.id)} >Xóa</span>
=======
                                                <span style={{color: '#ce0303', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => removeItem(item.id)} >Xóa</span>
>>>>>>> Stashed changes
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card>
                    </Col>
<<<<<<< Updated upstream
                    <Col md={4} className="cart-col4">
                        <div className="cart-summary">
=======
                    <Col md={4} className="col-md-4">
                        <div className="Col4">
>>>>>>> Stashed changes
                            <Card>
                                <Card.Header><h4>Tổng Tiền</h4></Card.Header>
                                <Card.Body>
                                    <h5>Tạm tính: <span style={{ color: 'black', float: 'right' }}>{total.toLocaleString()} VNĐ</span></h5>
<<<<<<< Updated upstream
                                    <hr className="cart-solid"></hr>
                                    <h5>Vận chuyển: <span style={{ color: 'black', float: 'right' }}>Miễn phí vận chuyển</span></h5>
                                    <hr className="cart-solid"></hr>
                                    <h5>Thanh toán: <span style={{ color: 'black', float: 'right' }}>{total.toLocaleString()} VNĐ</span></h5>
                                    <div className="d-flex">
                                        <input type="text" className="form-control mr-2" placeholder="Mã giảm giá/Quà tặng" />
                                        <Button style={{ background: '#614A4A' }} className="cart-apply-button">Áp dụng</Button>
                                    </div>
                                    <Button style={{ background: '#ce0303', marginTop: '15px' }} className="w-100 cart-btn-proceed-to-checkout" type="submit">Tiến hành đặt hàng</Button>
=======
                                    <hr class="solid"></hr>
                                    <h5>Vận chuyển: <span style={{ color: 'black', float: 'right' }}>Miễn phí vận chuyển</span></h5>
                                    <hr class="solid"></hr>
                                    <h5>Thanh toán: <span style={{ color: 'black', float: 'right' }}>{total.toLocaleString()} VNĐ</span></h5>
                                    <div className="d-flex">
                                        <input type="text" className="form-control mr-2" placeholder="Mã giảm giá/Quà tặng" />
                                        <Button style={{ background: '#614A4A' }} className="apply-button">Áp dụng</Button>
                                    </div>
                                    <Button style={{ background: '#ce0303', marginTop: '15px' }} className="w-100 btn-proceed-to-checkout" type="submit">Tiến hành đặt hàng</Button>
>>>>>>> Stashed changes
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
