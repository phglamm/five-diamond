import React, { useEffect, useState } from "react";
import "./AdminStatistics.css";
import SideBar from "../../../components/SideBar/SideBar";
import { DollarOutlined, RiseOutlined, TeamOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import api from "../../../config/axios";

export default function AdminStatistics() {
  const [totalAccount, setTotalAccount] = useState({
    memberTotal: 0,
    customerQuantity: 0,
    salesQuantity: 0,
    deliverQuantity: 0,
    managerQuantity: 0,
    adminQuantity: 0,
  });

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    async function fetchYearlyStatistics() {
      const revenueResponse = await api.get("dashboard/revenue");
      const accountResponse = await api.get("dashboard/account");

      let revenue = 0;
      let profit = 0;

      revenueResponse.data.forEach(item => {
        revenue += parseFloat(item.totalRevenue || 0);
        profit += parseFloat(item.totalProfit || 0);
      });

      setTotalRevenue(revenue);
      setTotalProfit(profit);
      setTotalAccount({
        ...accountResponse.data,
      });
    }

    fetchYearlyStatistics();
  }, []);

  return (
    <div className="admin">
      <SideBar />
      <div className="admin-content">
        <div className="widget-table">
          <div className="widget-table-item">
            <DollarOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{totalRevenue.toLocaleString()}đ</p>
              <span>Tổng doanh thu của năm</span>
            </div>
          </div>
          <div className="widget-table-item">
            <RiseOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{totalProfit.toLocaleString()}đ</p>
              <span>Tổng lợi nhuận của năm</span>
            </div>
          </div>
          <div className="widget-table-item">
            <UserOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{totalAccount.customerQuantity}</p>
              <span>Tổng số khách hàng</span>
            </div>
          </div>
          <div className="widget-table-item">
            <TeamOutlined className="widget-table-item-icon" />
            <div className="widget-table-item-text">
              <p>{totalAccount.memberTotal}</p>
              <span>Tổng số lượng tài khoản</span>
            </div>
          </div>
        </div>
        <div className="pie-chart-container">
          <Pie
            data={{
              labels: [
                "Khách hàng",
                "Nhân viên bán hàng",
                "Nhân viên giao hàng",
                "Quản lý",
                "Quản trị viên",
              ],
              datasets: [
                {
                  label: "Số lượng",
                  data: [
                    totalAccount.customerQuantity,
                    totalAccount.salesQuantity,
                    totalAccount.deliverQuantity,
                    totalAccount.managerQuantity,
                    totalAccount.adminQuantity,
                  ],
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                  ],
                  hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

