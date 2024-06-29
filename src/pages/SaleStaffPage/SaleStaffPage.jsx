import React, { useEffect, useState } from "react";
import "./SaleStaffPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { Table, Input, Button } from "antd";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SaleStaffPage() {
  const [filterStatus, setFilterStatus] = useState(null); // null means no filter
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState([]);
  const [sortOrder, setSortOrder] = React.useState("asc");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`order/all`);
        // Filter orders to only include PENDING, CONFIRMED, PROCESSING
        const filteredOrders = response.data.filter((order) =>
          ["PENDING", "CONFIRMED", "PROCESSING"].includes(order.orderStatus)
        );
        setOrder(filteredOrders);
        console.log(filteredOrders);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrder();
  }, []);

  const handleUpdate = async (orderId, newStatus) => {
    try {
      const response = await api.put(`/order/${orderId}`, {
        orderStatus: newStatus,
      });
      console.log(response.data);
      toast.success("Cập nhật thành công");
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.log(error.response.data);
      toast.error("Cập nhật thất bại");
    }
  };

  const handleEdit = (orderId, currentStatus) => {
    let newStatus = currentStatus;
    // Logic to determine the next status
    if (currentStatus === "PENDING") {
      newStatus = "CONFIRMED";
    } else if (currentStatus === "CONFIRMED") {
      newStatus = "PROCESSING";
    }
    handleUpdate(orderId, newStatus);
  };

  const filteredOrders = order
    .filter((ord) => {
      const matchesStatus =
        filterStatus === null || ord.orderStatus === filterStatus;
      const matchesSearchTerm = ord.id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearchTerm;
    })
    .sort((a, b) => {
      const nameA = a.id.toString();
      const nameB = b.id.toString();
      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div>
      <Header />
      <Container>
        <div className="filter-buttons">
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
            Chờ xử lý
          </Button>
          <Button
            type={filterStatus === "CONFIRMED" ? "primary" : ""}
            onClick={() => handleFilterChange("CONFIRMED")}
          >
            Đã xử lí
          </Button>
          <Button
            type={filterStatus === "PROCESSING" ? "primary" : ""}
            onClick={() => handleFilterChange("PROCESSING")}
          >
            Đang chuẩn bị hàng
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
          dataSource={filteredOrders}
          columns={[
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
                <Link to={`/theo-doi-don-hang/${record?.id}`}>
                  <Button type="link">Xem chi tiết</Button>
                </Link>
              ),
            },
            {
              title: "Cập nhật đơn hàng",
              key: "update-order",
              render: (text, record) => (
                <Button
                  type="primary"
                  onClick={() => handleEdit(record.id, record.orderStatus)}
                >
                  Chuyển trạng thái
                </Button>
              ),
            },
          ]}
        />
      </Container>
      <Footer />
    </div>
  );
}

export default SaleStaffPage;
