import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { products } from "./ListOfProducts";
import ProductCard from "../../../components/productCard/productCard";
import BasicPagination from "../../../components/BasicPagination/BasicPagination";
import Banner from "../../../components/Banner/banner";
import api from "../../../config/axios";

export default function CuffProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;
    setCurrentPage(page);
  }, [location]);

  
  async function fetchProduct() {
    const response = await api.get('http://157.245.145.162:8080/api/product-line');
    // setProduct(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    // console.log("abc");
    fetchProduct();
  }, []);
  
  
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`);
  };

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the products array based on the current page and page size
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const totalPage = Math.ceil(filteredProducts.length / pageSize);

  // Function to calculate sale price
  const calculateSalePrice = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const salePrice = originalPrice - discountAmount;
    return salePrice.toFixed(2); // Round to 2 decimal places
  };

  // Generate menu items for the dropdown
  const menu = (
    <Menu
      onClick={({ key }) => setSelectedCategory(key === "all" ? null : key)}
    >
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="cuff">Cuffs</Menu.Item>
      <Menu.Item key="necklace">Necklaces</Menu.Item>
      <Menu.Item key="piercing">Piercings</Menu.Item>
      <Menu.Item key="ring">Rings</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Header />
      <Container>
        {/* Banner component */}
        <Banner
          className="cuff-product-banner"
          pic1={"https://drive.google.com/thumbnail?id=1A9fon2204BjSZX1b3bdyd5i5hJJMBXua&sz=w1000"}
          pic2={"https://drive.google.com/thumbnail?id=1sISfa-6lHVx5BVr4lLFeUMGu5DyYiZXH&sz=w1000"}
          pic3={"https://drive.google.com/thumbnail?id=1-0i9YcpfGil7K29pcPkYwm87-XF7qfFm&sz=w1000"}
       
        />
        <div>
          {/* <Dropdown overlay={menu} trigger={['hover']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Filter by Category
                        </a>
                    </Dropdown> */}
          <div
            className="cuff-product-card"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {paginatedProducts.map((product) => {
              // const salePrice = calculateSalePrice(product.price, product.sale);
              // const salePercentage = `${product.sale}%`;
              return (
                <div
                  key={product.id}
                  style={{ flex: "1 0 18%", margin: "10px" }}
                >
                  <ProductCard
                    img={product.img}
                    text={product.name}
                    price={product.price}
                    pageType="guest-page"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BasicPagination
            count={totalPage}
            page={currentPage}
            onChange={handleChangePage}
          />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
