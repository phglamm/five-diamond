/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./AdminSaleEvent.css";
import SideBar from "../../../components/SideBar/SideBar";
import { useForm } from "antd/es/form/Form";
import { Button, DatePicker, Form, Input, Modal, Table } from "antd";
import api from "../../../config/axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
export default function AdminSaleEvent() {
  const [form] = useForm();
  const [promotion, setPromotion] = useState([]);
  const { RangePicker } = DatePicker;

  function hanldeClickSubmit() {
    form.submit();
  }

  async function fetchPromotion() {
    const response = await api.get("promotion");
    const filter = response.data.filter((item) => item.deleted == false);
    setPromotion(filter);
    console.log(response.data);
  }

  useEffect(() => {
    fetchPromotion();
  }, []);
  // console.log(promotion);
  async function addPromotion(value) {
    value.startDate = moment(value.date[0].$d).format("YYYY-MM-DD");
    value.endDate = moment(value.date[1].$d).format("YYYY-MM-DD");
    const { date, ...newData } = value;
    console.log(newData);
    try {
      const response = await api.post("promotion", newData);
      setPromotion([...promotion, newData]);

      console.log(response.data);
      toast.success("Thêm mã giảm giá Thành Công");
      fetchPromotion();
      form.resetFields();
    } catch (error) {
      toast.error("Mã giảm giá đã tồn tại");
      console.log(error.response.data);
    }
  }
  const columns = [
    {
      title: "Mã giảm giá",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Ngày Bắt Đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: "Ngày Kết Thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      render: (values) => (
        <Button type="link" onClick={(e) => deletePromotion(values)}>
          Xóa
        </Button>
      ),
    },
  ];

  async function deletePromotion(values) {
    console.log(values.id);
    try {
      Modal.confirm({
        title: "Bạn có chắc muốn xóa mã giảm giá này ?",
        onOk: async () => {
          await api.delete(`promotion/${values.id}`);
          toast.success("Xóa thành công");
          setPromotion(
            promotion.filter((code) => {
              return code.id !== values.id;
            })
          );
        },
      });
      fetchPromotion();
    } catch (error) {
      toast.error("Đã có lỗi trong lúc Xóa");
    }
  }

  // const handleDateChange = (date, dateString) => {
  //     console.log(dateString);
  // };
  return (
    <div className="admin">
      <SideBar />
      <div className="admin-content">
        <h1 style={{ fontWeight: "bold" }}>QUẢN LÝ SỰ KIỆN SALES</h1>
        <div className="promotion-form">
          <Form
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
            style={{ width: "100%" }}
            form={form}
            onFinish={addPromotion}
            id="form"
            className=""
          >
            <Form.Item
              required
              label="Mã giảm giá"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập mã giảm giá",
                },
              ]}
            >
              <Input required />
            </Form.Item>
            <Form.Item
              required
              label="Giảm giá(%)"
              name="discountPercentage"
              rules={[
                {
                  required: true,
                  message: "Hãy số giảm giá",
                },
              ]}
            >
              <Input required type="number" />
            </Form.Item>
            <Form.Item
              name="date"
              label="Hạn sử dụng"
              rules={[
                {
                  required: true,
                  message: "Hãy nhập hạn sử dụng",
                },
              ]}
            >
              <RangePicker
                style={{
                  width: "145%",
                }}
              />
            </Form.Item>

            <Button
              onClick={hanldeClickSubmit}
              className="promotion-form-button"
            >
              Tạo mã giảm giá
            </Button>
          </Form>
        </div>
        <Table
          dataSource={promotion}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
}
