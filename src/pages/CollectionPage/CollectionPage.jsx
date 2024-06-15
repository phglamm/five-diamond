import { Container } from "react-bootstrap";
import RowCollection from "../../components/RowCollection/RowCollection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import rowbanner1 from "../../../public/assets/images/rowBanner/rowbanner1.jpg";
import "./CollectionPage.css";
export default function CollectionPage() {
  return (
    <div>
      <Header></Header>
      <Container>
        <h1 className="CollectionPage-Title">Bộ Sưu Tập</h1>
        <RowCollection
          collectionImage={rowbanner1}
          collectionTitle={"BST TRANG SỨC 14K LUCKY ME"}
          collectionDesc={
            "BST Trang sức 14k LUCKY ME mang đến sự may mắn trong thành công trong công việc trong cuộc sống"
          }
          collectionLink=""
        ></RowCollection>
        <RowCollection
          collectionImage={rowbanner1}
          collectionTitle={"BST TRANG SỨC 14K LUCKY ME"}
          collectionDesc={
            "BST Trang sức 14k LUCKY ME mang đến sự may mắn trong thành công trong công việc trong cuộc sống"
          }
          collectionLink=""
        ></RowCollection>
        <RowCollection
          collectionImage={rowbanner1}
          collectionTitle={"BST TRANG SỨC 14K LUCKY ME"}
          collectionDesc={
            "BST Trang sức 14k LUCKY ME mang đến sự may mắn trong thành công trong công việc trong cuộc sống"
          }
          collectionLink=""
        ></RowCollection>
      </Container>
      <Footer></Footer>
    </div>
  );
}
