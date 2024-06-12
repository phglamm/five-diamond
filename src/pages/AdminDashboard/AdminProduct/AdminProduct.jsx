import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";

export default function AdminDiamond() {
  const [message, setMessage] = useState("");
  const [deleteMessage, setdeleteMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const [form] = useForm();
  const [products, setProducts] = useState([]);

  function hanldeClickSubmit() {
    form.submit();
  }

  async function AddProduct(value) {
    console.log(value);
    try {
      await api.post("product", value);
      setMessage("Thêm sản phẩm thành công");
      setProducts([...products, value]);
    } catch (error) {
      setMessage("Đã có lỗi trong lúc thêm sản phẩm");
      console.log(error.response.data);
    }
  }

  async function fetchProduct() {
    const response = await api.get("product");
    setProducts(response.data);
    console.log("data....", response.data);
  }

  useEffect(() => {
    fetchProduct();
  }, [products]); // Empty dependency array means this runs once when the component mounts

  // Use useEffect to log diamond.id whenever diamond state changes
  useEffect(() => {
    if (products) {
      console.log("products...", products); // Log the diamond id when diamond state is updated
    }
  }, [products]); // Only re-run this effect when diamond changes

  async function deleteProduct(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa sản phẩm này ?",
        onOk: () => {
          api.delete(`product/${values.id}`);
          setdeleteMessage("Xóa thành công");
          setProducts(
            products.filter((product) => {
              return product.id !== values.id;
            })
          );
        },
      });
      console.log(deleteMessage);
    } catch (error) {
      setdeleteMessage("Đã có lỗi trong lúc Xóa");
      console.log(deleteMessage);
      console.log(error.response.data);
    }
  }

  async function updateProduct(values) {
    console.log("haha...", values);
    try {
      await api.put(`product/${values.id}`, values);
      setUpdateMessage("Chỉnh sửa thành công");
      setProducts(
        products.filter((product) => {
          return product.id !== values.id;
        })
      );
      console.log(updateMessage);
    } catch (error) {
      setUpdateMessage("chỉnh sửa thất bại, có lỗi");
      console.log(updateMessage);

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
          <div className="form-content-main">
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="priceRate"
                name="priceRate"
                rules={[
                  {
                    required: true,
                    message: "Nhập priceRate",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="weight"
                name="weight"
                rules={[
                  {
                    required: true,
                    message: "Nhập weight",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="materialID"
                name="materialID"
                rules={[
                  {
                    required: true,
                    message: "Nhập materialID ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="categoryID"
                name="categoryID"
                rules={[
                  {
                    required: true,
                    message: "Nhập categoryID ",
                  },
                ]}
              >
                <Input type="text" required />
              </Form.Item>
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
          {message && <div>{message}</div>}
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
