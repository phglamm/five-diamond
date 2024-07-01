
import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import api from "../../config/axios";
import './ProductReview.css'
import { SendOutlined } from "@ant-design/icons";
import { selectUser } from "../../redux/features/counterSlice";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { Form, Popconfirm } from "antd";
import { formatDistanceToNow } from 'date-fns'

const ProductReview = ({ productLineId }) => {
    const [comments, setComments] = useState([])
    const user = useSelector(selectUser);
    const [form] = useForm();


    async function fetchComments() {
        const response = await api.get(`comment/${productLineId}`)
        console.log(response.data);
        setComments(response.data);
    }

    const handleSendComment = async (value) => {
        console.log(value);
        try {
            await api.post('comment', value)
            fetchComments();
            form.resetFields();
        } catch (error) {
            toast.error("An error occurred!", {
                hideProgressBar: true,
            });
            console.log({ error });
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleDeleteComment = async (id) => {
        await api.delete(`comment/${id}`)
        console.log("Xóa thành công");
        fetchComments();
    }
    return (
        <div className="product-reviews">
            <h5 className="header-review">ĐÁNH GIÁ SẢN PHẨM</h5>
            {user &&
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
                                style={{ width: '300px', marginTop: '20px' }}
                            />
                        </Form.Item>
                        <Form.Item name="accountId" hidden initialValue={user.id}>
                            <Input
                                type="text"
                            />
                        </Form.Item>
                        <Form.Item name="productLineId" hidden initialValue={productLineId}>
                            <Input
                                type="text"
                                placeholder="Hãy để lại đánh giá cho sản phẩm"

                            />
                        </Form.Item>
                        <div className="buttons">
                            <Button
                                className="submit"
                                onClick={() => { form.submit() }}
                                style={{ backgroundColor: 'lightblue' }}
                            >
                                <SendOutlined style={{ marginRight: '5px' }} />
                                Gửi
                            </Button>
                        </div>
                    </Form>
                </div>}
            {comments.length ? (
                <div className="reviews">
                    {comments.map((comment) => (
                        <div className="review" key={comment.id}>
                            <div className="customer">
                                <IoPersonCircleOutline className="icon" />
                                <span style={{ fontSize: '16px' }}>{comment.account.firstname} {comment.account.lastname} </span>
                                <div className="review-meta" style={{ marginLeft: '10px' }}>{formatDistanceToNow(comment.createAt)}</div>
                            </div>

                            <div className="comment-content" style={{ marginLeft: '42px' }}>
                                <p style={{ fontSize: '16px' }}>{comment.content}</p>
                                {
                                    (comment.account.id === user?.id)
                                    &&

                                    <Popconfirm
                                        title="Xóa bình luận"
                                        description="Bạn có muốn xóa bình luận không?"
                                        onConfirm={() => handleDeleteComment(comment.id)}
                                        okText="Có"
                                        cancelText="Không"
                                    >
                                        <p
                                            className="delete-comment-button"
                                            style={{ fontSize: '14px', color: 'red', width: '28px' }}
                                        >
                                            Xóa
                                        </p>
                                    </Popconfirm>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p>Chưa có bình luận về sản phẩm</p>
            }
        </div >
    );
};

export default ProductReview;
