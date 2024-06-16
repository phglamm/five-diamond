import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./ChangePassword.css";
import { routes } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import api from "../../config/axios";
import { toast } from "react-toastify";

function ChangePasswordPage() {
  const navigate = useNavigate();

  const [form] = useForm();
  function hanldeClickSubmit() {
    form.submit();
  }

  async function ChangePassword(value) {
    console.log(value);
    try {
      const response = await api.post("reset-password", value);
      console.log(response);
      toast.success("Thay đổi mật khẩu thành công");
      navigate(routes.login);
    } catch (error) {
      toast.error("Đã có lỗi khi thay đổi mật khẩu");

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
                Thay Đổi mật khẩu
              </h5>
              <div className="form">
                <Form
                  form={form}
                  onFinish={ChangePassword}
                  id="form"
                  className=""
                >
                  <Form.Item
                    label="Mật Khẩu Mới"
                    name="password"
                    rules={[
                      {
                        min: 6,
                        message: "Mật khẩu của bạn phải chứa ít nhất 6 ký tự",
                      },
                      {
                        pattern: /^([a-z]|[A-Z]|[0-9])*$/,

                        message:
                          "Mật khẩu của bạn phải không có ký tự đặc biệt",
                      },
                      {
                        required: true,
                        message: "Hãy nhập Mật Khẩu của bạn!",
                      },
                    ]}
                  >
                    <Input type="password" required />
                  </Form.Item>
                  {/* <Form.Item
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
                  </Form.Item> */}
                  <Button onClick={hanldeClickSubmit} className="form-button">
                    Xác Nhận
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
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ChangePasswordPage;
