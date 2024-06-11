import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";

export default function AdminDiamond() {
  const [message, setMessage] = useState("");
  const [deleteMessage, setdeleteMessage] = useState("");
  const [form] = useForm();
  const [diamond, setDiamond] = useState([]);
  const [certificate, setCertificate] = useState([]);

  function hanldeClickSubmit() {
    form.submit();
  }

  async function handleSubmit(value) {
    console.log(value);
    try {
      await api.post("material", value);
      setMessage("Thêm kim cương thành công");
      setDiamond([...diamond, value]);
    } catch (error) {
      setMessage("Đã có lỗi trong lúc thêm kim cương");
      console.log(error.response.data);
    }
  }

  async function fetchProduct() {
    const response = await api.get("material");
    setDiamond(response.data);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchCertificate() {
    const certificate = await api.get("certificate");
    setCertificate(certificate.data);
  }

  useEffect(() => {
    fetchCertificate();
  }, []);

  async function deleteProduct(id) {
    console.log(id);
    try {
      await api.delete(`diamond//${id}`);
      setdeleteMessage("Xóa thành công");
      setDiamond(
        diamond.filter((gem) => {
          return gem.id !== id;
        })
      );
    } catch (error) {
      setdeleteMessage("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Certificate ID",
      dataIndex: "certificateID",
      key: "certificateID",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Image URL ",
      dataIndex: "imgURL",
      key: "imgURL",
      render: (value) => <Image src={value} />,
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },

    {
      title: "Clarity",
      dataIndex: "clarity",
      key: "clarity",
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
    },
    {
      title: "Cut",
      dataIndex: "cut",
      key: "cut",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành Động",
      render: () => (
        <Space size="middle">
          <Button onClick={hanldeClickSubmit}>Xóa</Button>
        </Space>
      ),
    },
  ];

  const columnsGIA = [
    {
      title: "Report Number",
      dataIndex: "giaReportNumber",
      key: "giaReportNumber",
    },
    {
      title: "File URL",
      dataIndex: "fileURL",
      key: "fileURL",
    },
    {
      title: "Date Of Issues",
      dataIndex: "dateOfIssues",
      key: "dateOfIssues",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <h1>Thêm Viên Kim Cương</h1>
        {/* <Modal
          className="modal-add-form"
          footer={false}
          title="Thêm kim cương"
          okText={""}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        > */}
        <Form
          form={form}
          onFinish={handleSubmit}
          id="form"
          className="form-main"
        >
          <div className="form-content-main">
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Hình Dáng"
                name="shape"
                rules={[
                  {
                    required: true,
                    message: "Nhập Hình Dáng",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Size"
                name="size"
                rules={[
                  {
                    required: true,
                    message: "Nhập size",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Màu sắc"
                name="color"
                rules={[
                  {
                    required: true,
                    message: "Nhập màu sắc ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Độ Tinh Khiết"
                name="clarity"
                rules={[
                  {
                    required: true,
                    message: "Nhập độ tinh khiết ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Carat"
                name="carat"
                rules={[
                  {
                    required: true,
                    message: "Nhập carat",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Độ Cắt"
                name="cut"
                rules={[
                  {
                    required: true,
                    message: "Nhập độ cắt ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Chứng Chỉ"
                name="certificateID"
                required
              >
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick={showModal}
                >
                  Thêm Chứng Chỉ
                </Button>
              </Form.Item>
            </div>
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Nguồn gốc"
                name="origin"
                rules={[
                  {
                    required: true,
                    message: "Nhập nguồn gốc ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Giá"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Nhập giá của kim cương",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Image URL "
                name="imgURL"
              >
                <Input type="text" />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Loại"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Chọn loại",
                  },
                ]}
              >
                <Select className="select-input" placeholder="chọn loại">
                  <Select.Option value="0">0</Select.Option>
                  <Select.Option value="1">1</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm Viên Kim Cương
          </Button>
          {message && <div>{message}</div>}
        </Form>
        {/* </Modal> */}

        <Modal
          className="modal-add-form"
          footer={false}
          title="Chọn Chứng chỉ"
          okText={""}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            id="form"
            className="form-main"
          ></Form>
          <Table
            dataSource={certificate}
            columns={columnsGIA}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </Modal>

        <div className="data-table">
          <h1>Quản Lý Kim Cương</h1>
          <Table
            dataSource={diamond}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
}
