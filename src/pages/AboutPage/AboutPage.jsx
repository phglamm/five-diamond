// import { Col, Container, Row } from "react-bootstrap";
// import banner5 from "/assets/images/Banner/banner5.jpg";
// import banner6 from "/assets/images/Banner/banner6.jpg";
// import banner7 from "/assets/images/Banner/banner7.png";
// import banner8 from "/assets/images/Banner/banner8.jpg";
// import "./AboutPage.css";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";

// const AboutImage = () => <div className="AboutImage"></div>;

// export default function AboutPage() {
//   return (
//     <div>
//       <Header />

//       <Container className="about-container">
//         <AboutImage
//           pic5={banner5}
//           pic6={banner6}
//           pic7={banner7}
//           pic8={banner8}
//         />

//         <Row className="about-content-row">
//           <Col className="about-banner-big">
//             <img src={banner5} alt="banner5" className="about-banner-img" />
//             <div className="about-banner-info-big">
//               <h2>VỀ CÔNG TY CỔ PHẦN FIVE DIAMOND</h2>
//               <p>
//                 Với triết lý kinh doanh "Uy tín quý hơn kim cương" Five Diamond
//                 luôn tự hào khi đem lại vẻ đẹp tinh tế, sang trọng cho khách
//                 hàng. Với đội ngũ nghệ nhân kim hoàn tài ba, chúng tôi cam kết
//                 mang đến những sản phẩm kim cương và trang sức chất lượng nhất.
//               </p>
//             </div>
//           </Col>
//         </Row>

//         <Row className="about-content-row">
//           <Col md={6} className="d-flex">
//             <img src={banner6} alt="banner6" className="about-banner-img" />
//           </Col>
//           <Col md={6} className="d-flex">
//             <div className="about-banner-info">
//               <h3 className="banner-header">TẦM NHÌN</h3>
//               <p>
//                 Trở thành công ty chuyên gia tại Việt Nam trong lĩnh vực kim
//                 cương, mang đến sản phẩm kim cương chất lượng cùng thiết kế
//                 trang sức sáng tạo tôn vinh vẻ đẹp, vươn tầm thế giới.
//               </p>
//             </div>
//           </Col>
//         </Row>

//         <Row className="about-content-row">
//           <Col md={6} className="d-flex">
//             <div className="about-banner-info">
//               <h3 className="banner-header">TRANG SỨC FIVE DIAMOND</h3>
//               <p>
//                 Mang đến cho bạn trải nghiệm khác biệt với không gian phòng VIP
//                 riêng tư, thiết kế trang sức tinh tế, mang đậm dấu ấn cá nhân và
//                 được đảm bảo chất lượng với công nghệ kiểm định kim cương hiện
//                 đại nhất từ GIA.
//               </p>
//             </div>
//           </Col>
//           <Col md={6} className="d-flex">
//             <img src={banner7} alt="banner7" className="about-banner-img" />
//           </Col>
//         </Row>

//         <Row className="about-content-row">
//           <Col md={6} className="d-flex">
//             <img src={banner8} alt="banner8" className="about-banner-img" />
//           </Col>
//           <Col md={6} className="d-flex">
//             <div className="about-banner-info">
//               <h3 className="banner-header">KIM CƯƠNG FIVE DIAMOND</h3>
//               <p>
//                 100% kim cương tại Five Diamond được nhập khẩu hải quan chính
//                 ngạch, sở hữu đầy đủ giấy tờ pháp lý minh bạch, bảo vệ vững chắc
//                 cho tài sản của bạn.
//               </p>
//             </div>
//           </Col>
//         </Row>
//       </Container>

//       <Footer />
//     </div>
//   );
// }


import { Col, Container, Row } from "react-bootstrap";
import banner5 from "/assets/images/Banner/banner5.jpg";
import banner6 from "/assets/images/Banner/banner6.jpg";
import banner7 from "/assets/images/Banner/banner7.png";
import banner8 from "/assets/images/Banner/banner8.jpg";
import "./AboutPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const AboutImage = ({ src }) => <img src={src} alt="about-banner" className="about-banner-img" />;

export default function AboutPage() {
  return (
    <div>
      <Header />

      <Container className="about-container">
        <Row className="about-content-row">
          <Col className="about-banner-big">
            <AboutImage src="https://drive.google.com/thumbnail?id=16C7eBsBnFCGEtzYvZIwFKTTjbZaBIlsJ&sz=w1000" alt="anh1"/>
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
            <AboutImage src="https://drive.google.com/thumbnail?id=1D_a6VmfmrL-4T-7jx6J6h9gaHRLhwLjj&sz=w1000" alt="anh2" />
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
            <AboutImage src="https://drive.google.com/thumbnail?id=1r7d-wL8CrMUPBdo2A8JozO7O2lyeONEE&sz=w1000" alt="anh3" />
          </Col>
        </Row>

        <Row className="about-content-row">
          <Col md={6} className="d-flex">
            <AboutImage src="https://drive.google.com/thumbnail?id=1x_QCzGrDyZpmDSI7Ckcy4TxWERrwK3YC&sz=w1000" alt="4" />
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