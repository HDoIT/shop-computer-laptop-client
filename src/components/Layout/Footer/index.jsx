import React from "react";
import './footer.scss'

function Footer() {
  return (
    <footer className="footer" style={{color:"#90a4ae"}}>
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <div className="widget widget-about">
                <h4 className="widget-title">
                  <img
                      src="/logo.png"
                      alt="Molla Logo"
                      width="82"
                      height="25"
                      style={{
                        backgroundColor:"#FFFFFF",
                        borderRadius:"50%",
                        padding:"10px"
                      }}
                    />
                </h4>
                <p style={{color:"#90a4ae"}}>
                  Hệ thống phân phối máy tính chính hãng UY TÍN, thuộc TOP
                  5 thương hiệu máy tính lớn nhất tại Việt Nam.{" "}
                </p>
              </div>
            </div>
        
            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Về chúng tôi</h4>

                <ul className="widget-list">
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/about">Triết lý kinh doanh</a>
                  </li>
                  <li>
                    <a href="/about">Giấy chứng nhận và giải thưởng</a>
                  </li>
                  <li>
                    <a href="/about">Khách hàng nói gì về chúng tôi</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Chăm sóc khách hàng</h4>

                <ul className="widget-list">
                  <li>
                    <a href="/faq">Hướng dẫn mua hàng</a>
                  </li>
                  <li>
                    <a href="/faq">Chính sách đổi trả</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/faq">Chính sách bảo hành</a>
                  </li>
                  <li>
                    <a href="/faq">Vận chuyển và giao nhận</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-lg-3">
              <div className="widget">
                <h4 className="widget-title">Tham khảo</h4>

                <ul className="widget-list">
                  <li>
                    <a href="/blog">Thông báo mới</a>
                  </li>
                  <li>
                    <a href="/faq">Bảo mật thông tin</a>
                  </li>
                  <li>
                    <a href="/contact">Hỏi đáp - Góp ý</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{color:"#90a4ae"}}>
        <div className="container">
          <div className="social-icons" style={{display:"flex",justifyContent:"center",width:"100%"}}>
            <a
              href="#"
              className="social-icon"
              title="Facebook"
              target="_blank"
            >
              <i className="icon-facebook-f"></i>
            </a>
            <a
              href="#"
              className="social-icon"
              title="Twitter"
              target="_blank"
            >
              <i className="icon-twitter"></i>
            </a>
            <a
              href="#"
              className="social-icon"
              title="Instagram"
              target="_blank"
            >
              <i className="icon-instagram"></i>
            </a>
            <a
              href="#"
              className="social-icon"
              title="Youtube"
              target="_blank"
            >
              <i className="icon-youtube"></i>
            </a>
          </div>
          <p className="footer-copyright">
            Created By Lê Hữu Độ | All Rights Reserved!
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
