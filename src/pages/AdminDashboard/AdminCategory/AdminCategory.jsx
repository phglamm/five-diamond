import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";

import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";

export default function AdminCategory() {
  const [message, setMessage] = useState("");
  const [deleteMessage, setdeleteMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const [form] = useForm();

  const [category, setCategory] = useState([]);
  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddCategory(value) {
    console.log(value);
    try {
      await api.post("category", value);
      setMessage("Thêm danh mục thành công");
      setCategory([...category, value]);
    } catch (error) {
      setMessage("Đã có lỗi trong lúc thêm danh mục");
      console.log(error.response.data);
    }
  }

  async function fetchCategory() {
    const response = await api.get("category");
    setCategory(response.data);
    console.log("data....", response.data);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (category) {
      console.log("category...", category); // Log the diamond id when diamond state is updated
    }
  }, [category]); // Only re-run this effect when diamond changes

  async function deleteCategory(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa danh mục này ?",
        onOk: () => {
          api.delete(`category/${values.id}`);
          setdeleteMessage("Xóa thành công");
          setCategory(
            category.filter((cat) => {
              return cat.id !== values.id;
            })
          );
        },
      });
      console.log(deleteMessage);
    } catch (error) {
      setdeleteMessage("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateCategory(values) {
    console.log("haha...", values);
    try {
      await api.put(`category/${values.id}`, values);
      setUpdateMessage("Chỉnh sửa thành công");
      setCategory(
        category.filter((cat) => {
          return cat.id !== values.id;
        })
      );
      console.log(updateMessage);
    } catch (error) {
      console.log("chỉnh sửa thất bại, có lỗi");
      setUpdateMessage("chỉnh sửa thất bại, có lỗi");
      console.log(error.response.data);
    }
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành Động",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteCategory(values);
                }}
                className="delete-button"
              >
                Xóa
              </Button>

              <Button
                icon={<UploadOutlined />}
                className="admin-upload-button update-button"
                onClick={showModalUpdate}
              >
                Chỉnh sửa
              </Button>
            </div>

            <Modal
              className="modal-add-form"
              footer={false}
              title="Chỉnh Sửa"
              okText={"Lưu"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
            ></Modal>
          </>
        );
      },
    },
  ];

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const showModalUpdate = () => {
    setIsModalUpdateOpen(true);
  };
  const handleUpdateOk = () => {
    setIsModalUpdateOpen(false);
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
  };

  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <h1>Thêm Danh Mục</h1>
        <Form
          form={form}
          onFinish={AddCategory}
          id="form"
          className="form-main"
        >
          <div className="form-content-main">
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Tên Danh Mục"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Nhập Tên Danh Mục ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Mô Tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Nhập Mô Tả",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
            </div>
          </div>

          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm Danh Mục
          </Button>
          {message && <div>{message}</div>}
        </Form>

        <div className="data-table">
          <h1>Quản Lý Danh Mục</h1>
          <Table
            dataSource={category}
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
