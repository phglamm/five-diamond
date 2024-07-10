import SideBar from "../../../components/SideBar/SideBar";
import { Button, DatePicker, Form, Input, Modal, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import "./AdminCertificate.css";
import moment from "moment";

import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/upload";

export default function AdminCertificate() {
  const [form] = useForm();
  const [formUpdate] = useForm();
  const [newData, setNewData] = useState("");

  const [certificate, setCertificate] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUpdate, setFileUpdate] = useState(null);

  const dateformat = "DD-MM-YYYY";
  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddCertificate(value) {
    console.log(value);
    try {
      const file = value.fileURL.file.originFileObj;
      const fileURL = await uploadFile(file);

      console.log(file);
      const certificateData = {
        ...value,
        fileURL,
      };
      await api.post("certificate", certificateData);
      setCertificate([...certificate, certificateData]);

      toast.success("Thêm Chứng Chỉ thành công");
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
    Modal.confirm({
      title: "Bạn có chắc muốn xóa chứng chỉ này ?",
      onOk: async () => {
        try {
          await api.delete(`certificate/${values.id}`);
          toast.success("Xóa thành công");
          fetchCertificate();
        } catch (error) {
          toast.error("Đã có lỗi trong lúc Xóa");
          console.log(error.response.data);
        }
      },
    });
  }

  async function updateCertificate(values) {
    console.log(values);
    const dataUpdate = {
      ...newData,
    };

    try {
      const response = await api.put(`certificate/${values.id}`, dataUpdate);
      console.log(response);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công");
      fetchCertificate();
    } catch (error) {
      toast.error("chỉnh sửa thất bại, có lỗi");
      console.log(dataUpdate);
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
      title: "Mã GIA",
      dataIndex: "giaReportNumber",
      key: "giaReportNumber",
      sorter: (c, d) => c.giaReportNumber - d.giaReportNumber,
      defaultSortOrder: "ascend",
    },

    {
      title: "Đường Dẫn GIA",
      dataIndex: "fileURL",
      key: "fileURL",
    },
    {
      title: "Ngày Cấp",
      dataIndex: "dateOfIssues",
      key: "dateOfIssues",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "",
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
                    >
                      <Input type="number" required />
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="fileURL"
                      name="fileURL"
                    >
                      <Upload
                        fileList={fileUpdate ? [fileUpdate] : []}
                        beforeUpload={(file) => {
                          if (file.type !== "application/pdf") {
                            toast.error("Chỉ chọn file PDF");
                            setFileUpdate(null);
                          } else setFileUpdate(file);
                        }}
                        onRemove={() => {
                          setFileUpdate(null);
                        }}
                      >
                        <Button icon={<UploadOutlined />}>Tải Chứng Chỉ</Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Date of Issues"
                      name="dateOfIssues"
                    >
                      <Input type="text" required></Input>
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
                <Upload
                  fileList={file ? [file] : []}
                  beforeUpload={(file) => {
                    if (file.type !== "application/pdf") {
                      toast.error("Chỉ chọn file PDF");
                      setFile(null);
                    } else setFile(file);
                  }}
                  onRemove={() => {
                    setFile(null);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Tải Chứng Chỉ Lên </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Date of Issues"
                name="dateOfIssues"
              >
                <DatePicker
                  placeholder="Chọn ngày"
                  required
                  format={dateformat}
                ></DatePicker>
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
