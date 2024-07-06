import React from "react";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { routes } from "../../routes";
import './MailBar.css';

export default function MailBar({ placeholder, icon }) {
    const [form] = useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        // Handle email input here
    };

    return (
        <div className="mail-bar-container">
            <Form form={form} onFinish={handleSubmit} className="form-main" rules={[{ type: 'email', message: 'Please enter a valid email!' }]}>
                <div className="mail-bar">
                    <Form.Item
                        name="email"
                        className="mail-input-item"

                    >
                        <Input placeholder={placeholder} className="mail-input" />
                    </Form.Item>
                    <Button htmlType="submit" className="mail-button">
                        <i className={icon}></i>
                    </Button>
                </div>
            </Form>
        </div>
    );
}
