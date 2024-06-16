import React, { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Ninja from "../../../public/assets/images/Avatar/NinjaAvatar.png";
import "./ProfilePage.css";
import BasicButton from "../../components/Button/myButton";
import { Link } from "react-router-dom";
import InputTextField from "../../components/TextField/TextField";
import ReadDatePickers from "../../components/Button/DatePicker";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import uploadFile from "../../utils/upload";
function ProfilePage() {
  const user = useSelector(selectUser);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [defaultImage, setDefaultImage] = useState(
    "https://drive.google.com/thumbnail?id=19wLUvys3Ds_UAdufRkwYbhjEq2Gbmdfo&sz=w1000"
  );

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);

    const url = await uploadFile(file);
    console.log(url);
  };

  const handleUpdateClick = () => {};

  return (
    <div>
      <Header></Header>
      <div className="avatar-user">
        <div onClick={handleImageClick} className="img-avt">
          {image ? (
            <img id="avt-img" src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img id="avt-img" src={defaultImage} alt="Default Avatar" />
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
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
            <label>Họ: </label>
            <InputTextField text={user.firstname} />
          </div>
          <div className="input">
            <label>Họ tên:</label>
            <InputTextField text={user.lastname} />
          </div>
          <div className="input">
            <label>Giới tính:</label>
            <InputTextField text={user.gender} />
          </div>
          <div className="input">
            <label>Ngày sinh:</label>
            <ReadDatePickers date={user.dob} />
          </div>
          <div className="input">
            <label>Số điện thoại:</label>
            <InputTextField text={user.phone} />
          </div>
          <div className="input">
            <label>Địa chỉ:</label>
            <InputTextField text={user.address} />
          </div>
        </div>
        <Link to="">
          <BasicButton text={"Chỉnh sửa thông tin"} />
        </Link>
      </div>
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
