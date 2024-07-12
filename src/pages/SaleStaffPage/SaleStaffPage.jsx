import { useEffect, useState } from "react";
import "./SaleStaffPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { Table, Input, Button, Modal, Radio, Form } from "antd";
import api from "../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { useForm } from "antd/es/form/Form";
import { routes } from "../../routes";

function SaleStaffPage() {
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [formCancleOrder] = useForm();
  const user = useSelector(selectUser);

  const handleClickCancleSubmit = () => {
    formCancleOrder.submit();
  };

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`order/all`);
        const filteredOrders = response.data.filter((order) =>
          ["PENDING", "CONFIRMED", "PROCESSING", "CANCELED"].includes(
            order.orderStatus
          )
        );
        setOrder(filteredOrders);
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchOrder();
  }, []);

  const handleEdit = (orderId, currentStatus) => {
    let newStatus = currentStatus;
    if (currentStatus === "PENDING") {
      newStatus = "CONFIRMED";
    } else if (currentStatus === "CONFIRMED") {
      newStatus = "PROCESSING";
    }
    handleUpdate(orderId, newStatus);
  };

  const handleUpdate = async (orderId, newStatus) => {
    try {
      const response = await api.put(`/order/${orderId}&${user.id}`, {
        orderStatus: newStatus,
      });
      console.log(response);
      toast.success("Cập nhật thành công");
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleCancelOrder = async (values) => {
    const { orderId, reason } = values;
    console.log(reason);
    console.log(orderId);
    const cancleStatus = "CANCELED";
    console.log(cancleStatus);
    Modal.confirm({
      title: "Bạn có chắc muốn hủy đơn hàng này ?",
      okText: "Hủy đơn hàng",
      cancelText: "Không",
      onOk: async () => {
        try {
          const responseStatus = await api.put(`/order/${orderId}&${user.id}`, {
            orderStatus: cancleStatus,
          });
          console.log(responseStatus);
          const response = await api.put(`/order/cancel/${orderId}`, {
            canceledNote: reason,
          });
          console.log(response);
          toast.success("Cập nhật thành công");
          setOrder((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId
                ? { ...order, orderStatus: cancleStatus }
                : order
            )
          );
        } catch (error) {
          toast.error("Cập nhật thất bại");
        }
      },
    });
  };

  const handleChooseShipper = () => {
    handleOK();
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
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function fetchStaff() {
    const response = await api.get("accounts");
    const delivery = response.data.filter((user) => user.role === "DELIVERY");
    setDeliveryStaff(delivery);
  }

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (orderId) => {
    setSelectedOrder(orderId);
    fetchStaff();
    setIsModalOpen(true);
  };

  const handleOK = async () => {
    if (!selectedStaff) {
      toast.error("Please select a staff");
      return;
    }
    try {
      console.log(selectedOrder);
      console.log(selectedStaff);

      const response = await api.put(
        `/order/${selectedOrder}&${selectedStaff}`,
        {
          orderStatus: "PROCESSING",
        }
      );
      console.log(response.data);

      toast.success("Chuyển đơn hàng qua Shipper");
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder
            ? { ...order, orderStatus: "PROCESSING" }
            : order
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Có lỗi trong lúc chuyển đơn hàng");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRadioChange = (e) => {
    setSelectedStaff(e.target.value);
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
      render: (value) => (
        <Radio
          value={value.id}
          checked={selectedStaff === value.id}
          onChange={handleRadioChange}
        />
      ),
    },
  ];

  const [isModalCancleOrderOpen, setIsModalCancleOrderOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  const handleModalOkCancleOrder = () => {
    handleClickCancleSubmit();
    setIsModalCancleOrderOpen(false);
  };

  const handleModalCancelOrder = () => {
    setIsModalCancleOrderOpen(false);
  };

  const openCancelOrderModal = (orderId) => {
    formCancleOrder.resetFields();

    setCurrentOrderId(orderId);
    setIsModalCancleOrderOpen(true);
  };

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
            Đặt hàng
          </Button>
          <Button
            type={filterStatus === "CONFIRMED" ? "primary" : ""}
            onClick={() => handleFilterChange("CONFIRMED")}
          >
            Xác nhận đơn hàng
          </Button>
          <Button
            type={filterStatus === "PROCESSING" ? "primary" : ""}
            onClick={() => handleFilterChange("PROCESSING")}
          >
            Đang xử lý
          </Button>
          <Link to={routes.saleStaffCancleOrder}>
            <Button>Đã hủy</Button>{" "}
          </Link>
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
              render: (text) => moment(text).format("DD-MM-YYYY"),
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
              render: (value) => {
                if (value === "PENDING") {
                  return "Đặt hàng";
                } else if (value === "CONFIRMED") {
                  return "Xác nhận đơn hàng";
                } else if (value === "PROCESSING") {
                  return "Đang xử lý";
                } else if (value === "SHIPPED") {
                  return "Đang giao hàng";
                } else if (value === "DELIVERED") {
                  return "Đã giao hàng";
                } else if (value === "CANCELED") {
                  return "Đã bị hủy";
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
            {
              title: "Thao tác",
              key: "update-order",
              render: (text, record) => {
                if (record.orderStatus === "CANCELED") {
                  return <>Đơn hàng đã bị hủy</>;
                }

                return (
                  <>
                    <Modal
                      className="modal-add-form"
                      title="Chọn Nhân Viên để giao hàng"
                      okText={"Chọn Shipper"}
                      open={isModalOpen}
                      onOk={handleChooseShipper}
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
                    {record.orderStatus !== "PROCESSING" && (
                      <>
                        <Button
                          type="primary"
                          onClick={() =>
                            handleEdit(record.id, record.orderStatus)
                          }
                          style={{ marginRight: "10px" }}
                        >
                          Cập nhật trạng thái
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => openCancelOrderModal(record.id)}
                          style={{ backgroundColor: "red" }}
                        >
                          Hủy Đơn
                        </Button>
                      </>
                    )}

                    {record.orderStatus === "PROCESSING" && (
                      <>
                        <Button
                          type="default"
                          onClick={() => showModal(record.id)}
                          style={{ marginRight: "10px" }}
                        >
                          Chọn nhân viên giao hàng
                        </Button>

                        <Button
                          type="primary"
                          onClick={() => openCancelOrderModal(record.id)}
                          style={{ backgroundColor: "red" }}
                        >
                          Hủy Đơn
                        </Button>
                      </>
                    )}
                  </>
                );
              },
            },
          ]}
        />
        <Modal
          className="modal-updateCategory-form"
          title="Lý Do Hủy Đơn"
          okText={"Hủy Đơn"}
          open={isModalCancleOrderOpen}
          onOk={handleModalOkCancleOrder}
          onCancel={handleModalCancelOrder}
          mask={false}
        >
          <Form
            form={formCancleOrder}
            onFinish={(values) =>
              handleCancelOrder({ ...values, orderId: currentOrderId })
            }
          >
            <Form.Item
              label="Lý Do"
              name="reason"
              className="label-form"
              rules={[
                {
                  required: true,
                  message: "Nhập Lý Do",
                },
              ]}
            >
              <Input type="text" required />
            </Form.Item>
          </Form>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
}

export default SaleStaffPage;
