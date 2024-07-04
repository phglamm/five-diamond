import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { Table, Input, Button } from "antd";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import "./DeliveryStaffPage.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function DeliveryStaffPage() {
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState([]);
  const user = useSelector(selectUser);
  console.log(user.id);
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`order/all`);
        const filteredOrders = response.data.filter(
          (order) =>
            ["PROCESSING", "SHIPPED", "DELIVERED"].includes(
              order.orderStatus
            ) && order.shipper?.id === user.id
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
      const response = await api.put(`/order/${orderId}&${user.id}`, {
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
    if (currentStatus === "PROCESSING") {
      newStatus = "SHIPPED";
    } else if (currentStatus === "SHIPPED") {
      newStatus = "DELIVERED";
    }
    handleUpdate(orderId, newStatus);
  };

  const filteredOrders = order.filter((ord) => {
    const matchesStatus =
      filterStatus === null || ord.orderStatus === filterStatus;
    const matchesSearchTerm = ord.id
      .toString()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearchTerm;
  });

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div>
      <Header />
      <Container>
        <h3 className="delivery-staff-title">Nhân viên giao hàng</h3>
        <div className="delivery-staff-filter-buttons">
          <Button
            type={filterStatus === null ? "primary" : ""}
            onClick={() => handleFilterChange(null)}
          >
            Tất cả
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
        <div className="delivery-search-bar">
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
              title: "Ngày đặt hàng",
              dataIndex: "orderDate",
              key: "orderDate",
              render: (text) => moment(text).format("DD-MM-YYYY"), // Format date
            },
            {
              title: "Số điện thoại",
              dataIndex: "phone",
              key: "phone",
            },
            {
              title: "Ghi chú KH",
              dataIndex: "note",
              key: "note",
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

export default DeliveryStaffPage;
