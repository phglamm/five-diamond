import { Container } from "react-bootstrap";
import RowCollection from "../../components/productCard/RowCollection/RowCollection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CollectionPage.css";
import { routes } from "../../routes";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function CollectionPage() {
  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  async function fetchCollection() {
    const response = await api.get("collection");
    setCollection(response.data);
  }

  useEffect(() => {
    fetchCollection();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const offset = (currentPage - 1) * itemsPerPage;
  const currentPageData = collection.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(collection.length / itemsPerPage);

  return (
    <div>
      <Header />
      <Container>
        <h1 className="CollectionPage-Title">Bộ Sưu Tập</h1>

        {currentPageData.map((collection) => (
          <RowCollection
            key={collection.id}
            collectionImage={collection.imgURL}
            collectionTitle={collection.name}
            collectionDesc={collection.description}
            collectionLink={`${routes.bst}/${collection.id}`}
          />
        ))}

        <Stack spacing={2} alignItems="center">
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            className="custom-pagination"
          />
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}
