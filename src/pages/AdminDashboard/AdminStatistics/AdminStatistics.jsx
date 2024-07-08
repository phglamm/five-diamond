import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import SideBar from "../../../components/SideBar/SideBar";
import "./AdminStatistics.css";
import {
  DollarOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import api from "../../../config/axios";

export default function AdminStatistics() {
  const [statistics, setStatistics] = useState([]);
  const [accountCount, setAccountCount] = useState([]);
  const [accountByMonth, setAccountByMonth] = useState([]);

  async function fetchSalesStatistic() {
    const response = await api.get("dashboard/revenue");
    setStatistics(response.data);
  }

  useEffect(() => {
    fetchSalesStatistic();
  }, []);

  async function fetchAccountCount() {
    const response = await api.get("dashboard/account");
    setAccountCount(response.data.customerQuantity);
  }

  useEffect(() => {
    fetchAccountCount();
  }, []);

  async function fetchAccountByMonth() {
    const response = await api.get("dashboard/account-by-month");
    setAccountByMonth(response.data);
  }

  useEffect(() => {
    fetchAccountByMonth();
  }, []);

  function getMonthlyData(statistics, accountByMonth) {
    const revenueByMonth = {};
    const ordersByMonth = {};
    const profitByMonth = {};
    const customerByMonth = {};

    statistics.forEach((item) => {
      const month = item.month;
      const monthName = `Tháng ${month}`;

      revenueByMonth[monthName] = parseFloat(item.totalRevenue || 0);
      ordersByMonth[monthName] = item.list.length;
      profitByMonth[monthName] = parseFloat(item.totalProfit || 0);
    });

    accountByMonth.forEach((item) => {
      const month = item.month;
      const monthName = `Tháng ${month}`;

      customerByMonth[monthName] = item.customerQuantity || 0;
    });

    return { revenueByMonth, ordersByMonth, profitByMonth, customerByMonth };
  }

  const { revenueByMonth, ordersByMonth, profitByMonth, customerByMonth } =
    getMonthlyData(statistics, accountByMonth);

  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu của tháng",
        data: labels.map((label) => revenueByMonth[label] || 0),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
        yAxisID: "y",
      },
      {
        label: "Tổng số đơn hàng",
        data: labels.map((label) => ordersByMonth[label] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        title: {
          display: true,
          text: "Doanh thu (VND)",
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Số đơn hàng",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            let value = context.raw;
            if (label.includes("Doanh thu")) {
              value = value.toLocaleString() + "đ";
            }
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  function getTotalRevenue(revenueByMonth) {
    return Object.values(revenueByMonth).reduce(
      (total, revenue) => total + revenue,
      0
    );
  }

  function getTotalProfit(profitByMonth) {
    return Object.values(profitByMonth).reduce(
      (total, profit) => total + profit,
      0
    );
  }

  const totalRevenue = getTotalRevenue(revenueByMonth);
  const totalProfit = getTotalProfit(profitByMonth);
  const currentMonthName = `Tháng ${moment().month() + 1}`;
  const currentMonthCustomerQuantity = customerByMonth[currentMonthName] || 0;

  return (
    <div className="admin">
      <SideBar />
      <div className="admin-content">
        <div className="widget-table">
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{totalRevenue.toLocaleString()}đ</p>
              <span>Tổng doanh thu</span>
            </div>
          </div>
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{totalProfit.toLocaleString()}đ</p>
              <span>Tổng lợi nhuận</span>
            </div>
          </div>
          <div className="widget-table-item">
            <UsergroupAddOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{accountCount}</p>
              <span>Tổng thành viên</span>
            </div>
          </div>
          <div className="widget-table-item">
            <UserOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{currentMonthCustomerQuantity}</p>
              <span>Lượt truy cập của tháng</span>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
