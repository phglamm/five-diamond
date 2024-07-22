import SideBar from "../../../components/SideBar/SideBar";
import { Button, DatePicker, Image, Table } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";

import api from "../../../config/axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AdminOrder() {
  const { RangePicker } = DatePicker;
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRange, setSelectedRange] = useState([null, null]);

  async function fetchOrder() {
    try {
      const response = await api.get("order/all");
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleDateChange = (dates) => {
    setSelectedRange(dates);
  };

  async function filterOrdersByRange(orders, selectedRange) {
    try {
      if (
        selectedRange &&
        selectedRange.length === 2 &&
        selectedRange[0] &&
        selectedRange[1]
      ) {
        const startDate = moment(selectedRange[0].$d);
        const endDate = moment(selectedRange[1].$d);

        const filteredOrders = orders.filter((order) => {
          const orderDate = moment(order.orderDate);
          return orderDate.isBetween(startDate, endDate, null, "[]");
        });

        return filteredOrders;
      }
      return orders;
    } catch (error) {
      console.error("Error filtering orders by range:", error);
      return [];
    }
  }

  useEffect(() => {
    async function updateFilteredOrders() {
      const validOrders = await filterOrdersByRange(orders, selectedRange);
      setFilteredOrders(validOrders);
    }
    updateFilteredOrders();
  }, [orders, selectedRange]);

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
        const statusMap = {
          PENDING: "Đặt Hàng",
          CONFIRMED: "Xác nhận đơn hàng",
          PROCESSING: "Đang xử lý",
          SHIPPED: "Đang giao hàng",
          DELIVERED: "Đã giao hàng",
          CANCELED: "Đã bị hủy",
        };
        return statusMap[value] || value;
      },
    },
    {
      title: "Xem đơn hàng",
      key: "view-order",
      render: (text, record) => (
        <Link to={`/adminOrderDetail/${record?.id}`}>
          <Button type="link">Xem chi tiết</Button>
        </Link>
      ),
    },
    {
      title: "Hình ảnh giao hàng",
      key: "imgURL",
      render: (text, record) => {
        if (record.orderStatus === "DELIVERED") {
          return (
            <Image src={record.imgConfirmUrl} style={{ width: "150px" }} />
          );
        } else {
          return <p>Đơn hàng chưa được hoàn tất</p>;
        }
      },
    },
  ];

  const filteredAndSearchedOrders = filteredOrders.filter((ord) => {
    const matchesStatus =
      filterStatus === null || ord.orderStatus === filterStatus;
    const matchesSearchTerm = ord.id
      .toString()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearchTerm;
  });

  return (
    <div className="Admin">
      <SideBar />

      <div className="admin-content">
        <div className="data-table">
          <h1>Quản Lý Đơn Hàng</h1>
          <RangePicker onChange={handleDateChange} />
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
            <Button
              type={filterStatus === "CANCELED" ? "primary" : ""}
              onClick={() => handleFilterChange("CANCELED")}
            >
              Đã bị hủy
            </Button>
          </div>
          <Table
            dataSource={filteredAndSearchedOrders}
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
