import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import SideBar from "../../../components/SideBar/SideBar";
import axios from "axios";
import "./AdminStatistics.css";
import { DollarOutlined } from "@ant-design/icons";
import moment from "moment";
import api from "../../../config/axios";

export default function AdminStatistics() {
  const [statistics, setStatistics] = useState([]);

  async function fetchSalesStatistic() {
    const response = await api.get("order/delivered");
    setStatistics(response.data);
  }

  useEffect(() => {
    fetchSalesStatistic();
  }, []);

  function getMonthlyData(data) {
    const revenueByMonth = {};
    const ordersByMonth = {};

    data.forEach(item => {
      const month = moment(item.orderDate).format('MMMM');
      const totalAmount = parseFloat(item.totalAmount);

      if (revenueByMonth[month]) {
        revenueByMonth[month] += totalAmount;
        ordersByMonth[month] += 1;
      } else {
        revenueByMonth[month] = totalAmount;
        ordersByMonth[month] = 1;
      }
    });

    return { revenueByMonth, ordersByMonth };
  }

  const { revenueByMonth, ordersByMonth } = getMonthlyData(statistics);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Doanh thu của tháng",
        data: labels.map(label => (revenueByMonth[label] || 0)),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        label: "Tổng số đơn hàng",
        data: labels.map(label => (ordersByMonth[label] || 0)),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        position: 'left',
        title: {
          display: true,
          text: 'Doanh thu (VND)'
        },
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Số đơn hàng'
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            let value = context.raw;
            if (label.includes("Doanh thu")) {
              value = value.toLocaleString() + "đ";
            }
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  function getTotalRevenue(revenueByMonth) {
    return Object.values(revenueByMonth).reduce((total, revenue) => total + revenue, 0);
  }

  const totalRevenue = getTotalRevenue(revenueByMonth);

  return (
    <div className="admin">
      <SideBar />
      <div className="admin-content">
        <div className="widget-table">
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{totalRevenue.toLocaleString()}đ</p>
              <p>Doanh thu</p>
            </div>
          </div>
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>700m</p>
              <p>Doanh thu</p>
            </div>
          </div>
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>700m</p>
              <p>Doanh thu</p>
            </div>
          </div>
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>700m</p>
              <p>Doanh thu</p>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-container-item">
            <h1>Sơ đồ cột</h1>
            <Bar data={data} options={options} />
          </div>
          <div className="chart-container-item">
            <h1>Sơ đồ tròn</h1>
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
