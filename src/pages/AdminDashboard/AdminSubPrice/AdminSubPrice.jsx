import { Button, Form, Input, Modal, Select, Table } from "antd";
import SideBar from "../../../components/SideBar/SideBar";
import "../../AdminDashboard/AdminPage.css";
import { toast } from "react-toastify";
import api from "../../../config/axios";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

export default function AdminSubPrice() {
  const [form] = useForm();
  const hanldeClickSubmit = () => {
    form.submit();
  };
  const [subPrice, setSubPrice] = useState([]);
  async function fetchSubPrice() {
    try {
      const response = await api.get("sub");
      console.log(response.data);
      setSubPrice(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    fetchSubPrice();
  }, []);
  async function AddSubPrice(value) {
    console.log(value);
    try {
      await api.post("sub", value);
      setSubPrice([...subPrice, value]);
      toast.success("Thêm Giá Viên Phụ thành công");
      fetchSubPrice();
      form.resetFields();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm giá viên phụ");
      console.log(error.response.data);
    }
  }

  async function deleteSubPrice(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa giá viên phụ này ?",
        onOk: async () => {
          await api.delete(`sub/${values.id}`);
          toast.success("Xóa thành công");
          setSubPrice(
            setSubPrice.filter((sub) => {
              return sub.id !== values.id;
            })
          );
        },
      });
      fetchSubPrice();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
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
      title: "Loại Viên Phụ",
      dataIndex: "typeOfSub",
      key: "sub",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text, record) => record.price.toLocaleString() + " đ",
    },
    {
      title: "Hành Động",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteSubPrice(values);
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
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <h1>Thêm Viên Phụ</h1>
        <Form
          form={form}
          onFinish={AddSubPrice}
          id="form"
          className="form-main"
        >
          <div className="form-content-main">
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Viên Phụ"
                name="sub"
                rules={[
                  {
                    required: true,
                    message: "Chọn Loại Viên Phụ",
                  },
                ]}
              >
                <Select
                  className="select-input"
                  placeholder="Chọn loại viên phụ"
                >
                  <Select.Option value="DIAMOND">Diamond</Select.Option>
                  <Select.Option value="MOISSANITE">Moissanite</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Giá"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Nhập giá của viên phụ",
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
            Thêm Viên Phụ
          </Button>
        </Form>
        <div className="data-table">
          <h1>Quản Lý Giá Viên Phụ</h1>
          <Table
            dataSource={subPrice}
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
