import SideBar from "../../../components/SideBar/SideBar";
import { Table } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";
import api from "../../../config/axios";

export default function AdminUser() {
  const [account, setAccount] = useState([]);

  async function fetchAccount() {
    const response = await api.get("accounts");
    setAccount(response.data);
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {}, [account]);

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
      title: "firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "lastname",
      dataIndex: "lastname",
      key: "lastname",
    },

    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "rewardPoint",
      dataIndex: "rewardPoint",
      key: "rewardPoint",
    },
  ];

  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <div className="data-table">
          <h1>Quản Lý Người Dùng</h1>
          <Table
            dataSource={account}
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
