import React, { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { routes } from "../../routes";
import "./ChainSizePage.css";

export default function ChainSizePage() {
    const sizeChartRef = useRef(null);

    const scrollToSizeChart = () => {
        sizeChartRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="page-container">
            <Header />
            <div className="main-container">
                <Container>
                    <div className="center-title">
                        <h1 className="size-title">Hướng dẫn & kích thước vòng cổ</h1>
                    </div>

                    <Row className="Size-Guide justify-content-center">
                        <Col xs="auto">
                            <Link to={routes.size}>Nhẫn</Link>
                        </Col>
                        <Col xs="auto">
                            <Link to={routes.chain}>Dây chuyền và Vòng cổ</Link>
                        </Col>
                        <Col xs="auto">
                            <Link to="#">Kiến Thức Kim Cương</Link>
                        </Col>
                    </Row>

                    <div className="center-title">
                        <h1 className="size-title">CÁCH CHỌN CHIỀU DÀI DÂY CHUYỀN PHÙ HỢP</h1>
                    </div>

                    <div className="guide-container">
                        <h2 className="guide-title">
                            Chiều dài phổ biến nhất của dây chuyền và vòng cổ dao động từ 40cm đến 60cm. Chiều dài phù hợp với bạn phụ thuộc vào phong cách cá nhân của bạn và vị trí bạn muốn dây chuyền của mình nằm. Một dây chuyền dài 40cm thường sẽ nằm ở đáy cổ của bạn hoặc ngay trên xương đòn, trong khi một dây chuyền dài 60cm sẽ có độ rơi dài hơn đến khoảng giữa ngực. Sử dụng hình ảnh dưới đây như một hướng dẫn xấp xỉ để biết cách các chiều dài dây chuyền khác nhau sẽ trông như thế nào. Nếu bạn đang tạo kiểu dây chuyền xếp lớp, hãy đảm bảo bạn đeo các dây chuyền ở các độ dài khác nhau để mỗi lớp có thể được nhìn thấy và tạo ra vẻ ngoài xếp tầng theo xu hướng.
                        </h2>
                    </div>
                </Container>

                <div className="chain-img-container">
                    
                    <img
                        src="https://drive.google.com/thumbnail?id=1NmlQGiBLg8Qe3-Bd0TOPpMvIOJmAxyNL&sz=w1000"
                        alt="chain1"
                        className="chain-img"
                    />
                </div>

                <Container>
                    <Row className="split-columns">
                        <Col md={5}>
                            <h3 className="size-tutorial">CÁCH CHỌN LOẠI DÂY CHUYỀN</h3>
                            <p>
                                Ngoài chiều dài của dây chuyền, còn có nhiều kiểu dáng dây chuyền khác nhau để bạn lựa chọn, từ những thiết kế mảnh và tinh tế đến những dây chuyền to bản. Tất cả những yếu tố này đều ảnh hưởng đến việc bạn muốn tạo phong cách như thế nào. Để tìm hiểu thêm về các loại dây chuyền và cách tạo kiểu cho chúng, hãy xem hướng dẫn kiểu dây chuyền của chúng tôi.
                            </p>
                        </Col>
                        <Col md={7}>
                            <img
                                src="https://drive.google.com/thumbnail?id=1YVjw-0foY4IQ92HMevKqYlbHBmmcDhmY&sz=w1000"
                                alt="chain2"
                                className="chain-img2"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
