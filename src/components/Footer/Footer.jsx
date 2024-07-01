import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import SearchBar from "../searchBar/searchBar";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const h5Refs = useRef([]);
  const hrRefs = useRef([]);

  useEffect(() => {
    h5Refs.current.forEach((h5, index) => {
      if (h5 && hrRefs.current[index]) {
        hrRefs.current[index].style.width = `${h5.offsetWidth}px`;
      }
    });
  }, []);

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  return (
    <Container fluid className="Footer">
      {/* <hr className="Footer-head-hr" /> */}
      <Row>
        <Col xs={4} className="Footer-center">
          <i className="pi pi-phone"></i>
          <span> HOTLINE: </span>
          <Link to="tel:18001168">18001168</Link>
        </Col>

        <Col xs={4} className="Footer-logo">
          <img
            src={
              "https://drive.google.com/thumbnail?id=1TID9g_LphvHeN1htPBH_0zoxe0o1CqaE&sz=w1000"
            }
            alt=""
          />
        </Col>
        <Col xs={4} className="Footer-center">
          <i className="pi pi-map"></i>
          <span>HỆ THỐNG PHÂN PHỐI</span>
        </Col>
      </Row>

      <Row className="Footer-content">
        <Col className="Footer-middle">
          <h5 ref={(el) => addToRefs(el, h5Refs)}>
            <strong>LIÊN HỆ</strong>
          </h5>
          <hr ref={(el) => addToRefs(el, hrRefs)} className="blue-hr" />
          <p>Five Diamond Group</p>
          <p>
            Địa chỉ: VNUHCM Student Cultural House, Lưu Hữu Phước, Đông Hoà, Dĩ
            An, Bình Dương
          </p>
          <p>Điện thoại: 1800 1168</p>
          <p>Email: info@5diamond.vn</p>
        </Col>
        <Col className="Footer-middle">
          <h5 ref={(el) => addToRefs(el, h5Refs)}>
            <strong>VỀ CHÚNG TÔI</strong>
          </h5>
          <hr ref={(el) => addToRefs(el, hrRefs)} className="blue-hr" />
          <p>
            <Link to="">Về Kim Cương 5Diamond</Link>
          </p>
          <p>
            <Link to="">Dịch vụ khách hàng</Link>
          </p>
          <p>
            <a href="">Kinh doanh bán sỉ</a>
          </p>
          <p>
            <a href="">5DIAMOND PREMIUM CLUB</a>
          </p>
        </Col>
        <Col className="Footer-middle">
          <h5 ref={(el) => addToRefs(el, h5Refs)}>
            <strong>DỊCH VỤ KHÁCH HÀNG</strong>
          </h5>
          <hr ref={(el) => addToRefs(el, hrRefs)} className="blue-hr" />
          <p>
            <a href="">Hướng dẫn đặt hàng</a>
          </p>
          <p>
            <a href="">Phương thức thanh toán</a>
          </p>
          <p>
            <a href="">Chính sách & bảo hành</a>
          </p>
          <p>
            <a href="">Cam kết chất lượng</a>
          </p>
          <p>
            <a href="">Điều khoản mua bán</a>
          </p>
        </Col>
        <Col className="Footer-middle">
          <h5 ref={(el) => addToRefs(el, h5Refs)}>
            <strong>TIN TỨC</strong>
          </h5>
          <hr ref={(el) => addToRefs(el, hrRefs)} className="blue-hr" />
          <p>
            <a href="">Tin kim cương</a>
          </p>
          <p>
            <a href="">Video</a>
          </p>
          <p>
            <a href="">Blog</a>
          </p>
        </Col>
        <Col className="Footer-middle">
          <h5>ĐĂNG KÝ NHẬN THÔNG BÁO</h5>
          <SearchBar
            placeholder={"Nhập Email"}
            icon={"pi pi-envelope"}
          ></SearchBar>
          <p id="text-center">
            Nhận ngay thông tin ưu đãi mới nhất từ FiveDiamond
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3>
            <hr className="solid"></hr>
            <span className="connect">Kết nối với chúng tôi</span>
          </h3>
        </Col>
      </Row>

      <Row>
        <Col className="Footer-social">
          <i className="pi pi-facebook"></i>
          <span>Five Diamond</span>
        </Col>
        <Col className="Footer-social">
          <i className="pi pi-youtube"></i>
          <span>Youtube</span>
        </Col>
        <Col className="Footer-social">
          <i className="pi pi-instagram"></i>
          <span>Instagram</span>
        </Col>
        <Col className="Footer-social">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios-filled/50/zalo.png"
            alt="zalo"
          />
          <span>Zalo</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr className="solid"></hr>
        </Col>
      </Row>

      <Row>
        <Col className="Footer-end">
          <p>Copypaste 2024 © Five Diamond Group</p>
        </Col>
        <Col className="Footer-end">
          <span>Về đầu trang</span>
          <span>
            <button
              id="button"
              onClick={() => {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
              }}
            >
              <i className="pi pi-arrow-up"></i>
            </button>
          </span>
        </Col>
      </Row>
    </Container>
  );
}
