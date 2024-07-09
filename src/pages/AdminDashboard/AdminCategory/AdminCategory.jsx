import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";

import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export default function AdminCategory() {
  const [newData, setNewData] = useState("");
  const [form] = useForm();
  const [formUpdate] = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState([]);

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }
  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddCategory(value) {
    console.log(value);
    try {
      await api.post("category", value);
      setCategory([...category, value]);
      toast.success("Thêm Danh Mục thành công");
      fetchCategory();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm danh mục");
      console.log(error.response.data);
    }
  }

  async function fetchCategory() {
    const response = await api.get("category");
    setCategory(response.data);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {}, [category]); // Only re-run this effect when diamond changes

  async function deleteCategory(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa danh mục này ?",
        onOk: async () => {
          api.delete(`category/${values.id}`);
          toast.success("Xóa thành công");
          setCategory(
            category.filter((cat) => {
              return cat.id !== values.id;
            })
          );
        },
      });
      fetchCategory();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateCategory(values) {
    const dataUpdate = {
      ...newData,
    };

    try {
      await api.put(`category/${values.id}`, dataUpdate);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công");
      fetchCategory();
    } catch (error) {
      toast.error("chỉnh sửa thất bại, có lỗi");
      console.log(error.response.data);
    }
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const handleUpdateOk = () => {
    setIsModalUpdateOpen(false);
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateOpen(false);
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
                onClick={() => {
                  setSelectedCategory(values);
                  formUpdate.setFieldsValue(values);
                  setIsModalUpdateOpen(true);
                }}
              >
                Chỉnh sửa
              </Button>
            </div>

            <Modal
              className="modal-updateCategory-form"
              footer={false}
              title="Chỉnh Sửa Danh Mục"
              okText={"Lưu"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
              mask={false}
            >
              <Form
                initialValues={selectedCategory}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                  console.log(allValues);
                }}
                form={formUpdate}
                onFinish={(values) => {
                  updateCategory(selectedCategory);
                }}
                id="form-update"
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
                <Button
                  onClick={(e) => {
                    hanldeUpdateClickSubmit();
                  }}
                  className="form-button"
                >
                  Chỉnh Sửa Danh Mục
                </Button>
              </Form>
            </Modal>
          </>
        );
      },
    },
  ];

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
