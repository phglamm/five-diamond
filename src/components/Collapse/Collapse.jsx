import React from "react";
import { Collapse, ConfigProvider } from "antd";
import "./Collapse.css";
import { Link } from "react-router-dom";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const itemsNest1 = [
  {
    key: "1",
    label:
      "1.1 Tôi sẽ nhận được ưu đãi đặc biệt gì khi mua hàng tại 5Diamond Online?",
    children: (
      <>
        <p className="larger">
          - Đa dạng các hình thức thanh toán & các chương trình ưu đãi từ đối
          tác liên kết thanh toán Payoo, Vnpay, Momo, Visa, Master Card….
        </p>
        <p className="larger">
          - Linh hoạt các hình thức đặt hàng, giữ hàng Online & nhận hàng tại
          nhà hoặc nhận tại cửa hàng.
        </p>
      </>
    ),
  },
  {
    key: "2",
    label: "1.2 Tôi muốn mua nhẫn nhưng không biết cách chọn size?",
    children: (
      <>
        <p className="larger">
          Quý khách có thể biết được kích thước nhẫn phù hợp với từng ngón tay
          của mình chỉ cần áp dụng hướng dẫn đo size như sau:
        </p>
        <h4>CÁCH 1:</h4>
        <p className="larger">
          Bước 1: Chuẩn bị 1 đoạn giấy dài khoảng 10cm và rộng 1cm.
        </p>
        <p className="larger">
          Bước 2: Sử dụng đoạn giấy quấn sát quanh ngón tay đeo nhẫn.
        </p>
        <p className="larger">
          Bước 3: Đánh dấu điểm giao nhau (lưu ý đánh dấu vùng giáp line).
        </p>
        <p className="larger">
          Bước 4: Tháo ra dùng thước đo chiều dài của đoạn giấy theo vạch dấu.
        </p>
        <p className="larger">
          Bước 5: Lấy kết quả đo được chia cho 3,14. Sau đó đối chiếu với Bảng
          size nhẫn
        </p>
        <h4>CÁCH 2:</h4>
        <p className="larger">
          Bước 1: Chuẩn bị 1 chiếc nhẫn phù hợp với ngón tay cần đeo nhẫn & 1
          cây thước có vạch kẻ milimet.
        </p>
        <p className="larger">
          Bước 2: Đối chiếu số milimet của thước với kích thước trên Bảng size
          nhẫn
        </p>
        <p className="larger">
          Chi tiết hướng dẫn đo size:
          <Link to="http://fivediamond.online/huong-dan-do-ni">
            {" "}
            http://fivediamond.online/huong-dan-do-ni
          </Link>
        </p>
      </>
    ),
  },
  {
    key: "3",
    label: "1.3 Hướng dẫn lưu giữ & bảo quản trang sức bền đẹp qua thời gian ?",
    children: (
      <>
        <h4>Lưu trữ đúng cách:</h4>
        <p className="larger">
          Bảo quản trang sức trong hộp đựng riêng biệt hoặc túi vải mềm nhằm
          tránh va đập và trầy xước.
        </p>
        <p className="larger">
          Tách các món trang sức riêng biệt để tránh va chạm và làm hỏng bề mặt.
        </p>
        <p className="larger">
          Đặt trang sức vào một vị trí khô ráo, thoáng mát và tránh tiếp xúc
          trực tiếp với ánh sáng mặt trời.
        </p>
        <h4>Tránh tiếp xúc với chất liệu gây hại:</h4>
        <p className="larger">
          Tránh để trang sức tiếp xúc với hóa chất như: xà phòng, nước biển,
          chất tẩy rửa và các loại hóa chất khác có thể gây ảnh hưởng đến sự bền
          đẹp của chúng.
        </p>
        <p className="larger">
          Hạn chế tiếp xúc với mỹ phẩm, nước hoa và kem dưỡng da, vì các thành
          phần này có thể làm mờ hoặc ảnh hưởng đến kim cương và các loại đá quý
          khác.
        </p>
        <h4>Vệ sinh định kỳ:</h4>
        <p className="larger">
          Vệ sinh trang sức bằng cách nhẹ nhàng lau chùi bề mặt bằng nước ấm và
          một ít xà phòng nhẹ. Sử dụng một bàn chải mềm hoặc khăn mềm để làm
          sạch những khe hẹp hoặc vết bẩn nhỏ.
        </p>
        <p className="larger">
          Tránh sử dụng chất tẩy rửa mạnh hoặc chổi cứng, vì chúng có thể gây
          trầy xước hoặc làm mất đi độ bóng và sáng của trang sức.
        </p>

        <h4>Kiểm tra định kỳ:</h4>
        <p className="larger">
          Kiểm tra trang sức định kỳ để phát hiện sớm bất kỳ hỏng hóc nào như
          chảy đá, mất nút kim cương, hoặc móc bị lỏng. Nếu phát hiện sự cố,
          nhanh chóng đưa trang sức đến cửa hàng 5Diamond gần nhất để được sửa
          chữa.
        </p>
      </>
    ),
  },
];

const itemsNest3 = [
  {
    key: "1",
    label:
      "2.1 Tôi mua hàng online nhưng không vừa, tôi có thể ghé cửa hàng đổi size (kích cỡ) được không?",
    children: (
      <>
        <p className="larger">
          Chính sách thu đổi khi quý khách mua hàng tại trang web
          http://fivediamond.online/ hoặc sàn Thương mại điện tử của 5Diamond và
          tại cửa hàng đều như nhau.
        </p>
        <p className="larger">
          + Sản phẩm Bạc: đổi size (kích cỡ) trong vòng 72H đối với sản phẩm còn
          size, chưa hỗ trợ đổi sang mẫu khác và hoàn tiền
        </p>
        <p className="larger">
          + Sản phẩm Vàng: thu đổi 100% giá trị sản phẩm trong vòng 48H (với
          điều kiện đổi sang sản phẩm khác giá trị cao hơn hoặc bằng sản phẩm
          cũ, sau 48 tiếng 5Diamond sẽ đổi sản phẩm theo chế độ thu đổi thông
          thường)
        </p>
        <p className="larger">
          Lưu ý: thời gian được tính từ thời điểm khách hàng nhận được sản phẩm
        </p>
      </>
    ),
  },
];

const itemsNest4 = [
  {
    key: "1",
    label: "3.1 Phí vận chuyển của 5Diamond tính như thế nào?",
    children: (
      <>
        <p className="larger">
          Nhằm mang đến trải nghiệm tốt nhất cho quý khách hàng, Five Diamond và
          đối tác hân hạnh giao hàng đến quý khách hàng trên khắp 63 tỉnh thành
          và không thu phí vận chuyển.
        </p>
      </>
    ),
  },
  {
    key: "2",
    label: "3.2 Thời gian giao hàng trong bao lâu?",
    children: (
      <>
        <p className="larger">
          Five Diamond giao hàng miễn phí từ 1-7 ngày trên toàn quốc và giao
          hàng trong 3 giờ tại một số khu vực trung tâm với các sản phẩm có gắn
          nhãn
        </p>
      </>
    ),
  },
  {
    key: "3",
    label: "3.3 Tôi có thể kiểm tra sản phẩm trước khi nhận hàng?",
    children: (
      <>
        <p className="larger">
          Trước khi chấp nhận và thanh toán cho một đơn hàng, quý khách hàng có
          quyền yêu cầu được mở hộp hàng để kiểm tra hàng hóa bên trong có đúng
          với thông tin đặt hàng hay không? Quý khách hàng có quyền từ chối nhận
          hàng nếu phát hiện hộp hàng không còn nguyên vẹn hoặc thiếu tem niêm
          phong
        </p>
        <p className="larger">
          Trong trường hợp hiếm hoi sản phẩm khách hàng nhận được bị lỗi, hư
          hỏng hoặc không như mô tả, 5Diamond cam kết bảo vệ khách hàng bằng
          chính sách thu đổi và bảo hành.
        </p>
      </>
    ),
  },
];

const itemsNest2 = [
  {
    key: "1",
    label: "2.1 Tôi mua hàng trên website như thế nào?",
    children: (
      <>
        <p className="larger">
          Quý khách vui lòng truy cập website:{" "}
          <Link to="https://www.fivediamond.online/">
            https://www.fivediamond.online/
          </Link>{" "}
          - lựa chọn sản phẩm mình muốn mua, sau đó chọn hình thức thanh toán
          bằng tiền mặt, chuyển khoản, hoặc bằng thẻ tín dụng/thẻ ngân hàng. Sau
          khi giao dịch thanh toán hoàn tất, bạn sẽ nhận được thông báo xác nhận
          đơn hàng của Five Diamond
        </p>
      </>
    ),
  },
  {
    key: "2",
    label: "2.2 Tôi đặt hàng thành công rồi, khi nào được xác nhận đơn hàng?",
    children: (
      <>
        <p className="larger">
          Quý khách hàng sẽ nhận được thông báo đơn hàng thành công ngay khi đặt
          hàng. Tư vấn viên Online sẽ liên hệ với Quý khách để xác nhận đơn hàng
          và thông báo về thời gian giao hàng Hoặc Quý khách sẽ nhận tin nhắn
          xác nhận đơn hàng thành công/hóa đơn điện tử/thông tin thời gian giao
          hàng dự kiến.
        </p>
      </>
    ),
  },
  {
    key: "3",
    label: "2.3 Không áp được mã giảm giá phải làm thế nào?",
    children: (
      <>
        <p className="larger">
          Quý khách vui lòng điền thông tin mã ưu đãi vào ô ghi chú khi đặt
          hàng, tư vấn viên online sẽ liên hệ hỗ trợ xác nhận đơn hàng và thêm
          chương trình ưu đãi giúp khách hàng giúp mình.
        </p>
        <p className="larger">
          Hoặc liên hệ tổng đài 1800 54 54 57 (Miễn phí) Five Diamond sẽ hỗ trợ
          kiểm tra thông tin.
        </p>
      </>
    ),
  },

  {
    key: "4",
    label: "2.4 Five Diamond có đảm bảo về bảo mật thông tin Khách hàng không?",
    children: (
      <>
        <p className="larger">
          Thông tin Khách hàng là thông tin bảo mật được 5Diamond đặt lên hàng
          đầu. Do đó, chúng tôi tôn trọng và cam kết sẽ bảo mật những thông tin
          mang tính riêng tư và chỉ thu thập những thông tin cần thiết liên quan
          đến giao dịch mua bán. .
        </p>
      </>
    ),
  },
];
const items = [
  {
    key: "1",
    label: "1. Sản phẩm và dịch vụ",
    children: <Collapse defaultActiveKey="0" items={itemsNest1} />,
  },
  {
    key: "2",
    label: "2. Đặt hàng và thanh toán",
    children: <Collapse defaultActiveKey="0" items={itemsNest2} />,
  },
  {
    key: "3",
    label: "3. Chính sách thu đổi - bảo hành",
    children: <Collapse defaultActiveKey="0" items={itemsNest3} />,
  },

  {
    key: "4",
    label: "4. Giao nhận hàng",
    children: <Collapse defaultActiveKey="0" items={itemsNest4} />,
  },
];
const FAQsCollapse = () => {
  const onChange = (key) => {
    // console.log(key);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          //   padding: "16px 20px",
          //   fontWeightStrong: "bolder",
        },
        components: {
          Collapse: {
            // fontSize: "5",
            // headerBg: "#06b6d4",
          },
        },
      }}
    >
      <Collapse onChange={onChange} items={items} size="large" />
    </ConfigProvider>
  );
};
export default FAQsCollapse;
