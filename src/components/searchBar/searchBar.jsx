import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { routes } from "../../routes";

export default function SearchBar({ placeholder, icon }) {
  const [form] = useForm();
  const navigate = useNavigate();

  const handleSearch = async (values) => {
    try {
      const response = await api.get(`product-line/search?name=${values.name}`);
      navigate(routes.timkiemsanpham, {
        state: { SearchProduct: response.data },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="search-bar-container">
      <Form form={form} onFinish={handleSearch} className="form-main">
        <Form.Item name="name">
          <Input placeholder={placeholder} className="search-input" />
        </Form.Item>
        <Button htmlType="submit" className="search-button">
          <i className={icon}></i>
        </Button>
      </Form>
    </div>
  );
}
