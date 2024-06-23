import React, { useEffect, useState } from "react";
import "./SaleStaffPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button, Container, FormControl } from "react-bootstrap";
import { Table, Input } from "antd";
import api from "../../config/axios";

function SaleStaffPage() {
  const [filterStatus, setFilterStatus] = useState(null); // null means no filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người nhận",
      dataIndex: "fullname",
      key: "fullname",
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tình trạng",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Xem đơn hàng",
      key: "view-order",
      render: (text, record) => (
        <Button type="link" onClick={() => handleAction(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`order/all`);
        setOrder(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrder();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <div className="filter-buttons">
          <Button
            variant={filterStatus === null ? "primary" : "outline-primary"}
            onClick={() => setFilterStatus(null)}
          >
            Tất cả
          </Button>
          <Button
            variant={
              filterStatus === "Đã xử lí" ? "primary" : "outline-primary"
            }
            onClick={() => setFilterStatus("Đã xử lí")}
          >
            Đã xử lí
          </Button>
          <Button
            variant={
              filterStatus === "Chưa xử lí" ? "primary" : "outline-primary"
            }
            onClick={() => setFilterStatus("Chưa xử lí")}
          >
            Chưa xử lí
          </Button>
        </div>
        <div className="search-bar">
          <Input
            placeholder="Tìm kiếm mã đơn hàng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table className="order-table" dataSource={order} columns={columns} />
      </Container>
      <Footer />
    </div>
  );
}

export default SaleStaffPage;
