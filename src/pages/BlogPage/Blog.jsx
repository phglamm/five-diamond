import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RowCollection from "../../components/RowCollection/RowCollection";
import rowbanner1 from "../../../public/assets/images/rowBanner/rowbanner1.jpg";
import { Container } from "react-bootstrap";
import { routes } from "../../routes";
import MyBreadcrumb from "../../components/Breadcrumb/Breadcrumb";

export default function Blog() {
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
        <RowCollection
          collectionImage="https://drive.google.com/thumbnail?id=1QSzd4Ins8t1zsIoTJyv1Nl-2HuXgFkly&sz=w1000"
          collectionTitle="ĐO SIZE NHẪN"
          collectionDesc="Với trang sức, nhẫn là sản phẩm thường phải sửa nhiều nhất cho phù hợp
với cỡ tay của người sử dụng. Một chiếc nhẫn vừa vặn sẽ cho bạn cảm giác
tự tin thoải mái khi đeo"
          collectionLink={routes.size}
        ></RowCollection>
        <RowCollection
          collectionImage="https://drive.google.com/thumbnail?id=1VLX48E1m_c9GsAeOY8FJ0MeulCAlSr69&sz=w1000"
          collectionTitle="KIẾN THỨC KIM CƯƠNG"
          collectionDesc="Tên gọi “kim cương” trong tiếng Hy Lạp là “adamas” có nghĩa là “không
thể phá huỷ”. Còn trong ngôn ngữ tiếng Việt, chữ “kim cương” có gốc Hán Việt
nghĩa là “kim loại cứng”."
          collectionLink={routes.kienthuc}
        ></RowCollection>
        <RowCollection
          collectionImage="https://drive.google.com/thumbnail?id=1Ns2un935K_exifmgOtbRl6iTLGlq7jvW&sz=w1000"
          collectionTitle="KIẾN THỨC TRANG SỨC"
          collectionDesc="Ngay từ buổi đầu, trang sức đã là một phần không thể thiếu trong văn minh
nhân loại. Trải qua nhiều thời kì khác nhau cho đến ngày nay, trang sức đã
phát triển vượt bậc"
          collectionLink={routes.accessoryInfor}
        ></RowCollection>
      </Container>
      <Footer></Footer>
    </div>
  );
}
