import { Container, ButtonGroup, Button, Form } from "react-bootstrap";
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
import { UploadOutlined, UpOutlined, DownOutlined } from "@ant-design/icons";
import { AiOutlineSearch } from "react-icons/ai";

import { dataCustomerDelivery as initialMergedData } from "./FakeDataDeliver";

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
    { id: "shipmentId", label: "Mã vận chuyển", minWidth: 100, sortable: true },
    { id: "orderId", label: "Mã đơn hàng", minWidth: 100, sortable: true },
    { id: "deliveryStaff", label: "Nhân viên giao hàng", minWidth: 170 },
    { id: "recipient", label: "Người nhận", minWidth: 170 },
    { id: "address", label: "Địa chỉ", minWidth: 200 },
    { id: "phone", label: "Số điện thoại", minWidth: 150 },
    { id: "payment", label: "Tình trạng thanh toán", minWidth: 150 },
    { id: "customerNote", label: "Ghi chú KH", minWidth: 150 },
  ];

  const updateColumns = [
    {
      id: "dateDeliver",
      label: "Ngày giao hàng",
      minWidth: 150,
      sortable: true,
    },
    { id: "shipmentId", label: "Mã vận chuyển", minWidth: 50, sortable: true },
    { id: "orderId", label: "Mã đơn hàng", minWidth: 50, sortable: true },
    { id: "address", label: "Địa chỉ", minWidth: 200 },
    { id: "phone", label: "Số điện thoại", minWidth: 150 },
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
          defaultValue={mergedData[rowIndex]?.status || "Xác nhận"}
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
      id: "updateStatus",
      label: "Cập nhật",
      minWidth: 100,
      render: (value, rowIndex) => {
        const isDelivered = mergedData[rowIndex].status === "Giao thành công";
        return (
          <Select
            defaultValue={value}
            style={{ width: 200 }}
            onChange={(newValue) => handleStatusChange(newValue, rowIndex)}
            disabled={isDelivered}
            options={[
              {
                value: "Khách đặt sai địa chỉ",
                label: "Khách đặt sai địa chỉ",
              },
              {
                value: "Hẹn lại thời gian giao",
                label: "Hẹn lại thời gian giao",
              },
              { value: "Khách không có nhà", label: "Khách không có nhà" },
              { value: "Hàng xóm nhận", label: "Hàng xóm nhận" },
            ]}
          />
        );
      },
    },
  ];

  const [mergedData, setMergedData] = React.useState(() => {
    const savedData = localStorage.getItem("mergedData");
    return savedData ? JSON.parse(savedData) : initialMergedData;
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedTable, setSelectedTable] = React.useState("deliver");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState({
    key: null,
    direction: null,
  });

  React.useEffect(() => {
    localStorage.setItem("mergedData", JSON.stringify(mergedData));
  }, [mergedData]);

  const handleStatusChange = (newValue, rowIndex) => {
    const newData = [...mergedData];
    newData[rowIndex].status = newValue;
    setMergedData(newData);

    // Move row to the bottom if status is "Giao thành công"
    if (newValue === "Giao thành công") {
      const movedRow = newData.splice(rowIndex, 1)[0];
      newData.push(movedRow);
      setMergedData(newData);
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
    console.log("Saving data:", mergedData);
    // Add logic to save data, e.g., API call
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (columnId) => {
    let direction = "asc";
    if (sortConfig.key === columnId && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === columnId && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key: columnId, direction });

    if (direction !== null) {
      const sortedData = [...mergedData].sort((a, b) => {
        let aValue = a[columnId];
        let bValue = b[columnId];

        if (columnId === "shipmentId" || columnId === "orderId") {
          aValue = parseInt(a[columnId].replace(/\D/g, ""), 10);
          bValue = parseInt(b[columnId].replace(/\D/g, ""), 10);
        } else if (columnId === "dateDeliver") {
          aValue = new Date(a[columnId]);
          bValue = new Date(b[columnId]);
        }

        if (direction === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setMergedData(sortedData);
    }
  };

  const columns = selectedTable === "deliver" ? deliveryColumns : updateColumns;

  const filteredRows = mergedData.filter((row) => {
    return columns.some((column) => {
      const value = row[column.id];
      return (
        value !== undefined &&
        value !== null &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });

  return (
    <div>
      <Header></Header>
      <Container fluid className="table-deliver">
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
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        cursor: column.sortable ? "pointer" : "default",
                      }}
                      onClick={
                        column.sortable
                          ? () => handleSort(column.id)
                          : undefined
                      }
                    >
                      {column.label}
                      {column.sortable && (
                        <>
                          {sortConfig.key === column.id &&
                            sortConfig.direction === "asc" && (
                              <UpOutlined style={{ marginLeft: "0.5rem" }} />
                            )}
                          {sortConfig.key === column.id &&
                            sortConfig.direction === "desc" && (
                              <DownOutlined style={{ marginLeft: "0.5rem" }} />
                            )}
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
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
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {selectedTable === "update" && (
          <div className="d-flex justify-content-end mt-3">
            <Button variant="success" onClick={handleSave}>
              Save
            </Button>
          </div>
        )}
      </Container>
      <Footer></Footer>
    </div>
  );
}
