import React from "react";
import MetaData from "../../components/Layout/MetaData";

function About() {
  return (
    <main className="main">
      <MetaData title="Về chúng tôi" />;
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Về chúng tôi
            </li>
          </ol>
        </div>
      </nav>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{ backgroundImage: "url('assets/images/about-header-bg.jpg'" }}
        >
          <h1 className="page-title text-white">
            About us<span className="text-white">Chúng tôi là ai</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-3 mb-lg-0">
              <h2 className="title" style={{fontSize:"500%",textAlign:"center"}}><i className="fas fa-brain"></i><h4>Creativity</h4></h2>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna.
              </p>
            </div>

            <div className="col-lg-4">
              <h2 className="title" style={{fontSize:"500%",textAlign:"center"}}><i className="fas fa-globe-africa"></i><h4>Worldwide</h4></h2>
              <p>
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue.
              </p>
            </div>
            <div className="col-lg-4">
              <h2 className="title" style={{fontSize:"500%",textAlign:"center"}}><i className="far fa-smile-wink"></i><h4>Unique Styles</h4></h2>
              <p>
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue.
              </p>
            </div>
          </div>

          <div className="mb-5"></div>
        </div>

        <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <h2 className="title">Chúng tôi là ai</h2>
                <p className="lead text-primary mb-3">
                  Pellentesque odio nisi, euismod pharetra a ultricies <br />
                  in diam. Sed arcu. Cras consequat
                </p>
                <p className="mb-2">
                  Sed pretium, ligula sollicitudin laoreet viverra, tortor
                  libero sodales leo, eget blandit nunc tortor eu nibh.
                  Suspendisse potenti. Sed egestas, ante et vulputate volutpat,
                  uctus metus libero eu augue.{" "}
                </p>

                <a
                  href="blog"
                  className="btn btn-sm btn-minwidth btn-outline-primary-2"
                >
                  <span>XEM TIN TỨC</span>
                  <i className="icon-long-arrow-right"></i>
                </a>
              </div>

              <div className="col-lg-6 offset-lg-1">
                <div className="about-images">
                  <img
                    src="assets/images/about/img-1.jpg"
                    alt=""
                    className="about-img-front"
                  />
                  <img
                    src="assets/images/about/img-2.jpg"
                    alt=""
                    className="about-img-back"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="card" style={{border:"1px solid #ddd",boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",margin:"20px"}}>
                <div className="card-body" style={{fontSize:"500%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <i className="fas fa-medal"></i>
                  <div style={{display:"flex",alignItems:"center",flexDirection:"column",padding:"20px"}}> 
                    <h5 style={{color:"#ddd"}}>Awards & Recognitions</h5>
                    <h2>10+</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card" style={{border:"1px solid #ddd",boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",margin:"20px"}}>
              <div className="card-body" style={{fontSize:"500%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <i className="fas fa-users"></i>
                  <div style={{display:"flex",alignItems:"center",flexDirection:"column",padding:"20px"}}>
                    <h5 style={{color:"#ddd"}}>Total guests</h5>
                    <h2>20,000+</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-sm-6">
              <div className="card" style={{border:"1px solid #ddd",boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",margin:"20px"}}>
              <div className="card-body" style={{fontSize:"500%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <i className="fas fa-laptop"></i>
                  <div style={{display:"flex",alignItems:"center",flexDirection:"column",padding:"20px"}}>
                    <h5 style={{color:"#ddd"}}>Products</h5>
                    <h2>2000+</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card" style={{border:"1px solid #ddd",boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",margin:"20px"}}>
              <div className="card-body" style={{fontSize:"500%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <i className="fas fa-user"></i>
                  <div style={{display:"flex",alignItems:"center",flexDirection:"column",padding:"20px"}}>
                    <h5 style={{color:"#ddd"}}>Employees</h5>
                    <h2>1000+</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <hr style={{width:"70%"}}/>

        <div className="container">
          <div className="row" style={{display:"flex", justifyContent:"center",textAlign:"center"}}>
            <div className="col-lg-7">
              <h2 className="title" style={{paddingBottom:"40px"}}>
                  CÁC THƯƠNG HIỆU LAPTOP HÀNG ĐẦU TRÊN THẾ GIỚI.
              </h2>
              <div className="brands-display">
                <div className="row justify-content-center">
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="assets/images/logo/brand-asus.png"
                        alt="Asus"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="assets/images/logo/brand-dell.png"
                        alt="dell"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="assets/images/logo/brand-hp.png"
                        alt="hp"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="assets/images/logo/brand-msi.png"
                        alt="Msi"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="assets/images/logo/brand-lenovo.png" alt="lenovo" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="assets/images/logo/brand-acer.png"
                        alt="acer"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="assets/images/logo/brand-razer.png"
                        alt="razer"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img
                        src="assets/images/logo/brand-apple.png"
                        alt="aplle"
                      />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="assets/images/logo/brand-samsung.png" alt="samsung" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-4 mb-6" />

          <h2 className="title text-center mb-4">Meet Our Team</h2>

          <div className="row">
            <div className="col-md-4">
              <div className="member member-anim text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/member-1.jpg"
                    alt="member photo"
                  />

                  <figcaption className="member-overlay">
                    <div className="member-overlay-content">
                      <h3 className="member-title">
                        Wayne Rooney<span>Founder & CEO</span>
                      </h3>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, maxime.
                      </p>
                      <div className="social-icons social-icons-simple">
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
                      </div>
                    </div>
                  </figcaption>
                </figure>
                <div className="member-content">
                  <h3 className="member-title">
                    Wayne Rooney<span>Founder & CEO</span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="member member-anim text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/member-2.jpg"
                    alt="member photo"
                  />

                  <figcaption className="member-overlay">
                    <div className="member-overlay-content">
                      <h3 className="member-title">
                        Ronaldo<span>Sales & Marketing Manager</span>
                      </h3>
                      <p>
                        Sed pretium, ligula sollicitudin viverra, tortor libero
                        sodales leo, eget blandit nunc.
                      </p>
                      <div className="social-icons social-icons-simple">
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
                      </div>
                    </div>
                  </figcaption>
                </figure>
                <div className="member-content">
                  <h3 className="member-title">
                    Ronaldo<span>Sales & Marketing Manager</span>
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="member member-anim text-center">
                <figure className="member-media">
                  <img
                    src="assets/images/team/member-3.jpg"
                    alt="member photo"
                  />

                  <figcaption className="member-overlay">
                    <div className="member-overlay-content">
                      <h3 className="member-title">
                        Messi<span>Product Manager</span>
                      </h3>
                      <p>
                        Sed pretium, ligula sollicitudin viverra, tortor libero
                        sodales leo, eget blandit nunc.
                      </p>
                      <div className="social-icons social-icons-simple">
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
                      </div>
                    </div>
                  </figcaption>
                </figure>
                <div className="member-content">
                  <h3 className="member-title">
                    Messi<span>Product Manager</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2"></div>

        <div className="about-testimonials bg-light-2 pt-6 pb-6">
          <div className="container">
            <h2 className="title text-center mb-3">
              What Customer Say About Us
            </h2>

            <div
              className="owl-carousel owl-simple owl-testimonials-photo"
              data-toggle="owl"
              data-owl-options='{
                      "nav": false, 
                      "dots": true,
                      "margin": 20,
                      "loop": false,
                      "responsive": {
                          "1200": {
                              "nav": true
                          }
                      }
                  }'
            >
              <blockquote className="testimonial text-center">
                <img src="assets/images/testimonials/user-1.jpg" alt="user" />
                <p>
                  “ Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Pellentesque aliquet nibh nec urna. <br />
                  In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
                  pretium, ligula sollicitudin laoreet viverra, tortor libero
                  sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis.
                  Ut justo. Suspendisse potenti. ”
                </p>
                <cite>
                  Jenson Gregory
                  <span>Customer</span>
                </cite>
              </blockquote>

              <blockquote className="testimonial text-center">
                <img src="assets/images/testimonials/user-2.jpg" alt="user" />
                <p>
                  “ Impedit, ratione sequi, sunt incidunt magnam et. Delectus
                  obcaecati optio eius error libero perferendis nesciunt atque
                  dolores magni recusandae! Doloremque quidem error eum quis
                  similique doloribus natus qui ut ipsum.Velit quos ipsa
                  exercitationem, vel unde obcaecati impedit eveniet non. ”
                </p>

                <cite>
                  Victoria Ventura
                  <span>Customer</span>
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
