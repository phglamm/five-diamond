


import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { IoPersonCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import api from "../../config/axios";
import './ProductReview.css'

const ProductReview = ({ token, productLineId, setgetLatestProductUpdate }) => {
    const [reviews, setReviews] = useState([]);
    const [updateReviews, setUpdateReviews] = useState(false);
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [review, setReview] = useState({});


    const handleReviewText = ({ target: { value } }) => {
        setReview(value);
    };

    // Mock data for reviews
    const mockReviews = [
        {
            text: "Great product!",
            username: "Alice",
            createdAt: "2023-06-01T12:00:00Z",
        },
        {
            text: "Highly recommend!",
            username: "Bob",
            createdAt: "2023-06-02T15:30:00Z",
        },
        {
            text: "Not bad, could be better.",
            username: "Charlie",
            createdAt: "2023-06-03T18:45:00Z",
        },
    ];

    useEffect(() => {
        const getReviews = async () => {
            try {
                // const headerConfig = token
                //     ? {
                //         headers: {
                //             Authorization: `Bearer ${token}`,
                //         },
                //     }
                //     : {};
                // const { data: { data, hasReviewAdded } = [] } = await api.get(`comment`, headerConfig);

                // setReviews(data.reverse());
                setReviews(mockReviews.reverse());
                // setIsReviewAdded(hasReviewAdded);
                setIsReviewAdded(false); // Assuming no review is added initially
                setUpdateReviews(false);
                setgetLatestProductUpdate(true);
                setReview("");
            } catch (error) {
                console.log({ error });
            }
        };
        getReviews();
    }, [productLineId, setgetLatestProductUpdate, token, updateReviews]);

    const handleSubmit = async () => {
        if (!review.text) {
            toast.error("Please provide your review text", {
                hideProgressBar: true,
            });
            return;
        }
        try {
            // await api.post(`comment`, { ...review, productLineId, },
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     }
            // );

            // Mock adding a review
            const newReview = {
                text: review.text,
                username: "Current User", // Replace with actual username if available
                createdAt: new Date().toISOString(),
            };

            setReviews([newReview, ...reviews]);
            setUpdateReviews(true);
        } catch (error) {
            toast.error("An error occurred!", {
                hideProgressBar: true,
            });
            console.log({ error });
        }
    };


    return (
        <div className="product-reviews">
            <h5 className="header-review">ĐÁNH GIÁ SẢN PHẨM</h5>

            {/* {isReviewAdded || !token ? null : ( */}
            {!isReviewAdded && (
                <div className="comment-section">
                    <div className="user-icon">
                        <IoPersonCircleOutline />
                    </div>
                    <Input
                        type="text"
                        placeholder="Hãy để lại đánh giá cho sản phẩm"
                        value={review}
                        onChange={handleReviewText}
                    />
                    <div className="buttons">
                        <Button className="cancel" onClick={() => setReview("")}>
                            Cancel
                        </Button>
                        <Button
                            className="submit"
                            onClick={handleSubmit}
                            disabled={!review}
                        >
                            Comment
                        </Button>
                    </div>
                </div>
            )}

            {reviews.length ? (
                <div className="reviews">
                    {reviews.map(({ text, username, createdAt }) => (
                        <div className="review" key={createdAt}>
                            <div className="customer">
                                <IoPersonCircleOutline className="icon" />
                                <span>{username}</span>
                            </div>
                            <div className="review-meta">Reviewed at: {new Date(createdAt).toLocaleDateString()}</div>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default ProductReview;
