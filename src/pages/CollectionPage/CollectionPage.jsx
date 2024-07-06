import { Container } from "react-bootstrap";
import RowCollection from "../../components/productCard/RowCollection/RowCollection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CollectionPage.css";
import { routes } from "../../routes";
import api from "../../config/axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function CollectionPage() {
  const [collection, setCollection] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  async function fetchCollection() {
    const response = await api.get("collection");
    setCollection(response.data);
  }

  useEffect(() => {
    fetchCollection();
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = collection.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(collection.length / itemsPerPage);

  return (
    <div>
      <Header></Header>
      <Container>
        <h1 className="CollectionPage-Title">Bộ Sưu Tập</h1>

        {currentPageData.map((collection) => (
          <RowCollection
            key={collection.id}
            collectionImage={collection.imgURL}
            collectionTitle={collection.name}
            collectionDesc={collection.description}
            collectionLink={`${routes.bst}/${collection.id}`}
          ></RowCollection>
        ))}

        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Container>
      <Footer></Footer>
    </div>
  );
}
