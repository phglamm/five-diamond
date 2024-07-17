import React from "react";
import { Card, Button } from "antd";
import { BiSolidDiscount } from "react-icons/bi";
import "./PromotionCard.css";



// Hàm sao chép mã giảm giá
function copyToClipboard(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert("Mã giảm giá đã được sao chép!");
    });
}

const PromotionCard = ({ code, discountPercentage, startDate, endDate }) => {
    return (
        <Card Card className="promotion-card" >
            <div className="promotion-card-header">
                <div className="icon">
                    <BiSolidDiscount size={40} />
                </div>
                <h3 className="code">{code}</h3>
                <Button onClick={() => copyToClipboard(code)} className="copy-button">
                    Copy
                </Button>
            </div>

            <div className="promotion-card-details">
                <p className="discount">Giảm giá: {discountPercentage}%</p>
                <p className="date">Ngày hết hạn: {endDate}</p>

            </div>
        </Card >
    )

};

export default PromotionCard;
