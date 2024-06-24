import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ProfilePage.css";
import BasicButton from "../../components/Button/myButton";
import { Link } from "react-router-dom";
import InputTextField from "../../components/TextField/TextField";
import ReadDatePickers from "../../components/Button/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUser } from "../../redux/features/counterSlice";
import { Modal, Button, Input } from "antd";
import api from "../../config/axios";

function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);

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

  const handleModalOk = async () => {
    try {
      await api.put(`/api/user/${user.id}`, user);
      setVisible(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateUser({ ...user, [name]: value }));
  };

  return (
    <div>
      <Header />
      <Header />
      <div className="avatar-user">

        <div onClick={handleImageClick} className="img-avt">
          {console.log(user.gender === "MALE")}
          {console.log(user.gender)}
          {user.gender === "MALE" ? (
            <img id="avt-img" src="https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000" alt="Male Avatar" />
          ) : (
            <img id="avt-img" src="https://drive.google.com/thumbnail?id=1-TZW7Js2ujLNyIXbYEEeiJfegVGgpjfd&sz=w1000" alt="Female Avatar" />
          )}
          {/* {image ? (
            <img id="avt-img" src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img id="avt-img" src="https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000" alt="Default Avatar" />
            <img id="avt-img" src="https://drive.google.com/thumbnail?id=1qbgOEeSmZUjLlvazltYvqIWl58ds3Rwr&sz=w1000" alt="Default Avatar" />
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          /> */}
        </div>
        <button className="update-img-btn" onClick={handleUpdateClick}>
          Cập nhật
        </button>
      </div>

      {/* useEffect(() => {
    const savedImage = localStorage.getItem('userImage');
    if (savedImage) {
      setDefaultImage(savedImage);
    } else {
      setDefaultImage(Ninja);
    }
  }, []);
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  const handleUpdateClick = () => {
    if (image) {
      const newDefaultImage = URL.createObjectURL(image);
      setDefaultImage(newDefaultImage);
      localStorage.setItem('userImage', newDefaultImage);
      setImage(null);
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div>
      <Header></Header>
      <div className="avatar-user">
        <div onClick={handleImageClick} className="img-avt">
          <img id="avt-img" src={image ? URL.createObjectURL(image) : defaultImage} alt="Avatar" />
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <button className="update-img-btn" onClick={handleUpdateClick}>Cập nhật</button>
      </div> */}

      <div className="info">
        <div className="info-text">
          <h3>Thông tin cá nhân</h3>
          <div className="input">
            <label>Họ và tên:</label>
            <InputTextField
              name="firstname"
              text={user.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Giới tính:</label>
            <InputTextField
              name="gender"
              text={user.gender}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Ngày sinh:</label>
            <ReadDatePickers
              name="dob"
              text={user.dob}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Số điện thoại:</label>
            <InputTextField
              name="phone"
              text={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Địa chỉ:</label>
            <InputTextField
              name="address"
              text={user.address}
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
              value={user.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Giới tính:</label>
            <Input name="gender" value={user.gender} onChange={handleChange} />
          </div>
          <div className="input">
            <label>Ngày sinh:</label>
            <ReadDatePickers
              name="dob"
              value={user.dob}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label>Số điện thoại:</label>
            <Input name="phone" value={user.phone} onChange={handleChange} />
          </div>
          <div className="input">
            <label>Địa chỉ:</label>
            <Input
              name="address"
              value={user.address}
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
            <InputTextField text={user.email} />
          </div>
          <div className="input">
            <label>Mật khẩu:</label>
            <InputTextField text={user.password} />
          </div>
        </div>
        <Link to="">
          <BasicButton text={"Đổi mật khẩu"} />
        </Link>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ProfilePage;
