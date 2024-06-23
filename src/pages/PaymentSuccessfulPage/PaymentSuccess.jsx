import React from 'react';
import './PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const orderId = "833883794";
    const navigate = useNavigate();

    return (
        <div className="payment-success-page">
            <div className="payment-success-message">
                <div className="payment-success-checkmark-container">
                    <img
                        src="https://drive.google.com/thumbnail?id=1nf8tLNsI2Mf6rUQHKIi86x6DKy2HTV4n&sz=w1000"
                        alt="checkmark"
                        className="payment-success-checkmark-img"
                    />
                </div>
                <h1 className="payment-success-heading">Thanh toán thành công</h1>
                <p className="payment-success-text">Cảm ơn bạn vì đã tin tưởng và ủng hộ.</p>
                <p className="payment-success-text">
                    Mã số đơn hàng của bạn là <span className="payment-success-order-id">{orderId}</span>.
                </p>
                <p className="payment-success-text">
                    Bạn có thể xem chi tiết trong{' '}
                    <a href="/theo-doi-don-hang" className="payment-success-order-link">đơn hàng của tôi</a>.
                </p>
                <button
                    className="payment-success-continue-shopping-btn"
                    onClick={() => navigate('/')}
                >
                    TIẾP TỤC MUA HÀNG
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
