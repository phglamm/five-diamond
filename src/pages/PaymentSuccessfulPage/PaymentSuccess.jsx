import { useSelector } from "react-redux";
import useGetParams from "../../assets/useGetParams";
import api from "../../config/axios";
import "./PaymentSuccess.css";
import { Link, useNavigate } from "react-router-dom";
import { selectOrder } from "../../redux/features/orderSlice";
import { routes } from "../../routes";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const orderPost = useSelector(selectOrder);
  // console.log(orderPost);
  const navigate = useNavigate();
  const params = useGetParams();
  const status = params("vnp_TransactionStatus");
  // console.log(status);
  const [orderfull, setOrderfull] = useState(null);
  async function handleSubmitOrder() {
    if (status === "00") {
      try {
        const response = await api.post("order", orderPost);
        // console.log(response.data);
        setOrderfull(response.data);
        navigate(routes.successpayment);
        toast.success("Đặt hàng thành công");
      } catch (error) {
        navigate(routes.failpayment);
        toast("Đặt hàng thất bại");
        // console.log(error.response.data);
      }
    } else {
      navigate(routes.failpayment);
      toast.error("Thanh Toán với VNPAY thất bại");
    }
  }

  useEffect(() => {
    handleSubmitOrder();
  }, []);

  return (
    <div className="pay">
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
          <p className="payment-success-text">
            Cảm ơn bạn vì đã tin tưởng và ủng hộ.
          </p>
          <p className="payment-success-text">
            Bạn có thể xem chi tiết đơn hàng của mình trong {""}
            <Link
              to={routes.orderhistory}
              className="payment-success-order-link"
            >
              đơn hàng của tôi
            </Link>
            .
          </p>
          <button
            className="payment-success-continue-shopping-btn"
            onClick={() => navigate("/")}
          >
            TIẾP TỤC MUA HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
