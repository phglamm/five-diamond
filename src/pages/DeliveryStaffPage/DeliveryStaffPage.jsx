

// import React, { useState, useEffect } from "react";
// import api from "../../config/axios";
// import { Container, ButtonGroup, Button } from "react-bootstrap";
// import { Table, Select, Input } from "antd";
// import { AiOutlineSearch } from "react-icons/ai";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";

// const { Search } = Input;

// export default function DeliveryStaffPage() {
//   const deliveryColumns = [
//     { title: "Mã đơn hàng", dataIndex: "id", key: "id", sorter: true },
//     { title: "Nhân viên giao hàng", dataIndex: "deliveryStaff", key: "deliveryStaff" },
//     { title: "Người nhận", dataIndex: "fullname", key: "fullname" },
//     { title: "Địa chỉ", dataIndex: "address", key: "address" },
//     { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
//     { title: "Ghi chú KH", dataIndex: "note", key: "note" },
//   ];

//   const updateColumns = [
//     { title: "Ngày đặt hàng", dataIndex: "orderDate", key: "orderDate", sorter: true },
//     { title: "Mã đơn hàng", dataIndex: "id", key: "id", sorter: true },
//     { title: "Địa chỉ", dataIndex: "address", key: "address" },
//     { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
//     {
//       title: "Tình trạng",
//       dataIndex: "orderStatus",
//       key: "orderStatus",
//       render: (text, record, rowIndex) => (
//         <Select
//           defaultValue={record.status || "Chờ lấy hàng"}
//           style={{ width: 200 }}
//           onChange={(newValue) => handleStatusChange(newValue, rowIndex)}
//           options={[
//             { value: "Chờ lấy hàng", label: "Chờ lấy hàng" },
//             { value: "Đang giao hàng", label: "Đang giao hàng" },
//             { value: "Giao thành công", label: "Giao thành công" },
//           ]}
//         />
//       ),
//     },
//     {
//       title: "Cập nhật",
//       dataIndex: "updateOrderStatus",
//       key: "updateOrderStatus",
//       render: (value, row, rowIndex) => (
//         <Select
//           defaultValue={value}
//           style={{ width: 200 }}
//           onChange={(newValue) => handleStatusChange(newValue, rowIndex)}
//           options={[
//             { value: "Khách đặt sai địa chỉ", label: "Khách đặt sai địa chỉ" },
//             { value: "Hẹn lại thời gian giao", label: "Hẹn lại thời gian giao" },
//             { value: "Khách không có nhà", label: "Khách không có nhà" },
//             { value: "Hàng xóm nhận", label: "Hàng xóm nhận" },
//           ]}
//         />
//       ),
//     },
//   ];

//   const [order, setOrder] = useState([]);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [selectedTable, setSelectedTable] = useState("deliver");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

//   useEffect(() => {
//     async function fetchOrderUser() {
//       try {
//         const response = await api.get(`order/all`);
//         console.log(response.data);
//         setOrder(response.data);
//       } catch (error) {
//         console.error(error.response.data);
//       }
//     }
//     fetchOrderUser();
//   }, []);

//   const handleStatusChange = (newValue, rowIndex) => {
//     const newData = [...order];
//     newData[rowIndex].status = newValue;
//     setOrder(newData);

//     if (newValue === "Giao thành công") {
//       const movedRow = newData.splice(rowIndex, 1)[0];
//       newData.push(movedRow);
//       setOrder(newData);
//     }
//   };

//   const handleTableChange = (pagination, filters, sorter) => {
//     setPage(pagination.current);
//     setRowsPerPage(pagination.pageSize);

//     if (sorter.order) {
//       setSortConfig({ key: sorter.field, direction: sorter.order === "ascend" ? "asc" : "desc" });
//     } else {
//       setSortConfig({ key: null, direction: null });
//     }
//   };

//   const handleTableToggle = (table) => {
//     setSelectedTable(table);
//   };

//   const handleSave = () => {
//     console.log("Saving data:", order);
//     // Add logic to save data, e.g., API call
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value); // Update search term when input changes
//   };

//   const columns = selectedTable === "deliver" ? deliveryColumns : updateColumns;

//   const filteredOrder = order.filter((item) => // Filter the orders based on the search term
//     Object.values(item).some((val) => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   return (
//     <div>
//       <Header />
//       <Container fluid className="table-deliver">
//         <ButtonGroup className="mb-3">
//           <Button
//             variant={selectedTable === "deliver" ? "primary" : "outline-primary"}
//             onClick={() => handleTableToggle("deliver")}
//           >
//             Đơn hàng cần giao
//           </Button>
//           <Button
//             variant={selectedTable === "update" ? "primary" : "outline-primary"}
//             onClick={() => handleTableToggle("update")}
//           >
//             Cập nhật đơn hàng
//           </Button>
//         </ButtonGroup>

//         <h1 className="text-center mb-4">
//           {selectedTable === "deliver" ? "ĐƠN HÀNG CẦN GIAO" : "CẬP NHẬT ĐƠN HÀNG"}
//         </h1>
//         <div className="search-bar mb-3">
//           <AiOutlineSearch className="search-icon" />
//           <Search
//             placeholder="Search..."
//             value={searchTerm} // Bind search term to input value
//             onChange={handleSearch} // Handle search input changes
//           />
//         </div>

//         <Table
//           columns={columns}
//           dataSource={filteredOrder} // Use filtered orders as data source
//           pagination={{ current: page, pageSize: rowsPerPage, total: filteredOrder.length }}
//           onChange={handleTableChange}
//           rowKey="id"
//         />

//         {selectedTable === "update" && (
//           <div className="d-flex justify-content-end mt-3">
//             <Button variant="success" onClick={handleSave}>
//               Save
//             </Button>
//           </div>
//         )}
//       </Container>
//       <Footer />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Button, Container, ButtonGroup } from "react-bootstrap";
import { Table, Input, Select } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import api from "../../config/axios";

const { Search } = Input;

function SaleStaffPage() {
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTable, setSelectedTable] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(null); // null means no filter

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get("/order/all");
        setOrder(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }
    fetchOrder();
  }, []);

  const handleStatusChange = (newValue, rowIndex) => {
    const newData = [...order];
    newData[rowIndex].orderStatus = newValue;
    setOrder(newData);

    if (newValue === "Giao thành công") {
      const movedRow = newData.splice(rowIndex, 1)[0];
      newData.push(movedRow);
      setOrder(newData);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setRowsPerPage(pagination.pageSize);
  };

  const handleTableToggle = (table) => {
    setSelectedTable(table);
  };

  const handleSave = () => {
    console.log("Saving data:", order);
    // Add logic to save data, e.g., API call
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term when input changes
  };

  const filteredOrder = order.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const commonColumns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    { title: "Người nhận", dataIndex: "fullname", key: "fullname" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
  ];

  const deliveryColumns = [
    ...commonColumns,
    { title: "Nhân viên giao hàng", dataIndex: "deliveryStaff", key: "deliveryStaff" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Ghi chú KH", dataIndex: "note", key: "note" },
  ];

  const updateColumns = [
    ...commonColumns,
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Tình trạng",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text, record, rowIndex) => (
        <Select
          defaultValue={record.orderStatus || "Chờ lấy hàng"}
          style={{ width: 200 }}
          onChange={(newValue) => handleStatusChange(newValue, rowIndex)}
          options={[
            { value: "Chờ lấy hàng", label: "Chờ lấy hàng" },
            { value: "Đang giao hàng", label: "Đang giao hàng" },
            { value: "Giao thành công", label: "Giao thành công" },
          ]}
        />
      ),
    },
    {
      title: "Cập nhật",
      dataIndex: "updateOrderStatus",
      key: "updateOrderStatus",
      render: (value, row, rowIndex) => (
        <Select
          defaultValue={value}
          style={{ width: 200 }}
          onChange={(newValue) => handleStatusChange(newValue, rowIndex)}
          options={[
            { value: "Khách đặt sai địa chỉ", label: "Khách đặt sai địa chỉ" },
            { value: "Hẹn lại thời gian giao", label: "Hẹn lại thời gian giao" },
            { value: "Khách không có nhà", label: "Khách không có nhà" },
            { value: "Hàng xóm nhận", label: "Hàng xóm nhận" },
          ]}
        />
      ),
    },
  ];

  const allColumns = [
    ...commonColumns,
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Tình trạng", dataIndex: "orderStatus", key: "orderStatus" },
    {
      title: "Xem đơn hàng",
      key: "view-order",
      render: (text, record) => (
        <Button type="link" onClick={() => console.log("Viewing order", record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const columns = selectedTable === "deliver" ? deliveryColumns : selectedTable === "update" ? updateColumns : allColumns;

  return (
    <div>
      <Header />
      <Container fluid className="table-deliver">
        <ButtonGroup className="mb-3">
          <Button
            variant={selectedTable === "all" ? "primary" : "outline-primary"}
            onClick={() => handleTableToggle("all")}
          >
            Tất cả đơn
          </Button>
          <Button
            variant={selectedTable === "deliver" ? "primary" : "outline-primary"}
            onClick={() => handleTableToggle("deliver")}
          >
            Đơn hàng cần giao
          </Button>
          <Button
            variant={selectedTable === "update" ? "primary" : "outline-primary"}
            onClick={() => handleTableToggle("update")}
          >
            Cập nhật đơn hàng
          </Button>
        </ButtonGroup>

        <h1 className="text-center mb-4">
          {selectedTable === "deliver"
            ? "ĐƠN HÀNG CẦN GIAO"
            : selectedTable === "update"
              ? "CẬP NHẬT ĐƠN HÀNG"
              : "TẤT CẢ ĐƠN"}
        </h1>
        <div className="search-bar mb-3">
          <AiOutlineSearch className="search-icon" />
          <Search
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredOrder}
          pagination={{
            current: page,
            pageSize: rowsPerPage,
            total: filteredOrder.length,
          }}
          onChange={handleTableChange}
          rowKey="id"
        />

        {selectedTable === "update" && (
          <div className="d-flex justify-content-end mt-3">
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default SaleStaffPage;

