import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Col, Container, Row } from 'react-bootstrap';
import "./CollectionSet.css"
import ProductCard from '../../components/productCard/productCard';

export default function CollectionSet2() {
    return (
        <div>
            <Header/>
            <Container>
                <div className="set-banner">
                    <img src={"https://drive.google.com/thumbnail?id=1-z1s17b4ST0kon8TxvsvJzga9X4rYwxT&sz=w1000"} />
                </div>
                <h3 className="collection-set-header">BỘ SƯU TẬP BLOOMING ROSE</h3>
                <Row>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>

                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>

                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                    <Col>
                        <ProductCard
                            img={"https://drive.google.com/thumbnail?id=1gslL9BKVX714wwMsFWiCa9xurdWE9IHY&sz=w1000"}
                            text={"Nhẫn Cưới Salsa 111841F2KK1 111841F2ML1"}
                            price={"22,000,000đ"}
                            pageType="guest-page"
                        />
                    </Col>
                </Row>
            </Container>    
            <Footer/>
        </div>
    );
}
