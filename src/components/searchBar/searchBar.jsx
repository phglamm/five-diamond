import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { routes } from "../../routes";
import "./searchBar.css";

export default function SearchBar({ placeholder, icon }) {
  const [form] = useForm();
  const navigate = useNavigate();

  // Function to handle form submission manually
  const handleClickSubmit = () => {
    form.submit();
  };

  // Function to handle search logic
  const handleSearch = async (values) => {
    console.log(values);
    try {
      let response;
      if (values.name) {
        // If name is provided, search for products
        response = await api.get(`product-line/search?name=${values.name}`);
      } else {
        // If no name is provided, fetch available products
        response = await api.get("product-line/available");
      }
      navigate(routes.timkiemsanpham, {
        state: { SearchProduct: response.data },
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="search-bar-container">
      <Form form={form} onFinish={handleSearch} className="form-main">
        <div className="search-bar">
          <Form.Item name="name" className="search-input-item">
            <Input placeholder={placeholder} className="search-input" />
          </Form.Item>
          <Button onClick={handleClickSubmit} className="search-button">
            <i className={icon}></i>
          </Button>
        </div>
      </Form>
    </div>
  );
}
