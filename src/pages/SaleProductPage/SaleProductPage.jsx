


import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Dropdown, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./SaleProductPage.css";
import { saleProducts } from "./ListOfSaleProducts";
import Banner from "../../components/Banner/banner";
import ProductCard from "../../components/productCard/productCard";
import BasicPagination from "../../components/BasicPagination/BasicPagination"; // Adjusted import

const SaleProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16; // Number of items per page

  // Pagination handler
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter products by category
  const filteredProducts = selectedCategory
    ? saleProducts.filter((product) => product.category === selectedCategory)
    : saleProducts;

  // Slice the products array based on the current page and page size
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

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
      <Menu.Item key="ring">Rings</Menu.Item>
      <Menu.Item key="necklace">Necklaces</Menu.Item>
      <Menu.Item key="bracelet">Bracelets</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Header />
      <Container>
        {/* Banner component */}
        <Banner
          className="sale-product-banner"
          pic1={banner1}
          pic2={banner2}
          pic3={banner3}
          pic4={banner4}
        ></Banner>
        <div>
          <div className="sale-content">
            <p>NHẪN ƯU ĐÃI ĐẾN 20%</p>
            <p>VÒNG CỔ ƯU ĐÃI ĐẾN 40%</p>
            <p>KIM CƯƠNG ƯU ĐÃI 2%</p>
          </div>
          {/* Category dropdown */}
          <Dropdown overlay={menu} trigger={["hover"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Filter by Category
            </a>
          </Dropdown>

          {/* Sale product cards */}
          <div className="sale-product-card">
            {paginatedProducts.map((product) => {
              const salePrice = calculateSalePrice(product.price, product.sale);
              const salePercentage = `${product.sale * 100}%`;
              return (
                <div className="col-3" key={product.id}>
                  <ProductCard
                    img={product.img}
                    text={product.name}
                    price={product.price}
                    salePrice={salePrice}
                    salePercent={salePercentage}
                    rating={product.rating}
                    pageType="sale-page"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* Pagination */}
        <Pagination
          className="pagination"
          current={currentPage}
          onChange={onChange}
          total={filteredProducts.length}
          pageSize={pageSize}
        />
        {/* Display page number in URL for page 2 and onwards */}
        {currentPage > 1 && (
          <Link
            to={`/san-pham-giam-gia/page-${currentPage}`}
            className="page-link"
          >
            {currentPage}
          </Link>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default SaleProductPage;

/*-----------------------------------------------------------------------------------------------------------------------------*/

// import React, { useState } from "react";
// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { Dropdown, Menu, Pagination, Slider, Select } from 'antd';
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import "./SaleProductPage.css";
// import { saleProducts } from "./ListOfSaleProducts";
// import Banner from "../../components/Banner/banner";
// import banner1 from "../../../public/assets/images/Banner/banner1.jpg";
// import banner2 from "../../../public/assets/images/Banner/banner2.jpg";
// import banner3 from "../../../public/assets/images/Banner/banner3.jpg";
// import banner4 from "../../../public/assets/images/Banner/banner4.jpg";
// import ProductCard from "../../components/productCard/productCard";

// const { Option } = Select;

// const SaleProductPage = () => {
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [priceRange, setPriceRange] = useState([0, 1000000]);
//     const [material, setMaterial] = useState(null);
//     const [weightRange, setWeightRange] = useState([0, 100]);
//     const [goldPurity, setGoldPurity] = useState(null);
//     const [jewelryType, setJewelryType] = useState(null);
//     const [stoneType, setStoneType] = useState(null);
//     const [sortOption, setSortOption] = useState(null);

//     const pageSize = 16; // Number of items per page

//     // Pagination handler
//     const onChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Calculate the index range for the current page
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;

//     // Filter products by category and other filters
//     const filteredProducts = saleProducts.filter(product => {
//         return (
//             (selectedCategory ? product.category === selectedCategory : true) &&
//             (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
//             (material ? product.material === material : true) &&
//             (product.weight >= weightRange[0] && product.weight <= weightRange[1]) &&
//             (goldPurity ? product.goldPurity === goldPurity : true) &&
//             (jewelryType ? product.type === jewelryType : true) &&
//             (stoneType ? product.stone === stoneType : true)
//         );
//     });

//     // Apply sorting
//     const sortedProducts = filteredProducts.sort((a, b) => {
//         if (sortOption === "newest") {
//             return new Date(b.dateAdded) - new Date(a.dateAdded);
//         } else if (sortOption === "priceLowToHigh") {
//             return a.price - b.price;
//         } else if (sortOption === "priceHighToLow") {
//             return b.price - a.price;
//         }
//         return 0;
//     });

//     // Slice the products array based on the current page and page size
//     const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

//     // Function to calculate sale price
//     const calculateSalePrice = (originalPrice, discountPercentage) => {
//         const discountAmount = (originalPrice * discountPercentage) / 100;
//         const salePrice = originalPrice - discountAmount;
//         return salePrice.toFixed(2); // Round to 2 decimal places
//     };

//     // Generate menu items for the dropdown
//     const menu = (
//         <Menu onClick={({ key }) => setSelectedCategory(key === "all" ? null : key)}>
//             <Menu.Item key="all">All</Menu.Item>
//             <Menu.Item key="ring">Rings</Menu.Item>
//             <Menu.Item key="necklace">Necklaces</Menu.Item>
//             <Menu.Item key="bracelet">Bracelets</Menu.Item>
//         </Menu>
//     );

//     return (
//         <div>
//             <Header />
//             <Container>
//                 {/* Banner component */}
//                 <Banner
//                     className="sale-product-banner"
//                     pic1={banner1}
//                     pic2={banner2}
//                     pic3={banner3}
//                     pic4={banner4}
//                 ></Banner>
//                 <div>
//                     <div className="sale-content">
//                         <p>NHẪN ƯU ĐÃI ĐẾN 20%</p>
//                         <p>VÒNG CỔ ƯU ĐÃI ĐẾN 40%</p>
//                         <p>KIM CƯƠNG ƯU ĐÃI 2%</p>
//                     </div>
//                     {/* Filter and Sort Options */}
//                     <div className="filters">
//                         <Slider
//                             range
//                             step={10000}
//                             min={0}
//                             max={1000000}
//                             defaultValue={priceRange}
//                             onChange={(value) => setPriceRange(value)}
//                             tooltipVisible
//                         />

//                         <Slider
//                             range
//                             step={1}
//                             min={0}
//                             max={100}
//                             defaultValue={weightRange}
//                             onChange={(value) => setWeightRange(value)}
//                             tooltipVisible
//                         />
//                         <Select
//                             placeholder="Chọn chất liệu"
//                             onChange={(value) => setMaterial(value)}
//                             allowClear
//                         >
//                             <Option value="gold">Vàng</Option>
//                             <Option value="silver">Bạc</Option>
//                             <Option value="platinum">Platinum</Option>
//                             <Option value="alloy">Hợp kim</Option>
//                         </Select>
//                         <Select
//                             placeholder="Chọn tuổi vàng"
//                             onChange={(value) => setGoldPurity(value)}
//                             allowClear
//                         >
//                             <Option value="18k">Vàng 18k</Option>
//                             <Option value="24k">Vàng 24k</Option>
//                         </Select>
//                         <Select
//                             placeholder="Chọn loại trang sức"
//                             onChange={(value) => setJewelryType(value)}
//                             allowClear
//                         >
//                             <Option value="ring">Nhẫn</Option>
//                             <Option value="necklace">Vòng cổ</Option>
//                             <Option value="bracelet">Vòng tay</Option>
//                             <Option value="earring">Bông tai</Option>
//                         </Select>
//                         <Select
//                             placeholder="Chọn đá phụ"
//                             onChange={(value) => setStoneType(value)}
//                             allowClear
//                         >
//                             <Option value="diamond">Diamond</Option>
//                             <Option value="mossanite">Mossanite</Option>
//                         </Select>
//                         <Select
//                             placeholder="Sắp xếp theo"
//                             onChange={(value) => setSortOption(value)}
//                             allowClear
//                         >
//                             <Option value="newest">Sản phẩm mới nhất</Option>
//                             <Option value="priceLowToHigh">Giá từ thấp đến cao</Option>
//                             <Option value="priceHighToLow">Giá từ cao đến thấp</Option>
//                         </Select>
//                     </div>
//                     {/* Sale product cards */}
//                     <div className='sale-product-card'>
//                         {paginatedProducts.map((product) => {
//                             const salePrice = calculateSalePrice(product.price, product.sale);
//                             const salePercentage = `${product.sale * 100}%`;
//                             return (
//                                 <div className='col-3' key={product.id}>
//                                     <ProductCard
//                                         img={product.img}
//                                         text={product.name}
//                                         price={product.price}
//                                         salePrice={salePrice}
//                                         salePercent={salePercentage}
//                                         rating={product.rating}
//                                         pageType="sale-page"
//                                     />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//                 {/* Pagination */}
//                 <Pagination
//                     className="pagination"
//                     current={currentPage}
//                     onChange={onChange}
//                     total={filteredProducts.length}
//                     pageSize={pageSize}
//                 />
//                 {/* Display page number in URL for page 2 and onwards */}
//                 {currentPage > 1 && (
//                     <Link to={`/san-pham-giam-gia/page-${currentPage}`} className="page-link">{currentPage}</Link>
//                 )}
//             </Container>
//             <Footer />
//         </div>

//     );
// };

// export default SaleProductPage;
