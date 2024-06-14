import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import "./SizePage.css";

export default function SizePage() {
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
            <h1 className="size-title">Hướng dẫn & kích thước nhẫn</h1>
          </div>

          <Row className="Size-Guide justify-content-center ">
            <Col xs="auto">
              <Link to={routes.size}>Nhẫn</Link>
            </Col>
            <Col xs="auto">
              <Link to={routes.chain}>Dây chuyền và Vòng cổ</Link>
            </Col>
            <Col xs="auto">
              <Link to={routes.kienthuc}>Kiến Thức Kim Cương</Link>
            </Col>
          </Row>

          <div className="center-title">
            <h1 className="size-title">CÁCH ĐO SIZE NHẪN CỦA BẠN</h1>
          </div>

          <div className="guide-container">
            <h2 className="guide-title">
              Có một vài phương pháp khác nhau để tìm size nhẫn hoàn hảo của bạn.
              Nếu bạn đã có một chiếc nhẫn vừa với ngón tay, bạn có thể đo trực
              tiếp hoặc so sánh với bảng kích thước của chúng tôi. Nếu không, bạn
              có thể đo ngón tay của mình để xác định kích thước. Khám phá cách đo
              size nhẫn của bạn dưới đây.
            </h2>
          </div>

          <Row className="split-columns">
            <Col md={6}>
              <h3 className="size-tutorial">PHƯƠNG PHÁP 1: ĐO NHẪN</h3>
              <ul>
                <li>
                  Tìm một chiếc nhẫn vừa với ngón tay mà bạn dự định đeo nhẫn mới.
                </li>
                <li>
                  Đo đường kính trong của nhẫn bằng thước kẻ hoặc thước dây. Để
                  làm điều này, đảm bảo bạn sử dụng thước có đơn vị milimét (mm),
                  sau đó đặt nhẫn lên trên thước và đo phần bên trong của vòng
                  tròn – tức là phần tiếp xúc với ngón tay của bạn.
                </li>
                <li>
                  Sử dụng{" "}
                  <span className="link" onClick={scrollToSizeChart}>
                    Bảng Kích Thước Nhẫn
                  </span>{" "}
                  của chúng tôi để chuyển đổi số đo đường kính của bạn thành kích
                  thước nhẫn chính xác.
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <img
                src="https://images.ctfassets.net/7m8i36sp5l90/3IGO4XBiD88X0HZysKlU7p/a4f221ec4f7902ff47bd76302b47006a/Method-1-Ring-Size_2x.jpg?fit=scale&fm=webp&q=100&w=1216"
                alt="Phương Pháp 1"
                className="method-image"
              />
            </Col>
          </Row>

          <Row className="split-columns">
            <Col md={6}>
              <img
                src="https://images.ctfassets.net/7m8i36sp5l90/4JRK5VOh7QHBdp9oNd1Vch/3be80d84f9562c6143b14590bb25362a/Method-2-Ring-Size_2x.jpg?fit=scale&fm=webp&q=100&w=1216"
                alt="Phương Pháp 2"
                className="method-image"
              />
            </Col>
            <Col md={6}>
              <h3 className="size-tutorial">PHƯƠNG PHÁP 2: ĐO NGÓN TAY</h3>
              <ul>
                <li>
                  Cắt một đoạn dây hoặc giấy có chiều dài khoảng 10 centimet (cm).
                </li>
                <li>
                  Quấn giấy hoặc dây quanh ngón tay tại điểm mà nhẫn sẽ nằm. Kéo
                  để dây vừa khít với ngón tay của bạn - không quá chặt và không
                  quá lỏng.
                </li>
                <li>
                  Dùng bút đánh dấu điểm mà đầu dây hoặc giấy chồng lên nhau.
                </li>
                <li>
                  Đặt dây hoặc giấy lên thước kẻ hoặc thước dây và đo chiều dài
                  (mm) từ đầu đến điểm bạn đã đánh dấu bằng bút.
                </li>
                <li>
                  Số đo này sẽ cho bạn chu vi ngón tay của bạn. Sử dụng nó để tìm
                  kích thước của bạn bằng{" "}
                  <span className="link" onClick={scrollToSizeChart}>
                    Bảng Kích Thước Nhẫn
                  </span>{" "}
                  của chúng tôi dưới đây.
                </li>
              </ul>
            </Col>
          </Row>

          <div className="tips">
            <h2>MẸO CHUYÊN NGHIỆP</h2>
            <div className="tips-columns">
              <div className="tips-column">
                <p>1. Luôn kiểm tra lại số đo của bạn để đảm bảo độ chính xác.</p>
                <p>
                  2. Kích thước ngón tay của bạn có thể thay đổi nhẹ trong ngày,
                  theo thời gian và tùy thuộc vào nhiệt độ. Nếu bạn đo ngón tay
                  của mình, hãy làm vào buổi chiều khi tay bạn ấm để có kết quả
                  tốt nhất. Nếu bạn nằm giữa hai kích thước nhẫn, hãy chọn kích
                  thước lớn hơn (hoặc nửa kích thước) để đảm bảo vừa vặn thoải
                  mái.
                </p>
              </div>
              <div className="tips-column">
                <p>
                  3. Đảm bảo bạn đo đúng ngón tay mà bạn dự định đeo nhẫn (hoặc
                  một chiếc nhẫn mà bạn đeo trên cùng ngón tay). Kích thước nhẫn
                  của bạn sẽ khác nhau giữa các ngón tay cũng như giữa các bàn
                  tay.
                </p>
                <p>
                  4. Nếu bạn không chắc chắn về kích thước chính xác, hoặc bạn
                  đang mua một món đồ đặc biệt như nhẫn đính hôn, hãy tìm đến sự
                  hỗ trợ của chuyên gia để đo kích thước nhẫn chuyên nghiệp.
                </p>
              </div>
            </div>
          </div>

          <div className="size-chart-section" ref={sizeChartRef}>
            <h2>BẢNG KÍCH THƯỚC NHẪN</h2>
            <div className="size-chart-img">
              <img
                src="https://images.ctfassets.net/7m8i36sp5l90/vaD7moByXyjCZl408eMWc/d66f2c0b6ea920e1f9ec401c812b73b3/RingSizeChart.jpg?fit=scale&fm=webp&q=100&w=1280"
                alt="Bảng Kích Thước Nhẫn"
                className="method-image"
              />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
