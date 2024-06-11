// import React, { createContext, useContext, useState } from 'react';

// const OrderStatusContext = createContext();

// export const OrderStatusProvider = ({ children }) => {
//     const [orderStatus, setOrderStatus] = useState(null);

//     const updateOrderStatus = (newStatus) => {
//         setOrderStatus(newStatus);
//     };

//     return (
//         <OrderStatusContext.Provider value={{ orderStatus, updateOrderStatus }}>
//             {children}
//         </OrderStatusContext.Provider>
//     );
// };

// export const useOrderStatus = () => useContext(OrderStatusContext);
