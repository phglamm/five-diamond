import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./RegisterPage.css";

import { routes } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import api from "../../config/axios";
import { toast } from "react-toastify";
import moment from "moment";

function RegisterPageCard() {
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";

  const [form] = useForm();

  async function RegisterAccount(value) {
    console.log(value);
    try {
      const response = await api.post("register", value);
      console.log(response);
      toast.success("Tài Khoản của bạn đã được tạo thành công");
      navigate(routes.login);
    } catch (error) {
      toast.error("Đã có lỗi trong việc tạo tài khoản của bạn");
      console.log(error.response.data);
    }
  }

  function handleClickSubmit() {
    form.submit();
  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={
                "https://drive.google.com/thumbnail?id=1rnuNBIluTA1oWyGVTdXjHy8SYDmfk6zH&sz=w1000"
              }
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <Link to={routes.home} className="form-comeback">
                <i
                  className="pi pi-arrow-circle-left"
                  style={{ fontSize: "2rem" }}
                ></i>
                <span className="">Quay Lại Trang Chủ</span>
              </Link>
              <div className="d-flex flex-row mt-2 form-header">
                <img
                  src={
                    "https://drive.google.com/thumbnail?id=1TID9g_LphvHeN1htPBH_0zoxe0o1CqaE&sz=w1000"
                  }
                  alt=""
                  className="form-logo"
                />
                <span className="h1 fw-bold mb-0">Five Diamond</span>
              </div>

              <h5
                className="fw-normal my-0 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Đăng Ký
              </h5>
              <div className="form">
                <Form
                  form={form}
                  onFinish={RegisterAccount}
                  id="form"
                  className=""
                >
                  <Form.Item
                    required
                    label="Họ"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập Họ của bạn",
                      },
                      {
                        pattern: /^[a-zA-ZÀ-ỹẠ-ỹ\s]*$/,
                        message:
                          "Họ chỉ được chứa chữ cái và khoảng trắng, không có số và ký tự đặc biệt",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Tên"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập Tên của bạn",
                      },
                      {
                        pattern: /^[a-zA-ZÀ-ỹẠ-ỹ\s]*$/,
                        message:
                          "Tên chỉ được chứa chữ cái và khoảng trắng, không có số và ký tự đặc biệt",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    name="dob"
                    label="Ngày Sinh"
                    rules={[
                      {
                        required: true,
                        message: "Chọn ngày sinh của bạn",
                      },
                      {
                        validator: (_, value) =>
                          value && value.isAfter(moment().endOf('day'))
                            ? Promise.reject(
                                new Error("Ngày sinh không được là ngày hiện tại hoặc tương lai")
                              )
                            : Promise.resolve(),
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Ngày Sinh"
                      style={{ width: "100%" }}
                      format={dateFormat}
                      disabledDate={(current) =>
                        current && current >= moment().endOf('day')
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    required
                    label="Số Điện Thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập số điện thoại của bạn",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Số Điện Thoại chỉ được chứa số",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Địa Chỉ"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập địa chỉ của bạn",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Giới Tính"
                    name="gender"
                    rules={[
                      { required: true, message: "Chọn Giới Tính của bạn" },
                    ]}
                  >
                    <Select placeholder="Chọn Giới Tính của bạn">
                      <Option value="MALE">Nam</Option>
                      <Option value="FEMALE">Nữ</Option>
                      <Option value="OTHER">khác</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    required
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Hãy Nhập Email của bạn",
                      },
                      {
                        type: "email",
                        message: "Hãy Nhập đúng Email",
                      },
                      {
                        pattern: /^([a-zA-Z0-9@.])*$/,
                        message: "Mật khẩu của bạn không được chứa ký tự đặc biệt",
                      },
                    ]}
                  >
                    <Input required />
                  </Form.Item>
                  <Form.Item
                    required
                    label="Mật Khẩu"
                    name="password"
                    rules={[
                      {
                        min: 6,
                        message: "Mật khẩu của bạn phải chứa ít nhất 6 ký tự",
                      },
                      {
                        pattern: /^([a-zA-Z0-9])*$/,
                        message: "Mật khẩu của bạn phải không có ký tự đặc biệt",
                      },
                      {
                        required: true,
                        message: "Hãy nhập Mật Khẩu của bạn!",
                      },
                    ]}
                  >
                    <Input type="password" />
                  </Form.Item>
                  <Form.Item
                    dependencies={["password"]}
                    required
                    label="Xác nhận mật khẩu"
                    name="confirm"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Hãy Xác Nhận lại mật khẩu của bạn",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật Khẩu xác nhận bạn nhập sai")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input type="password" required />
                  </Form.Item>

                  <Button onClick={handleClickSubmit} className="form-button ">
                    Đăng Ký
                  </Button>
                </Form>
              </div>
              <p className="mb-1 pb-lg-2 " style={{ color: "#393f81" }}>
                Bạn đã có tài khoản?{" "}
                <Link
                  to={routes.login}
                  style={{ color: "#393f81" }}
                  className="link-to"
                >
                  Đăng Nhập Ngay
                </Link>
              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default RegisterPageCard;
