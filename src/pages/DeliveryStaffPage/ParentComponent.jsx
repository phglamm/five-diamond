import React, { useState } from "react";
import DeliveryStaffPage from "./DeliveryStaffPage";
import TrackingPage from "../pages/TrackingPage/TrackingPage";

const ParentComponent = () => {
    const [orderStatus, setOrderStatus] = useState("Xác nhận");
    const orderId = "DM20241652003"; // Example order ID

    const handleStatusChange = (updatedOrderId, newStatus) => {
        if (orderId === updatedOrderId) {
            setOrderStatus(newStatus);
        }
    };

    return (
        <div>
            <TrackingPage orderId={orderId} orderStatus={orderStatus} />
            <DeliveryStaffPage onStatusChange={handleStatusChange} />
        </div>
    );
};

export default ParentComponent;
