//DeliveryStaffPage
import { Container, ButtonGroup, Button, Form } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./DeliveryStaffPage.css";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  deliveryRows as initialDeliveryRows,
  updateRows as initialUpdateRows,
} from "./FakeDataDeliver"; // Importing the fake data
import { AiOutlineSearch } from "react-icons/ai";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const uploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function DeliveryStaffPage() {
  const deliveryColumns = [
    { id: "shipmentId", label: "Mã vận chuyển", minWidth: 100 },
    { id: "orderId", label: "Mã đơn hàng", minWidth: 100 },
    { id: "deliveryStaff", label: "Nhân viên giao hàng", minWidth: 170 },
    { id: "recipient", label: "Người nhận", minWidth: 170 },
    { id: "address", label: "Địa chỉ", minWidth: 200 },
    { id: "phone", label: "Số điện thoại", minWidth: 150 },
    { id: "payment", label: "Tình trạng thanh toán", minWidth: 150 },
    { id: "customerNote", label: "Ghi chú KH", minWidth: 150 },
  ];

  const updateColumns = [
    { id: "dateDeliver", label: "Ngày giao hàng", minWidth: 150 },
    { id: "shipmentId", label: "Mã vận chuyển", minWidth: 50 },
    { id: "orderId", label: "Mã đơn hàng", minWidth: 50 },
    { id: "address", label: "Địa chỉ", minWidth: 200 },
    { id: "phone", label: "Số điện thoại", minWidth: 150 },
    {
      id: "deliveryStaffNote",
      label: "Ghi chú NVGH",
      minWidth: 150,
      render: (value, rowIndex) => (
        <Form.Control
          as="textarea"
          rows={3}
          value={value}
          onChange={(e) => handleNoteChange(e.target.value, rowIndex)}
        />
      ),
    },
    {
      id: "upload",
      label: "Upload Image",
      minWidth: 150,
      render: () => (
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      ),
    },
    {
      id: "status",
      label: "Tình trạng",
      minWidth: 100,
      render: (value, rowIndex) => (
        <Select
          defaultValue={value}
          style={{ width: 200 }}
          onChange={(newValue) => handleStatusChange(newValue, rowIndex)}
          options={[
            { value: "Xác nhận", label: "Xác nhận" },
            { value: "Chờ lấy hàng", label: "Chờ lấy hàng" },
            { value: "Chờ giao hàng", label: "Chờ giao hàng" },
            { value: "Giao thành công", label: "Giao thành công" },
          ]}
        />
      ),
    },
    {
      id: "update-status",
      label: "Cập nhật",
      minWidth: 100,
      render: (value, rowIndex) => (
        <Select
          defaultValue={value}
          style={{ width: 200 }}
          onChange={(newValue) => handleStatusChange(newValue, rowIndex)}
          options={[
            { value: "Khách đặt sai địa chỉ", label: "Khách đặt sai địa chỉ" },
            {
              value: "Hẹn lại thời gian giao",
              label: "Hẹn lại thời gian giao",
            },
            { value: "Khách không có nhà", label: "Khách không có nhà" },
            { value: "Hàng xóm nhận", label: "Hàng xóm nhận" },
          ]}
        />
      ),
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedTable, setSelectedTable] = React.useState("deliver");
  const [deliveryData, setDeliveryData] = React.useState(() => {
    const savedData = localStorage.getItem("deliveryData");
    return savedData ? JSON.parse(savedData) : initialDeliveryRows;
  });
  const [updateData, setUpdateData] = React.useState(() => {
    const savedData = localStorage.getItem("updateData");
    return savedData ? JSON.parse(savedData) : initialUpdateRows;
  });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: "asc",
  });

  React.useEffect(() => {
    localStorage.setItem("deliveryData", JSON.stringify(deliveryData));
  }, [deliveryData]);

  React.useEffect(() => {
    localStorage.setItem("updateData", JSON.stringify(updateData));
  }, [updateData]);

  const handleNoteChange = (newValue, rowIndex) => {
    const newData = [...updateData];
    newData[rowIndex].deliveryStaffNote = newValue;
    setUpdateData(newData);
  };

  const handleStatusChange = (newValue, rowIndex) => {
    const newData =
      selectedTable === "deliver" ? [...deliveryData] : [...updateData];
    newData[rowIndex].status = newValue;
    selectedTable === "deliver"
      ? setDeliveryData(newData)
      : setUpdateData(newData);

    // Move row to the bottom if status is "Đã nhận hàng"
    if (newValue === "Đã nhận hàng") {
      const movedRow = newData.splice(rowIndex, 1)[0];
      newData.push(movedRow);
      selectedTable === "deliver"
        ? setDeliveryData(newData)
        : setUpdateData(newData);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTableToggle = (table) => {
    setSelectedTable(table);
  };

  const handleSave = () => {
    const dataToSave = selectedTable === "deliver" ? deliveryData : updateData;
    console.log("Saving data:", dataToSave);
    // Add logic to save data, e.g., API call
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnId) => {
    let direction = "asc";
    if (sortConfig.key === columnId && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnId, direction });

    const sortedData = [...rows].sort((a, b) => {
      if (columnId === "shipmentId" || columnId === "orderId") {
        return direction === "asc"
          ? a[columnId] - b[columnId]
          : b[columnId] - a[columnId];
      } else if (columnId === "phone") {
        return direction === "asc"
          ? a[columnId].localeCompare(b[columnId])
          : b[columnId].localeCompare(a[columnId]);
      } else if (columnId === "deliveryStaff" || columnId === "recipient") {
        return direction === "asc"
          ? a[columnId].localeCompare(b[columnId])
          : b[columnId].localeCompare(a[columnId]);
      } else if (columnId === "address" || columnId === "payment") {
        return direction === "asc"
          ? a[columnId].localeCompare(b[columnId])
          : b[columnId].localeCompare(a[columnId]);
      } else {
        return 0;
      }
    });

    if (selectedTable === "deliver") {
      setDeliveryData(sortedData);
    } else {
      setUpdateData(sortedData);
    }
  };

  const columns = selectedTable === "deliver" ? deliveryColumns : updateColumns;
  const rows = selectedTable === "deliver" ? deliveryData : updateData;

  const filteredRows = rows.filter((row) => {
    return columns.some((column) => {
      const value = row[column.id];
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });

  return (
    <div>
      <Header></Header>
      <Container className="table-deliver">
        <ButtonGroup className="mb-3">
          <Button
            variant={
              selectedTable === "deliver" ? "primary" : "outline-primary"
            }
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
            : "CẬP NHẬT ĐƠN HÀNG"}
        </h1>
        <div className="search-bar mb-3">
          <AiOutlineSearch className="search-icon" />
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 480 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, cursor: "pointer" }}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                      {sortConfig.key === column.id
                        ? sortConfig.direction === "asc"
                          ? " 🔼"
                          : " 🔽"
                        : ""}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.orderId || row.shipmentId}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.render
                                ? column.render(value, rowIndex)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Button variant="success" className="mt-3" onClick={handleSave}>
          Lưu
        </Button>
      </Container>

      <Footer></Footer>
    </div>
  );
}
