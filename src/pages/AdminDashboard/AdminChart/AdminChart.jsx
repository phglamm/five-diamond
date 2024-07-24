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
  MinusCircleOutlined,
} from "@ant-design/icons";
import { DatePicker } from "antd";
import moment from "moment";
import api from "../../../config/axios";

export default function AdminChart() {
  const [statistics, setStatistics] = useState([]);
  const [accountCount, setAccountCount] = useState(0);
  const [accountByMonth, setAccountByMonth] = useState([]);
  const [orders, setOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.floor((moment().month() + 3) / 3)
  );
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [mode, setMode] = useState("month");
  const { RangePicker } = DatePicker;

  useEffect(() => {
    async function fetchSalesStatistic() {
      try {
        const dasboardResponse = await api.get("dashboard/revenue");
        setStatistics(dasboardResponse.data);
      } catch (error) {
        console.error("Error fetching sales statistics:", error);
      }
    }
    fetchSalesStatistic();
  }, []);

  useEffect(() => {
    async function fetchAccountCount() {
      try {
        const response = await api.get("dashboard/account");
        setAccountCount(response.data.customerQuantity);
      } catch (error) {
        console.error("Error fetching account count:", error);
      }
    }
    fetchAccountCount();
  }, []);

  useEffect(() => {
    async function fetchAccountByMonth() {
      try {
        const response = await api.get("dashboard/account-by-month");
        setAccountByMonth(response.data);
      } catch (error) {
        console.error("Error fetching account by month:", error);
      }
    }
    fetchAccountByMonth();
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const orderResponse = await api.get("order/all");
        const filterOrder = orderResponse.data.filter(
          (item) => item.orderStatus != "CANCELED"
        );
        const filterCanceledOrder = orderResponse.data.filter(
          (item) => item.orderStatus === "CANCELED"
        );

        setAllOrders(orderResponse.data);
        setOrders(filterOrder);
        setCanceledOrders(filterCanceledOrder);
        // console.log(filterOrder);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  async function filterOrdersByRange(orders, canceledOrders, selectedRange) {
    try {
      if (
        selectedRange &&
        selectedRange.length === 2 &&
        selectedRange[0] &&
        selectedRange[1]
      ) {
        const startDate = moment(selectedRange[0].$d);
        const endDate = moment(selectedRange[1].$d);

        const filteredOrders = await Promise.all(
          orders.map(async (order) => {
            const orderDate = moment(order.orderDate);
            if (orderDate.isBetween(startDate, endDate, null, "[]")) {
              const response = await api.get(`order/${order.id}`);
              const totalAmount = response.data.totalAmount;
              return { ...order, totalAmount };
            }
            return null;
          })
        );

        const filteredCanceledOrders = await Promise.all(
          canceledOrders.map(async (order) => {
            const orderDate = moment(order.orderDate);
            if (
              orderDate.isBetween(startDate, endDate, null, "[]") &&
              order.orderStatus === "CANCELED"
            ) {
              return { ...order, canceledCount: 1 }; // Assuming each order is counted once
            }
            return null;
          })
        );

        const validOrders = filteredOrders.filter((order) => order !== null);
        const validCanceledOrders = filteredCanceledOrders.filter(
          (order) => order !== null
        );

        return {
          validOrders,
          validCanceledOrders,
        };
      }

      return {
        validOrders: [],
        validCanceledOrders: [],
      };
    } catch (error) {
      console.error("Error filtering orders by range:", error);
      return {
        validOrders: [],
        validCanceledOrders: [],
      };
    }
  }

  useEffect(() => {
    async function updateFilteredOrders() {
      const validOrders = await filterOrdersByRange(
        orders,
        canceledOrders,
        selectedRange
      );
      setFilteredOrders(validOrders);
    }
    updateFilteredOrders();
  }, [orders, selectedRange]);

  function calculateTotalRevenue(filteredOrders) {
    try {
      return filteredOrders.validOrders?.reduce(
        (total, order) => total + order.totalAmount,
        0
      );
    } catch (error) {
      console.error("Error calculating total revenue:", error);
      return 0;
    }
  }

  function calculateTotalProfit(filteredOrders) {
    try {
      return filteredOrders.validOrders?.reduce((total, order) => {
        const productLineTotal = order.orderItems?.reduce(
          (sum, item) => sum + item.product.productLine.price,
          0
        );
        return total + (order.totalAmount - productLineTotal);
      }, 0);
    } catch (error) {
      console.error("Error calculating total profit:", error);
      return 0;
    }
  }

  const totalRevenue = calculateTotalRevenue(filteredOrders);
  const totalProfitValue = calculateTotalProfit(filteredOrders);

  function getMonthlyData(statistics, accountByMonth) {
    const revenueByMonth = {};
    const ordersByMonth = {};
    const profitByMonth = {};
    const customerByMonth = {};
    const canceledOrderByMonth = {};

    statistics.forEach((item) => {
      const month = item.month;
      const monthName = `Tháng ${month}`;

      revenueByMonth[monthName] = parseFloat(item.totalRevenue || 0);
      ordersByMonth[monthName] = item.list.length;
      profitByMonth[monthName] = parseFloat(item.totalProfit || 0);
      canceledOrderByMonth[monthName] = item.list.filter(
        (item) => item.orderStatus === "CANCELED"
      ).length;
    });

    accountByMonth.forEach((item) => {
      const month = item.month;
      const monthName = `Tháng ${month}`;

      customerByMonth[monthName] = item.customerQuantity || 0;
    });

    return {
      revenueByMonth,
      ordersByMonth,
      profitByMonth,
      customerByMonth,
      canceledOrderByMonth,
    };
  }

  const {
    revenueByMonth,
    ordersByMonth,
    profitByMonth,
    customerByMonth,
    canceledOrderByMonth,
  } = getMonthlyData(statistics, accountByMonth);

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
  const currentMonthCanceledOrder = canceledOrderByMonth[currentMonthName] || 0;

  const quarters = [
    { label: "Quý 1", value: 1 },
    { label: "Quý 2", value: 2 },
    { label: "Quý 3", value: 3 },
    { label: "Quý 4", value: 4 },
  ];

  function getQuarterlyData(quarter) {
    const startMonth = (quarter - 1) * 3 + 1;
    const endMonth = quarter * 3;

    let totalQuarterlyRevenue = 0;
    let totalQuarterlyProfit = 0;
    let totalQuarterlyOrders = 0;
    let totalQuarterlyCanceledOrders = 0;
    let totalQuarterlyCustomers = 0;

    for (let month = startMonth; month <= endMonth; month++) {
      const monthName = `Tháng ${month}`;
      totalQuarterlyRevenue += revenueByMonth[monthName] || 0;
      totalQuarterlyProfit += profitByMonth[monthName] || 0;
      totalQuarterlyOrders += ordersByMonth[monthName] || 0;
      totalQuarterlyCanceledOrders += canceledOrderByMonth[monthName] || 0;
      totalQuarterlyCustomers += customerByMonth[monthName] || 0;
    }

    return {
      totalQuarterlyRevenue,
      totalQuarterlyProfit,
      totalQuarterlyOrders,
      totalQuarterlyCustomers,
      totalQuarterlyCanceledOrders,
    };
  }

  const {
    totalQuarterlyRevenue,
    totalQuarterlyProfit,
    totalQuarterlyOrders,
    totalQuarterlyCustomers,
    totalQuarterlyCanceledOrders,
  } = getQuarterlyData(selectedQuarter);

  function checkRange(orderDate, selectedRange) {
    if (
      selectedRange &&
      selectedRange.length === 2 &&
      selectedRange[0] &&
      selectedRange[1]
    ) {
      const startDate = moment(selectedRange[0].$d);
      const endDate = moment(selectedRange[1].$d);
      if (orderDate.isBetween(startDate, endDate, null, "[]")) {
        return true;
      }
    }
  }

  return (
    <div className="admin">
      <SideBar />
      <div className="admin-content">
        <div className="selection-container">
          <div className="time-selection">
            <label htmlFor="time">Chọn khoảng thời gian:</label>
            <RangePicker
              className="time-range-picker"
              onChange={(dates) => {
                if (dates) {
                  setSelectedRange(dates);
                  setMode("range");
                } else {
                  setSelectedRange([null, null]);
                  setMode("month");
                }
              }}
            />
          </div>

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
                  ? totalQuarterlyRevenue.toLocaleString() + " VND"
                  : mode === "range"
                  ? totalRevenue.toLocaleString() + " VND"
                  : currentMonthRevenue.toLocaleString() + " VND"}
              </p>
              <span>
                {mode === "quarter"
                  ? "Doanh thu của quý"
                  : mode === "range"
                  ? "Doanh thu"
                  : "Doanh thu của tháng"}
              </span>
            </div>
          </div>
          <div className="widget-table-item">
            <RiseOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>
                {mode === "quarter"
                  ? totalQuarterlyProfit.toLocaleString() + " VND"
                  : mode === "range"
                  ? totalProfitValue.toLocaleString() + " VND"
                  : currentMonthProfit.toLocaleString() + " VND"}
              </p>
              <span>
                {mode === "quarter"
                  ? "Lợi nhuận của quý"
                  : mode === "range"
                  ? "Lợi nhuận"
                  : "Lợi nhuận của tháng"}
              </span>
            </div>
          </div>
          <div className="widget-table-item">
            <TruckOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>
                {mode === "quarter"
                  ? `${totalQuarterlyOrders} (${totalQuarterlyCanceledOrders} đơn đã hủy)`
                  : mode === "range"
                  ? `${filteredOrders.validOrders.length} (${filteredOrders.validCanceledOrders.length} đơn đã hủy)`
                  : `${currentMonthOrder} (${currentMonthCanceledOrder} đơn đã hủy)`}
              </p>
              <span>
                {mode === "quarter"
                  ? "Tổng đơn hàng của quý"
                  : mode === "range"
                  ? "Tổng đơn hàng"
                  : "Tổng đơn hàng của tháng"}
              </span>
            </div>
          </div>
          <span>
            {mode === "range" ? (
              ""
            ) : (
              <div className="widget-table-item">
                <UserAddOutlined className="widget-table-item-icon" />
                <div className="widget-table-item-text">
                  <p>
                    {mode === "quarter"
                      ? totalQuarterlyCustomers
                      : currentMonthCustomerQuantity}
                  </p>
                  <span>Số khách hàng mới</span>
                </div>
              </div>
            )}
          </span>
        </div>
        <div className="chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
