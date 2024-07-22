import { useState, useEffect } from "react"; //
import { IoPersonCircleOutline } from "react-icons/io5"; //
import { toast } from "react-toastify"; //
import api from "../../config/axios"; //
import { Button, Input } from "reactstrap";
import "./ProductReview.css";
import { SendOutlined } from "@ant-design/icons"; //
import { selectUser } from "../../redux/features/counterSlice"; //
import { useSelector } from "react-redux"; //
import { useForm } from "antd/es/form/Form"; //
import { Form, Popconfirm, Pagination } from "antd"; //
import { intlFormatDistance } from "date-fns"; //
import useRealtime from "../../assets/useRealtime";

const ProductReview = ({ productLineId }) => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Added state to manage input value
  const [currentPage, setCurrentPage] = useState(1); // Added state for current page
  const user = useSelector(selectUser);
  const [form] = useForm();

  useRealtime(async (body) => {
    if (body.body === "comment") {
      await fetchComments();
    }
  });

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  async function fetchComments() {
    const response = await api.get(`comment/${productLineId}`);
    // console.log(response.data);
    setComments(response.data);
  }

  const handleSendComment = async (value) => {
    // console.log(value);
    try {
      await api.post("comment", value);
      fetchComments();
      form.resetFields();
      setInputValue("");
    } catch (error) {
      toast.error("Gửi đánh giá không thành công!", {
        hideProgressBar: true,
      });
      // console.log({ error });
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDeleteComment = async (id) => {
    await api.delete(`comment/${id}`);
    // console.log("Xóa thành công");
    fetchComments();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const commentsPerPage = 5;
  const currentComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  return (
    <div className="product-reviews">
      <h5 className="header-review">ĐÁNH GIÁ SẢN PHẨM</h5>
      <div className="comment-all">
        {user !== null ? (
          <>
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
                        onChange={handleInputChange} // Added onChange handler to input
                      />
                    </Form.Item>
                    <Form.Item name="accountId" hidden initialValue={user.id}>
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      name="productLineId"
                      hidden
                      initialValue={productLineId}
                    >
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
          </>
        ) : (
          <>
            {comments.length ? (
              <div className="reviews">
                {currentComments.map((comment) => (
                  <div className="review" key={comment.id}>
                    <div className="customer">
                      <IoPersonCircleOutline className="icon" />
                      <span style={{ fontSize: "16px" }}>
                        {comment.account.firstname} {comment.account.lastname}{" "}
                      </span>
                      <div
                        className="review-meta"
                        style={{ marginLeft: "10px" }}
                      >
                        {intlFormatDistance(comment.createAt, new Date())}
                      </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
