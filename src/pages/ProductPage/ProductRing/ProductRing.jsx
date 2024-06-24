import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../../config/axios';
import ProductCard from '../../../components/productCard/productCard';
import './ProductRing.css'

function ProductRing() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    async function fetchProduct() {
        const response = await api.get("product-line");
        setProduct(response.data);
        console.log(response.data);
    }
    useEffect(() => {
        fetchProduct();
    }, []);

    // Lấy 5 sản phẩm đầu tiên
    const firstFiveProducts = product.slice(0, 15);
    const specialpro = firstFiveProducts.filter(
        (itemSpecial) => itemSpecial.deleted === false
    );

    return (
        <div>
            <Header />
            <Container>
                <div className='product-ring-banner'>
                    <img src='https://drive.google.com/thumbnail?id=1URfmW1gg8-XLmPFOugwEw9KfWVcV19w3&sz=w1000' alt='Ring Banner' />
                </div>
                <Row>
                    {specialpro.map((item, index) => (
                        <Col key={index} className="product-card-item">
                            <ProductCard
                                img={item.imgURL}
                                text={item.name}
                                price={item.price.toLocaleString() + "đ"}
                                pageType="guest-page"
                                id={item.id}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductRing;