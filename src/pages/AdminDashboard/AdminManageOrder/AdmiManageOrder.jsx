import SideBar from "../../../components/SideBar/SideBar";
import { Table } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";

import api from "../../../config/axios";

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
      render: (text, record) => record.account?.email,
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
      title: "Trạng Thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
  ];

  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <div className="data-table">
          <h1>Quản Lý Đơn Hàng</h1>
          <Table
            dataSource={order}
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
