import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import "./ProductDetailPage.css";
import product6 from "../../../public/assets/images/product/product6.png";
import product6a from "../../../public/assets/images/product/product6a.png";
import { Rating } from "@mui/material";
import { Button, InputNumber, Select } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import ProductCard from "../../components/productCard/productCard";

export default function ProductPage(props) {
  const onChange = (value) => {
    console.log("changed", value);
  };
  const [size, setSize] = useState("large"); // default is 'middle'
  return (
    <div>
      <Header />
      <Container>
        <div className="product-detail">
          <div>
            <img src={product6} />
            <img src={product6a} />
          </div>
          <div>
            <h4 className="product-title">NHẪN ĐÍNH HÔN KIM CƯƠNG ERN311W</h4>
            <p>MÃ SẢN PHẨM:ERN311W</p>
            <Rating />
            <p style={{ color: "red" }}>44,520,000đ</p>
            <p>
              *Giá có thể thay đổi tùy thuộc vào kích thước và trọng lượng thực
              tế của sản phẩm.
            </p>
            <p>CÒN 3 SẢN PHẨM</p>
            <h5>TÙY CHỈNH SẢN PHẨM</h5>
            <div className="select-material">
              <p>Chất liệu</p>
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
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
                  },
                ]}
              />
            </div>
            <div className="select-quantity">
              <p>Số lượng</p>
              <InputNumber
                size="small"
                min={1}
                max={10}
                defaultValue={""}
                onChange={onChange}
              />
            </div>
            <div className="select-size">
              <p>Size</p>
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
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
                  },
                ]}
              />
              <p>Hướng dẫn đo ni</p>
            </div>
            <div className="button-buy">
              <Button type="primary" icon={<ShoppingOutlined />} size={size} c>
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
            img={product6}
            price={40000000}
            text={"Nhẫn kim cương ABCXYZ123456"}
          />
        </div>
        <div className="relevant-productcard">
          <ProductCard
            img={product6}
            price={40000000}
            text={"Nhẫn kim cương ABCXYZ123456"}
          />
        </div>
        <div className="relevant-productcard">
          <ProductCard
            img={product6}
            price={40000000}
            text={"Nhẫn kim cương ABCXYZ123456"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
