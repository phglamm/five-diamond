import SideBar from "../../../components/SideBar/SideBar";
import { Button, Table, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";
import axios from "axios";

export default function AdminDiamondPrice() {
  const [price, setPrice] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  async function fetchPrice() {
    const response = await axios.get("https://6684dca756e7503d1ae169ba.mockapi.io/api/v1/DiamondPrice");
    setPrice(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchPrice();
  }, []);

  const updatePrice = async (values) => {
    try {
      const response = await axios.put(`https://6684dca756e7503d1ae169ba.mockapi.io/api/v1/DiamondPrice/${values.DPId}`, {
        ...values,
        price: newPrice,
      });
      console.log(response.data);
      fetchPrice();
      setEditingItem(null);
      setNewPrice("");
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

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
      render: (text, record) => (
        editingItem === record.DPId ? (
          <Input
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        ) : (
          parseFloat(text).toLocaleString()
        )
      ),
    },
    {
      title: "Độ Tinh Khiết",
      dataIndex: "cut",
      key: "cut",
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (values) => (
        editingItem === values.DPId ? (
          <Button onClick={() => updatePrice(values)}>
            Lưu
          </Button>
        ) : (
          <Button onClick={() => {
            setEditingItem(values.DPId);
            setNewPrice(values.price);
          }}>
            Cập nhật giá
          </Button>
        )
      ),
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
