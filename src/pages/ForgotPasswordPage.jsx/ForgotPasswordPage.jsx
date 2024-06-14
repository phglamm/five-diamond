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
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/features/counterSlice";

function ForgotPasswordPage() {
  const [form] = useForm();
  function hanldeClickSubmit() {
    form.submit();
  }
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  async function handleSubmit(value) {
    console.log(value);
    try {
      const response = await axios.post(
        "http://157.245.145.162:8080/api/forgot-password",
        value
      );
      const userData = { email };
      dispatch(login(userData));
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
                  onFinish={handleSubmit}
                  id="form"
                  className="form-main"
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
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  {/* Terms of use. */}
                </a>
                <a href="#!" className="small text-muted">
                  {/* Privacy policy */}
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
