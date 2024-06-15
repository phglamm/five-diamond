import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./ForgotPassword.css";

import { routes } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import api from "../../config/axios";
import { toast } from "react-toastify";

function ForgotPasswordPage() {
  const [form] = useForm();
  function hanldeClickSubmit() {
    form.submit();
  }

  async function ForgotPassword(value) {
    console.log(value);
    try {
      const response = await api.post("forgot-password", value);
      console.log(response);
      toast.success("Đã gửi yêu cầu đến Email của bạn");
    } catch (error) {
      toast.success("Có sự cố khi gửi yêu cầu đến Email của bạn");
      console.log(error.response.data);
    }
  }
  return (
    <MDBContainer className="my-5">
      <MDBCard className="form-card">
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={"https://drive.google.com/thumbnail?id=18Hcw8NVoxtHI0xR1uanZse_ip6F6bGJ6&sz=w1000"}
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
                <img src={"https://drive.google.com/thumbnail?id=1TID9g_LphvHeN1htPBH_0zoxe0o1CqaE&sz=w1000"} alt="" className="form-logo" />
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
                  onFinish={ForgotPassword}
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

                <Link
                  to={routes.changePassword}
                  style={{ color: "#393f81" }}
                  className="link-to"
                >
                  Đổi Mật Khẩu
                </Link>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ForgotPasswordPage;
