import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";

export default function AdminDiamondShell() {
  const [form] = useForm();
  const [formUpdate] = useForm();
  const [diamondshell, setDiamondshell] = useState([]);

  const [newData, setNewData] = useState("");
  const [selectedDiamondshell, setSelectedDiamondshell] = useState(null);

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  function hanldeClickSubmit() {
    form.submit();
  }
  async function AddDiamondShell(value) {
    console.log(value);
    try {
      await api.post("material", value);
      setDiamondshell([...diamondshell, value]);
      toast.success("Thêm vỏ kim cương thành công");
      fetchDiamondShell();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm vỏ kim cương");
      console.log(error.response.data);
    }
  }

  async function fetchDiamondShell() {
    const response = await api.get("material");
    setDiamondshell(response.data);
  }

  useEffect(() => {
    fetchDiamondShell();
  }, []);

  async function deleteDiamondShell(values) {
    console.log(values);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa vỏ kim cương này ?",
        onOk: () => {
          api.delete(`material/${values.id}`);
          toast.success("Xóa thành công");
          setDiamondshell(
            diamondshell.filter((gem) => {
              return gem.id !== values.id;
            })
          );
        },
      });
      fetchDiamondShell();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateDiamondShell(values) {
    const dataUpdate = {
      ...newData,
      type: values.type,
      metal: values.metal,
    };

    console.log(dataUpdate);
    try {
      await api.put(`material/${values.id}`, dataUpdate);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công");
      fetchDiamondShell();
    } catch (error) {
      toast.error("chỉnh sửa thất bại, có lỗi");
      console.log(error.response.data);
    }
  }

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
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteDiamondShell(values);
                }}
                className="delete-button"
              >
                Xóa
              </Button>

              <Button
                icon={<UploadOutlined />}
                className="admin-upload-button update-button"
                onClick={() => {
                  setSelectedDiamondshell(values);
                  formUpdate.setFieldsValue(values);
                  setIsModalUpdateOpen(true);
                }}
              >
                Chỉnh sửa
              </Button>
            </div>

            <Modal
              className="modal-add-form"
              footer={false}
              title="Chỉnh Sửa Vỏ Kim Cương"
              okText={"Lưu"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
              mask={false}
            >
              <Form
                initialValues={selectedDiamondshell}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                }}
                form={formUpdate}
                onFinish={(values) => {
                  updateDiamondShell(selectedDiamondshell);
                }}
                id="form-update"
                className="form-main"
              >
                <div className="form-content-main">
                  <div className="form-content">
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
                      <Select
                        className="select-input"
                        placeholder="chọn loại đá phụ"
                      >
                        <Select.Option value="DIAMOND">Diamond</Select.Option>
                        <Select.Option value="MOISSANITE">
                          Moissanite
                        </Select.Option>
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
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    hanldeUpdateClickSubmit();
                  }}
                  className="form-button"
                >
                  Chỉnh Sửa Vỏ Kim Cương
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
        <h1>Thêm Vỏ Kim Cương</h1>

        <Form
          form={form}
          onFinish={AddDiamondShell}
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
