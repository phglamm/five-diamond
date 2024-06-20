import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import "./AdminCollection.css";

import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/upload";

export default function AdminCollection() {
  const [form] = useForm();
  const [formUpdate] = useForm();
  const [newData, setNewData] = useState("");

  const [collection, setCollection] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [img, setImg] = useState(null);
  const [imgUpdate, setImgUpdate] = useState(null);

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddCertificate(value) {
    console.log(value);
    try {
      const img = value.fileURL.file.originFileObj;
      const imgURL = await uploadFile(img);
      value.imgURL = imgURL;
      await api.post("certificate", value);
      setCollection([...collection, value]);
      toast.success("Thêm Bộ Sưu Tập thành công");
      fetchCollection();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm Bộ Sưu Tập");
      console.log(error.response.data);
    }
  }

  async function fetchCollection() {
    const response = await api.get("collection");
    setCollection(response.data);
  }

  useEffect(() => {
    fetchCollection();
  }, []);

  useEffect(() => {}, [collection]);

  async function deleteCollection(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa chứng chỉ này ?",
        onOk: () => {
          api.delete(`certificate/${values.id}`);
          toast.success("Xóa thành công");
          setCollection(
            collection.filter((col) => {
              return col.id !== values.id;
            })
          );
        },
      });
      fetchCollection();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateCollection(values) {
    console.log(values);
    const dataUpdate = {
      ...newData,
    };

    try {
      await api.put(`collection/${values.id}`, dataUpdate);
      console.log(dataUpdate);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công");
      fetchCollection();
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
      title: "Tên BST",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imgURL",
      key: "imgURL",
      render: (value) => (
        <Image src={value} alt="value" style={{ width: 100 }} />
      ),
    },

    {
      title: "",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteCollection(values);
                }}
                className="delete-button"
              >
                Xóa
              </Button>

              <Button
                icon={<UploadOutlined />}
                className="admin-upload-button update-button"
                onClick={() => {
                  setSelectedCollection(values);
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
              title="Chỉnh Sửa BST"
              okText={"Lưu"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
              mask={false}
            >
              <Form
                initialValues={setCollection}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                }}
                form={formUpdate}
                onFinish={(values) => {
                  updateCollection(selectedCollection);
                }}
                id="form-update"
                className="form-main"
              >
                <div className="form-content-main">
                  <div className="form-content">
                    <Form.Item
                      className="label-form"
                      label="Tên Bộ Sưu Tập"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Nhập Tên Bộ Sưu Tập ",
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

                    <Form.Item
                      className="label-form"
                      label="imgURL"
                      name="imgURL"
                      rules={[
                        {
                          required: true,
                          message: "Nhập fireURL",
                        },
                      ]}
                    >
                      <Upload
                        fileList={imgUpdate ? [imgUpdate] : []}
                        beforeUpload={(file) => {
                          setImgUpdate(file);
                          return false;
                        }}
                        onRemove={() => setImgUpdate(null)}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    hanldeUpdateClickSubmit();
                  }}
                  className="form-button"
                >
                  Chỉnh Sửa BST
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
        <h1>Thêm Bộ Sưu Tập</h1>
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
                label="Tên Bộ Sưu Tập"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Nhập Tên Bộ Sưu Tập ",
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

              <Form.Item
                className="label-form"
                label="imgURL"
                name="imgURL"
                rules={[
                  {
                    required: true,
                    message: "Nhập fireURL",
                  },
                ]}
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
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm BST
          </Button>
        </Form>

        <div className="data-table">
          <h1>Quản Lý Chứng Chỉ</h1>
          <Table
            dataSource={collection}
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
