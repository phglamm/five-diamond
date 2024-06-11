import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import api from "../../../config/axios";

export default function AdminDiamondShell() { 
  const [message, setMessage] = useState("");
  const [deleteMessage, setdeleteMessage] = useState("");
  const [form] = useForm();
  const [diamondshell, setDiamondshell] = useState([]);

  function hanldeClickSubmit() {
    form.submit();
  }
  async function handleSubmit(value) {
    console.log(value);
    try {
      await api.post("material", value);
      setMessage("Thêm vỏ kim cương thành công");
      setDiamondshell([...diamondshell, value]);
      33;
    } catch (error) {
      setMessage("Đã có lỗi trong lúc thêm vỏ kim cương");
      console.log(error.response.data);
    }
  }

  async function fetchProduct() {
    const response = await api.get("material");
    setDiamondshell(response.data);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Metal",
      dataIndex: "metal",
      key: "metal",
    },

    {
      title: "Karat",
      dataIndex: "karat",
      key: "karat",
    },
    {
      title: "typeOfSub",
      dataIndex: "typeOfSub",
      key: "typeOfSub",
    },
    {
      title: "caratOfSub",
      dataIndex: "caratOfSub",
      key: "caratOfSub",
    },
    {
      title: "quantityOfSub",
      dataIndex: "quantityOfSub",
      key: "quantityOfSub",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành Động",
      render: (values) => {
        return (
          <>
            <Button
              onClick={(e) => {
                deleteDiamondShell(values);
              }}
            >
              Xóa
            </Button>
          </>
        );
      },
    },
  ];

  async function deleteDiamondShell(values) {
    console.log(values);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa sản phẩm này ?",
        onOk: () => {
          api.delete(`material/${values.id}`);
          setdeleteMessage("Xóa thành công");
          setDiamondshell(
            diamondshell.filter((gem) => {
              return gem.id !== values.id;
            })
          );
        },
      });
    } catch (error) {
      setdeleteMessage("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <h1>Thêm Vỏ Kim Cương</h1>

        <Form
          form={form}
          onFinish={handleSubmit}
          id="form"
          className="form-main"
        >
          <div className="form-content-main">
            <div className="form-content">
              <Form.Item
                initialValue="GOLD"
                className="label-form"
                label="Kim Loại"
                name="metal"
                rules={[
                  {
                    required: true,
                    message: "Nhập kim loại",
                  },
                ]}
              >
                <Input type="text" required readOnly />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="karat"
                name="karat"
                rules={[
                  {
                    required: true,
                    message: "Nhập karat ",
                  },
                ]}
              >
                <Select className="select-input" placeholder="chọn Karat">
                  <Select.Option value="24K">24K</Select.Option>
                  <Select.Option value="18K">18K</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Loại Đá phụ"
                name="typeOfSub"
                rules={[
                  {
                    required: true,
                    message: "Nhập loại đá phụ",
                  },
                ]}
              >
                <Select className="select-input" placeholder="chọn loại đá phụ">
                  <Select.Option value="DIAMOND">Diamond</Select.Option>
                  <Select.Option value="MOISSANITE">Moissanite</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Nặng"
                name="caratOfSub"
                rules={[
                  {
                    required: true,
                    message: "Nhập caratOfSub ",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>
            </div>
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Số Lượng Đá Phụ"
                name="quantityOfSub"
                rules={[
                  {
                    required: true,
                    message: "Nhập quantityOfSub",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>

              <Form.Item
                initialValue="COVER"
                className="label-form"
                label="Loại"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Nhập loại",
                  },
                ]}
              >
                <Input type="text" readOnly />
              </Form.Item>
            </div>
          </div>

          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm Vỏ Kim Cương
          </Button>
          {message && <div>{message}</div>}
        </Form>

        <div className="data-table">
          <h1>Quản Lý Vỏ Kim Cương</h1>
          <Table
            dataSource={diamondshell}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
}
