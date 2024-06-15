import React, { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProfilePage.css";
import BasicButton from "../../components/Button/myButton";
import { Link } from "react-router-dom";
import InputTextField from "../../components/TextField/TextField";
import ReadDatePickers from "../../components/Button/DatePicker";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import uploadFile from "../../utils/upload";
import { Modal, Button, Input } from "antd";

function ProfilePage() {
  const user = useSelector(selectUser);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null); // State cho ảnh người dùng
  const [visible, setVisible] = useState(false); // State để điều khiển hiển thị modal
  const [formValues, setFormValues] = useState({
    firstname: user.firstname,
    gender: user.gender,
    dob: user.dob,
    phone: user.phone,
    address: user.address,
  });

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
    setVisible(true); // Mở modal khi nhấn vào nút "Chỉnh sửa thông tin"
  };

  const handleModalCancel = () => {
    setVisible(false); // Đóng modal khi nhấn hủy
  };

  const handleModalOk = () => {
    // Xử lý khi người dùng xác nhận cập nhật thông tin
    setVisible(false); // Đóng modal sau khi cập nhật thành công
    // Các xử lý khác sau khi xác nhận
    console.log("Form values:", formValues);
    // Thực hiện logic cập nhật dữ liệu ở đây
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div>
      <Header />
      <div className="avatar-user">
        <div onClick={handleImageClick} className="img-avt">
          {image ? (
            <img id="avt-img" src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img
              id="avt-img"
              src={user.avatar || "https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000"}
              alt="Default Avatar"
            />
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <button className="update-img-btn" onClick={handleUpdateClick}>
          Cập nhật ảnh
        </button>
      </div>

      <div className="info">
        <div className="info-text">
          <h3>Thông tin cá nhân</h3>
          <div className="input">
            <label>Họ và tên:</label>
            <InputTextField
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Giới tính:</label>
            <InputTextField
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Ngày sinh:</label>
            <ReadDatePickers
              name="dob"
              value={formValues.dob}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Số điện thoại:</label>
            <InputTextField
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Địa chỉ:</label>
            <InputTextField
              name="address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="primary" onClick={handleEditInfoClick}>
          Chỉnh sửa thông tin
        </Button>
      </div>

      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        visible={visible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Lưu
          </Button>,
        ]}
      >
        <div className="modal-content">
          <div className="input">
            <label>Họ và tên:</label>
            <Input
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Giới tính:</label>
            <Input
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Ngày sinh:</label>
            <ReadDatePickers
              name="dob"
              value={formValues.dob}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Số điện thoại:</label>
            <Input
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Địa chỉ:</label>
            <Input
              name="address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>

      <div className="info">
        <div>
          <h3>Thông tin tài khoản</h3>
          <div className="input">
            <label>Tài khoản:</label>
            <InputTextField text={user.email} disabled />
          </div>
          <div className="input">
            <label>Mật khẩu:</label>
            <InputTextField text={user.password} disabled />
          </div>
        </div>
        <Link to="">
          <BasicButton text={"Đổi mật khẩu"} />
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
