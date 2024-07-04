import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Container, Table } from 'react-bootstrap';
import "./DiamondPricePage.css";
import axios from 'axios';

export default function DiamondPricePage() {
    const [diamondPrices, setDiamondPrices] = useState([]);

    const fetchDiamondPrices = async () => {
        try {
            const response = await axios.get("https://6684dca756e7503d1ae169ba.mockapi.io/api/v1/DiamondPrice");
            console.log(response.data);
            setDiamondPrices(response.data);
        } catch (error) {
            console.error("Error fetching diamond prices:", error);
        }
    };

    useEffect(() => {
        fetchDiamondPrices();
    }, []);

    const columnHeaders = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2'];
    const rowHeaders = ['D', 'E', 'F', 'J'];

    const renderTableCells = (size) => {
        return rowHeaders.map((color) => (
            <tr key={color}>
                <th>{color}</th>
                {columnHeaders.map((cut) => {
                    const priceData = diamondPrices.find(
                        (price) => price.size === size && price.cut === cut && price.color === color
                    );
                    return (
                        <td key={cut}>
                            {priceData ? `${priceData.price} VNĐ` : 'N/A'}
                        </td>
                    );
                })}
            </tr>
        ));
    };

    return (
        <div>
            <Header />
            <div className='body-pricepage'>
                <Container>
                    <h1 className='header-price'>Bảng giá kim cương thiên nhiên kiểm định quốc tế hôm nay XX/XX/2024</h1>
                    <div>
                        <p className='price-title'>Giá Kim Cương Siêu Rẻ 3ly6</p>
                        <Table bordered className='price-table'>
                            <thead>
                                <tr>
                                    <th>3.6MM</th>
                                    {columnHeaders.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableCells("3.6")}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <p className='price-title'>Giá Kim Cương 3ly9</p>
                        <Table bordered className='price-table'>
                            <thead>
                                <tr>
                                    <th>3.9MM</th>
                                    {columnHeaders.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableCells("3.9")}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
