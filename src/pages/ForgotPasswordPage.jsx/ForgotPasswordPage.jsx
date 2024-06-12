import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./ForgotPassword.css";
import forgotbanner from "../../../public/assets/images/LoginBanner/forgotbanner.jpg";

import logo from "../../../public/assets/images/Logo/logo.png";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";

function ForgotPasswordPage() {
  const [form] = useForm();
  function hanldeClickSubmit() {
    form.submit();
  }

  async function handleSubmit(value) {
    console.log(value);
    try {
      const response = await axios.post(
        "http://157.245.145.162:8080/api/forgot-password",
        value
      );
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <MDBContainer className="my-5">
      <MDBCard className="form-card">
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={forgotbanner}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <Link to={routes.home} className="form-comeback ">
                <i
                  className="pi pi-arrow-circle-left"
                  style={{ fontSize: "2rem" }}
                ></i>
                <span className="">Quay Lại Trang Chủ</span>
              </Link>
              <div className="d-flex flex-row mt-2 form-header">
                <img src={logo} alt="" className="form-logo" />
                <span className="h1 fw-bold mb-0">Five Diamond</span>
              </div>

              <h5
                className="fw-normal my-1 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Quên mật khẩu
              </h5>
              <div className="form">
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  id="form"
                  className=""
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Hãy nhập email của bạn",
                      },
                    ]}
                  >
                    <Input type="email" required />
                  </Form.Item>
                  <Button onClick={hanldeClickSubmit} className="form-button">
                    Gửi Đi
                  </Button>
                </Form>
              </div>
              <div className="form-end">
                <Link
                  to={routes.login}
                  style={{ color: "#393f81" }}
                  className="link-to"
                >
                  Quay lại đăng nhập
                </Link>

                <Link
                  to={routes.register}
                  style={{ color: "#393f81" }}
                  className="link-to"
                >
                  Đăng ký tài khoản mới
                </Link>

                <a
                  to={routes.changePassword}
                  style={{ color: "#393f81" }}
                  className="link-to"
                >
                  Đổi Mật Khẩu
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ForgotPasswordPage;
