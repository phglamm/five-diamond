import { Container } from "react-bootstrap";
import RowCollection from "../../components/productCard/RowCollection/RowCollection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CollectionPage.css";
import { routes } from "../../routes";
import api from "../../config/axios";
import { useEffect, useState } from "react";
export default function CollectionPage() {
  const [collection, setCollection] = useState([]);

  async function fetchCollection() {
    const response = await api.get("collection");
    setCollection(response.data);
  }

  useEffect(() => {
    fetchCollection();
  }, []);
  return (
    <div>
      <Header></Header>
      <Container>
        <h1 className="CollectionPage-Title">Bộ Sưu Tập</h1>

        {collection.map((collection) => (
          <RowCollection
            key={collection.id}
            collectionImage={collection.imgURL}
            collectionTitle={collection.name}
            collectionDesc={collection.description}
            collectionLink={`${routes.bst}/${collection.id}`}
          ></RowCollection>
        ))}
      </Container>
      <Footer></Footer>
    </div>
  );
}
