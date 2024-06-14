import SideBar from "../../../components/SideBar/SideBar";
import { Button, Form, Image, Input, Modal, Select, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import "./AdminProduct.css";
import api from "../../../config/axios";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/upload";

export default function AdminDiamond() {
  const [form] = useForm();
  const [formUpdate] = useForm();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newData, setNewData] = useState("");

  const [diamond, setDiamond] = useState();
  const [diamondUpdate, setDiamondUpdate] = useState();

  const [showDiamond, setShowDiamond] = useState(false);
  const [cover, setCover] = useState();
  const [coverUpdate, setCoverUpdate] = useState();

  const [showCover, setShowCover] = useState(false);
  const [category, setCategory] = useState();
  const [categoryUpdate, setCategoryUpdate] = useState();

  const [showCategory, setShowCategory] = useState(false);
  const [special, setSpecical] = useState(false);
  const [material, setMaterial] = useState([
    diamond == null ? 0 : diamond.id,
    cover == null ? 0 : cover.id,
  ]);
  const [materialUpdate, setMaterialUpdate] = useState([
    diamondUpdate == null ? 0 : diamondUpdate.id,
    coverUpdate == null ? 0 : coverUpdate.id,
  ]);

  const [img, setImg] = useState(null);
  function hanldeClickSubmit() {
    setMaterial([diamond.id, cover.id]);
    form.submit();
  }
  function hanldeUpdateClickSubmit() {
    setMaterialUpdate([diamondUpdate?.id, coverUpdate?.id]);
    formUpdate.submit();
  }

  async function AddProduct(value) {
    console.log(value);

    const imgURL = await uploadFile(img);
    value.materialID = material;
    value.categoryID = category.id;
    value.special = special;
    console.log(value.materialID);
    console.log(value.categoryID);
    const productData = {
      ...value,
      imgURL,
    };
    console.log(productData);
    try {
      await api.post("product", productData);
      setProducts([...products, productData]);
      console.log(productData);
      toast.success("Thêm sản phẩm thành công");
      fetchProduct();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc thêm sản phẩm");
      // console.log(error.response.data);
    }
  }

  async function fetchProduct() {
    const response = await api.get("product");
    setProducts(response.data);
  }
  async function fetchDiamonds() {
    const response = await api.get("material/available-diamond");
    setDataDiamond(response.data);
  }

  async function fetchCovers() {
    const response = await api.get("material/available-cover");
    setDataCover(response.data);
  }

  async function fetchCategories() {
    const response = await api.get("category");
    setDataCategory(response.data);
  }
  useEffect(() => {
    fetchProduct();
    fetchDiamonds();
    fetchCovers();
    fetchCategories();
  }, []);
  useEffect(() => {}, [products]);

  const [dataDiamond, setDataDiamond] = useState([]);
  const [dataCover, setDataCover] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);

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
      fetchProduct();
      fetchDiamonds();
      fetchCovers();
      fetchCategories();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      console.log(error.response.data);
    }
  }

  async function updateProduct(values) {
    console.log(values);

    const dataUpdate = {
      ...newData,
      materialID: materialUpdate,
      categoryID: categoryUpdate?.id,
      special: special,
    };
    console.log(newData);
    console.log(dataUpdate);
    try {
      await api.put(`product/${values.id}`, dataUpdate);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công ");
      fetchProduct();
      fetchDiamonds();
      fetchCovers();
      fetchCategories();
    } catch (error) {
      toast.error("chỉnh sửa thất bại, có lỗi");
      console.log(error.response.data);
    }
  }
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  function handleCloseDiamond() {
    setDiamond();
    setShowDiamond(false);
  }

  function handleOpenDiamond() {
    setShowDiamond(true);
  }

  function hanldeOkDiamond() {
    setShowDiamond(false);
  }

  function handleCloseCover() {
    setCover();
    setShowCover(false);
  }

  function handleOpenCover() {
    setShowCover(true);
  }

  function hanldeOkCover() {
    setShowCover(false);
  }

  function handleCloseCategory() {
    setCategory();
    setShowCategory(false);
  }

  function handleOpenCategory() {
    setShowCategory(true);
  }

  function hanldeOkCategory() {
    setShowCategory(false);
  }
  function handleCheckbox() {
    if (special) {
      setSpecical(false);
      console.log(special);
    } else {
      setSpecical(true);
      console.log(special);
    }
  }

  const columnOfDiamond = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
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
      title: "Select",
      render: (value) => (
        <Input
          onChange={() => {
            setDiamond(value);
            console.log(value);
          }}
          type="radio"
          name="radio1"
        />
      ),
    },
  ];

  const columnOfCover = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Metal",
      dataIndex: "metal",
      key: "metal",
    },
    {
      title: "Karat",
      dataIndex: "karat",
      key: "karat",
    },
    {
      title: "typeOfSub",
      dataIndex: "typeOfSub",
      key: "typeOfSub",
    },
    {
      title: "caratOfSub",
      dataIndex: "caratOfSub",
      key: "caratOfSub",
    },
    {
      title: "quantityOfSub",
      dataIndex: "quantityOfSub",
      key: "quantityOfSub",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Select",
      render: (value) => (
        <Input
          onChange={() => {
            setCover(value);
            console.log(value);
          }}
          type="radio"
          name="radio"
        />
      ),
    },
  ];

  const columnOfCategory = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Select",
      render: (value) => (
        <Input
          onChange={() => {
            setCategory(value);
          }}
          type="radio"
          name="radio"
        />
      ),
    },
  ];

  const columnOfDiamondUpdate = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
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
      title: "Select",
      render: (value) => (
        <Input
          onChange={() => {
            setDiamondUpdate(value);
            console.log(value);
          }}
          type="radio"
          name="radio1"
        />
      ),
    },
  ];

  const columnOfCoverUpdate = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Metal",
      dataIndex: "metal",
      key: "metal",
    },
    {
      title: "Karat",
      dataIndex: "karat",
      key: "karat",
    },
    {
      title: "typeOfSub",
      dataIndex: "typeOfSub",
      key: "typeOfSub",
    },
    {
      title: "caratOfSub",
      dataIndex: "caratOfSub",
      key: "caratOfSub",
    },
    {
      title: "quantityOfSub",
      dataIndex: "quantityOfSub",
      key: "quantityOfSub",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Select",
      render: (value) => (
        <Input
          onChange={() => {
            setCoverUpdate(value);
          }}
          type="radio"
          name="radio"
        />
      ),
    },
  ];

  const columnOfCategoryUpdate = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Select",
      render: (value) => (
        <Input
          onChange={() => {
            setCategoryUpdate(value);
          }}
          type="radio"
          name="radio"
        />
      ),
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Sản Phẩm Dành Cho",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Tỉ Lệ Áp Giá",
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
      title: "Số Chỉ",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Kim Cương",
      dataIndex: "imgURL",
      key: "imgURL",
      render: (text, record) => (
        <>
          {record.materials?.map((material) => (
            <div key={material.id}>
              {material.imgURL && (
                <Image src={material.imgURL} style={{ width: 50 }} />
              )}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Hình Dáng",
      dataIndex: "shape",
      key: "shape",
      render: (text, record) => (
        <>
          {record.materials?.map((material) => (
            <div key={material.id}>{material.shape && material.shape}</div>
          ))}
        </>
      ),
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
      render: (text, record) => (
        <>
          {record.materials?.map((material) => (
            <div key={material.id}>
              {material.carat > 1 ? material.carat : <></>}
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Nguồn Gốc",
      dataIndex: "origin",
      key: "origin",
      render: (text, record) => (
        <>
          {record.materials?.map((material) => (
            <div key={material.id}>{material.origin}</div>
          ))}
        </>
      ),
    },

    {
      title: "Danh Mục",
      dataIndex: "name",
      key: "name",
      render: (text, record) => record.category?.name || "N/A",
    },
    {
      title: "Kim Loại",
      dataIndex: "metal",
      key: "metal",
      render: (text, record) => (
        <>
          {record.materials?.map((material) => (
            <div key={material.id}>{material.metal}</div>
          ))}
        </>
      ),
    },
    {
      title: "Karat",
      dataIndex: "Karat",
      key: "Karat",
      render: (text, record) => (
        <>
          {record.materials?.map((material) => (
            <div key={material.id}>{material.karat}</div>
          ))}
        </>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        const totalMaterialPrice = record.materials?.reduce(
          (sum, material) => sum + (material.price || 0),
          0
        );
        const totalPrice = totalMaterialPrice;
        return totalPrice;
      },
    },
    {
      title: "Chứng Chỉ GIA",
      dataIndex: "giaReportNumber",
      key: "giaReportNumber",
      render: (text, record) => (
        <>
          {record.materials?.map((material) => (
            <div key={material.id}>
              {material.certificate?.fileURL && material.certificate?.fileURL}
            </div>
          ))}
        </>
      ),
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
                onClick={() => {
                  setSelectedProduct(values);
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
                initialValues={selectedProduct}
                form={formUpdate}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                }}
                onFinish={(values) => {
                  updateProduct(selectedProduct);
                }}
                id="form"
                className="form-main"
              >
                <div className="form-content-main-product">
                  <div className="form-content">
                    <Form.Item
                      className="label-form"
                      label="Sản Phẩm Dành Cho"
                      name="gender"
                    >
                      <Select className="select-input" placeholder="Dành Cho">
                        <Select.Option value="MALE">Nam</Select.Option>
                        <Select.Option value="FEMALE">Nữ</Select.Option>
                      </Select>{" "}
                    </Form.Item>
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
                        rules={[
                          {
                            required: true,
                            message: "Chọn Kim Cương",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          readOnly
                          value={
                            diamondUpdate == null
                              ? ""
                              : `${diamondUpdate.shape} ${diamondUpdate.size} ${diamondUpdate.clarity} ${diamondUpdate.cut} ${diamondUpdate.color} ${diamondUpdate.carat}`
                          }
                        />{" "}
                      </Form.Item>
                      <Button
                        icon={<UploadOutlined />}
                        className="admin-upload-button"
                        onClick={handleOpenDiamond}
                      >
                        Chọn Kim Cương
                      </Button>
                      <Modal
                        className="choose-modal"
                        open={showDiamond}
                        onClose={handleCloseDiamond}
                        onCancel={handleCloseDiamond}
                        onOk={hanldeOkDiamond}
                      >
                        <Table
                          className="choose-table"
                          dataSource={dataDiamond}
                          columns={columnOfDiamondUpdate}
                          onChange={onChange}
                        />
                      </Modal>
                    </div>
                    <div className="Material-form">
                      <Form.Item
                        className="label-form"
                        label="Vỏ Kim Cương"
                        rules={[
                          {
                            required: true,
                            message: "Chọn Vỏ Kim Cương ",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          readOnly
                          value={
                            coverUpdate == null
                              ? ""
                              : `${coverUpdate.metal} ${coverUpdate.karat} ${coverUpdate.typeOfSub}`
                          }
                        />{" "}
                      </Form.Item>
                      <Button
                        icon={<UploadOutlined />}
                        className="admin-upload-button"
                        onClick={handleOpenCover}
                      >
                        Chọn Vỏ Kim Cương
                      </Button>
                      <Modal
                        className="choose-modal"
                        open={showCover}
                        onClose={handleCloseCover}
                        onCancel={handleCloseCover}
                        onOk={hanldeOkCover}
                      >
                        <Table
                          className="choose-table"
                          dataSource={dataCover}
                          columns={columnOfCoverUpdate}
                          onChange={onChange}
                        />
                      </Modal>
                    </div>
                    <div className="Material-form">
                      <Form.Item
                        className="label-form"
                        label="Danh Mục"
                        rules={[
                          {
                            required: true,
                            message: "Nhập Danh Mục ",
                          },
                        ]}
                      >
                        <Input
                          type="text"
                          readOnly
                          value={
                            categoryUpdate == null
                              ? ""
                              : `${categoryUpdate.name}`
                          }
                        />{" "}
                      </Form.Item>
                      <Button
                        icon={<UploadOutlined />}
                        className="admin-upload-button"
                        onClick={handleOpenCategory}
                      >
                        Chọn Danh Mục cho sản phẩm
                      </Button>
                      <Modal
                        className="choose-modal"
                        open={showCategory}
                        onClose={handleCloseCategory}
                        onCancel={handleCloseCategory}
                        onOk={hanldeOkCategory}
                      >
                        <Table
                          className="choose-table"
                          dataSource={dataCategory}
                          columns={columnOfCategoryUpdate}
                          onChange={onChange}
                        />
                      </Modal>
                    </div>
                  </div>

                  <div className="form-content">
                    <Form.Item className="label-form" label="special">
                      <Input
                        type="checkbox"
                        onChange={handleCheckbox}
                        value={special}
                      />
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
                    </Form.Item>
                  </div>
                </div>

                <Button
                  onClick={(e) => {
                    hanldeUpdateClickSubmit();
                  }}
                  className="form-button"
                >
                  Chỉnh Sửa sản phẩm
                </Button>
              </Form>
            </Modal>
          </>
        );
      },
    },
  ];

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
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
                label="Sản Phẩm Dành Cho"
                name="gender"
              >
                <Select className="select-input" placeholder="Dành Cho">
                  <Select.Option value="MALE">Nam</Select.Option>
                  <Select.Option value="FEMALE">Nữ</Select.Option>
                </Select>{" "}
              </Form.Item>
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
                  rules={[
                    {
                      required: true,
                      message: "Chọn Kim Cương",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    readOnly
                    value={
                      diamond == null
                        ? ""
                        : `${diamond.shape} ${diamond.size} ${diamond.clarity} ${diamond.cut} ${diamond.color} ${diamond.carat}`
                    }
                  />{" "}
                </Form.Item>
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick={handleOpenDiamond}
                >
                  Chọn Kim Cương
                </Button>
                <Modal
                  className="choose-modal"
                  open={showDiamond}
                  onClose={handleCloseDiamond}
                  onCancel={handleCloseDiamond}
                  onOk={hanldeOkDiamond}
                >
                  <Table
                    className="choose-table"
                    dataSource={dataDiamond}
                    columns={columnOfDiamond}
                    onChange={onChange}
                  />
                </Modal>
              </div>
              <div className="Material-form">
                <Form.Item
                  className="label-form"
                  label="Vỏ Kim Cương"
                  rules={[
                    {
                      required: true,
                      message: "Chọn Vỏ Kim Cương ",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    readOnly
                    value={
                      cover == null
                        ? ""
                        : `${cover.metal} ${cover.karat} ${cover.typeOfSub}`
                    }
                  />{" "}
                </Form.Item>
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick={handleOpenCover}
                >
                  Chọn Vỏ Kim Cương
                </Button>
                <Modal
                  className="choose-modal"
                  open={showCover}
                  onClose={handleCloseCover}
                  onCancel={handleCloseCover}
                  onOk={hanldeOkCover}
                >
                  <Table
                    className="choose-table"
                    dataSource={dataCover}
                    columns={columnOfCover}
                    onChange={onChange}
                  />
                </Modal>
              </div>
              <div className="Material-form">
                <Form.Item
                  className="label-form"
                  label="Danh Mục"
                  rules={[
                    {
                      required: true,
                      message: "Nhập Danh Mục ",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    readOnly
                    value={category == null ? "" : `${category.name}`}
                  />{" "}
                </Form.Item>
                <Button
                  icon={<UploadOutlined />}
                  className="admin-upload-button"
                  onClick={handleOpenCategory}
                >
                  Chọn Danh Mục cho sản phẩm
                </Button>
                <Modal
                  className="choose-modal"
                  open={showCategory}
                  onClose={handleCloseCategory}
                  onCancel={handleCloseCategory}
                  onOk={hanldeOkCategory}
                >
                  <Table
                    className="choose-table"
                    dataSource={dataCategory}
                    columns={columnOfCategory}
                    onChange={onChange}
                  />
                </Modal>
              </div>
            </div>

            <div className="form-content">
              <Form.Item className="label-form" label="special">
                <Input
                  type="checkbox"
                  onChange={handleCheckbox}
                  value={special}
                />
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
