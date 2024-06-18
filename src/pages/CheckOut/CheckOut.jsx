import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './CheckOut.css';
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export default function CheckOut() {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [deliveryStandard, setDeliveryStandard] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("");

  // Fetch Provinces
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://vapi.vnappmob.com/api/province/');
        setProvinces(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fetch Districts based on selectedProvince
  useEffect(() => {
    if (selectedProvince) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`);
          setDistricts(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  // Fetch Wards based on selectedDistrict
  useEffect(() => {
    if (selectedDistrict) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`);
          setWards(response.data.results);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  // Handle Province Change
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
  };

  // Handle District Change
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedWard("");
    setWards([]);
  };

  // Handle Ward Change
  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  // Handle Delivery Standard Change
  const handleDeliveryStandardChange = () => {
    setDeliveryStandard(!deliveryStandard);
    if (!deliveryStandard) setDeliveryTime(false);
  };

  // Handle Delivery Time Change
  const handleDeliveryTimeChange = () => {
    setDeliveryTime(!deliveryTime);
    if (!deliveryTime) setDeliveryStandard(false);
  };

  // Handle Delivery Option Change
  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const deliveryOptions = [
    { value: "Giao Nhanh", label: "Giao Nhanh" },
    { value: "Hỏa Tốc", label: "Hỏa Tốc" },
  ];

  const getOptionLabel = (option) => {
    if (deliveryOption === "Hỏa Tốc" && option.value === "Hỏa Tốc") {
      return "2 ngày";
    }

    if (deliveryOption === "Giao Nhanh" && option.value === "Giao Nhanh") {
      return "5 ngày";
    }

    return option.label;
  };
  const handlePurchase = () => {
    navigate(routes.tracking);
  }
  return (
    <div className="page-container checkout-page">
      <Header />
      <Container className="container">
        <Form>
          <Row className="Rowall">
            <Col md={8} className="Col8">
              <h4>THÔNG TIN NGƯỜI MUA</h4>

              <Form.Group as={Row} controlId="formFullName" className="align-items-center">
                <Form.Label column md={2} className="form-label">Họ Tên:</Form.Label>
                <Col md={10}>
                  <Form.Control type="text" placeholder="Nhập họ tên" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPhoneNumber" className="align-items-center">
                <Form.Label column md={2} className="form-label">Điện Thoại:</Form.Label>
                <Col md={10}>
                  <Form.Control type="text" placeholder="Nhập số điện thoại" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formEmail" className="align-items-center">
                <Form.Label column md={2} className="form-label">Email:</Form.Label>
                <Col md={10}>
                  <Form.Control type="text" placeholder="Nhập email" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formBirthDate" className="align-items-center">
                <Form.Label column md={2} className="form-label">Ngày Sinh:</Form.Label>
                <Col md={10}>
                  <Form.Control type="date" />
                </Col>
              </Form.Group>

              <h4>PHƯƠNG THỨC NHẬN HÀNG</h4>
              <Row>
                <Col md={4}>
                  <Form.Group controlId="formProvince">
                    <Form.Control as="select" value={selectedProvince} onChange={handleProvinceChange}>
                      <option value="">Chọn Tỉnh/TP</option>
                      {provinces.map((province) => (
                        <option key={province.province_id} value={province.province_id}>
                          {province.province_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formDistrict">
                    <Form.Control as="select" value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
                      <option value="">Chọn Quận/Huyện</option>
                      {districts.map((district) => (
                        <option key={district.district_id} value={district.district_id}>
                          {district.district_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formWard">
                    <Form.Control as="select" value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
                      <option value="">Chọn Xã/Phường</option>
                      {wards.map((ward) => (
                        <option key={ward.ward_id} value={ward.ward_id}>
                          {ward.ward_name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formAddress">
                <Form.Label className="form-label"></Form.Label>
                <Form.Control type="text" placeholder="Nhập địa chỉ" />
              </Form.Group>

              <h4>THỜI GIAN NHẬN HÀNG</h4>
              <Form.Group controlId="formDeliveryTime">
                <div className="box">
                  <div>
                    <Form.Check
                      type="checkbox"
                      id="formDeliveryTime-time1"
                      label="Nhận hàng tiêu chuẩn"
                      name="time1"
                      checked={deliveryStandard}
                      onChange={handleDeliveryStandardChange}
                    />
                  </div>
                  <div className="time2">
                    <Form.Check
                      type="checkbox"
                      id="formDeliveryTime-time2"
                      label="Nhận hàng đặc biệt"
                      name="time2"
                      checked={deliveryTime}
                      onChange={handleDeliveryTimeChange}
                    />
                  </div>

                  {deliveryTime && (
                    <div className="time3" style={{ display: 'flex', alignItems: 'center' }}>
                      <Form.Control as="select" style={{ width: 'auto', marginRight: '2px' }} onChange={handleDeliveryOptionChange}>
                        <option value="">Hình thức</option>
                        {deliveryOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {getOptionLabel(option)}
                          </option>
                        ))}
                      </Form.Control>
                      <i>kể từ ngày xác nhận đơn hàng</i>
                    </div>
                  )}
                </div>
              </Form.Group>

              <h4>HÌNH THỨC THANH TOÁN</h4>
              <Form.Group controlId="formPaymentMethod">
                <Form.Check type="radio" label="Thanh toán COD" name="paymentMethod" />
                <div>
                  <p>
                    Quý khách vui lòng kiểm tra sự nguyên vẹn của gói hàng và tem niêm phong, trước khi thanh toán tiền mặt và nhận hàng
                  </p>
                </div>
                <Form.Check type="radio" label="Thanh toán chuyển khoản" name="paymentMethod" />
                <div>
                  <p>
                    + Tên tài khoản: CÔNG TY CP TẬP ĐOÀN VÀNG BẠC ĐÁ QUÝ FIVEDIAMOND<br />
                    + Số tài khoản: 1206866868<br />
                    + Ngân hàng: Ngân hàng TMCP Đầu tư & Phát triển Việt Nam (BIDV) - CN Sở Giao dịch 1<br />
                    + Nội dung chuyển khoản: <em>“Tên người chuyển + Số điện thoại + Mã đơn hàng”</em>
                  </p>
                </div>
              </Form.Group>
              <h4>GHI CHÚ</h4>

              <Form.Group controlId="formNote">
                <Form.Control as="textarea" rows={3} placeholder="Để lại lời nhắn" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <h4>THÔNG TIN ĐƠN HÀNG</h4>
              <div className="order-item">
                <img src="https://tnj.vn/75169-large_default/nhan-bac-nu-dinh-da-10mm-nn0440.jpg" alt="Product Image" className="checkout-image" />
                <div className="order-item-details">
                  <p>HOA TAI 18K AFEC00043BD2DA1</p>
                  <p>MSP: AFEC00043BD2DA1</p>
                  <p>SỐ LƯỢNG: 1</p>
                  <p>Giá bán: <span>42,820,000đ</span></p>
                  <p>Tạm tính: <span>42,820,000đ</span></p>
                  <p>Thành tiền: <span style={{ color: 'red' }}>42,820,000đ</span></p>
                </div>
              </div>
              <div className="order-item">
                <img src="https://tnj.vn/60913-large_default/nhan-kim-cuong-moissanite-dinh-da-nnm0010.jpg" alt="Product Image" className="checkout-image" />
                <div className="order-item-details">
                  <p>NHẪN ĐÍNH HÔN KIM CƯƠNG ENR3111W</p>
                  <p>MSP: ENR3111W</p>
                  <p>SỐ LƯỢNG: 1</p>
                  <p>Giá bán: <span>44,520,000đ</span></p>
                  <p>Tạm tính: <span>44,520,000đ</span></p>
                  <p>Thành tiền: <span style={{ color: 'red' }}>44,520,000đ</span></p>
                </div>
              </div>
              <h5>Tạm tính: <span style={{ color: 'red' }}>87,340,000đ</span></h5>
              <Form.Group controlId="formVoucher">
                <p>Mã giảm giá/Voucher</p>
                <Form.Control type="text" />
              </Form.Group>
              <p>Phí vận chuyển: <span>50,000đ</span></p>
              <h5>Tổng tiền: <span style={{ color: 'red' }}>87,390,000đ</span></h5>
            </Col>
          </Row>
        </Form>
        <div className="order-btn">
          <Button 
          className="btn-submit" 
          variant="primary" 
          type="submit"
          onClick={handlePurchase}
          >
            ĐẶT HÀNG
          </Button>

          <p>Xin vui lòng xác nhận lại đơn hàng</p>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
