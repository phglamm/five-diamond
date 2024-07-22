import { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar/SideBar";
import api from "../../../config/axios";
import "../../AdminDashboard/AdminPage.css";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Modal, Select, Table } from "antd";

export default function AdminGoldPrice() {
  const [form] = useForm();
  const hanldeClickSubmit = () => {
    form.submit();
  };
  const [goldPrice, setGoldPrice] = useState([]);
  async function fetchGoldPrice() {
    try {
      const response = await api.get("gold");
      // console.log(response.data);
      setGoldPrice(response.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchGoldPrice();
  }, []);
  async function AddGoldPrice(value) {
    // console.log(value);
    try {
      await api.post("gold", value);
      setGoldPrice([...goldPrice, value]);
      toast.success("Thêm Giá Vàng thành công");
      fetchGoldPrice();
      form.resetFields();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm giá vàng");
      // console.log(error.response.data);
    }
  }

  async function deleteGoldPrice(values) {
    // console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa giá vàng này ?",
        onOk: async () => {
          await api.delete(`gold/${values.id}`);
          toast.success("Xóa thành công");
          setGoldPrice(
            goldPrice.filter((gold) => {
              return gold.id !== values.id;
            })
          );
        },
      });
      fetchGoldPrice();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      // console.log(error.response.data);
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Loại Vàng",
      dataIndex: "goldEnum",
      key: "goldEnum",
      render: (values) => {
        if (values === "GOLD_24K") {
          return <>Vàng 24K</>;
        } else {
          return <>Vàng 18K</>;
        }
      },
    },
    {
      title: "Giá",
      dataIndex: "pricePerTael",
      key: "pricePerTael",
      render: (text, record) => record.pricePerTael.toLocaleString() + " đ",
    },
    {
      title: "Hành Động",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteGoldPrice(values);
                }}
                className="delete-button"
              >
                Xóa
              </Button>
            </div>
          </>
        );
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <h1>Thêm Giá Vàng</h1>
        <Form
          form={form}
          onFinish={AddGoldPrice}
          id="form"
          className="form-main"
        >
          <div className="form-content-main">
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Vàng"
                name="gold"
                rules={[
                  {
                    required: true,
                    message: "Chọn Loại Vàng",
                  },
                ]}
              >
                <Select className="select-input" placeholder="Chọn loại vàng">
                  <Select.Option value="24K">Vàng 24K</Select.Option>
                  <Select.Option value="18K">Vàng 18K</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Giá"
                name="pricePerTael"
                rules={[
                  {
                    required: true,
                    message: "Nhập giá của vàng",
                  },
                ]}
              >
                <Input type="number" required min={1} />
              </Form.Item>
            </div>
          </div>

          <Button
            onClick={hanldeClickSubmit}
            className="form-button small-button"
          >
            Thêm Giá Vàng
          </Button>
        </Form>
        <div className="data-table">
          <h1>Quản Lý Giá Vàng</h1>
          <Table
            dataSource={goldPrice}
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
