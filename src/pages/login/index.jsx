import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  clearErrors,
  loadUser,
  login,
  register,
} from "../../actions/userAction";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import MetaData from "../../components/Layout/MetaData";
import Loader from "../../components/Common/Loader";
import './Login.scss';

const useStyles = makeStyles({
  root: {},
  avatarInput: {
    display: "flex",
    alignItems: " center",
  },
  avatarPreview: {
    width: "6rem",
    height: "6rem",
    borderRadius: "100%",
    marginRight: "15px",
  },
  avatarFile: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0%",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const dispatch = useDispatch();
  let history = useHistory();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [clicked,setClicked] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [er, setEr] = useState("");

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();


    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      // alert(error);
      setOpen(true);
      setEr(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      // hop le
      dispatch(loadUser());
      history.push("/");
    }
  }, [dispatch, error, history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Đăng nhập" />;
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%", fontSize: "0.85em" }}
            >
              {er}
            </Alert>
          </Snackbar>
          <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">

            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Pages</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Login
                </li>
              </ol>
            </div>
          </nav>
          <div
            className="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
            style={{
              // backgroundImage: "url('assets/images/backgrounds/login-bg.jpg')",
              backgroundImage: "url('BACK.jpg')"
            }}
          >
          <div className="container">
            <div className="form-box" style={{backgroundColor:"transparent"}}>
            <div className={`login-signup ${clicked}`} id="login-signup">
            <div className="form-login-signup sign-up-login-signup">
              <form className="form-login"
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}>
                <h1>Create Account</h1>
                <div className="social-login-signup">
                  <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                  <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" name="name" value={name}
                            onChange={registerDataChange}/>
                <input type="email" placeholder="Email" name="email" value={email}
                            onChange={registerDataChange}/>
                <input type="password" placeholder="Password" name="password" value={password}
                            onChange={registerDataChange}/>
                <div className="form-group">
                  <label htmlFor="register-avatar">Ảnh đại diện</label>
                  <div
                    id="registerImage"
                    className={classes.avatarInput}
                  >
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className={classes.avatarPreview}
                    />
                    <input
                      id="register-avatar"
                      className={classes.avatarFile}
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="register-policy-2"
                    required
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="register-policy-2"
                  >
                    Tôi đồng ý với <a href="#">điều khoản</a> *
                  </label>
                </div>
                <button className="btn-login">Sign Up</button>
              </form>
            </div>
            <div className="form-login-signup sign-in-login-signup">
              <form className="form-login" onSubmit={loginSubmit}>
                <h1>Sign in</h1>
                <div className="social-login-signup">
                  <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                  <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <input type="email" placeholder="Email" value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}/>
                <button className="btn-login">Sign In</button>
                <Link to="/forgot-password" className="forgot-link">
                            Quên mật khẩu?
                </Link>
              </form>
            </div>
            <div className="overlay-login-signup">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className="btn-login ghost" id="signIn" onClick={()=> setClicked("")}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button className="btn-login ghost" id="signUp" onClick={()=> setClicked("right-panel-active")}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
          {/*  */}
            {/* <div className="container">
              <div className="form-box">
                <div className="form-tab">
                  <ul className="nav nav-pills nav-fill" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="signin-tab-2"
                        data-toggle="tab"
                        href="#signin-2"
                        role="tab"
                        aria-controls="signin-2"
                        aria-selected="false"
                        style={{
                          fontSize: "2.4rem",
                          padding: "0.9rem 1rem",
                        }}
                      >
                        ĐĂNG NHẬP
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="register-tab-2"
                        data-toggle="tab"
                        href="#register-2"
                        role="tab"
                        aria-controls="register-2"
                        aria-selected="true"
                        style={{
                          fontSize: "2.4rem",
                          padding: "0.9rem 1rem",
                        }}
                      >
                        ĐĂNG KÝ
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade"
                      id="signin-2"
                      role="tabpanel"
                      aria-labelledby="signin-tab-2"
                    >
                      <form onSubmit={loginSubmit}>
                        <div className="form-group">
                          <label htmlFor="singin-email-2">
                            Email của bạn *
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="singin-email-2"
                            name="singin-email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="singin-password-2">Mật khẩu *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="singin-password-2"
                            name="singin-password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>Đăng nhập</span>
                            <i className="icon-long-arrow-right"></i>
                          </button>

                          <Link to="/forgot-password" className="forgot-link">
                            Quên mật khẩu?
                          </Link>
                        </div>
                      </form>
                      <div className="form-choice"></div>
                    </div>
                    <div
                      className="tab-pane fade show active"
                      id="register-2"
                      role="tabpanel"
                      aria-labelledby="register-tab-2"
                    >
                      <form
                        method="POST"
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                      >
                        <div className="form-group">
                          <label htmlFor="register-name">Tên của bạn *</label>
                          <input
                            type="text"
                            className="form-control"
                            id="register-name"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="register-email-2">
                            Email của bạn *
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="register-email-2"
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="register-password-2">
                            Mật khẩu *
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="register-password-2"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="register-avatar">Ảnh đại diện</label>
                          <div
                            id="registerImage"
                            className={classes.avatarInput}
                          >
                            <img
                              src={avatarPreview}
                              alt="Avatar Preview"
                              className={classes.avatarPreview}
                            />
                            <input
                              id="register-avatar"
                              className={classes.avatarFile}
                              type="file"
                              name="avatar"
                              accept="image/*"
                              onChange={registerDataChange}
                            />
                          </div>
                        </div>

                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>Đăng ký</span>
                            <i className="icon-long-arrow-right"></i>
                          </button>

                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="register-policy-2"
                              required
                              style={{ cursor: "pointer" }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="register-policy-2"
                            >
                              Tôi đồng ý với <a href="#">điều khoản</a> *
                            </label>
                          </div>
                        </div>
                      </form>
                      <div className="form-choice"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </main>
      )}
    </>
  );
}

export default Login;
