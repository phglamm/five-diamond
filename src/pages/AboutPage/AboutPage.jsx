import { Col, Container, Row } from "react-bootstrap";
import "./AboutPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function AboutPage() {
  // const AboutImage = ({ src }) => <img src={src} alt="about-banner" className="about-banner-img" />;
  // const imageUrl = "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID";
  // const imageUrl = "https://drive.google.com/uc?export=view&id=16C7eBsBnFCGEtzYvZIwFKTTjbZaBIlsJ";

  return (
    <div>
      <Header />

      <Container className="about-container">
        <Row className="about-content-row">
          <Col className="about-banner-big">
            {/* <AboutImage src='https://jemmia.vn/wp-content/uploads/2022/10/About-Jemmia-4.jpg' /> */}
            {/* <img src='https://drive.google.com/uc?export=view&id=16C7eBsBnFCGEtzYvZIwFKTTjbZaBIlsJ' alt="about-banner" /> */}
            {/* <img src={imageUrl} alt="about-banner" /> */}

            <img
              className="about-banner-img"
              src="https://drive.google.com/thumbnail?id=16C7eBsBnFCGEtzYvZIwFKTTjbZaBIlsJ&sz=w1000"
              alt=""
            />

            <div className="about-banner-info-big">
              <h2>VỀ CÔNG TY CỔ PHẦN FIVE DIAMOND</h2>
              <p>
                Với triết lý kinh doanh "Uy tín quý hơn kim cương" Five Diamond
                luôn tự hào khi đem lại vẻ đẹp tinh tế, sang trọng cho khách
                hàng. Với đội ngũ nghệ nhân kim hoàn tài ba, chúng tôi cam kết
                mang đến những sản phẩm kim cương và trang sức chất lượng nhất.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="about-content-row">
          <Col md={6} className="d-flex">
            <img
              className="about-banner-img"
              src="https://drive.google.com/thumbnail?id=1D_a6VmfmrL-4T-7jx6J6h9gaHRLhwLjj&sz=w1000"
              alt=""
            />
          </Col>
          <Col md={6} className="d-flex">
            <div className="about-banner-info">
              <h3 className="banner-header">TẦM NHÌN</h3>
              <p>
                Trở thành công ty chuyên gia tại Việt Nam trong lĩnh vực kim
                cương, mang đến sản phẩm kim cương chất lượng cùng thiết kế
                trang sức sáng tạo tôn vinh vẻ đẹp, vươn tầm thế giới.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="about-content-row">
          <Col md={6} className="d-flex">
            <div className="about-banner-info">
              <h3 className="banner-header">TRANG SỨC FIVE DIAMOND</h3>
              <p>
                Mang đến cho bạn trải nghiệm khác biệt với không gian phòng VIP
                riêng tư, thiết kế trang sức tinh tế, mang đậm dấu ấn cá nhân và
                được đảm bảo chất lượng với công nghệ kiểm định kim cương hiện
                đại nhất từ GIA.
              </p>
            </div>
          </Col>
          <Col md={6} className="d-flex">
            <img
              className="about-banner-img"
              src="https://drive.google.com/thumbnail?id=1r7d-wL8CrMUPBdo2A8JozO7O2lyeONEE&sz=w1000"
              alt=""
            />
          </Col>
        </Row>

        <Row className="about-content-row">
          <Col md={6} className="d-flex">
            <img
              className="about-banner-img"
              src="https://drive.google.com/thumbnail?id=1x_QCzGrDyZpmDSI7Ckcy4TxWERrwK3YC&sz=w1000"
              alt=""
            />
          </Col>
          <Col md={6} className="d-flex">
            <div className="about-banner-info">
              <h3 className="banner-header">KIM CƯƠNG FIVE DIAMOND</h3>
              <p>
                100% kim cương tại Five Diamond được nhập khẩu hải quan chính
                ngạch, sở hữu đầy đủ giấy tờ pháp lý minh bạch, bảo vệ vững chắc
                cho tài sản của bạn.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
