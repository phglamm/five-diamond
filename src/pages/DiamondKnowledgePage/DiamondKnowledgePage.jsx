import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./DiamondKnowledgePage.css";
import { Container } from "react-bootstrap";
import MyBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { routes } from "../../routes";

export default function DiamondKnowledgePage() {
  return (
    <div>
      <Header></Header>

      <Container>
        <MyBreadcrumb
          title1="KIẾN THỨC"
          link1={routes.blog}
          isChoice1={true}
          title2="CHÍNH SÁCH BẢO HÀNH"
          link2={routes.warrantyPolicy}
          title3="THÔNG TIN KHUYẾN MÃI"
          link3={routes.sale}
        ></MyBreadcrumb>
        <div className="diamond-knowledge-container">
          <h1 className="diamond-knowledge-title">KIẾN THỨC KIM CƯƠNG</h1>
          <div className="info-content">
            <h4 className="type">Shape</h4>
            <p className="content">
              Kim cương có thể chế tác thành nhiều hình dạng khác nhau. Mỗi một
              hình dạng kim cương đều khác biệt và có những tính chất riêng xác
              định chất lượng của mỗi hình dạng. Tùy thuộc vào kiểu dáng chế tác
              của trang sức, mỗi hình dạng viên kim cương có thể đem lại hiêu
              quả hiển thị khác nhau cho trang sức.
            </p>
            <div className="dk">
              <img src={"https://drive.google.com/thumbnail?id=1f8lGvjfm6dQAH7bVJYHhPfD7ettnyU3Z&sz=w1000"} alt="Diamond Knowledge 1"></img>
            </div>
          </div>
          <div className="info-content">
            <h4 className="type">{"Color: Màu kim cương (nước kim cương)"}</h4>
            <p className="content">
              Nước kim cương được xác định trên cơ sở sự xuất hiện của các màu
              sắc. Viên kim cương càng ít màu thì càng hiển thị được nhiều màu
              lửa (sự phản xạ của ánh sáng) và càng được đánh giá cao.
            </p>
            <div className="dk">
              <img src={"https://drive.google.com/thumbnail?id=1GymXyEe8inAwisqMJRurcErR3OlDZGjC&sz=w1000"} alt="Diamond Knowledge 2"></img>
            </div>
          </div>
          <div className="info-content">
            <h4 className="type">Carat Weight: Trọng lượng kim cương</h4>
            <p className="content">
              Đơn vị đo trọng lượng của viên kim cương là carat (ct). Hai viên
              kim cương có trọng lượng bằng nhau nhưng có thể trông không cùng
              một kích thước do các thông số hoặc cách cắt khác nhau. Ở Việt
              Nam, thông thường khách hàng quan tâm đến kích thước hơn là trọng
              lượng. Mặc dù vậy, kích thước và trọng lượng của viên kim cương có
              tỷ lệ thuận với nhau.
            </p>
            <div className="dk">
              <img src={"https://drive.google.com/thumbnail?id=1f8lGvjfm6dQAH7bVJYHhPfD7ettnyU3Z&sz=w1000"} alt="Diamond Knowledge 3"></img>
            </div>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}
