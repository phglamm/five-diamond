import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import api from "../../config/axios";
import { Container } from "react-bootstrap";
import { Button, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./OrderHistoryUser.css";

export default function OrderHistoryUser() {
  const [order, setOrder] = useState([]);
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => record.account?.email || "NA",
    },
    {
      title: "Tổng Đơn Hàng",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => text.toLocaleString() + " đ",
    },
    {
      title: "Trạng Thái",
      dataIndex: "orderStatus",
      key: "totalAmount",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <>
            <Link to={`/theo-doi-don-hang/${record?.id}`}>
              <Button className="view-detail">Xem Chi Tiết</Button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Header></Header>
      <Container>
        <h1>Lịch sử đặt hàng của bạn</h1>
        <Table
          dataSource={order}
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
