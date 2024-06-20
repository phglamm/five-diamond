import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './CheckOut.css';

const provinces = [
  "Hà Nội", "Hồ Chí Minh", "Hải Phòng", "Cần Thơ", "Đà Nẵng", "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái",
  // Add more provinces as needed
];

export default function CheckOut() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [deliveryStandard, setDeliveryStandard] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("");

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setDistricts([
      "District 1",
      "District 2",
      "District 3",
      // Add more districts based on the selected province
    ]);
    setSelectedDistrict("");
    setWards([]);
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setWards([
      "Ward 1",
      "Ward 2",
      "Ward 3",
      // Add more wards based on the selected district
    ]);
    setSelectedWard("");
  };

  const handleDeliveryStandardChange = () => {
    setDeliveryStandard(!deliveryStandard);
    if (!deliveryStandard) setDeliveryTime(false);
  };

  const handleDeliveryTimeChange = () => {
    setDeliveryTime(!deliveryTime);
    if (!deliveryTime) setDeliveryStandard(false);
  };

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

  return (
    <div className="page-container checkout-page">
      <Header />
      <Container className="container">
        <Form>
          <Row>
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
                        <option key={province} value={province}>
                          {province}
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
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formWard">
                    <Form.Control as="select" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} disabled={!selectedDistrict}>
                      <option value="">Chọn Phường/Xã</option>
                      {wards.map((ward) => (
                        <option key={ward} value={ward}>
                          {ward}
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
                        <option value="">Hình thức </option>
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
                <img src="https://tnj.vn/75169-large_default/nhan-bac-nu-dinh-da-10mm-nn0440.jpg" alt="Product Image" className="product-image" />
                <div className="order-item-details">
                  <p>HOA TAI 18K AFEC00043BD2DA1</p>
                  <p>MSP: AFEC00043BD2DA1</p>
                  <p>SỐ LƯỢNG: 1</p>
                  <p>Giá bán: 42,820,000đ</p>
                  <p>Tạm tính: 42,820,000đ</p>
                </div>
              </div>
              <div className="order-item">
                <img src="https://tnj.vn/60913-large_default/nhan-kim-cuong-moissanite-dinh-da-nnm0010.jpg" alt="Product Image" className="product-image" />
                <div className="order-item-details">
                  <p>NHẪN ĐÍNH HÔN KIM CƯƠNG ENR3111W</p>
                  <p>MSP: ENR3111W</p>
                  <p>SỐ LƯỢNG: 1</p>
                  <p>Giá bán: 44,520,000đ</p>
                  <p>Tạm tính: 44,520,000đ</p>
                </div>
              </div>
              <h5>Tạm tính: 87,340,000đ</h5>
              <Form.Group controlId="formVoucher">
                <p>Mã giảm giá/Voucher</p>
                <Form.Control type="text" />
              </Form.Group>
              <p>Phí vận chuyển: 50,000đ</p>
              <h5>Tổng tiền: 87,390,000đ</h5>
            </Col>
          </Row>
        </Form>
        <div className="order-btn">
          <Button className="btn-submit" variant="primary" type="submit">
            ĐẶT HÀNG
          </Button>

          <p>Xin vui lòng xác nhận lại đơn hàng</p>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
