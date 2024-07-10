import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import {
  Table,
  Input,
  Button,
  Upload,
  Image,
  Modal,
  Form,
  Typography,
} from "antd";
import api from "../../config/axios";
import { Await, Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import "./DeliveryStaffPage.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { UploadOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";
import { useForm } from "antd/es/form/Form";

function DeliveryStaffPage() {
  const [filterStatus, setFilterStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState([]);
  const [images, setImages] = useState({});
  const user = useSelector(selectUser);
  console.log(user.id);
  const [formCancleOrder] = useForm();

  const handleClickCancleSubmit = () => {
    formCancleOrder.submit();
  };
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
  }, [user.id]);

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

  const handleConfirmWithImage = async (orderId, newStatus) => {
    let imgURL;
    if (images[orderId]) {
      imgURL = await uploadFile(images[orderId]);
    } else {
      imgURL = null;
    }
    console.log(imgURL);
    console.log(newStatus);
    try {
      const responseStatus = await api.put(`/order/${orderId}&${user.id}`, {
        orderStatus: newStatus,
      });
      console.log(responseStatus.data);
      const response = await api.put(`/order/confirm/${orderId}`, {
        imgConfirmUrl: imgURL,
      });
      console.log(response.data);
      toast.success("Cập nhật thành công");
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, orderStatus: newStatus, imgConfirmUrl: imgURL }
            : order
        )
      );
      setImages((prevImages) => {
        const newImages = { ...prevImages };
        delete newImages[orderId];
        return newImages;
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error("Cập nhật thất bại");
    }
  };

  const handleEdit = (orderId, currentStatus) => {
    let newStatus = currentStatus;
    if (currentStatus === "PROCESSING") {
      newStatus = "SHIPPED";
      handleUpdate(orderId, newStatus);
    } else if (currentStatus === "SHIPPED") {
      newStatus = "DELIVERED";
      if (images[orderId]) {
        handleConfirmWithImage(orderId, newStatus);
      } else {
        toast.error("Bạn phải upload hình xác thực");
      }
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const filteredOrders = order.filter((ord) => {
    const matchesStatus =
      filterStatus === null || ord.orderStatus === filterStatus;
    const matchesSearchTerm = ord.id
      .toString()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearchTerm;
  });

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
          const response = await api.put(`/order/cancel/${orderId}&${reason}`, {
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
            Chờ Xác Nhận
          </Button>
          <Button
            type={filterStatus === "SHIPPED" ? "primary" : ""}
            onClick={() => handleFilterChange("SHIPPED")}
          >
            Đang giao hàng
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
          pagination={{ pageSize: 5 }}
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
                  return "Đặt Hàng";
                } else if (value === "CONFIRMED") {
                  return "Xác nhận đơn hàng";
                } else if (value === "PROCESSING") {
                  return "Chờ Xác Nhận";
                } else if (value === "SHIPPED") {
                  return "Đang giao hàng";
                } else if (value === "DELIVERED") {
                  return "Đã giao hàng";
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
              title: "Cập nhật đơn hàng",
              key: "update-order",
              render: (text, record) => {
                if (record.orderStatus !== "DELIVERED") {
                  return (
                    <>
                      <Button
                        type="primary"
                        onClick={() =>
                          handleEdit(record.id, record.orderStatus)
                        }
                      >
                        Chuyển trạng thái
                      </Button>
                      {/* <Button
                        type="primary"
                        onClick={() => openCancelOrderModal(record.id)}
                        style={{ backgroundColor: "red" }}
                      >
                        Hủy Đơn
                      </Button> */}
                    </>
                  );
                } else {
                  return (
                    <>
                      <Typography> Đơn Hàng Hoàn Tất</Typography>
                    </>
                  );
                }
              },
            },
            {
              title: "Hình ảnh giao hàng",
              key: "imgURL",
              render: (text, record) => {
                if (record.orderStatus === "SHIPPED") {
                  return (
                    <>
                      <Upload
                        className="admin-upload-button"
                        fileList={images[record.id] ? [images[record.id]] : []}
                        beforeUpload={(file) => {
                          setImages((prevImages) => ({
                            ...prevImages,
                            [record.id]: file,
                          }));
                          return false;
                        }}
                        onRemove={() => {
                          setImages((prevImages) => {
                            const newImages = { ...prevImages };
                            delete newImages[record.id];
                            return newImages;
                          });
                        }}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="admin-upload-button"
                        >
                          Upload Hình Ảnh
                        </Button>
                      </Upload>
                    </>
                  );
                } else if (record.orderStatus === "DELIVERED") {
                  return (
                    <>
                      <Image
                        src={record.imgConfirmUrl}
                        style={{ width: "150px" }}
                      ></Image>
                    </>
                  );
                }
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

export default DeliveryStaffPage;
