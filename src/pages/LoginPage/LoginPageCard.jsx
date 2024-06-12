import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./LoginPageCard.css";
import logobanner from "../../../public/assets/images/LoginBanner/loginbanner.jpg";
import logo from "../../../public/assets/images/Logo/logo.png";
import { routes } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/features/counterSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import api from "../../config/axios";

function LoginPageCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [form] = useForm();
  const navigate = useNavigate();
  function hanldeClickSubmit() {
    form.submit();
  }

  async function handleSubmit(value) {
    console.log(value);
    try {
      const response = await api.post("login", value).then((userApi) => {
        console.log(userApi);
        console.log(userApi.data);
        localStorage.setItem("token", userApi.data.token);

        if (userApi.data.role === "CUSTOMER") {
          navigate(routes.home);
        } else if (userApi.data.role === "ADMIN") {
          navigate(routes.adminDiamond);
        } else if (userApi.data.role === "SALES") {
          navigate(routes.home);
        } else if (userApi.data.role === "DELIVERY") {
          navigate(routes.home);
        }
        dispatch(login(userApi.data));
      });
    } catch (error) {
      setError("Tài khoản hoặc mật khẩu của bạn không đúng");
      console.log(error.response.data);
    }
  }

  const handleLoginGG = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = result.user.accessToken;
        const response = await api.post("login-google", { token: token });
        console.log(response.data);
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        if (response.data.role === "CUSTOMER") {
          navigate(routes.home);
        }
        dispatch(login(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="background-login">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={logobanner}
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
                  <img src={logo} alt="" className="form-logo" />
                  <span className="h1 fw-bold mb-0">Five Diamond</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Đăng Nhập
                </h5>
                <div className="form">
                  <Form
                    form={form}
                    onFinish={handleSubmit}
                    id="form"
                    className="form-login"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Hãy Nhập Email của bạn",
                        },
                        {
                          type: "email",
                          message: "Hãy Nhập Email đúng",
                        },
                      ]}
                    >
                      <Input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Mật Khẩu"
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
                      <Input
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>
                    {error && <div>{error}</div>}
                    <Button onClick={hanldeClickSubmit} className="form-button">
                      Đăng Nhập
                    </Button>
                    <p>Hoặc</p>
                  </Form>
                  <div className="google-btn-container">
                    <button onClick={handleLoginGG} className="google-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 262"
                      >
                        <path
                          fill="#4285F4"
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        ></path>
                        <path
                          fill="#34A853"
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        ></path>
                        <path
                          fill="#FBBC05"
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                        ></path>
                        <path
                          fill="#EB4335"
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        ></path>
                      </svg>
                      Đăng nhập bằng Google
                    </button>
                  </div>
                </div>

                <Link to={routes.forgot} className="small text-muted link-to">
                  Quên Mật Khẩu ?
                </Link>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Bạn chưa có tài khoản ?{" "}
                  <Link
                    to={routes.register}
                    style={{ color: "#393f81" }}
                    className="link-to"
                  >
                    Đăng Ký
                  </Link>
                </p>

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
    </div>
  );
}

export default LoginPageCard;
