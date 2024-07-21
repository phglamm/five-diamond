import SideBar from "../../../components/SideBar/SideBar";
import { Button, Table, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";
import axios from "axios";
import api from "../../../config/axios";

export default function AdminDiamondPrice() {
  const [price, setPrice] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  async function fetchPrice() {
    const response = await api.get("diamond-price");
    setPrice(response.data);
    // console.log(response.data);
  }

  useEffect(() => {
    fetchPrice();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      render: (text, record) => parseFloat(text).toLocaleString(),
    },
    {
      title: "Độ Tinh Khiết",
      dataIndex: "clarity",
      key: "clarity",
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
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
