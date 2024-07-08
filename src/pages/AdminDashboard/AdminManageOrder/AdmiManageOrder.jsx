import SideBar from "../../../components/SideBar/SideBar";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";

import api from "../../../config/axios";
import { Link } from "react-router-dom";

export default function AdminOrder() {
  const [order, setOrder] = useState([]);

  async function fetchOrder() {
    const response = await api.get("order/all");
    setOrder(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => record.customer?.email,
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng đơn",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => value.toLocaleString() + " đ",
    },
    {
      title: "Tình trạng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (value) => {
        if (value === "PENDING") {
          return "Đã đặt hàng";
        } else if (value === "CONFIRMED") {
          return "Đã xác nhận"; // Example for completed status
        } else if (value === "PROCESSING") {
          return "Đang chuẩn bị hàng"; // Example for canceled status
        } else if (value === "SHIPPED") {
          return "Đang vận chuyển"; // Example for canceled status
        } else if (value === "DELIVERED") {
          return "Đã giao hàng"; // Example for canceled status
        }
      },
    },

    {
      title: "Xem đơn hàng",
      key: "view-order",
      render: (text, record) => (
        <Link to={`/theo-doi-don-hang/${record?.id}`}>
          <Button type="link">Xem chi tiết</Button>
        </Link>
      ),
    },
  ];
  const [filterStatus, setFilterStatus] = useState(null);
  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = order.filter((ord) => {
    const matchesStatus =
      filterStatus === null || ord.orderStatus === filterStatus;
    const matchesSearchTerm = ord.id
      .toString()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearchTerm;
  });
  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <div className="data-table">
          <h1>Quản Lý Đơn Hàng</h1>

          <div className="delivery-staff-filter-buttons-admin">
            <Button
              type={filterStatus === null ? "primary" : ""}
              onClick={() => handleFilterChange(null)}
            >
              Tất cả
            </Button>
            <Button
              type={filterStatus === "PENDING" ? "primary" : ""}
              onClick={() => handleFilterChange("PENDING")}
            >
              Đã đặt hàng
            </Button>
            <Button
              type={filterStatus === "CONFIRMED" ? "primary" : ""}
              onClick={() => handleFilterChange("CONFIRMED")}
            >
              Đã xác nhận
            </Button>
            <Button
              type={filterStatus === "PROCESSING" ? "primary" : ""}
              onClick={() => handleFilterChange("PROCESSING")}
            >
              Đang chuẩn bị hàng
            </Button>
            <Button
              type={filterStatus === "SHIPPED" ? "primary" : ""}
              onClick={() => handleFilterChange("SHIPPED")}
            >
              Đang vận chuyển
            </Button>
            <Button
              type={filterStatus === "DELIVERED" ? "primary" : ""}
              onClick={() => handleFilterChange("DELIVERED")}
            >
              Đã giao hàng
            </Button>
          </div>
          <Table
            dataSource={filteredOrders}
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
