/* eslint-disable no-unused-vars */
import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Select, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";

import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/upload";

export default function AdminDiamond() {
  const [newData, setNewData] = useState("");
  const [form] = useForm();
  const [formUpdate] = useForm();

  const [diamond, setDiamond] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [img, setImg] = useState(null);
  const [imgUpdate, setImgUpdate] = useState(null);

  function hanldeClickSubmit() {
    form.submit();
  }

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  async function AddDiamond(value) {
    console.log(value);
    const imgURL = await uploadFile(img);
    value.imgURL = imgURL;
    console.log(value);
    try {
      await api.post("diamond", value);
      setDiamond([...diamond, value]);
      toast.success("Thêm Kim Cương Thành Công");
      fetchDiamond();
      fetchCertificate();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm kim cương");
      console.log(error.response.data);
    }
  }

  async function fetchDiamond() {
    const response = await api.get("diamond");
    setDiamond(response.data);
  }

  useEffect(() => {
    fetchDiamond();
  }, []);

  useEffect(() => {}, [diamond]); // Only re-run this effect when diamond changes

  async function fetchCertificate() {
    const certificate = await api.get("certificate/available");
    setCertificate(certificate.data);
  }

  useEffect(() => {
    fetchCertificate();
  }, []);

  async function deleteDiamond(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa kim cương này ?",
        onOk: async () => {
          api.delete(`diamond/${values.id}`);
          toast.success("Xóa thành công");
          setDiamond(
            diamond.filter((gem) => {
              return gem.id !== values.id;
            })
          );
        },
      });
      fetchDiamond();
      fetchCertificate();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateDiamond(values) {
    console.log(values);

    try {
      if (imgUpdate) {
        const imgURLUpdate = await uploadFile(imgUpdate);
        newData.imgURL = imgURLUpdate;
      } else {
        newData.imgURL = values.imgURL;
      }

      const dataUpdate = {
        ...newData,
        giaReportNumber: values.certificate?.giaReportNumber,
      };
      console.log(dataUpdate);
      await api.put(`diamond/${values.id}`, dataUpdate);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công ");
      fetchDiamond();
    } catch (error) {
      toast.error("Chỉnh sửa thất bại, có lỗi");
      console.error(error.response.data);
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
      fixed: "left",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "giaReportNumber",
      dataIndex: "giaReportNumber",
      // key: "giaReportNumber",
      render: (text, record) => record.certificate?.giaReportNumber || "N/A",
      sorter: (a, b) =>
        (a.certificate?.giaReportNumber || 0) -
        (b.certificate?.giaReportNumber || 0),
      defaultSortOrder: "ascend",
    },
    {
      title: "Image URL ",
      dataIndex: "imgURL",
      key: "imgURL",
      render: (value) => <Image src={value} style={{ width: 80 }} />,
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
      filters: [
        {
          text: "ROUND",
          value: "ROUND",
        },
        {
          text: "OVAL",
          value: "OVAL",
        },
        {
          text: "CUSHION",
          value: "CUSHION",
        },
        {
          text: "EMERALD",
          value: "EMERALD",
        },
        {
          text: "PRINCESS",
          value: "PRINCESS",
        },
        {
          text: "RADIANT",
          value: "RADIANT",
        },
        {
          text: "HEART",
          value: "HEART",
        },
        {
          text: "MARQUISE",
          value: "MARQUISE",
        },
        {
          text: "ASSHER",
          value: "ASSHER",
        },
      ],

      onFilter: (value, record) => record.shape?.indexOf(value) === 0,
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
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteDiamond(values);
                }}
                className="delete-button"
              >
                Xóa
              </Button>

              <Button
                icon={<UploadOutlined />}
                className="admin-upload-button update-button"
                onClick={() => {
                  setSelectedDiamond(values);
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
              title="Chỉnh Sửa"
              okText={"Lưu"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
            >
              <Form
                initialValues={selectedDiamond}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                }}
                form={formUpdate}
                onFinish={(values) => {
                  updateDiamond(selectedDiamond);
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
                      rules={[
                        {
                          required: true,
                          message: "Nhập Hình Dáng",
                        },
                      ]}
                    >
                      <Select
                        className="select-input"
                        placeholder="chọn Hình Dáng"
                      >
                        <Select.Option value="ROUND">Round</Select.Option>
                        <Select.Option value="OVAL">Oval</Select.Option>
                        <Select.Option value="CUSHION">Cushion</Select.Option>
                        <Select.Option value="PEAR">Pear</Select.Option>
                        <Select.Option value="EMERALD">Emerald</Select.Option>
                        <Select.Option value="PRINCESS">Princess</Select.Option>
                        <Select.Option value="RADIANT">Radiant</Select.Option>
                        <Select.Option value="HEART">Heart</Select.Option>
                        <Select.Option value="MARQUISE">Marquise</Select.Option>
                        <Select.Option value="ASSHER">Assher</Select.Option>
                      </Select>
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
                  </div>
                  <div className="form-content">
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
                      <Input type="number" required min={1} />
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
                      <Select
                        className="select-input"
                        placeholder="chọn Độ Tinh Khiết"
                      >
                        <Select.Option value="VVS1">VVS1</Select.Option>
                        <Select.Option value="VVS2">VVS2</Select.Option>
                        <Select.Option value="VS1">VS1</Select.Option>
                        <Select.Option value="VS2">VS2</Select.Option>
                        <Select.Option value="SI1">SI1</Select.Option>
                        <Select.Option value="SI2">SI2</Select.Option>
                        <Select.Option value="I1">I1</Select.Option>
                        <Select.Option value="I2">I2</Select.Option>
                        <Select.Option value="I3">I3</Select.Option>
                      </Select>
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
                      <Select
                        className="select-input"
                        placeholder="chọn Độ Cắt"
                      >
                        <Select.Option value="EXCELLENT">
                          Excellent
                        </Select.Option>
                        <Select.Option value="VERY GOOD">
                          Very Good
                        </Select.Option>
                        <Select.Option value="GOOD">Good</Select.Option>
                        <Select.Option value="FAIR">Fair</Select.Option>
                        <Select.Option value="POOR">Poor</Select.Option>
                      </Select>
                    </Form.Item>

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
                      <Select
                        className="select-input"
                        placeholder="chọn Nguồn Gốc"
                      >
                        <Select.Option value="NATURAL">Tự Nhiên</Select.Option>
                        <Select.Option value="ARTIFICIAL">
                          Nhân Tạo
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="label-form"
                      label="Image URL "
                      name="imgURL"
                    >
                      <Upload
                        fileList={imgUpdate ? [imgUpdate] : []}
                        beforeUpload={(file) => {
                          setImgUpdate(file);
                          return false;
                        }}
                        onRemove={() => setImgUpdate(null)}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="select-input"
                        >
                          Upload
                        </Button>
                      </Upload>{" "}
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
              </Form>
            </Modal>
          </>
        );
      },
    },
  ];

  const columnsGIA = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.giaReportNumber,
      defaultSortOrder: "ascend",
    },
    {
      title: "Report Number",
      dataIndex: "giaReportNumber",
      key: "giaReportNumber",
      sorter: (a, b) => a.giaReportNumber - b.giaReportNumber,
      defaultSortOrder: "ascend",
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

        <Form form={form} onFinish={AddDiamond} id="form" className="form-main">
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
                <Select className="select-input" placeholder="chọn Hình Dáng">
                  <Select.Option value="ROUND">Round</Select.Option>
                  <Select.Option value="OVAL">Oval</Select.Option>
                  <Select.Option value="CUSHION">Cushion</Select.Option>
                  <Select.Option value="PEAR">Pear</Select.Option>
                  <Select.Option value="EMERALD">Emerald</Select.Option>
                  <Select.Option value="PRINCESS">Princess</Select.Option>
                  <Select.Option value="RADIANT">Radiant</Select.Option>
                  <Select.Option value="HEART">Heart</Select.Option>
                  <Select.Option value="MARQUISE">Marquise</Select.Option>
                  <Select.Option value="ASSHER">Assher</Select.Option>
                </Select>
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
                label="Giá"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Nhập giá của kim cương",
                  },
                ]}
              >
                <Input type="number" required min={1} />
              </Form.Item>
            </div>
            <div className="form-content">
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
                <Select
                  className="select-input"
                  placeholder="chọn Độ Tinh Khiết"
                >
                  <Select.Option value="VVS1">VVS1</Select.Option>
                  <Select.Option value="VVS2">VVS2</Select.Option>
                  <Select.Option value="VS1">VS1</Select.Option>
                  <Select.Option value="VS2">VS2</Select.Option>
                  <Select.Option value="SI1">SI1</Select.Option>
                  <Select.Option value="SI2">SI2</Select.Option>
                  <Select.Option value="I1">I1</Select.Option>
                  <Select.Option value="I2">I2</Select.Option>
                  <Select.Option value="I3">I3</Select.Option>
                </Select>
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
                <Select className="select-input" placeholder="chọn Độ Cắt">
                  <Select.Option value="EXCELLENT">Excellent</Select.Option>
                  <Select.Option value="VERY GOOD">Very Good</Select.Option>
                  <Select.Option value="GOOD">Good</Select.Option>
                  <Select.Option value="FAIR">Fair</Select.Option>
                  <Select.Option value="POOR">Poor</Select.Option>
                </Select>
              </Form.Item>

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
                <Select className="select-input" placeholder="chọn Nguồn Gốc">
                  <Select.Option value="NATURAL">Tự Nhiên</Select.Option>
                  <Select.Option value="ARTIFICIAL">Nhân Tạo</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Image URL "
                name="imgURL"
              >
                <Upload
                  fileList={img ? [img] : []}
                  beforeUpload={(file) => {
                    setImg(file);
                    return false;
                  }}
                  onRemove={() => setImg(null)}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>{" "}
                {/* <Input type="text" required /> */}
              </Form.Item>
              <div className="certificate-form">
                <Form.Item
                  className="label-form"
                  label="Số Chứng Chỉ"
                  name="certificateID"
                  rules={[
                    {
                      required: true,
                      message: "Nhập số Chứng Chỉ ",
                    },
                  ]}
                >
                  <Input type="number" required />
                </Form.Item>
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick={showModal}
                >
                  Chứng Chỉ Khả Dụng
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={hanldeClickSubmit}
            className="form-button small-button"
          >
            Thêm Viên Kim Cương
          </Button>
        </Form>

        <Modal
          className="modal-add-form"
          footer={false}
          title="Chọn Chứng chỉ"
          okText={""}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Table
            dataSource={certificate}
            columns={columnsGIA}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
            onChange={onChange}
          />
        </Modal>

        <div className="data-table">
          <h1>Quản Lý Kim Cương</h1>
          <Table
            dataSource={diamond}
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
