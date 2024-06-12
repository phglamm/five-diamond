import SideBar from "../../../components/SideBar/SideBar";
import { Button, DatePicker, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import "./AdminCertificate.css";

import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";

export default function AdminCertificate() {
  const [message, setMessage] = useState("");
  const [deleteMessage, setdeleteMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const [form] = useForm();

  const [certificate, setCertificate] = useState([]);
  function hanldeClickSubmit() {
    form.submit();
  }

  async function handleSubmit(value) {
    console.log(value);
    try {
      await api.post("certificate", value);
      setMessage("Thêm Chứng Chỉ thành công");
      setCertificate([...certificate, value]);
    } catch (error) {
      setMessage("Đã có lỗi trong lúc thêm chứng chỉ");
      console.log(error.response.data);
    }
  }

  async function fetchCertificate() {
    const response = await api.get("certificate");
    setCertificate(response.data);
    console.log("data....", response.data);
  }

  useEffect(() => {
    fetchCertificate();
  }, []);

  useEffect(() => {
    if (certificate) {
      console.log("diamond...", certificate); // Log the diamond id when diamond state is updated
    }
  }, [certificate]); // Only re-run this effect when diamond changes

  async function deleteCertificate(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa chứng chỉ này ?",
        onOk: () => {
          api.delete(`certificate/${values.id}`);
          setdeleteMessage("Xóa thành công");
          setCertificate(
            certificate.filter((cer) => {
              return cer.id !== values.id;
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

  async function updateMaterial(values) {
    console.log("haha...", values);
    try {
      await api.put(`certificate/${values.id}`, values);
      setUpdateMessage("Chỉnh sửa thành công");
      setCertificate(
        certificate.filter((cer) => {
          return cer.id !== values.id;
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
      title: "giaReportNumber",
      dataIndex: "giaReportNumber",
      key: "giaReportNumber",
      sorter: (c, d) => c.giaReportNumber - d.giaReportNumber,
      defaultSortOrder: "ascend",
    },
    {
      title: "fileURL",
      dataIndex: "fileURL",
      key: "fileURL",
    },
    {
      title: "dateOfIssues",
      dataIndex: "dateOfIssues",
      key: "dateOfIssues",
    },

    {
      title: "Hành Động",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteCertificate(values);
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
            >
              {/* <Form
                form={formUpdate}
                onFinish={(e) => {
                  updateMaterial(values);
                }}
                id="form-update"
                className="form-main"
              >
                <div className="form-content-main">
                  <div className="form-content">
                    <Form.Item
                      className="label-form"
                      label="Hình Dáng"
                      name="shape"
                    >
                      <Input type="text" required value={values.shape} />
                    </Form.Item>

                    <Form.Item className="label-form" label="Size" name="size">
                      <Input
                        type="number"
                        required
                        defaultValue={values.size}
                      />
                    </Form.Item>

                    <Form.Item
                      className="label-form"
                      label="Màu sắc"
                      name="color"
                    >
                      <Input type="text" required defaultValue={values.color} />
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Độ Tinh Khiết"
                      name="clarity"
                    >
                      <Input
                        type="text"
                        required
                        defaultValue={values.clarity}
                      />
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Carat"
                      name="carat"
                    >
                      <Input
                        type="number"
                        required
                        defaultValue={values.carat}
                      />
                    </Form.Item>
                    <Form.Item className="label-form" label="Độ Cắt" name="cut">
                      <Input type="text" required defaultValue={values.cut} />
                    </Form.Item>
                  </div>
                  <div className="form-content">
                    <Form.Item
                      className="label-form"
                      label="Nguồn gốc"
                      name="origin"
                    >
                      <Input
                        type="text"
                        required
                        defaultValue={values.origin}
                      />
                    </Form.Item>

                    <Form.Item className="label-form" label="Giá" name="price">
                      <Input
                        type="number"
                        required
                        defaultValue={values.price}
                      />
                    </Form.Item>

                    <Form.Item
                      className="label-form"
                      label="Image URL "
                      name="imgURL"
                    >
                      <Input type="text" defaultValue={values.imgURL} />
                    </Form.Item>
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    hanldeUpdateClickSubmit();
                  }}
                  className="form-button"
                >
                  Chỉnh Sửa Kim Cương
                </Button>
                {updateMessage && <div>{updateMessage}</div>}
              </Form> */}
              {/* <Input
                value={values.shape}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, shape: e.target.value };
                  });
                }}
              />
              <Input
                value={values.size}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, size: e.target.value };
                  });
                }}
              />
              <Input
                value={values.color}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, color: e.target.value };
                  });
                }}
              />
              <Input
                value={values.clarity}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, clarity: e.target.value };
                  });
                }}
              />
              <Input
                value={values.carat}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, carat: e.target.value };
                  });
                }}
              />
              <Input
                value={values.cut}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, cut: e.target.value };
                  });
                }}
              />
              <Input
                value={values.imgURL}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, imgURL: e.target.value };
                  });
                }}
              />
              <Input
                value={values.price}
                onChange={(e) => {
                  setEditingMaterial((pre) => {
                    return { ...pre, price: e.target.value };
                  });
                }}
              />
              <Button onClick={updateMaterial(values,)}></Button> */}
            </Modal>
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
        <h1>Thêm Chứng Chỉ</h1>
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
                label="Số Chứng Chỉ"
                name="giaReportNumber"
                rules={[
                  {
                    required: true,
                    message: "Nhập số Chứng Chỉ ",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="fireURL"
                name="fireURL"
                rules={[
                  {
                    required: true,
                    message: "Nhập fireURL",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="dateOfIssues"
                name="dateOfIssues"
                rules={[
                  {
                    required: true,
                    message: "Chọn dateOfIssues",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Chọn dateOfIssues"
                  className="datepicker"
                ></DatePicker>
              </Form.Item>
            </div>
          </div>

          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm Chứng Chỉ
          </Button>
          {message && <div>{message}</div>}
        </Form>

        <div className="data-table">
          <h1>Quản Lý Chứng Chỉ</h1>
          <Table
            dataSource={certificate}
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
