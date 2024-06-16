


import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Dropdown, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./SaleProductPage.css";
import { saleProducts } from "./ListOfSaleProducts";
import Banner from "../../components/Banner/banner";
import banner1 from "../../../public/assets/images/Banner/banner1.jpg";
import banner2 from "../../../public/assets/images/Banner/banner2.jpg";
import banner3 from "../../../public/assets/images/Banner/banner3.jpg";
import banner4 from "../../../public/assets/images/Banner/banner4.jpg";
import ProductCard from "../../components/productCard/productCard";
import BasicPagination from "../../components/BasicPagination/BasicPagination"; // Adjusted import

const SaleProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20; // Number of items per page

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        setCurrentPage(page);
    }, [location]);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    // Filter products by category
    const filteredProducts = selectedCategory ? saleProducts.filter(product => product.category === selectedCategory) : saleProducts;

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Slice the products array based on the current page and page size
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const totalPage = Math.ceil(filteredProducts.length / pageSize);

    console.log('Current Page:', currentPage);
    console.log('Start Index:', startIndex);
    console.log('End Index:', endIndex);
    console.log('Paginated Products:', paginatedProducts);

    // Function to calculate sale price
    const calculateSalePrice = (originalPrice, discountPercentage) => {
        const discountAmount = (originalPrice * discountPercentage) / 100;
        const salePrice = originalPrice - discountAmount;
        return salePrice.toFixed(2); // Round to 2 decimal places
    };

    // Generate menu items for the dropdown
    const menu = (
        <Menu onClick={({ key }) => setSelectedCategory(key === "all" ? null : key)}>
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
                    <Dropdown overlay={menu} trigger={['hover']}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Filter by Category
                        </a>
                    </Dropdown>
                    {/* Sale product cards */}
                    <div className='sale-product-card' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {paginatedProducts.map((product) => {
                            const salePrice = calculateSalePrice(product.price, product.sale);
                            const salePercentage = `${product.sale * 100}%`;
                            return (
                                <div key={product.id} style={{ flex: '1 0 18%', margin: '10px' }}>
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
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
};

export default SaleProductPage;
