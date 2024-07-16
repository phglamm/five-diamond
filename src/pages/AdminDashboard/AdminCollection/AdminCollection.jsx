import SideBar from "../../../components/SideBar/SideBar";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Modal,
  Table,
  Upload,
} from "antd";
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

  const [checkedList, setCheckedList] = useState([]);
  const [productLine, setProductLine] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const fetchProductLine = async () => {
    const resposne = await api.get("product-line");
    setProductLine(resposne.data);
  };

  const fetchCollection = async () => {
    const response = await api.get("collection");
    setCollection(response.data);
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  const hanldeClickSubmit = () => {
    form.submit();
  };

  const hanldeUpdateClickSubmit = () => {
    formUpdate.submit();
  };

  const AddCollection = async (value) => {
    console.log(value);
    try {
      value.productLineIds = checkedList;
      const imgURL = await uploadFile(img);
      value.imgURL = imgURL;
      console.log(value);
      const response = await api.post("collection", value);
      console.log(response.data);
      toast.success("Thêm Bộ Sưu Tập thành công");
      fetchCollection();
      form.resetFields();
      setCheckedList([]);
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm Bộ Sưu Tập");
      console.log(error.response.data);
    }
  };

  const deleteCollection = async (values) => {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa BST này ?",
        onOk: async () => {
          await api.delete(`collection/${values.id}`);
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
  };

  const updateCollection = async (values) => {
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
      };
      console.log(dataUpdate);
      const response = await api.put(`collection/${values.id}`, dataUpdate);
      console.log(response);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công");
      fetchCollection();

      formUpdate.resetFields();
    } catch (error) {
      toast.error("chỉnh sửa thất bại, có lỗi");
      console.log(error.response.data);
    }
  };

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
      title: "Tên BST",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "10%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Hình Ảnh",
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
                      label="Hình Ảnh"
                      name="imgURL"
                      rules={[
                        {
                          required: true,
                          message: "Nhập Hình Ảnh",
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
  const columnOfProduct = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tỉ lệ Áp Giá",
      dataIndex: "priceRate",
      key: "priceRate",
    },
    {
      title: "Shape",
      dataIndex: "shape",
      key: "shape",
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
      title: "Select",
      render: (value) => (
        <Checkbox
          type="checkbox"
          onChange={handleCheckboxChange}
          value={value.id}
          checked={checkedList?.includes(value.id)}
        />
      ),
    },
  ];
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCheckedList((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
    setSelectedProductIds((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    fetchProductLine();
    setIsModalOpen(true);
  };

  const collectionNotdelete = collection.filter(
    (collection) => collection.deleted === false
  );

  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <h1>Thêm Bộ Sưu Tập</h1>
        <Form
          form={form}
          onFinish={AddCollection}
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
              <Form.Item className="label-form" label="Hình ảnh" name="imgURL">
                <Upload
                  className="admin-upload-button"
                  fileList={img ? [img] : []}
                  beforeUpload={(file) => {
                    setImg(file);
                    return false;
                  }}
                  onRemove={() => setImg(null)}
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="admin-upload-button"
                  >
                    Upload Hình Ảnh
                  </Button>
                </Upload>{" "}
              </Form.Item>
              <Form.Item className="label-form" label="Dòng Sản Phẩm Đã Chọn">
                <Input
                  type="text"
                  className="select-input"
                  readOnly
                  value={checkedList?.join(", ")}
                />
              </Form.Item>
              <Button
                className="admin-upload-button"
                onClick={showModal}
                style={{
                  width: "45%",
                  marginLeft: "51%",
                  marginBottom: "5%",
                  display: "flex",
                }}
              >
                Chọn Sản Phẩm cho BST
              </Button>
              <Modal
                className="modal-add-form"
                footer={false}
                title="Chọn sản phẩm trong bộ sưu tập"
                okText={""}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Table
                  dataSource={productLine}
                  columns={columnOfProduct}
                  pagination={{ pageSize: 5 }}
                  scroll={{ x: "max-content" }}
                />
              </Modal>{" "}
            </div>
          </div>

          <Button
            onClick={hanldeClickSubmit}
            className="form-button small-button"
          >
            Thêm Bộ Sưu Tập
          </Button>
        </Form>

        <div className="data-table">
          <h1>Quản Lý Bộ Sưu Tập</h1>
          <Table
            dataSource={collectionNotdelete}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
}
