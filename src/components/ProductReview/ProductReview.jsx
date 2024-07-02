import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import api from "../../config/axios";
import "./ProductReview.css";
import { SendOutlined } from "@ant-design/icons";
import { selectUser } from "../../redux/features/counterSlice";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { Form, Popconfirm } from "antd";
// import { formatDistanceToNow } from "date-fns";

const ProductReview = ({ productLineId }) => {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState(""); // **Added state to manage input value**
  const user = useSelector(selectUser);
  const [form] = useForm();

  const handleInputChange = ({ target: { value } }) => {
    // **Updated input change handler**
    setInputValue(value);
  };

  async function fetchComments() {
    const response = await api.get(`comment/${productLineId}`);
    console.log(response.data);
    setComments(response.data);
  }

  const handleSendComment = async (value) => {
    console.log(value);
    try {
      await api.post("comment", value);
      fetchComments();
      form.resetFields();
      setInputValue(""); // **Reset input value after submission**
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
  return (
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
                    onChange={handleInputChange} // **Added onChange handler to input**
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
                {comments.map((comment) => (
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
                        {formatDistanceToNow(comment.createAt)}
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
          </>
        ) : (
          <>
            <p>Chưa có bình luận về sản phẩm</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
