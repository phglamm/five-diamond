import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Select, Space, Table } from "antd";
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
  const [formUpdate] = useForm();
  const [products, setProducts] = useState([]);

  function hanldeClickSubmit() {
    form.submit();
  }

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  async function handleSubmit(value) {
    console.log(value);
    try {
      await api.post("product", value);
      setMessage("Thêm sản phẩm thành công");
      setProducts([...products, value]);
    } catch (error) {
      setMessage("Đã có lỗi trong lúc thêm kim cương");
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
  // useEffect(() => {
  //   if (products) {
  //     console.log("products...", products); // Log the diamond id when diamond state is updated
  //   }
  // }, [products]); // Only re-run this effect when diamond changes

  async function fetchCertificate() {
    const certificate = await api.get("certificate/not-yet-used");
    setCertificate(certificate.data);
  }

  useEffect(() => {
    fetchCertificate();
  }, []);

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
    } catch (error) {
      setdeleteMessage("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateProduct(values) {
    console.log("haha...", values);
    try {
      await api.put(`material/${values.id}`, values);
      setUpdateMessage("Chỉnh sửa thành công");
      setProducts(
        products.filter((product) => {
          return product.id !== values.id;
        })
      );
      console.log("chỉnh sửa thành công");
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
            >
              {/* <Form
                form={formUpdate}
                onFinish={(e) => {
                  updateProduct(values);
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

  const columnsGIA = [
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
        {/* <Modal
          className="modal-add-form"
          footer={false}
          title="Thêm kim cương"
          okText={""}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        > */}
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
