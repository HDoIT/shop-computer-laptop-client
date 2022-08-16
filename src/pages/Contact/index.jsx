import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createContact } from "../../actions/contactAction";
import { useHistory } from "react-router-dom";
import { NEW_CONTACT_RESET } from "../../constants/contactConstants";
import MetaData from "../../components/Layout/MetaData";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Contact() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const form = useRef();
  const dispatch = useDispatch();
  let history = useHistory();

  const { loading, error, success } = useSelector((state) => state.newContact);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_pvsg1up",
        "template_lgkhn5s",
        form.current,
        "a0yKVEz_2_0NaPTQu"
      )
      .then(
        (result) => {
          const myForm = {
            name,
            email,
            title,
            detail,
          };

          // myForm.set("name", name);
          // myForm.set("email", email);
          // myForm.set("title", title);
          // myForm.set("detail", detail);

          dispatch(createContact(myForm));
        },
        (error) => {
          // alert(error.text);
          setOpenError(true);
          setErrorAlert(error.text);
        }
      );
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    if (success) {
      // alert("Gửi email thành công");
      setOpenSuccess(true);
      setSuccessAlert("Gửi email thành công");
      dispatch({ type: NEW_CONTACT_RESET });
      setName("");
      setEmail("");
      setTitle("");
      setDetail("");
    }
  }, [dispatch, error, history, success]);

  return (
    <main className="main">
      <MetaData title="Liên hệ" />;
      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="warning"
          sx={{ width: "100%", fontSize: "0.85em" }}
        >
          {errorAlert}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: "100%", fontSize: "0.85em" }}
        >
          {successAlert}
        </Alert>
      </Snackbar>
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Contact us
            </li>
          </ol>
        </div>
      </nav>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: "url('assets/images/contact-header-bg.jpg'",
          }}
        >
          <h1 className="page-title text-white">
            Liên hệ
            <span className="text-white">Giữ liên lạc với chúng tôi</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-2 mb-lg-0">
              {/* <h2 className="title mb-1">Thông tin liên hệ</h2> */}
              <figure className="store-media mb-2 mb-lg-0">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7513.491784738801!2d105.79381840017709!3d19.680843542553838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1660225022593!5m2!1svi!2s" width="550" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </figure>
            </div>
            <div className="col-lg-6">
              <h2 className="title mb-1">Bạn có câu hỏi cho chúng tôi?</h2>
              <p className="mb-2">
                Điền vào form bên dưới để liên hệ với đội ngũ chúng tôi
              </p>

              <form
                className="contact-form mb-3"
                ref={form}
                onSubmit={sendEmail}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <label htmlFor="cname" className="sr-only">
                      Tên
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cname"
                      placeholder="Tên *"
                      required
                      name="user_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="cemail" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="cemail"
                      placeholder="Email *"
                      required
                      name="user_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  {/* <div className="col-sm-6">
                    <label htmlFor="cphone" className="sr-only">
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="cphone"
                      placeholder="Số điện thoại"
                    />
                  </div> */}

                  <div className="col-sm-12">
                    <label htmlFor="csubject" className="sr-only">
                      Tiêu đề *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="csubject"
                      placeholder="Tiêu đề"
                      required
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <label htmlFor="cmessage" className="sr-only">
                  Lời nhắn
                </label>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="4"
                  id="cmessage"
                  required
                  placeholder="Lời nhắn *"
                  name="message"
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-outline-primary-2 btn-minwidth-sm"
                  disabled={loading ? true : false}
                >
                  <span>GỬI</span>
                  <i className="icon-long-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>

          <hr className="mt-4 mb-5" />

          {/* <div className="stores mb-4 mb-lg-5">
            <h2 className="title text-center mb-3">Cửa hàng của chúng tôi</h2>

            <div className="row">
              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <img
                          src="assets/images/stores/img-1.jpg"
                          alt="Thanh hóa"
                        />
                      </figure>
                    </div>
                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">
                          Trung tâm thương mại Plaza
                        </h3>
                        <address>88 Nguyễn Huệ, Thanh Xuân, Hà Nội</address>
                        <div>
                          <a href="tel:#">+84 12345678</a>
                        </div>

                        <h4 className="store-subtitle">Mở cửa:</h4>
                        <div>Thứ hai - Thứ bảy 8am đến 10pm</div>
                        <div>Chủ nhật 8am đến 11pm</div>

                        <a
                          href="https://www.google.com/maps/place/Si%C3%AAu+Th%E1%BB%8B+Big+C+Th%C4%83ng+Long/@21.0076674,105.7908089,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab55cdd10bf1:0x30858e944b154a88!8m2!3d21.0076674!4d105.7929976?hl=vi-VN"
                          className="btn btn-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>Xem bản đồ</span>
                          <i className="icon-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="store">
                  <div className="row">
                    <div className="col-sm-5 col-xl-6">
                      <figure className="store-media mb-2 mb-lg-0">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0731744013488!2d105.75171689999999!3d20.9897037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7bee9f7757%3A0x4ebf8ccfc24ec4ae!2zQUVPTiBNQUxMIEjDoCDEkMO0bmc!5e0!3m2!1svi!2s!4v1658463858690!5m2!1svi!2s" width="260" height="280" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                      </figure>
                    </div>

                    <div className="col-sm-7 col-xl-6">
                      <div className="store-content">
                        <h3 className="store-title">Aeon Hà Đông</h3>
                        <address>
                          Aeon Mall Hà Đông, Dương Nội, Hà Đông, Hà Nội
                        </address>
                        <div>
                          <a href="tel:#">+84 12345678</a>
                        </div>

                        <h4 className="store-subtitle">Mở cửa:</h4>
                        <div>Thứ hai - Thứ bảy 8am đến 10pm</div>
                        <div>Chủ nhật 8am đến 11pm</div>

                        <a
                          href="https://www.google.com/maps/place/AEON+Mall+H%C3%A0+%C4%90%C3%B4ng/@20.9897037,105.7495282,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab7bee9f7757:0x4ebf8ccfc24ec4ae!8m2!3d20.9897037!4d105.7517169?hl=vi-VN"
                          className="btn btn-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          
                          <span>Xem bản đồ</span>
                          <i className="icon-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}

export default Contact;
