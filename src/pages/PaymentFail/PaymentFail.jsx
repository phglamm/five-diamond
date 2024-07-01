import { useSelector } from "react-redux";
import useGetParams from "../../assets/useGetParams";
import api from "../../config/axios";
import "./PaymentFail.css";
import { useNavigate } from "react-router-dom";
import { selectOrder } from "../../redux/features/orderSlice";
import { routes } from "../../routes";
import { toast } from "react-toastify";
import { useEffect } from "react";

const PaymentFail = () => {
  const orderId = "833883794";
  const orderPost = useSelector(selectOrder);
  console.log(orderPost);
  const navigate = useNavigate();
  const params = useGetParams();
  const status = params("vnp_TransactionStatus");
  console.log(status);
  async function handleSubmitOrder() {
    if (status === "00") {
      try {
        const response = await api.post("order", orderPost);
        console.log(response.data);
        navigate(routes.orderhistory);
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      toast.error("thanh toán thất bại");
    }
  }

  useEffect(() => {
    handleSubmitOrder();
  }, []);

  return (
    <div className="pay">
      <div className="payment-fail-page">
        <div className="payment-fail-message">
          <div className="payment-fail-checkmark-container">
            <img
              src="https://drive.google.com/thumbnail?id=1zbHAKyLaa5pKLbLNWAJeajTvGuC-VPeX&sz=w1000"
              alt="checkmark"
              className="payment-fail-checkmark-img"
            />
          </div>
          <h1 className="payment-fail-heading">Thanh toán thất bại</h1>
          <p className="payment-fail-text">
            Quý khách không thể hoàn tất thanh toán
          </p>
          {/* <p className="payment-fail-text">
            Mã số đơn hàng của bạn là{" "}
            <span className="payment-fail-order-id">{orderId}</span>.
          </p> */}
          <p className="payment-fail-text">
            Mời quý khách thử lại, xin cảm ơn.
            {/* Bạn có thể xem chi tiết trong{" "}
            <a href="/theo-doi-don-hang" className="payment-fail-order-link">
              đơn hàng của tôi
            </a>
            . */}
          </p>
          <button
            className="payment-fail-continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            THỬ THANH TOÁN LẠI
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
