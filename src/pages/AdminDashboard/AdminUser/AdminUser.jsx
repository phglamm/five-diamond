import SideBar from "../../../components/SideBar/SideBar";
import { Button, DatePicker, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import "../../AdminDashboard/AdminPage.css";
import api from "../../../config/axios";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

export default function AdminUser() {
  const [account, setAccount] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const dateFormat = "DD/MM/YYYY";

  async function fetchAccount() {
    const response = await api.get("accounts");
    setAccount(response.data);
  }
  async function RegisterAccount(value) {
    // console.log(value);
    try {
      const response = await api.post("register", value);
      // console.log(response);
      toast.success("Tài Khoản của bạn đã được tạo thành công");
      fetchAccount();
    } catch (error) {
      toast.error("Đã có lỗi trong việc tạo tài khoản của bạn");
      // console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  useEffect(() => {}, [account]);

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function hanldeClickSubmit() {
    form.submit();
    setIsModalOpen(false);
    fetchAccount();
  }
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "lastname",
      dataIndex: "lastname",
      key: "lastname",
    },

    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "rewardPoint",
      dataIndex: "rewardPoint",
      key: "rewardPoint",
    },
  ];

  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <div className="data-table">
          <h1>Quản Lý Người Dùng</h1>
          <Table
            dataSource={account}
            columns={columns}
            onChange={onChange}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
          <Button type="primary" onClick={showModal}>
            Tạo tài khoản nhân viên/quản lý
          </Button>
          <Modal
            title="Tạo tài khoản"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              layout="horizontal"
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 20 }}
              style={{ width: "100%" }}
              form={form}
              onFinish={RegisterAccount}
              id="form"
              className=""
            >
              <Form.Item
                required
                label="Họ"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập Họ của bạn",
                  },
                ]}
              >
                <Input required />
              </Form.Item>
              <Form.Item
                required
                label="Tên"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập Tên của bạn",
                  },
                ]}
              >
                <Input required />
              </Form.Item>
              <Form.Item
                name="dob"
                label="Ngày Sinh"
                rules={[{ required: true, message: "Chọn ngày sinh của bạn" }]}
              >
                <DatePicker
                  placeholder="Ngày Sinh"
                  style={{ width: "100%" }}
                  format={dateFormat}
                />
              </Form.Item>

              <Form.Item
                required
                label="Số Điện Thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại của bạn",
                  },
                ]}
              >
                <Input required />
              </Form.Item>
              <Form.Item
                required
                label="Địa Chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập địa chỉ của bạn",
                  },
                ]}
              >
                <Input required />
              </Form.Item>
              <Form.Item
                required
                label="Giới Tính"
                name="gender"
                rules={[{ required: true, message: "Chọn Giới Tính của bạn" }]}
              >
                <Select placeholder="Chọn Giới Tính của bạn">
                  <Option value="MALE">Nam</Option>
                  <Option value="FEMALE">Nữ</Option>
                  <Option value="OTHER">khác</Option>
                </Select>
              </Form.Item>
              <Form.Item
                required
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Hãy Nhập Email của bạn",
                  },
                  {
                    type: "email",
                    message: "Hãy Nhập đúng Email",
                  },
                ]}
              >
                <Input required />
              </Form.Item>
              <Form.Item
                required
                label="Mật Khẩu"
                name="password"
                rules={[
                  {
                    min: 6,
                    message: "Mật khẩu của bạn phải chứa ít nhất 6 ký tự",
                  },
                  {
                    pattern: /^([a-z]|[A-Z]|[0-9])*$/,

                    message: "Mật khẩu của bạn phải không có ký tự đặc biệt",
                  },
                  {
                    required: true,
                    message: "Hãy nhập Mật Khẩu của bạn!",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                dependencies={["password"]}
                required
                label="Xác nhận mật khẩu"
                name="confirm"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Hãy Xác Nhận lại mật khẩu của bạn",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật Khẩu xác nhận bạn nhập sai")
                      );
                    },
                  }),
                ]}
              >
                <Input type="password" required />
              </Form.Item>
              <Form.Item
                required
                label="Vai trò"
                name="role"
                rules={[{ required: true, message: "Chọn Vai Trò" }]}
              >
                <Select placeholder="Chọn Vai Trò">
                  <Option value="SALES">Nhân viên SALES</Option>
                  <Option value="DELIVERY">Nhân viên giao hàng</Option>
                  <Option value="MANAGER">Quản lý</Option>
                </Select>
              </Form.Item>
              <Button onClick={hanldeClickSubmit} className="form-button ">
                Tạo tài khoản
              </Button>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
