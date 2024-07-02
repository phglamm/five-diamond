import React, { useEffect, useState } from "react";
import "./SaleStaffPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { Table, Input, Button, Modal, Checkbox } from "antd";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment"; // Import moment for date formatting

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

  const [deliveryStaff, setDeliveryStaff] = useState([]);
  async function fetchStaff() {
    const response = await api.get("accounts");
    const delivery = response.data.filter((user) => user.role === "DELIVERY");
    setDeliveryStaff(delivery);
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    fetchStaff();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columnOfStaff = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },

    {
      title: "Tên",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Họ",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Select",
      render: (value) => <Checkbox type="checkbox" value={value.id} />,
    },
  ];
  return (
    <div>
      <Header />
      <Container>
        <h3 className="sale-staff-title">Nhân viên sale</h3>

        <div className="sale-staff-filter-buttons">
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
        <div className="sales-search-bar">
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
              title: "Thao tác",
              key: "update-order",
              render: (text, record) =>
                record.orderStatus === "PROCESSING" ? (
                  <>
                    <Button type="default" onClick={showModal}>
                      Chọn nhân viên giao hàng
                    </Button>

                    <Modal
                      className="modal-add-form"
                      footer={false}
                      title="Chọn Kim Cương để chỉnh sửa"
                      okText={""}
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <Table
                        dataSource={deliveryStaff}
                        columns={columnOfStaff}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "max-content" }}
                        onChange={onChange}
                      />
                    </Modal>
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => handleEdit(record.id, record.orderStatus)}
                  >
                    Cập nhật trạng thái
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
