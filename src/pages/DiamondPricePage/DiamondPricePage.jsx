import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Container, Table } from 'react-bootstrap';
import "./DiamondPricePage.css"

export default function DiamondPricePage() {
    const columnHeaders = ['IF', 'VVS1', 'VVS2', 'VS1', 'VS2'];
    const rowHeaders = ['D', 'E', 'F', 'J'];
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
                                {rowHeaders.map((rowHeader, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <th>{rowHeader}</th>
                                        {columnHeaders.map((_, colIndex) => (
                                            <td key={colIndex}></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <p className='price-title'>Giá Kim Cương 3ly9</p>
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
                                {rowHeaders.map((rowHeader, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <th>{rowHeader}</th>
                                        {columnHeaders.map((_, colIndex) => (
                                            <td key={colIndex}></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    );
}
