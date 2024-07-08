import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import SideBar from "../../../components/SideBar/SideBar";
import "./AdminChart.css";
import { DollarOutlined, RiseOutlined, TruckOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";
import api from "../../../config/axios";

export default function AdminChart() {
  const [statistics, setStatistics] = useState([]);
  const [accountCount, setAccountCount] = useState(0);
  const [accountByMonth, setAccountByMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);

  useEffect(() => {
    async function fetchSalesStatistic() {
      const response = await api.get("dashboard/revenue");
      setStatistics(response.data);
    }
    fetchSalesStatistic();
  }, []);

  useEffect(() => {
    async function fetchAccountCount() {
      const response = await api.get("dashboard/account");
      setAccountCount(response.data.customerQuantity);
    }
    fetchAccountCount();
  }, []);

  useEffect(() => {
    async function fetchAccountByMonth() {
      const response = await api.get("dashboard/account-by-month");
      setAccountByMonth(response.data);
    }
    fetchAccountByMonth();
  }, []);

  function getMonthlyData(statistics, accountByMonth) {
    const revenueByMonth = {};
    const ordersByMonth = {};
    const profitByMonth = {};
    const customerByMonth = {};

    statistics.forEach(item => {
      const month = item.month;
      const monthName = `Tháng ${month}`;

      revenueByMonth[monthName] = parseFloat(item.totalRevenue || 0);
      ordersByMonth[monthName] = item.list.length;
      profitByMonth[monthName] = parseFloat(item.totalProfit || 0);
    });

    accountByMonth.forEach(item => {
      const month = item.month;
      const monthName = `Tháng ${month}`;

      customerByMonth[monthName] = item.customerQuantity || 0;
    });

    return { revenueByMonth, ordersByMonth, profitByMonth, customerByMonth };
  }

  const { revenueByMonth, ordersByMonth, profitByMonth, customerByMonth } = getMonthlyData(statistics, accountByMonth);

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
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
          stepSize: 1
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
            } else if (label.includes("Tổng số đơn hàng")) {
              value = Math.round(value);
            }
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  const currentMonthName = `Tháng ${selectedMonth}`;
  const currentMonthRevenue = revenueByMonth[currentMonthName] || 0;
  const currentMonthProfit = profitByMonth[currentMonthName] || 0;
  const currentMonthOrder= ordersByMonth[currentMonthName] || 0;
  const currentMonthCustomerQuantity = customerByMonth[currentMonthName] || 0;

  return (
    <div className="admin">
      <SideBar />
      <div className="admin-content">
        <div className="month-selection">
          <label htmlFor="month">Chọn tháng:</label>
          <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
            {labels.map((label, index) => (
              <option key={index} value={index + 1}>{label}</option>
            ))}
          </select>
        </div>
        <div className="widget-table">
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{currentMonthRevenue.toLocaleString()}đ</p>
              <span>Doanh thu của tháng</span>
            </div>
          </div>
          <div className="widget-table-item">
            <RiseOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{currentMonthProfit.toLocaleString()}đ</p>
              <span>Lợi nhuận của tháng</span>
            </div>
          </div>
          <div className="widget-table-item">
            <TruckOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{currentMonthOrder}</p>
              <span>Số đơn của tháng</span>
            </div>
          </div>
          <div className="widget-table-item">
          <UserAddOutlined className="widget-table-item-icon" />
          <div className="widget-table-item-text">
              <p>{currentMonthCustomerQuantity}</p>
              <span>Số khách hàng mới</span>
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
