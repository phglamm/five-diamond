/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import ProductCard from "../productCard/productCard";
import "./rowProduct.css";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { Key } from "@mui/icons-material";

export default function RowProduct({ banner, products }) {
  // Filter products based on the collection's imgURL
  // const filteredProducts = products.filter(
  //   (product) =>
  //     product.collection !== null && product.collection.imgURL === banner
  // );

  const [collection, setCollection] = useState([]);

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const [bannersResponse, productsResponse] = await Promise.all([
    //       api.get("collection"),
    //       api.get("product-line"),
    //     ]);
    //     setCollection(bannersResponse.data);
    //     setProducts(productsResponse.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // }
    // fetchData();

    async function fetchCollection() {
      try {
        const response = await api.get("collection/available");
        setCollection(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchCollection();
  }, []);
  return (
    <Row className="rowProduct">
      {/* <Col xs={6}>
        <div className="rowBanner">
          <img src={banner} alt="Collection Banner" />
        </div>
      </Col>
      {filteredProducts.slice(0, 3).map((product, index) => (
        <Col key={index} xs={2}>
          <ProductCard
            id={product.id}
            img={product.imgURL} // Assuming imgURL is part of product data
            text={product.name} // Assuming name is part of product data
            price={`${product.finalPrice.toLocaleString()}đ`} // Assuming finalPrice is part of product data
          />
        </Col>
      ))} */}

      {collection.slice(0, 3).map((collection) => (
        <>
          <Col xs={6} key={collection.id}>
            <div className="rowBanner">
              <img src={collection.imgURL} alt="Collection Banner" />
            </div>
          </Col>
          {collection.productLines.slice(0, 3).map((product, index) => (
            <Col key={index} xs={2}>
              <ProductCard
                id={product.id}
                img={product.imgURL} // Assuming imgURL is part of product data
                text={product.name} // Assuming name is part of product data
                price={`${product.finalPrice.toLocaleString()}đ`} // Assuming finalPrice is part of product data
              />
            </Col>
          ))}
        </>
      ))}
    </Row>
  );
}
