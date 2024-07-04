import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import FAQsCollapse from "../../components/Collapse/Collapse";
import { Container } from "react-bootstrap";
import { CopyOutlined } from "@ant-design/icons";
import "../../components/Collapse/Collapse.css";
import "./FAQPage.css"

export default function FAQPage() {
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("fivediamond@gmail.com");
    alert("Email copied to clipboard!");
  };

  return (
    <div>
      <Header></Header>
      <Container className="container-collapse">

        <h1 className="faq-title">
          Câu Hỏi Thường Gặp
        </h1>
        <p className="faq-subtitle">
          Bạn cần giúp đỡ điều gì đó hoặc<br />câu hỏi về một số dịch vụ?
        </p>


        <div className="faq-collapse">
          <FAQsCollapse></FAQsCollapse>
        </div>

      </Container>
      <Footer></Footer>
    </div >
  );
}
