import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import api from "../../config/axios";
import { Container } from "react-bootstrap";
import { Button, Table, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./OrderHistoryUser.css";

export default function OrderHistoryUser() {
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrderUser() {
      try {
        const response = await api.get("order");
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrderUser();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const filteredOrders = order.filter((ord) => {
    return ord.id.toString().includes(searchTerm.toLowerCase());
  });

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tổng Đơn Hàng",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => text.toLocaleString() + " VND",
    },
    {
      title: "Tình trạng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (value) => {
        if (value === "PENDING") {
          return "Đặt Hàng";
        } else if (value === "CONFIRMED") {
          return "Xác nhận đơn hàng"; // Example for completed status
        } else if (value === "PROCESSING") {
          return "Đang xử lý"; // Example for canceled status
        } else if (value === "SHIPPED") {
          return "Đang giao hàng"; // Example for canceled status
        } else if (value === "DELIVERED") {
          return "Đã giao hàng"; // Example for canceled status
        } else if (value === "CANCELED") {
          return "Đã bị hủy"; // Example for canceled status
        }
      },
    },
    {
      title: "Theo Dõi",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Link to={`/theo-doi-don-hang/${record?.id}`}>
            <Button type="link">Xem chi tiết</Button>
          </Link>
        );
      },
    },
  ];
  return (
    <div>
      <Header></Header>
      <Container>
        <h3 className="order-history-title">Lịch Sử Đơn Hàng</h3>
        <div className="search-bar">
          <Input
            className="order-history-seach-bar"
            placeholder="Tìm kiếm mã đơn hàng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table
          className="order-table"
          dataSource={filteredOrders}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          onChange={onChange}
        />{" "}
      </Container>
      <Footer></Footer>
    </div>
  );
}
