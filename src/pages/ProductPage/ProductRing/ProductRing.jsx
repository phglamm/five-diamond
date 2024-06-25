import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../../config/axios';
import ProductCard from '../../../components/productCard/productCard';
import Banner from "../../../components/Banner/banner";
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
                <Banner
                    className="product-ring-banner"
                    pic1={"https://drive.google.com/thumbnail?id=1CC5L7IMkjFX4t6hC-SEnh0v3lnzlTIoD&sz=w1000"}
                    pic2={"https://drive.google.com/thumbnail?id=1TSu4mkJHy9ucTWQhRRqdK5FswjO6snRZ&sz=w1000"}
                    pic3={"https://drive.google.com/thumbnail?id=17TafMMY2QsClp9XFB9z6Giuq3Rtg8qwr&sz=w1000"}
                    pic4={"https://drive.google.com/thumbnail?id=1AJRpQgCI7U_pS0Mf8-29fECsxFIhHtSQ&sz=w1000"}

                />
                {/* <div className='product-ring-banner'>
                    <img src='https://drive.google.com/thumbnail?id=1URfmW1gg8-XLmPFOugwEw9KfWVcV19w3&sz=w1000' alt='Ring Banner' />
                </div> */}
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