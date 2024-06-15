import SideBar from "../../../components/SideBar/SideBar";
import { Table } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";

import api from "../../../config/axios";

export default function AdminOrder() {
  const [order, setOrder] = useState([]);

  async function fetchOrder() {
    const response = await api.get("order");
    setOrder(response.data);
    console.log("data....", response.data);
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (order) {
      console.log("order...", order); // Log the diamond id when diamond state is updated
    }
  }, [order]); // Only re-run this effect when diamond changes

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
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
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
