import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductDetailPage.css";
import { Button, Form, Input, Modal, Select } from "antd";
import {
  PushpinOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import ProductCard from "../../components/productCard/productCard";
import ProductReview from "../../components/ProductReview/ProductReview"; //(nam)

import { useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { routes } from "../../routes";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  selectUser,
  updateUser,
} from "../../redux/features/counterSlice";

export default function ProductPage({ token }) {
  const [form] = useForm();


  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [product, setProduct] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [relevantproduct, setRelevantproduct] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const user = useSelector(selectUser);

  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const ringsize = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]


  useEffect(() => {
    async function fetchProductLineById() {
      try {
        const response = await api.get(`product-line/${id}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchProductLineById(id);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get("product-line");
        // setRelevantproduct(response.data);
        setRelevantproduct(response.data.slice(0, 5)); // Only take the first 5 products

      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchProduct();
  }, []);


  async function fetchCart() {
    try {
      const response = await api.get("cart");
      console.log(response.data);
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.productLine.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shippingCost =
    appliedDiscount && appliedDiscount.type === "shipping"
      ? appliedDiscount.value
      : 0;
  const discountAmount = appliedDiscount
    ? appliedDiscount.type === "percentage"
      ? (total * appliedDiscount.value) / 100
      : appliedDiscount.type === "fixed"
        ? appliedDiscount.value
        : 0
    : 0;

  const finalTotal = total - discountAmount + shippingCost;




  const firstFiveProducts = relevantproduct.slice(0, 5);

  if (!product) {
    return (
      <div>
        <Header />
        <Container>
          <p style={{ fontSize: '2rem' }}>Sản phẩm không tồn tại</p>
          <Button onClick={() => { navigate("/") }}>Quay về trang chủ</Button>
        </Container>
        <Footer />
      </div>

    )
  }
  const handleClickAddToCart = async () => {
    try {
      console.log("Product added to cart", id);
      const response = await api.post(`cart/${id}`);
      console.log(response.data);
      fetchCart();
      toast.success("Thêm Vào Giỏ Hàng");
    } catch (error) {
      console.log(error.response.data);
      toast.error("Có lỗi trong lúc thêm sản phẩm");
    }
  };
  const handleBuyNow = async () => {
    handleClickAddToCart();
    const cartItems = [{ productLine: product, quantity: 1 }];
    const finalTotal = product.price;

    try {
      const response = await api.get("cart/check");
      console.log(response);
      navigate(routes.checkout, { state: { cartItems, finalTotal } });
    } catch (error) {
      toast.error(error.response.data);
      console.log(error.response.data);
    }
  };

  const handleClickBuyNow = () => {
    if (selectedSize) {
      navigate('/tien-hanh-thanh-toan', {
        state: {
          cartItems: [{ productLine: product, quantity: 1 }],
          finalTotal: product.price
        }
      });
    } else {
      toast.error("Bạn Chưa Chọn Size cho sản phẩm");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  return (
    <div>
      <Header />
      <Container>
        <div className="product-detail">
          <div className="product-detail-img">
            <img
              src={product.imgURL}
              alt="Product"
              style={{ width: "400px" }}
            />
          </div>
          <div>
            <h4 className="product-title">{product.name}</h4>
            <p>MÃ SẢN PHẨM: {product.id}</p>
            <p style={{ color: "red" }}>
              {product == undefined ? "" : product.price.toLocaleString()}đ
            </p>
            <p>Mô tả: {product.description}</p>
            <p>
              *Giá có thể thay đổi tùy thuộc vào kích thước và trọng lượng thực
              tế của sản phẩm.
            </p>
            <p>CÒN {product.quantity} SẢN PHẨM</p>
            <h5>TÙY CHỈNH SẢN PHẨM</h5>
            <div className="select-material"></div>
            *Vì mỗi sản phẩm không cố định ni nên quý khách vui lòng
            ghi phần ni mong muốn vào phần ghi chú
            hoặc liên hệ 0123456789 nếu quý khách có thắc mắc
            <div className="select-size">
              {/* <p>Kích Thước</p>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={handleSizeChange}
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              options={product.size.map((size) => ({
                value: size,
                label: size,
              }))}
              >
                {product.map((item) => (
                  <Select.Option key={item.id} value={item.size}>
                    {item.size}
                  </Select.Option>
                ))}
                {ringsize.map((size) => (
                  <Select.Option key={size} value={size}>
                    {size}
                  </Select.Option>
                ))}
              </Select> */}
              <Button
                onClick={showModal}
                style={{
                  color: "black",
                  border: "none",
                  padding: "8px 16px",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                }}
                icon={<PushpinOutlined />}
              >
                Hướng dẫn đo ni
              </Button>
              <Modal
                title="Hướng dẫn đo ni"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
                className="size-guide-modal"
                footer={null}
              >
                <p>
                  Với trang sức, nhẫn là sản phẩm thường phải sửa nhiều nhất cho
                  phù hợp với cỡ tay của người sử dụng. Một chiếc nhẫn vừa vặn
                  sẽ cho bạn cảm giác tự tin thoải mái khi đeo. Trong trường hợp
                  không thể đến cửa hàng lựa chọn, bạn hoàn toàn có thể đo được
                  size nhẫn của mình bằng những bước gợi ý đơn giản từ Five
                  Diamond sau đây:
                </p>
                <p>Bước 1: Cắt một sợi len hoặc giấy bản nhỏ.</p>
                <p>
                  Bước 2: Dùng len hoặc giấy bản nhỏ vừa cắt rời quấn quanh khu
                  vực trên ngón tay mà bạn muốn đeo nhẫn.
                </p>
                <p>Bước 3: Đánh dấu điểm giao nhau</p>
                <p>
                  Bước 4:Dùng thước đo chiều dài mẩu giấy vừa thực hiện, sau đó
                  lấy kết quả bạn vừa đo được chia cho 3.14 để tìm ra đường kính
                  của nhẫn.
                </p>
                <p>
                  Bước 5:Cuối cùng, lấy đường kính nhẫn vừa đo được so với kích
                  thước đường kính của bảng kích thước nhẫn quy chuẩn. Bạn sẽ
                  nhận được size nhẫn của mình.
                </p>
                <img
                  className="size-choosing-img"
                  src={
                    "https://drive.google.com/thumbnail?id=1xCS9OToUFLLRJ1BsklepFRTb32LBgTgI&sz=w1000"
                  }
                />
                <p>
                  Lưu ý: Cỡ tay có thể thay đổi, tùy thuộc vào thời điểm trong
                  ngày hoặc thời tiết. Ví dụ, buổi sáng cỡ tay có thể nhỏ hơn vì
                  tay chưa ấm và thời tiết cũng lạnh hơn; cuối ngày cỡ tay có
                  thể lớn hơn do hoạt động trong ngày. Vì vậy, bạn nên đo size
                  tay khoảng 3 – 4 lần vào các thời điểm khác nhau trong ngày để
                  có kết quả chính xác nhất. Nếu size nhẫn của bạn nằm giữa 2
                  số, bạn nên chọn số lớn hơn.
                </p>
                <p>
                  Trong trường hợp khớp xương ngón tay của bạn to, bạn nên đo
                  chu vi ở gần khớp (không phải trên khớp) sao cho khi bạn đeo
                  nhẫn thì nhẫn dễ vào và không bị tuột mất.
                </p>
              </Modal>
            </div>
            <div className="button-buy">
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={handleClickAddToCart}
                className="button-addtocart"
                style={{ fontWeight: "bold", width: "50%" }}
              >
                THÊM VÀO GIỎ HÀNG
              </Button>
              <Button
                type="primary"
                icon={<ShoppingOutlined />}
                onClick={handleClickBuyNow}
                className="button-buybuy"
                onClick={handleBuyNow}
                style={{ fontWeight: "bold", width: "50%" }}
              >
                MUA NGAY
              </Button>
            </div>
          </div>
        </div>
        <h5 className="header-product-info">THÔNG TIN SẢN PHẨM</h5>
        <div className="product-detail-stat">
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Loại sản phẩm:</p>
            <p>{product.category?.name}</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Đá chính:</p>
            <p>{product.shape}</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Carat:</p>
            <p>{product.carat}</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Độ tinh khiết:</p>
            <p>{product.clarity}</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Chất liệu:</p>
            <p>
              {product.metal} {product.karat}
            </p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Hình dáng:</p>
            <p>{product.shape}</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Độ cắt:</p>
            <p>{product.cut}</p>
          </div>
          <div className="info-detail">
            <p style={{ fontWeight: "bold" }}>Màu:</p>
            <p>{product.color}</p>
          </div>
        </div>

        <ProductReview productLineId={id} />


        <h5 className="header-relevant-product">CÁC SẢN PHẨM TƯƠNG TỰ</h5>
        <Row>
          {firstFiveProducts.map((item, index) => (
            <Col key={index} className="product-card-item">
              <ProductCard
                img={item.imgURL}
                text={item.name}
                price={item.price.toLocaleString() + "đ"}
                pageType="guest-page"
                id={item.id}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
