import React, { useState } from "react";
import "./SaleStaffPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button, Container, FormControl } from "react-bootstrap";
import { Table, Input } from "antd";

const initialDataSource = [
  {
    key: "1",
    no: "1",
    orderId: "ORD001",
    receiver: "Nguyen Van A",
    address: "123 Le Loi, District 1, HCMC",
    phone: "0123456789",
    status: "Chưa xử lí",
  },
  {
    key: "2",
    no: "2",
    orderId: "ORD002",
    receiver: "Tran Thi B",
    address: "456 Nguyen Trai, District 5, HCMC",
    phone: "0987654321",
    status: "Đã xử lí",
  },
  {
    key: "3",
    no: "3",
    orderId: "ORD003",
    receiver: "Le Thi C",
    address: "789 Tran Hung Dao, District 1, HCMC",
    phone: "0934567890",
    status: "Đã xử lí",
  },
  {
    key: "4",
    no: "4",
    orderId: "ORD004",
    receiver: "Pham Van D",
    address: "101 Nguyen Van Linh, District 7, HCMC",
    phone: "0912345678",
    status: "Chưa xử lí",
  },
  {
    key: "5",
    no: "5",
    orderId: "ORD005",
    receiver: "Nguyen Thi E",
    address: "202 Ly Thuong Kiet, District 10, HCMC",
    phone: "0981234567",
    status: "Đã xử lí",
  },
  {
    key: "6",
    no: "6",
    orderId: "ORD006",
    receiver: "Tran Van F",
    address: "303 Pham Van Dong, Thu Duc City, HCMC",
    phone: "0972345678",
    status: "Đã xử lí",
  },
  {
    key: "7",
    no: "7",
    orderId: "ORD007",
    receiver: "Le Thi G",
    address: "404 Vo Van Kiet, District 8, HCMC",
    phone: "0963456789",
    status: "Chưa xử lí",
  },
  {
    key: "8",
    no: "8",
    orderId: "ORD008",
    receiver: "Pham Van H",
    address: "505 Cach Mang Thang 8, District 3, HCMC",
    phone: "0954567890",
    status: "Đã xử lí",
  },
  {
    key: "9",
    no: "9",
    orderId: "ORD009",
    receiver: "Nguyen Thi I",
    address: "606 Nguyen Thi Minh Khai, District 1, HCMC",
    phone: "0945678901",
    status: "Đã xử lí",
  },
  {
    key: "10",
    no: "10",
    orderId: "ORD010",
    receiver: "Tran Van J",
    address: "707 Tran Quang Khai, District 1, HCMC",
    phone: "0936789012",
    status: "Chưa xử lí",
  },
  {
    key: "11",
    no: "11",
    orderId: "ORD011",
    receiver: "Le Thi K",
    address: "808 Hoang Dieu, District 4, HCMC",
    phone: "0927890123",
    status: "Đã xử lí",
  },
  {
    key: "12",
    no: "12",
    orderId: "ORD012",
    receiver: "Pham Van L",
    address: "909 Vo Thi Sau, District 3, HCMC",
    phone: "0918901234",
    status: "Chưa xử lí",
  },
];

function SaleStaffPage() {
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [filterStatus, setFilterStatus] = useState(null); // null means no filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const filteredDataSource = dataSource.filter((item) => {
    if (filterStatus === null) return true;
    return item.status === filterStatus;
  }).filter((item) => {
    if (searchTerm === "") return true;
    return item.orderId.toLowerCase().includes(searchTerm.toLowerCase());
  });
  

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Người nhận",
      dataIndex: "receiver",
      key: "receiver",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
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
            variant={filterStatus === "Đã xử lí" ? "primary" : "outline-primary"}
            onClick={() => setFilterStatus("Đã xử lí")}
          >
            Đã xử lí
          </Button>
          <Button
            variant={filterStatus === "Chưa xử lí" ? "primary" : "outline-primary"}
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
        <Table
          className="order-table"
          dataSource={filteredDataSource}
          columns={columns}
        />
      </Container>
      <Footer />
    </div>
  );
}

export default SaleStaffPage;
  