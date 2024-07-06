import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Col, Container, Row } from "react-bootstrap";
import "./ProductDetailPage.css";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Popconfirm,
  Pagination,
} from "antd";
import { intlFormatDistance } from "date-fns";
import {
  PushpinOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { IoPersonCircleOutline } from "react-icons/io5";
import ProductCard from "../../components/productCard/productCard";
// import ProductReview from "../../components/ProductReview/ProductReview"; //(nam)

import { useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import { routes } from "../../routes";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

export default function ProductPage({ token }) {
  const [form] = useForm();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [relevantProduct, setRelevantProduct] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { id } = useParams();
  const ringsize = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  //comment component hook
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Added state to manage input value
  const [currentPage, setCurrentPage] = useState(1); // Added state for current page
  const user = useSelector(selectUser);

  //comment function
  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const commentsPerPage = 5;
  const currentComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  //comment api
  async function fetchComments() {
    try {
      const response = await api.get(`comment/${id}`);
      console.log(response.data);
      const sortedComments = response.data.sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );
      setComments(sortedComments);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const handleSendComment = async (value) => {
    const commentPayload = {
      content: value.content,
      accountId: user.id,
      productLineId: id,
    };

    // console.log(value);
    try {
      await api.post("comment", commentPayload);
      fetchComments();
      form.resetFields();
      setInputValue("");
    } catch (error) {
      toast.error("Gửi đánh giá không thành công!", {
        hideProgressBar: true,
      });
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeleteComment = async (id) => {
    await api.delete(`comment/${id}`);
    console.log("Xóa thành công");
    fetchComments();
  };

  useEffect(() => {
    async function fetchProductLineById() {
      try {
        const response = await api.get(`product-line/${id}`);
        console.log(response.data);
        setProduct(response.data);

        if (response.data && response.data.category) {
          fetchRelevantProducts(response.data.category.id, response.data.id);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }

    async function fetchRelevantProducts(categoryId, currentProductId) {
      try {
        const response = await api.get(`product-line?category=${categoryId}`);
        const filteredProducts = response.data.filter(
          (product) =>
            product.category.id === categoryId &&
            product.id !== currentProductId
        );
        setRelevantProduct(filteredProducts.slice(0, 5)); // Chỉ lấy 5 sản phẩm đầu tiên
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchProductLineById();
    fetchComments();
  }, [id]);

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
    (acc, item) => acc + item.productLine.finalPrice * item.quantity,
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

  const firstFiveProducts = relevantProduct.slice(0, 5);

  if (!product) {
    return (
      <div>
        <Header />
        <Container>
          <p style={{ fontSize: "2rem" }}>Sản phẩm không tồn tại</p>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Quay về trang chủ
          </Button>
        </Container>
        <Footer />
      </div>
    );
  }

  const handleClickAddToCart = async () => {
    if (user) {
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
    } else {
      return toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để mua sản phẩm");
      return;
    }
    handleClickAddToCart();
    const cartItems = [{ productLine: product, quantity: 1 }];
    const finalTotal = product.finalPrice;
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
    if (!user) {
      toast.error("Vui lòng đăng nhập để mua sản phẩm");
      return;
    }
    if (selectedSize) {
      navigate("/tien-hanh-thanh-toan", {
        state: {
          cartItems: [{ productLine: product, quantity: 1 }],
          finalTotal: product.finalPrice,
        },
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
              {product == undefined ? "" : product.finalPrice.toLocaleString()}đ
            </p>
            <p>Mô tả: {product.description}</p>
            <p>
              *Giá có thể thay đổi tùy thuộc vào kích thước và trọng lượng thực
              tế của sản phẩm.
            </p>
            <p>CÒN {product.quantity} SẢN PHẨM</p>
            <h5>TÙY CHỈNH SẢN PHẨM</h5>
            <div className="select-material"></div>
            *Vì mỗi sản phẩm không cố định ni nên quý khách vui lòng ghi phần ni
            mong muốn vào phần ghi chú hoặc liên hệ 0123456789 nếu quý khách có
            thắc mắc
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
                {ringSizes.map((size) => (
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
                  Bước 2: Quấn quanh ngón tay cần đo (lưu ý không nên quấn quá
                  chặt hoặc quá lỏng).
                </p>
                <p>Bước 3: Đánh dấu phần len hoặc giấy đã quấn một vòng.</p>
                <p>
                  Bước 4: Đo chiều dài của đoạn len hoặc giấy vừa quấn (bạn sẽ
                  được chu vi của ngón tay).
                </p>
                <p>
                  Bước 5: Cuối cùng, lấy đường kính nhẫn vừa đo được so với kích
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

        {/* <ProductReview productLineId={id} /> */}
        <div className="product-reviews">
          <h5 className="header-review">ĐÁNH GIÁ SẢN PHẨM</h5>
          <div className="comment-all">
            {user ? (
              <>
                <div className="comment-section">
                  <div className="user-icon">
                    <IoPersonCircleOutline />
                  </div>
                  <Form
                    form={form}
                    onFinish={handleSendComment}
                    className="comment-form"
                  >
                    <Form.Item name="content">
                      <Input
                        type="text"
                        placeholder="Hãy để lại đánh giá cho sản phẩm"
                        style={{ width: "400px", marginTop: "25px" }}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                    <Form.Item name="accountId" hidden initialValue={user.id}>
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item name="productLineId" hidden initialValue={id}>
                      <Input
                        type="text"
                        placeholder="Hãy để lại đánh giá cho sản phẩm"
                      />
                    </Form.Item>
                    <div className="buttons">
                      <Button
                        className={`submit ${inputValue ? "active" : ""}`}
                        onClick={() => {
                          form.submit();
                        }}
                        disabled={!inputValue}
                      >
                        <SendOutlined style={{ marginRight: "5px" }} />
                        Gửi
                      </Button>
                    </div>
                  </Form>
                </div>
                {comments.length ? (
                  <div className="reviews">
                    {currentComments.map((comment) => (
                      <div className="review" key={comment.id}>
                        <div className="customer">
                          <IoPersonCircleOutline className="icon" />
                          <span style={{ fontSize: "16px" }}>
                            {comment.account.firstname}{" "}
                            {comment.account.lastname}{" "}
                          </span>
                          <div
                            className="review-meta"
                            style={{ marginLeft: "10px" }}
                          >
                            {intlFormatDistance(comment.createAt, new Date())}
                          </div>
                          {comment.account.id === user.id && (
                            <Popconfirm
                              title="Xóa bình luận"
                              description="Bạn có muốn xóa bình luận không?"
                              onConfirm={() => handleDeleteComment(comment.id)}
                              okText="Có"
                              cancelText="Không"
                            >
                              <p
                                className="delete-comment-button"
                                style={{
                                  marginLeft: "10px",
                                  fontSize: "12px",
                                  color: "red",
                                  width: "28px",
                                }}
                              >
                                Xóa
                              </p>
                            </Popconfirm>
                          )}
                        </div>

                        <div
                          className="comment-content"
                          style={{ marginLeft: "42px" }}
                        >
                          <p style={{ fontSize: "16px" }}>{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Chưa có bình luận về sản phẩm</p>
                )}
                <Pagination
                  current={currentPage}
                  pageSize={commentsPerPage}
                  total={comments.length}
                  onChange={handlePageChange}
                  style={{ marginTop: "20px", textAlign: "center" }}
                />
              </>
            ) : (
              <>
                <p>Chưa có bình luận về sản phẩm</p>
              </>
            )}
          </div>
        </div>

        <h5 className="header-relevant-product">CÁC SẢN PHẨM TƯƠNG TỰ</h5>
        {relevantProduct.length !== 0 ? (
          <Row>
            {relevantProduct.map((item, index) => (
              <Col key={index} className="product-card-item">
                <ProductCard
                  img={item.imgURL}
                  text={item.name}
                  price={item.finalPrice.toLocaleString() + "đ"}
                  pageType="guest-page"
                  id={item.id}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <p style={{ fontWeight: "bold" }}>Không có sản phẩm tương tự.</p>
        )}
      </Container>
      <Footer />
    </div>
  );
}
