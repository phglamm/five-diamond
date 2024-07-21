import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  selectUser,
  updateUser,
} from "../../redux/features/counterSlice";
import { routes } from "../../routes";
import { Modal, Button, Input, DatePicker, Form, Select } from "antd";
import api from "../../config/axios";
import dayjs from "dayjs";
import { EditOutlined, LockOutlined, FormOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { Container } from "react-bootstrap";

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      dispatch(updateUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setImage(file);
    // Đoạn này bạn có thể thực hiện các xử lý khác như upload file lên server
  };

  const handleUpdateClick = () => {
    // Xử lý cập nhật hình ảnh và logic tương tự ở đây
  };

  const handleEditInfoClick = () => {
    setVisible(true);
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function handleClickSave() {
    form.submit();
  }

  const handleUpdateProfile = async (value) => {
    // console.log(value);
    try {
      const response = await api.put(`/user/${user.id}`, value);
      // console.log(response.data);
      dispatch(login(response.data));
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const dateOnChange = (date, dateString) => {
    // console.log(date, dateString);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Utility function to get default field value
  function getDefaultFieldValue(field, placeholder) {
    return user && user[field] ? user[field] : placeholder;
  }

  const fullName = [user.firstname, user.lastname].filter(Boolean).join(" ");

  return (
    <div>
      <Header />
      <Container className="profile-page-container">
        <div className="avatar-user">
          <div className="profile-img-avt">
            <div onClick={handleImageClick} className="img-avt">
              {user.gender === "MALE" ? (
                <img
                  id="avt-img"
                  src="https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000"
                  alt="Male Avatar"
                />
              ) : (
                <img
                  id="avt-img"
                  src="https://drive.google.com/thumbnail?id=1-TZW7Js2ujLNyIXbYEEeiJfegVGgpjfd&sz=w1000"
                  alt="Female Avatar"
                />
              )}

              {/* <button className="update-img-btn" onClick={handleUpdateClick}>
                <EditOutlined />
              </button> */}
            </div>
          </div>

          <button className="update-info-btn" onClick={handleEditInfoClick}>
            <FormOutlined className="icon" />
            Chỉnh sửa thông tin
          </button>

          <Link className="change-password-btn" to={routes.changePassword}>
            <LockOutlined className="icon" />
            Đổi mật khẩu
          </Link>
        </div>

        <div className="container">
          <div className="profile-info">
            <div className="col-md-6 info">
              <div className="info-text">
                <h3>Thông tin cá nhân</h3>
                <div className="info-box">
                  <p>Họ và tên</p>
                  <div className="info-value">{fullName}</div>
                </div>
                <div className="info-box">
                  <p>Ngày sinh</p>
                  <div className="info-value">
                    {user.dob ? formatDate(user.dob) : "Cần cập nhật"}
                  </div>
                </div>
                <div className="info-box">
                  <p>Giới tính</p>
                  <div className="info-value">
                    {user.gender === "MALE"
                      ? "Nam"
                      : user.gender === "FEMALE"
                      ? "Nữ"
                      : "Khác"}
                  </div>
                </div>
                <div className="info-box">
                  <p>Số điện thoại</p>
                  <div className="info-value">
                    {getDefaultFieldValue("phone", "Cần cập nhật")}
                  </div>
                </div>
                <div className="info-box">
                  <p>Địa chỉ</p>
                  <div className="info-value">
                    {getDefaultFieldValue("address", "Cần cập nhật")}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 info-change-password">
              <div className="info-text">
                <h3>Thông tin tài khoản</h3>
                <div className="info-box">
                  <p>Email</p>
                  <div className="info-value">{user.email}</div>
                </div>

                <div className="info-box">
                  <p>Reward point</p>
                  <div className="info-value">
                    {user.rewardPoint.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Chỉnh sửa thông tin cá nhân"
          visible={visible}
          onOk={handleUpdateProfile}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleClickSave}>
              Lưu
            </Button>,
          ]}
        >
          <div className="info-edit-form">
            <Form
              layout="horizontal"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 20 }}
              style={{ width: "100%" }}
              form={form}
              onFinish={handleUpdateProfile}
            >
              <Form.Item
                label="Họ"
                name="lastname"
                style={{ width: "100%" }}
                initialValue={user.lastname}
              >
                <Input placeholder="Họ" />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="firstname"
                style={{ width: "100%" }}
                initialValue={user.firstname}
              >
                <Input placeholder="Tên" />
              </Form.Item>
              <Form.Item
                label="Giới tính"
                name="gender"
                initialValue={user.gender}
              >
                <Select placeholder="Chọn Giới Tính của bạn">
                  <Select.Option value="MALE">Nam</Select.Option>
                  <Select.Option value="FEMALE">Nữ</Select.Option>
                  <Select.Option value="OTHER">khác</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Giới tính"
                name="gender"
                initialValue={user.gender}
              >
                <Input placeholder="Giới tính" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                initialValue={user.phone}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item
                label="Ngày sinh"
                name="dob"
                initialValue={dayjs(user.dob)}
              >
                <DatePicker
                  style={{ width: "100%", marginBottom: "5px" }}
                  onChange={dateOnChange}
                />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                initialValue={user.address}
              >
                <Input placeholder="Địa chỉ" />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </Container>

      <Footer />
    </div>
  );
}

export default ProfilePage;
