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

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddCertificate(value) {
    console.log(value);
    try {
      const imgURL = await uploadFile(img);
      value.imgURL = imgURL;
      console.log(value);
      const response = await api.post("certificate", value);
      console.log(response.data);
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
  // const [checkedList, setCheckedList] = useState([]);
  // const onChangeChecked = (e) => {
  //   console.log(e.target.value);
  //   if (e.target.checked) {
  //     setCheckedList([...checkedList, e.target.value]);
  //   } else {
  //     setCheckedList(checkedList.filter((item) => item != e.target.value));
  //   }
  // };
  // const columnOfProduct = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //     sorter: (a, b) => a.id - b.id,
  //   },

  //   {
  //     title: "Tên Sản Phẩm",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Mô Tả",
  //     dataIndex: "description",
  //     key: "description",
  //   },
  //   {
  //     title: "Tỉ lệ Áp Giá",
  //     dataIndex: "priceRate",
  //     key: "priceRate",
  //   },

  //   {
  //     title: "Shape",
  //     dataIndex: "shape",
  //     key: "shape",
  //   },
  //   {
  //     title: "Color",
  //     dataIndex: "color",
  //     key: "color",
  //   },
  //   {
  //     title: "Clarity",
  //     dataIndex: "clarity",
  //     key: "clarity",
  //   },
  //   {
  //     title: "Cut",
  //     dataIndex: "cut",
  //     key: "cut",
  //   },
  //   {
  //     title: "Origin",
  //     dataIndex: "origin",
  //     key: "origin",
  //   },
  //   {
  //     title: "Select",
  //     render: (value) => (
  //       <Checkbox type="checkbox" onChange={onChangeChecked} value={value.id} />
  //     ),
  //   },
  // ];

  // const [productLine, setProductLine] = useState([]);
  // const fetchProductLine = async () => {
  //   const resposne = await api.get("product-line");
  //   setProductLine(resposne.data);
  // };

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // const showModal = () => {
  //   fetchProductLine();
  //   console.log();
  //   setIsModalOpen(true);
  // };
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
              {/* <Form.Item className="label-form" label="Dòng Sản Phẩm Đã Chọn">
                <Input
                  type="text"
                  className="select-input"
                  readOnly
                  value={checkedList}
                />
              </Form.Item>
              <Button
                icon={<UploadOutlined />}
                className="admin-upload-button"
                onClick={showModal}
              >
                Chọn Sản Phẩm trong BST
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
                  onChange={onChange}
                />
              </Modal>{" "} */}
              <Form.Item
                className="label-form"
                label="Image URL "
                name="imgURL"
              >
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
            </div>
          </div>

          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm Bộ Sưu Tập
          </Button>
        </Form>

        <div className="data-table">
          <h1>Quản Lý Bộ Sưu Tập</h1>
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
