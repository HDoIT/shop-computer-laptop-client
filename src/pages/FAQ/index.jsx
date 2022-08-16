import React from "react";
import MetaData from "../../components/Layout/MetaData";

// import illustration__box from "../../../public/assets/images/faq/faq-box-desktop.svg";
// import illustration__woman_desktop from "../../../public/assets/images/faq/faq-desktop.svg";

function FAQ() {
  return (
    <main className="main">
      <MetaData title="F.A.Q" />;
      <div
        className="page-header text-center"
      >
        <div className="container">
          <h1 className="page-title">F.A.Q</h1>
        </div>
      </div>
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              FAQ
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-4" style={{padding:"200px 0 0 0"}}>
              <img src="assets/images/faq/faq-desktop.svg" style={{position:"absolute"}}/>
              <img src="assets/images/faq/box-desktop.svg" style={{position:"absolute",top:"280px", left: "-60px"}}/>        
              <img src="assets/images/faq/faq-box-desktop.svg" />          
            </div>
            <div className="col-8">
            <h2 className="title text-center mb-3" style={{fontSize:"2rem",margin:"-10px 0 -20px 0"}}>Thông tin vận chuyển</h2>
            <div className="accordion accordion-rounded" id="accordion-1">
            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading-1">
                <h2 className="card-title">
                  <a
                    role="button"
                    data-toggle="collapse"
                    href="#collapse-1"
                    aria-expanded="true"
                    aria-controls="collapse-1"
                    style={{padding:"0 450px 0 0"}}
                  >
                    Đối tượng và phạm vi vận chuyển
                  </a>
                </h2>
              </div>
              <div
                id="collapse-1"
                className="collapse show bg-light"
                aria-labelledby="heading-1"
                data-parent="#accordion-1"
              >
                <div className="card-body">
                  Chính sách giao nhận được áp dụng cho tất cả các khách hàng đặt hàng qua tất cả các kênh Online và Offline tại LHD Computer. LHD Computer sẽ thực hiện tất cả các yêu cầu vận chuyển cho khách hàng trên phạm vi toàn quốc..
                </div>
              </div>
            </div>
            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading-2">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse-2"
                    aria-expanded="false"
                    aria-controls="collapse-2"
                    style={{padding:"0 575px 0 0"}}
                  >
                    Phí giao hàng?
                  </a>
                </h2>
              </div>
              <div
                id="collapse-2"
                className="collapse bg-light"
                aria-labelledby="heading-2"
                data-parent="#accordion-1"
              >
                <div className="card-body">
                  Tất cả sản phẩm (là Laptop) đều được hưởng dịch vụ MIỄN PHÍ vận chuyển tiêu chuẩn, cho dù bạn ở đâu trên đất nước Việt Nam này. Đối với các sản phẩm còn lại không phải đồng hồ (bàn phím, chuột, tai nghe,...) được tính phí vận chuyển ĐỒNG GIÁ TOÀN QUỐC 30k.
                </div>
              </div>
            </div>

            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading-3">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse-3"
                    aria-expanded="false"
                    aria-controls="collapse-3"
                    style={{padding:"0 540px 0 0"}}
                  >
                    Thời gian giao hàng
                  </a>
                </h2>
              </div>
              <div
                id="collapse-3"
                className="collapse bg-light"
                aria-labelledby="heading-3"
                data-parent="#accordion-1"
              >
                <div className="card-body">
                  Nếu bạn là khách hàng mua sắm online thuộc TP. Hồ Chí Minh,
                  Biên Hòa, Bình Dương, Vũng Tàu, Cần Thơ, được trải nghiệm thêm
                  dịch vụ giao hàng siêu tốc trong 2 giờ (với mức phí được trao
                  đổi trực tiếp với bộ phận CSKH).
                </div>
              </div>
            </div>
          </div>

          <h2 className="title text-center mb-3" style={{fontSize:"2rem",margin:"-10px 0 -20px 0"}}>Chính sách đổi hàng</h2>
          <div className="accordion accordion-rounded" id="accordion-2">
            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading2-1">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse2-1"
                    aria-expanded="false"
                    aria-controls="collapse2-1"
                    style={{padding:"0 610px 0 0"}}
                  >
                    Thời gian
                  </a>
                </h2>
              </div>
              <div
                id="collapse2-1"
                className="collapse bg-light"
                aria-labelledby="heading2-1"
                data-parent="#accordion-2"
              >
                <div className="card-body">
                  Trong vòng 7 ngày kể từ ngày mua hàng từ LHD Computer,
                  Quý khách có thể yêu cầu đổi hàng hoàn toàn miễn phí. Thời hạn
                  7 ngày được tính theo dấu bưu điện khi Quý khách gửi sản phẩm
                  về cho chúng tôi hoặc thời gian chúng tôi tiếp nhận yêu cầu
                  trực tiếp (tại cửa hàng) của Quý khách.
                </div>
              </div>
            </div>

            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading2-2">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse2-2"
                    aria-expanded="false"
                    aria-controls="collapse2-2"
                    style={{padding:"0 513px 0 0"}}
                  >
                    Điều kiện đổi sản phẩm
                  </a>
                </h2>
              </div>
              <div
                id="collapse2-2"
                className="collapse"
                aria-labelledby="heading2-2"
                data-parent="#accordion-2"
              >
                <div className="card-body bg-light">
                  Yêu cầu đổi hàng cần được thực hiện trong vòng 7 ngày kể từ
                  ngày Quý khách nhận được hàng.
                </div>
              </div>
            </div>
          </div>

          <h2 className="title text-center mb-3" style={{fontSize:"2rem",margin:"-10px 0 -20px 0"}}>Chính sách bảo hành</h2>
          <div className="accordion accordion-rounded" id="accordion-3">
            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading3-1">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse3-1"
                    aria-expanded="false"
                    aria-controls="collapse3-1"
                    style={{padding:"0 508px 0 0"}}
                  >
                    Điều kiện được bảo hành
                  </a>
                </h2>
              </div>
              <div
                id="collapse3-1"
                className="collapse bg-light"
                aria-labelledby="heading3-1"
                data-parent="#accordion-3"
              >
                <div className="card-body">
                  Bảo hành chỉ có giá trị khi laptop có Phiếu bảo hành của hãng
                  & Phiếu bảo hành của LHDcom đi kèm, điền chính xác, đầy đủ
                  các thông tin.
                </div>
              </div>
            </div>

            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading3-2">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse3-2"
                    aria-expanded="false"
                    aria-controls="collapse3-2"
                    style={{padding:"0 463px 0 0"}}
                  >
                    Điều kiện không được bảo hành
                  </a>
                </h2>
              </div>
              <div
                id="collapse3-2"
                className="collapse bg-light"
                aria-labelledby="heading3-2"
                data-parent="#accordion-3"
              >
                <div className="card-body">
                  Laptop không có Phiếu bảo hành của hãng và Phiếu bảo hành của
                  LHDcom đi kèm.
                </div>
              </div>
            </div>
          </div>

          <h2 className="title text-center mb-3" style={{fontSize:"2rem",margin:"-10px 0 -20px 0"}}>Thanh toán và trả góp</h2>
          <div className="accordion accordion-rounded" id="accordion-4">
            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading4-1">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse4-1"
                    aria-expanded="false"
                    aria-controls="collapse4-1"
                    style={{padding:"0 600px 0 0"}}
                  >
                    Thanh toán
                  </a>
                </h2>
              </div>
              <div
                id="collapse4-1"
                className="collapse bg-light"
                aria-labelledby="heading4-1"
                data-parent="#accordion-4"
              >
                <div className="card-body">
                  Thanh toán khi nhận hàng (COD) & Thanh toán chuyển khoản ngân
                  hàng
                </div>
              </div>
            </div>

            <div className="card card-box card-sm " style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading4-2">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse4-2"
                    aria-expanded="false"
                    aria-controls="collapse4-2"
                    style={{padding:"0 610px 0 0"}}
                  >
                    Tài khoản
                  </a>
                </h2>
              </div>
              <div
                id="collapse4-2"
                className="collapse bg-light"
                aria-labelledby="heading3-2"
                data-parent="#accordion-3"
              >
                <div className="card-body">
                  <p>
                    Tài khoản BIDV: - Chủ tài khoản: Lê Hữu Độ - Số tài
                    khoản: 21710000373543 - Ngân hàng: BIDV
                  </p>
                </div>
              </div>
            </div>

            <div className="card card-box card-sm" style={{borderBottom:"1px solid #ddd",padding:"15px"}}>
              <div className="card-header" id="heading4-3">
                <h2 className="card-title">
                  <a
                    className="collapsed"
                    role="button"
                    data-toggle="collapse"
                    href="#collapse4-3"
                    aria-expanded="false"
                    aria-controls="collapse4-3"
                    style={{padding:"0 625px 0 0"}}
                  >
                    Trả góp
                  </a>
                </h2>
              </div>
              <div
                id="collapse4-3"
                className="collapse bg-light"
                aria-labelledby="heading4-3"
                data-parent="#accordion-4"
              >
                <div className="card-body">
                  MUA LAPTOP TRẢ GÓP 0% LÃI SUẤT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
        <div
        className="cta cta-display bg-image pt-4 pb-4"
        style={{
          backgroundImage: "url(assets/images/backgrounds/cta/bg-7.jpg)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-9 col-xl-7">
              <div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
                <div className="col">
                  <h3 className="cta-title text-white">
                    Nếu bạn có thêm câu hỏi
                  </h3>
                  <p className="cta-desc text-white">
                    Quisque volutpat mattis eros
                  </p>
                </div>

                <div className="col-auto">
                  <a href="contact" className="btn btn-outline-white">
                    <span>CONTACT US</span>
                    <i className="icon-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
      </div>
    </main>
  );
}

export default FAQ;
