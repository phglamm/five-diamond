// Import necessary modules
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import './OrderList.css';

// Define OrderList component
const OrderList = ({ orders, onOrderClick }) => {
    // Use useHistory hook
    const history = useHistory();

    // Define table columns
    const columns = [
        {
            title: 'Mã Đơn Hàng',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ngày Đặt',
            dataIndex: 'date',
            key: 'date',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'total',
            key: 'total',
            render: (total) => total.toLocaleString() + ' VNĐ',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Thao Tác',
            key: 'action',
            render: (_, record) => (
                <span onClick={() => onOrderClick(record.id)} className="order-list-link">
                    Theo dõi
                </span>
            ),
        },
    ];

    // Render OrderList component
    return <Table dataSource={orders} columns={columns} rowKey="id" />;
};

// Export OrderList component
export default OrderList;
