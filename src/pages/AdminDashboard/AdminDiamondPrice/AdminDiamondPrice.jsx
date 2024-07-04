import SideBar from "../../../components/SideBar/SideBar";
import { Table } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";
import axios from "axios";


export default function AdminDiamondPrice() {
    const [price, setPrice] = useState([]);

    async function fetchPrice() {
        const response = await axios.get("https://6684dca756e7503d1ae169ba.mockapi.io/api/v1/DiamondPrice");
        setPrice(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        fetchPrice();
    }, []);

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "DPId",
            key: "DPId",
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Độ Cắt",
            dataIndex: "cut",
            key: "cut",

        },
        {
            title: "Màu",
            dataIndex: "color",
            key: "color",
        },

        {
            title: "Hành Động",
            dataIndex: "action",
            key: "action",
        },
    ];

    return (
        <div className="Admin">
            <SideBar></SideBar>

            <div className="admin-content">
                <div className="data-table">
                    <h1>Quản Lý Giá Kim Cương</h1>
                    <Table
                        dataSource={price}
                        columns={columns}
                        onChange={onChange}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "max-content" }}
                    />
                </div>
            </div>
        </div>
    );
}
