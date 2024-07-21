/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import SideBar from "../../../components/SideBar/SideBar";
import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Table,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import "../../AdminDashboard/AdminPage.css";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import { UploadOutlined } from "@ant-design/icons";
import uploadFile from "../../../utils/upload";

export default function AdminCover() {
  const [form] = useForm();
  const [formUpdate] = useForm();
  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);

  const [checkedList, setCheckedList] = useState([]);
  const [checkedListUpdate, setCheckedListUpdate] = useState([]);

  const [newData, setNewData] = useState("");
  const [selectedProductLine, setSelectedProductLine] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const [diamond, setDiamond] = useState([]);
  const [shape, setShape] = useState("");
  const [size, setSize] = useState("");
  const [cut, setCut] = useState("");
  const [clarity, setClarity] = useState("");
  const [origin, setOrigin] = useState("");
  const [color, setColor] = useState("");
  const [carat, setCarat] = useState("");

  const [special, setSpecial] = useState(false);
  const [specialUpdate, setSpecialUpdate] = useState(false);

  const [diamondUpdate, setDiamondUpdate] = useState([]);
  const [shapeUpdate, setShapeUpdate] = useState("");
  const [sizeUpdate, setSizeUpdate] = useState("");
  const [cutUpdate, setCutUpdate] = useState("");
  const [clarityUpdate, setClarityUpdate] = useState("");
  const [originUpdate, setOriginUpdate] = useState("");
  const [colorUpdate, setColorUpdate] = useState("");
  const [caratUpdate, setCaratUpdate] = useState("");
  const [img, setImg] = useState(null);
  const [imgUpdate, setImgUpdate] = useState(null);

  function hanldeUpdateClickSubmit() {
    formUpdate.submit();
  }

  function hanldeClickSubmit() {
    form.submit();
  }
  const showModal = () => {
    fetchDiamond();
    // console.log(shape, carat, size, origin, cut, clarity, color);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalUpdate = () => {
    fetchDiamondUpdate();
    formUpdate.setFieldsValue(selectedProductLine);
    // console.log(selectedProductLine);
    // console.log(
    //   shapeUpdate,
    //   caratUpdate,
    //   sizeUpdate,
    //   originUpdate,
    //   cutUpdate,
    //   clarityUpdate,
    //   colorUpdate
    // );
    setIsModalOpenUpdate(true);
  };
  const handleOkUpdate = () => {
    setIsModalOpenUpdate(false);
  };
  const handleCancelUpdate = () => {
    setIsModalOpenUpdate(false);
  };

  // const onChangeChecked = (e) => {
  //   console.log(e.target.value);
  //   if (e.target.checked) {
  //     setCheckedList([...checkedList, e.target.value]);
  //   } else {
  //     setCheckedList(checkedList.filter((item) => item != e.target.value));
  //   }
  // };

  const onChangeChecked = (e) => {
    const { value, checked } = e.target;
    setCheckedList((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  // const onChangeCheckedUpdate = (e) => {
  //   console.log(e.target.value);
  //   if (e.target.checked) {
  //     setCheckedListUpdate([...checkedListUpdate, e.target.value]);
  //   } else {
  //     setCheckedListUpdate(
  //       checkedListUpdate.filter((item) => item != e.target.value)
  //     );
  //   }
  // };

  const onChangeCheckedUpdate = (e) => {
    const { value, checked } = e.target;
    setCheckedListUpdate((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };
  async function AddProductLine(value) {
    // console.log(value);

    try {
      const imgURL = await uploadFile(img);
      value.imgURL = imgURL;
      // console.log(value.imgURL);
      value.diamondID = checkedList;
      // console.log(value);
      const response = await api.post("product-line", value);
      // console.log(response.data);
      toast.success("Thêm sản phẩm thành công");
      // console.log(response.data);
      fetchProductLine();
      form.resetFields();
      setCheckedList([]);
    } catch (error) {
      toast.error(error.response);
      toast.error("Đã có lỗi trong lúc thêm sản phẩm");
      form.resetFields();
    }
  }
  const [productLine, setProductLine] = useState([]);
  async function fetchProductLine() {
    const response = await api.get("product-line");
    setProductLine(response.data);
  }
  async function fetchDiamond() {
    const response = await api.get(
      `diamond/search?shape=${shape}&color=${color}&cut=${cut}&clarity=${clarity}&carat=${carat}&size=${size}&origin=${origin}`
    );
    setDiamond(response.data);
  }

  async function fetchDiamondUpdate() {
    const response = await api.get(
      `diamond/update?shape=${shapeUpdate}&color=${colorUpdate}&cut=${cutUpdate}&clarity=${clarityUpdate}&carat=${caratUpdate}&size=${sizeUpdate}&origin=${originUpdate}`
    );
    setDiamondUpdate(response.data);
  }

  async function fetchCategory() {
    const response = await api.get("category");
    setCategory(response.data);
  }

  async function fetchCollection() {
    const response = await api.get("collection");
    setCollection(response.data);
  }

  const collectionNotdelete = collection.filter(
    (collection) => collection.deleted === false
  );
  useEffect(() => {
    fetchProductLine();
    fetchDiamond();
    fetchCategory();
    fetchCollection();
  }, []);

  async function deleteProductLine(values) {
    // console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa dòng sản phẩm này ?",
        onOk: async () => {
          await api.delete(`product-line/${values.id}`);
          toast.success("Xóa thành công");
          setProductLine(
            productLine.filter((proline) => {
              return proline.id !== values.id;
            })
          );
        },
      });
      fetchProductLine();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
      // console.log(error.response.data);
    }
  }

  async function updateProductLine(values) {
    // console.log(values);
    const responseProduct = await api.get(`product-line/${values.id}`);
    // console.log(responseProduct.data);
    if (imgUpdate) {
      const imgURLUpdate = await uploadFile(imgUpdate);
      newData.imgURL = imgURLUpdate;
    } else {
      newData.imgURL = values.imgURL;
    }
    if (checkedListUpdate) {
      newData.diamondID = checkedListUpdate;
    } else {
      newData.diamondID = responseProduct.data.diamondIDs;
    }

    const dataUpdate = {
      ...newData,
    };

    // console.log(dataUpdate);

    try {
      const response = await api.put(`product-line/${values.id}`, dataUpdate);
      // console.log(response.data);
      setIsModalUpdateOpen(false);
      toast.success("Chỉnh sửa thành công");
      fetchProductLine();
      formUpdate.resetFields();
      setCheckedListUpdate([]);
    } catch (error) {
      toast.error("chỉnh sửa thất bại, có lỗi");
      // console.log(error.response.data);
      formUpdate.resetFields();
    }
  }

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
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
      title: "Image",
      dataIndex: "imgURL",
      key: "imgURL",
      render: (value) => (
        <Image src={value} alt="value" style={{ width: 100 }} />
      ),
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tỉ Lệ Áp Giá",
      dataIndex: "priceRate",
      key: "priceRate",
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
      title: "Loại đá phụ",
      dataIndex: "typeOfSub",
      key: "typeOfSub",
    },
    {
      title: "Nặng",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Số lượng đá phụ",
      dataIndex: "quantityOfSub",
      key: "quantityOfSub",
    },

    {
      title: "Danh Mục",
      dataIndex: "name",
      key: "name",
      render: (text, record) => record.category?.name,
    },
    {
      title: "Bộ Sưu Tập",
      dataIndex: "collection",
      key: "collection",
    },
    {
      title: "Dành Cho",
      dataIndex: "gender",
      key: "gender",
      render: (text, record) => (record.gender === "MALE" ? <>Nam</> : <>Nữ</>),
    },
    {
      title: "Hình dáng",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Màu Sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Carat",
      dataIndex: "carat",
      key: "carat",
    },
    {
      title: "Độ cắt",
      dataIndex: "cut",
      key: "cut",
    },
    {
      title: "Độ Tinh Khiết",
      dataIndex: "clarity",
      key: "clarity",
    },
    {
      title: "Nguồn Gốc",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Đặc Biệt",
      dataIndex: "special",
      key: "special",
      render: (special) => <Checkbox checked={special} disabled />,
    },
    {
      title: "Đã Xóa",
      dataIndex: "deleted",
      key: "deleted",
      render: (deleted) => (deleted ? "Đã Xóa" : "Chưa Xóa"),
    },
    {
      title: "Hành Động",
      fixed: "right",
      render: (values) => {
        return (
          <>
            <div className="action-button">
              <Button
                onClick={(e) => {
                  deleteProductLine(values);
                }}
                className="delete-button"
              >
                Xóa
              </Button>

              <Button
                icon={<UploadOutlined />}
                className="admin-upload-button update-button"
                onClick={() => {
                  setSelectedProductLine(values);
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
              title="Chỉnh Sửa Dòng Sản Phẩm"
              okText={"Lưu"}
              open={isModalUpdateOpen}
              onOk={handleUpdateOk}
              onCancel={handleUpdateCancel}
              mask={false}
            >
              <Form
                initialValues={selectedProductLine}
                onValuesChange={(changedValues, allValues) => {
                  setNewData(allValues);
                }}
                form={formUpdate}
                onFinish={(values) => {
                  updateProductLine(selectedProductLine);
                }}
                id="form-update"
                className="form-main"
              >
                <div className="form-content-main">
                  <div className="form-content">
                    <Form.Item
                      className="label-form"
                      label="Image URL "
                      name="imgURL"
                    >
                      <Upload
                        className="admin-upload-button"
                        fileList={imgUpdate ? [imgUpdate] : []}
                        beforeUpload={(file) => {
                          setImgUpdate(file);
                          return false;
                        }}
                        onRemove={() => setImgUpdate(null)}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="admin-upload-button"
                        >
                          Tải Hình Ảnh
                        </Button>
                      </Upload>{" "}
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Tên Sản Phẩm"
                      name="name"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Nhập Tên Sản Phẩm",
                        },
                      ]}
                    >
                      <Input type="text" required></Input>
                    </Form.Item>

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
                        onChange={(value) => {
                          setShapeUpdate(value);
                          // console.log(shapeUpdate);
                        }}
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
                      <Input
                        type="number"
                        onChange={(e) => setSizeUpdate(e.target.value)}
                        required
                      />
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
                      <Input
                        type="text"
                        required
                        onChange={(e) => {
                          setColorUpdate(e.target.value);
                          // console.log(colorUpdate);
                        }}
                      />
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
                      <Input
                        type="number"
                        required
                        onChange={(e) => setCaratUpdate(e.target.value)}
                      />
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
                        onChange={(value) => {
                          setCutUpdate(value);
                          // console.log(cutUpdate);
                        }}
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
                        onChange={(value) => {
                          setClarityUpdate(value);
                        }}
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
                        onChange={(value) => {
                          setOriginUpdate(value);
                        }}
                      >
                        <Select.Option value="NATURAL">Tự Nhiên</Select.Option>
                        <Select.Option value="ARTIFICIAL">
                          Nhân Tạo
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item className="label-form" label="Kim Cương Đã Chọn">
                      <Input
                        type="text"
                        className="select-input"
                        readOnly
                        value={checkedListUpdate?.join(", ")}
                      />{" "}
                    </Form.Item>
                  </div>
                  <div className="form-content">
                    <Form.Item
                      className="label-form"
                      label="Mô Tả"
                      name="description"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Nhập mô tả",
                        },
                      ]}
                    >
                      <Input type="text" required></Input>
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Tỉ Lệ Áp Giá"
                      name="priceRate"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Nhập Tỉ Lệ Áp Giá",
                        },
                      ]}
                    >
                      <Input type="number" required></Input>
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Kim Loại"
                      name="metal"
                      rules={[
                        {
                          required: true,
                          message: "Nhập kim loại",
                        },
                      ]}
                    >
                      <Input type="text" required readOnly />
                    </Form.Item>

                    <Form.Item
                      className="label-form"
                      label="karat"
                      name="karat"
                      rules={[
                        {
                          required: true,
                          message: "Nhập karat ",
                        },
                      ]}
                    >
                      <Select className="select-input" placeholder="chọn Karat">
                        <Select.Option value="24K">24K</Select.Option>
                        <Select.Option value="18K">18K</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Loại Đá phụ"
                      name="typeOfSub"
                      rules={[
                        {
                          required: true,
                          message: "Nhập loại đá phụ",
                        },
                      ]}
                    >
                      <Select
                        className="select-input"
                        placeholder="chọn loại đá phụ"
                      >
                        <Select.Option value="DIAMOND">Diamond</Select.Option>
                        <Select.Option value="MOISSANITE">
                          Moissanite
                        </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Nặng (chỉ)"
                      name="weight"
                      rules={[
                        {
                          required: true,
                          message: "Nhập weight ",
                        },
                      ]}
                    >
                      <Input type="number" required />
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Số Lượng Đá Phụ"
                      name="quantityOfSub"
                      rules={[
                        {
                          required: true,
                          message: "Nhập quantityOfSub",
                        },
                      ]}
                    >
                      <Input type="number" required />
                    </Form.Item>

                    <Form.Item
                      className="label-form"
                      label="Danh Mục"
                      name="categoryID"
                    >
                      <Select
                        className="select-input"
                        placeholder="chọn Danh Mục"
                      >
                        {category.map((item) => (
                          <Select.Option value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="label-form"
                      label="Dành Cho"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "chọn đối tượng",
                        },
                      ]}
                    >
                      <Select
                        className="select-input"
                        placeholder="chọn đối tượng"
                      >
                        <Select.Option value="MALE">Nam</Select.Option>
                        <Select.Option value="FEMALE">Nữ</Select.Option>
                      </Select>
                    </Form.Item>
                    <Button
                      icon={<UploadOutlined />}
                      className="admin-upload-button"
                      onClick={showModalUpdate}
                    >
                      Chọn Kim Cương
                    </Button>

                    <Modal
                      className="modal-add-form"
                      footer={false}
                      title="Chọn Kim Cương để chỉnh sửa"
                      okText={""}
                      open={isModalOpenUpdate}
                      onOk={handleOkUpdate}
                      onCancel={handleCancelUpdate}
                    >
                      <Table
                        dataSource={diamondUpdate}
                        columns={columnOfDiamondUpdate}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "max-content" }}
                        onChange={onChange}
                      />
                    </Modal>
                    <Form.Item
                      className="label-form"
                      label="Đặc Biệt"
                      name="special"
                      valuePropName="checked"
                    >
                      <Checkbox
                        checked={specialUpdate}
                        onChange={(e) => {
                          setSpecialUpdate(e.target.checked);
                          // console.log(specialUpdate);
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    hanldeUpdateClickSubmit();
                  }}
                  className="form-button"
                >
                  Chỉnh Sửa Dòng Sản Phẩm
                </Button>
              </Form>
            </Modal>
          </>
        );
      },
    },
  ];

  const columnOfDiamond = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Hình Dáng",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Kích Thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Màu Sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Độ Tinh Khiết",
      dataIndex: "clarity",
      key: "clarity",
    },
    {
      title: "carat",
      dataIndex: "carat",
      key: "carat",
    },
    {
      title: "Độ Cắt",
      dataIndex: "cut",
      key: "cut",
    },
    {
      title: "Nguồn Gốc",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Chọn",
      render: (value) => (
        <Checkbox
          type="checkbox"
          onChange={onChangeChecked}
          value={value.id}
          checked={checkedList?.includes(value.id)}
        />
      ),
    },
  ];

  const columnOfDiamondUpdate = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Hình Dáng",
      dataIndex: "shape",
      key: "shape",
    },
    {
      title: "Kích Thước",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Màu Sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Độ Tinh Khiết",
      dataIndex: "clarity",
      key: "clarity",
    },
    {
      title: "carat",
      dataIndex: "carat",
      key: "carat",
    },
    {
      title: "Độ Cắt",
      dataIndex: "cut",
      key: "cut",
    },
    {
      title: "Nguồn Gốc",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Chọn",
      render: (value) => (
        <Checkbox
          type="checkbox"
          onChange={onChangeCheckedUpdate}
          value={value.id}
          checked={checkedListUpdate?.includes(value.id)}
        />
      ),
    },
  ];
  return (
    <div className="Admin">
      <SideBar></SideBar>

      <div className="admin-content">
        <h1>Thêm Dòng Sản Phẩm</h1>

        <Form
          form={form}
          onFinish={AddProductLine}
          id="form"
          className="form-main"
        >
          <div className="form-content-main">
            <div className="form-content">
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
                    Tải Hình Ảnh
                  </Button>
                </Upload>{" "}
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Tên Sản Phẩm"
                name="name"
                required
                rules={[
                  {
                    required: true,
                    message: "Nhập Tên Sản Phẩm",
                  },
                ]}
              >
                <Input type="text" required></Input>
              </Form.Item>

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
                  onChange={(value) => {
                    setShape(value);
                    // console.log(shape);
                  }}
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
                <Input
                  type="number"
                  onChange={(e) => setSize(e.target.value)}
                  required
                />
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
                <Input
                  type="text"
                  required
                  onChange={(e) => {
                    setColor(e.target.value);
                    // console.log(color);
                  }}
                />
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
                <Input
                  type="number"
                  required
                  onChange={(e) => setCarat(e.target.value)}
                />
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
                  onChange={(value) => {
                    setCut(value);
                  }}
                >
                  <Select.Option value="EXCELLENT">Excellent</Select.Option>
                  <Select.Option value="VERY GOOD">Very Good</Select.Option>
                  <Select.Option value="GOOD">Good</Select.Option>
                  <Select.Option value="FAIR">Fair</Select.Option>
                  <Select.Option value="POOR">Poor</Select.Option>
                </Select>
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
                  onChange={(value) => {
                    setClarity(value);
                  }}
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
                  onChange={(value) => {
                    setOrigin(value);
                  }}
                >
                  <Select.Option value="NATURAL">Tự Nhiên</Select.Option>
                  <Select.Option value="ARTIFICIAL">Nhân Tạo</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item className="label-form" label="Kim Cương Đã Chọn">
                <Input
                  type="text"
                  className="select-input"
                  readOnly
                  value={checkedList?.join(", ")}
                />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Đặc Biệt"
                name="special"
                valuePropName="checked"
                initialValue={special}
              >
                <Checkbox
                  checked={special}
                  onChange={(e) => {
                    setSpecial(e.target.checked);
                    // console.log(special);
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-content">
              <Form.Item
                className="label-form"
                label="Mô Tả"
                name="description"
                required
                rules={[
                  {
                    required: true,
                    message: "Nhập mô tả",
                  },
                ]}
              >
                <Input type="text" required></Input>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Tỉ Lệ Áp Giá"
                name="priceRate"
                required
                rules={[
                  {
                    required: true,
                    message: "Nhập tỉ lệ áp giá",
                  },
                ]}
              >
                <Input type="number" required></Input>
              </Form.Item>
              <Form.Item
                initialValue="GOLD"
                className="label-form"
                label="Kim Loại"
                name="metal"
                rules={[
                  {
                    required: true,
                    message: "Nhập kim loại",
                  },
                ]}
              >
                <Input type="text" required readOnly />
              </Form.Item>

              <Form.Item
                className="label-form"
                label="karat"
                name="karat"
                rules={[
                  {
                    required: true,
                    message: "Nhập karat ",
                  },
                ]}
              >
                <Select className="select-input" placeholder="chọn Karat">
                  <Select.Option value="24K">24K</Select.Option>
                  <Select.Option value="18K">18K</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Loại Đá phụ"
                name="typeOfSub"
                rules={[
                  {
                    required: true,
                    message: "Nhập loại đá phụ",
                  },
                ]}
              >
                <Select className="select-input" placeholder="chọn loại đá phụ">
                  <Select.Option value="DIAMOND">Diamond</Select.Option>
                  <Select.Option value="MOISSANITE">Moissanite</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Nặng (chỉ)"
                name="weight"
                rules={[
                  {
                    required: true,
                    message: "Nhập weight ",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Số Lượng Đá Phụ"
                name="quantityOfSub"
                rules={[
                  {
                    required: true,
                    message: "Nhập quantityOfSub",
                  },
                ]}
              >
                <Input type="number" required />
              </Form.Item>
              <Form.Item
                className="label-form"
                label="Danh mục"
                name="categoryID"
              >
                <Select className="select-input" placeholder="chọn Danh Mục">
                  {category.map((item) => (
                    <Select.Option value={item.id}>{item.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                className="label-form"
                label="Dành Cho"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "chọn đối tượng",
                  },
                ]}
              >
                <Select className="select-input" placeholder="chọn đối tượng">
                  <Select.Option value="MALE">Nam</Select.Option>
                  <Select.Option value="FEMALE">Nữ</Select.Option>
                </Select>
              </Form.Item>

              <Button
                icon={<UploadOutlined />}
                className="admin-upload-button"
                onClick={showModal}
              >
                Chọn Kim Cương
              </Button>
            </div>
          </div>

          <Button
            onClick={hanldeClickSubmit}
            className="form-button small-button"
          >
            Thêm Dòng sản phẩm
          </Button>
        </Form>

        <Modal
          className="modal-add-form"
          footer={false}
          title="Chọn Kim Cương"
          okText={""}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Table
            dataSource={diamond}
            columns={columnOfDiamond}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
            onChange={onChange}
          />
        </Modal>

        <div className="data-table">
          <h1>Quản Lý Sản Phẩm</h1>
          <Table
            dataSource={productLine}
            onChange={onChange}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
}
