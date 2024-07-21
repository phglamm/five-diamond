import { useEffect, useState } from "react";
import "./SaleStaffPage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { Table, Input, Button } from "antd";
import api from "../../config/axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function SaleStaffCancleOrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [canceledOrder, setCanceledOrder] = useState([]);
  const user = useSelector(selectUser);

  async function fetchOrder() {
    try {
      const response = await api.get(`order/canceled`);
      setCanceledOrder(response.data);
      // console.log(response.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchOrder();
  }, []);

  const handleEdit = (orderId) => {
    handleUpdate(orderId);
  };

  const handleUpdate = async (orderId) => {
    try {
      const response = await api.put(`/order/refund/${orderId}`);

      // console.log(response);
      toast.success("Cập nhật thành công");
      fetchOrder();
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };
  return (
    <div>
      <Header />
      <Container>
        <h3 className="sale-staff-title">Nhân viên sale</h3>

        <div className="sales-search-bar">
          <Input
            placeholder="Tìm kiếm mã đơn hàng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table
          className="order-table"
          dataSource={canceledOrder}
          columns={[
            {
              title: "Mã đơn hàng",
              dataIndex: "id",
              key: "id",
              render: (text, record) => record.order?.id,
            },
            {
              title: "Người nhận",
              dataIndex: "fullname",
              key: "fullname",
              render: (text, record) => record.order?.fullname,
            },
            {
              title: "Ngày đặt hàng",
              dataIndex: "orderDate",
              key: "orderDate",
              render: (text, record) => moment(text).format("DD-MM-YYYY"),
            },
            {
              title: "Số điện thoại",
              dataIndex: "phone",
              key: "phone",
              render: (text, record) => record.order?.phone,
            },
            {
              title: "Ghi chú KH",
              dataIndex: "note",
              key: "note",
              render: (text, record) => record.order?.note,
            },
            {
              title: "Tình trạng",
              dataIndex: "orderStatus",
              key: "orderStatus",
              render: (text, record) => {
                if (record.order?.orderStatus === "PENDING") {
                  return "Đặt hàng";
                } else if (record.order.orderStatus === "CONFIRMED") {
                  return "Xác nhận đơn hàng";
                } else if (record.order.orderStatus === "PROCESSING") {
                  return "Đang xử lý";
                } else if (record.order.orderStatus === "SHIPPED") {
                  return "Đang giao hàng";
                } else if (record.order.orderStatus === "DELIVERED") {
                  return "Đã giao hàng";
                } else if (record.order.orderStatus === "CANCELED") {
                  return "Đã bị hủy";
                }
              },
            },
            {
              title: "Hoàn Tiền",
              dataIndex: "cancelOrderStatus",
              key: "cancelOrderStatus",
              render: (value) => {
                if (value === "PENDING") {
                  return <>Đang Hoàn Tiền</>;
                } else {
                  return <>Đã Hoàn Tiền</>;
                }
              },
            },
            {
              title: "Xem đơn hàng",
              key: "view-order",
              render: (text, record) => (
                <Link to={`/theo-doi-don-hang/${record.order?.id}`}>
                  <Button type="link">Xem chi tiết</Button>
                </Link>
              ),
            },
            {
              title: "Lý Do Hủy",
              key: "view-order",
              render: (text, record) => record.reason,
            },
            {
              title: "Thao tác",
              key: "update-order",
              render: (text, record) => {
                if (record.cancelOrderStatus === "PENDING") {
                  return (
                    <>
                      <Button
                        type="primary"
                        onClick={() => handleEdit(record.id)}
                        style={{ marginRight: "10px" }}
                      >
                        Cập Nhật Hoàn Tiền
                      </Button>
                    </>
                  );
                }
                return <></>;
              },
            },
          ]}
        />
      </Container>
      <Footer />
    </div>
  );
}

export default SaleStaffCancleOrderPage;
