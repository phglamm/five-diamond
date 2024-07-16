import { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import SideBar from "../../../components/SideBar/SideBar";
import "./AdminChart.css";
import {
  DollarOutlined,
  RiseOutlined,
  TruckOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import moment from "moment";
import api from "../../../config/axios";

export default function AdminChart() {
  const [statistics, setStatistics] = useState([]);
  const [accountCount, setAccountCount] = useState(0);
  const [accountByMonth, setAccountByMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.floor((moment().month() + 3) / 3)
  );
  const [mode, setMode] = useState("month"); // Thêm trạng thái để kiểm soát chế độ chọn

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
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
          stepSize: 1,
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
            } else if (label.includes("Tổng số đơn hàng")) {
              value = Math.round(value);
            }
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  const currentMonthName = `Tháng ${selectedMonth}`;
  const currentMonthRevenue = revenueByMonth[currentMonthName] || 0;
  const currentMonthProfit = profitByMonth[currentMonthName] || 0;
  const currentMonthOrder = ordersByMonth[currentMonthName] || 0;
  const currentMonthCustomerQuantity = customerByMonth[currentMonthName] || 0;

  const quarters = [
    { label: "Quý 1", value: 1 },
    { label: "Quý 2", value: 2 },
    { label: "Quý 3", value: 3 },
    { label: "Quý 4", value: 4 },
  ];

  function getQuarterlyData(quarter) {
    const startMonth = (quarter - 1) * 3 + 1;
    const endMonth = quarter * 3;

    let totalRevenue = 0;
    let totalProfit = 0;
    let totalOrders = 0;
    let totalCustomers = 0;

    for (let month = startMonth; month <= endMonth; month++) {
      const monthName = `Tháng ${month}`;
      totalRevenue += revenueByMonth[monthName] || 0;
      totalProfit += profitByMonth[monthName] || 0;
      totalOrders += ordersByMonth[monthName] || 0;
      totalCustomers += customerByMonth[monthName] || 0;
    }

    return { totalRevenue, totalProfit, totalOrders, totalCustomers };
  }

  const { totalRevenue, totalProfit, totalOrders, totalCustomers } =
    getQuarterlyData(selectedQuarter);

  return (
    <div className="admin">
      <SideBar />
      <div className="admin-content">
        <div className="selection-container">
          <div className="month-selection">
            <label htmlFor="month">Chọn tháng:</label>
            <select
              id="month"
              value={selectedMonth}
              onChange={(e) => {
                setMode("month");
                setSelectedMonth(parseInt(e.target.value));
              }}
              onClick={() => setMode("month")}
            >
              {labels.map((label, index) => (
                <option key={index} value={index + 1}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          Hoặc
          <div className="quarter-selection">
            <label htmlFor="quarter">Chọn quý:</label>
            <select
              id="quarter"
              value={selectedQuarter}
              onChange={(e) => {
                setMode("quarter");
                setSelectedQuarter(parseInt(e.target.value));
              }}
              onClick={() => setMode("quarter")}
            >
              {quarters.map((quarter) => (
                <option key={quarter.value} value={quarter.value}>
                  {quarter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="widget-table">
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>
                {mode === "quarter"
                  ? totalRevenue.toLocaleString() + "đ"
                  : currentMonthRevenue.toLocaleString() + "đ"}
              </p>
              <span>
                {mode === "quarter"
                  ? "Doanh thu của quý"
                  : "Doanh thu của tháng"}
              </span>
            </div>
          </div>
          <div className="widget-table-item">
            <RiseOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>
                {mode === "quarter"
                  ? totalProfit.toLocaleString() + "đ"
                  : currentMonthProfit.toLocaleString() + "đ"}
              </p>
              <span>
                {mode === "quarter"
                  ? "Lợi nhuận của quý"
                  : "Lợi nhuận của tháng"}
              </span>
            </div>
          </div>
          <div className="widget-table-item">
            <TruckOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{mode === "quarter" ? totalOrders : currentMonthOrder}</p>
              <span>
                {mode === "quarter" ? "Số đơn của quý" : "Số đơn của tháng"}
              </span>
            </div>
          </div>
          <div className="widget-table-item">
            <UserAddOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>
                {mode === "quarter"
                  ? totalCustomers
                  : currentMonthCustomerQuantity}
              </p>
              <span>
                {mode === "quarter" ? "Số khách hàng mới" : "Số khách hàng mới"}
              </span>
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
