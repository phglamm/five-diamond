import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import "./AdminProduct.css";
import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

export default function AdminDiamond() {
  const [diamond, setDiamond] = useState();
  const [cover, setCover] = useState();
  const [category, setCategory] = useState();

  const [modalState, setModalState] = useState({});

  const [form] = useForm();
  const [products, setProducts] = useState([]);

  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddProduct(value) {
    console.log(value);
    try {
      await api.post("product", value);
      setProducts([...products, value]);
      toast.success("Thêm sản phẩm thành công");
      fetchProduct();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm sản phẩm");
      console.log(error.response.data);
    }
  }

  async function fetchProduct() {
    const response = await api.get("product");
    setProducts(response.data);
  }

  useEffect(() => {}, [products]);

  async function deleteProduct(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa sản phẩm này ?",
        onOk: () => {
          api.delete(`product/${values.id}`);
          toast.success("Xóa thành công");
          setProducts(
            products.filter((product) => {
              return product.id !== values.id;
            })
          );
        },
      });
      fetchProduct;
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateProduct(values) {
    console.log("haha...", values);
    try {
      await api.put(`product/${values.id}`, values);
      setProducts(
        products.filter((product) => {
          return product.id !== values.id;
        })
      );
      toast.success("Chỉnh sửa thành công");
    } catch (error) {
      toast.error("chỉnh sửa thất bại, có lỗi");
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
      title: "priceRate",
      dataIndex: "priceRate",
      key: "priceRate",
    },
    {
      title: "Image URL ",
      dataIndex: "imgURL",
      key: "imgURL",
      render: (value) => <Image src={value} style={{ width: 80 }} />,
    },

    {
      title: "weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "materialID",
      dataIndex: "materialID",
      key: "materialID",
    },

    {
      title: "categoryID",
      dataIndex: "categoryID",
      key: "categoryID",
    },
    {
      special: "special",
      dataIndex: "special",
      key: "special",
    },

    {
      title: "Hành Động",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteProduct(values);
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
            ></Modal>
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
        <h1>Thêm Sản Phẩm</h1>
        <Form form={form} onFinish={AddProduct} id="form" className="form-main">
          <div className="form-content-main-product">
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Tỉ lệ áp giá"
                name="priceRate"
                rules={[
                  {
                    required: true,
                    message: "Nhập Tỉ lệ áp giá",
                  },
                ]}
              >
                <Input type="number" required min={0} />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Số Chỉ"
                name="weight"
                rules={[
                  {
                    required: true,
                    message: "Nhập Số Chỉ",
                  },
                ]}
              >
                <Input type="number" required min={0} />
              </Form.Item>
              <div className="Material-form">
                <Form.Item
                  className="label-form"
                  label="Kim Cương"
                  name="materialID"
                  rules={[
                    {
                      required: true,
                      message: "Chọn Kim Cương",
                    },
                  ]}
                >
                  <Input type="text" required readOnly />
                </Form.Item>
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick=""
                >
                  Chọn Kim Cương
                </Button>
              </div>
              <div className="Material-form">
                <Form.Item
                  className="label-form"
                  label="Vỏ Kim Cương"
                  name="categoryID"
                  rules={[
                    {
                      required: true,
                      message: "Chọn Vỏ Kim Cương ",
                    },
                  ]}
                >
                  <Input type="text" required readOnly />
                </Form.Item>
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick=""
                >
                  Chọn Vỏ Kim Cương
                </Button>
              </div>
              <div className="Material-form">
                <Form.Item
                  className="label-form"
                  label="Danh Mục"
                  name="categoryID"
                  rules={[
                    {
                      required: true,
                      message: "Nhập Danh Mục ",
                    },
                  ]}
                >
                  <Input type="text" required readOnly />
                </Form.Item>
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick=""
                >
                  Chọn Danh Mục
                </Button>
              </div>
            </div>

            <div className="form-content">
              <Form.Item
                className="label-form"
                label="special"
                name="special"
                rules={[
                  {
                    required: true,
                    message: "Nhập special ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Image URL "
                name="imgURL"
              >
                <Input type="text" />
              </Form.Item>
            </div>
          </div>

          <Button onClick={hanldeClickSubmit} className="form-button">
            Thêm Sản Phẩm
          </Button>
        </Form>

        <div className="data-table">
          <h1>Quản Lý Sản Phẩm</h1>
          <Table
            dataSource={products}
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
