import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import "./AdminCertificate.css";

import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export default function AdminCertificate() {
  const [form] = useForm();
  const [formUpdate] = useForm();
  const [newData, setNewData] = useState("");

  const [certificate, setCertificate] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddCertificate(value) {
    console.log(value);
    try {
      await api.post("certificate", value);
      toast.success("Thêm Chứng Chỉ thành công");
      setCertificate([...certificate, value]);
      fetchCertificate();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm chứng chỉ");
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

  useEffect(() => {}, [certificate]);

  async function deleteCertificate(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa chứng chỉ này ?",
        onOk: () => {
          api.delete(`certificate/${values.id}`);
          toast.success("Xóa thành công");
          setCertificate(
            certificate.filter((cer) => {
              return cer.id !== values.id;
            })
          );
        },
      });
      fetchCertificate();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateCertificate(values) {
    const dataUpdate = {
      ...newData,
    };
    try {
      await api.put(`certificate/${values.id}`, dataUpdate);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công");
      fetchCertificate();
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
                onClick={() => {
                  setSelectedCertificate(values);
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
              title="Chỉnh Sửa Chứng Chỉ"
              okText={"Lưu"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
              mask={false}
            >
              <Form
                initialValues={selectedCertificate}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                }}
                form={formUpdate}
                onFinish={(values) => {
                  updateCertificate(selectedCertificate);
                }}
                id="form-update"
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
                      label="fileURL"
                      name="fileURL"
                      rules={[
                        {
                          required: true,
                          message: "Nhập fireURL",
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
                  Chỉnh Sửa Chứng Chỉ
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
        <h1>Thêm Chứng Chỉ</h1>
        <Form
          form={form}
          onFinish={AddCertificate}
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
                label="fileURL"
                name="fileURL"
                rules={[
                  {
                    required: true,
                    message: "Nhập fireURL",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
            </div>
          </div>

          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm Chứng Chỉ
          </Button>
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
