import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import "./ProductDetailPage.css";
import { Rating } from "@mui/material";
import { Button, InputNumber, Modal, Select } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import ProductCard from "../../components/productCard/productCard";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import productData from "../ProductPage/productData";


export default function ProductPage() {
  const navigate = useNavigate()
  const handleClickBuy = () => {
    navigate(routes.cart)
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const onChange = (value) => {
  //   console.log("changed", value);
  // };
  const [size, setSize] = useState("large"); // default is 'middle'
  return (
    <div>
      <Header />
      <Container>
        <div className="product-detail">
          <div>
            <img src={productData.image} alt="Product" />
            <img src={productData.image1} alt="Product" />
            {/* <img src={"https://drive.google.com/thumbnail?id=1t8ScW3X5vy3SmznuT2rntrd7JYFx_-u_&sz=w1000"} />
            <img src={"https://drive.google.com/thumbnail?id=10QO3_Hg0lx-1qk5o1VcEGovjCXmVNvOq&sz=w1000"} /> */}
          </div>
          <div>
            <h4 className="product-title">{productData.name}</h4>
            <p>MÃ SẢN PHẨM: {productData.code}</p>
            <Rating />
            <p style={{ color: "red" }}>{productData.price.toLocaleString()}đ</p>
            <p>Mô tả: {productData.description}</p>
            <p>
              *Giá có thể thay đổi tùy thuộc vào kích thước và trọng lượng thực
              tế của sản phẩm.
            </p>
            <p>CÒN {productData.quantity} SẢN PHẨM</p>
            <h5>TÙY CHỈNH SẢN PHẨM</h5>
            <div className="select-material">
            </div>
            <div className="select-size">
              <p>Kích Thước</p>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={productData.size.map((size, index) => ({
                  value: index + 1,
                  label: size,
                }))}
              />
              <Button type="primary" onClick={showModal}>
                Hướng dẫn đo ni
              </Button>
              <Modal
                title="Hướng dẫn đo ni"
                open={isModalOpen} 
                onOk={handleOk}
                onCancel={handleCancel}
                bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
                className="size-guide-modal"
              >
                <p>Với trang sức, nhẫn là sản phẩm thường phải sửa nhiều nhất cho phù hợp với cỡ tay của người sử dụng.
                  Một chiếc nhẫn vừa vặn sẽ cho bạn cảm giác tự tin thoải mái khi đeo. Trong trường hợp không thể đến cửa hàng lựa chọn,
                  bạn hoàn toàn có thể đo được size nhẫn của mình bằng những bước gợi ý đơn giản từ Five Diamond sau đây:
                </p>
                <p>Bước 1: Cắt một sợi len hoặc giấy bản nhỏ.</p>
                <p>Bước 2: Dùng len hoặc giấy bản nhỏ vừa cắt rời quấn quanh khu vực trên ngón tay mà bạn muốn đeo nhẫn.</p>
                <p>Bước 3: Đánh dấu điểm giao nhau</p>
                <p>Bước 4:Dùng thước đo chiều dài mẩu giấy vừa thực hiện,
                  sau đó lấy kết quả bạn vừa đo được chia cho 3.14 để tìm ra đường kính của nhẫn.
                </p>
                <p>Bước 5:Cuối cùng, lấy đường kính nhẫn vừa đo được
                  so với kích thước đường kính của bảng kích thước nhẫn quy chuẩn.
                  Bạn sẽ nhận được size nhẫn của mình.
                </p>
                <img className="size-choosing-img" src={"https://drive.google.com/thumbnail?id=1xCS9OToUFLLRJ1BsklepFRTb32LBgTgI&sz=w1000"} />
                <p>Lưu ý: Cỡ tay có thể thay đổi, tùy thuộc vào thời điểm trong ngày hoặc thời tiết.
                  Ví dụ, buổi sáng cỡ tay có thể nhỏ hơn vì tay chưa ấm và thời tiết cũng lạnh hơn;
                  cuối ngày cỡ tay có thể lớn hơn do hoạt động trong ngày.
                  Vì vậy, bạn nên đo size tay khoảng 3 – 4 lần
                  vào các thời điểm khác nhau trong ngày để có kết quả chính xác nhất.
                  Nếu size nhẫn của bạn nằm giữa 2 số, bạn nên chọn số lớn hơn.
                </p>
                <p>Trong trường hợp khớp xương ngón tay của bạn to,
                  bạn nên đo chu vi ở gần khớp (không phải trên khớp)
                  sao cho khi bạn đeo nhẫn thì nhẫn dễ vào và không bị tuột mất.
                </p>
              </Modal>
            </div>
            <div className="button-buy">
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                size={size} c
                onClick={handleClickBuy}
                className="button-addtocart"
              >
                MUA NGAY
              </Button>
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                size={size} c
                onClick={handleClickBuy}
                className="button-buybuy"
              >
                MUA NGAY
              </Button>
            </div>
          </div>
        </div>
        <h5 className="header-product-info">THÔNG TIN SẢN PHẨM</h5>
        <div className="product-info">
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Loại sản phẩm:</p>
            <p>Nhẫn</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Đá chính:</p>
            <p>Kim cươnng 99 giác cắt</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Chất liệu:</p>
            <p>Vàng 14k</p>
          </div>
        </div>
        <h5 className="header-review">ĐÁNH GIÁ SẢN PHẨM</h5>
      </Container>
      <h3 className="header-relevant-product">CÁC SẢN PHẨM TƯƠNG TỰ</h3>
      <div className="relevant-product-list">
        <div className="relevant-productcard">
          <ProductCard
            img={"https://drive.google.com/thumbnail?id=1t8ScW3X5vy3SmznuT2rntrd7JYFx_-u_&sz=w1000"}
            price={40000000}
            text={"Nhẫn kim cương ABCXYZ123456"}
          />
        </div>
        <div className="relevant-productcard">
          <ProductCard
            img={"https://drive.google.com/thumbnail?id=1t8ScW3X5vy3SmznuT2rntrd7JYFx_-u_&sz=w1000"}
            price={40000000}
            text={"Nhẫn kim cương ABCXYZ123456"}
          />
        </div>
        <div className="relevant-productcard">
          <ProductCard
            img={"https://drive.google.com/thumbnail?id=1t8ScW3X5vy3SmznuT2rntrd7JYFx_-u_&sz=w1000"}
            price={40000000}
            text={"Nhẫn kim cương ABCXYZ123456"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
