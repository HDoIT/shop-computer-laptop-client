import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearErrors,
  loadUser,
  logout,
  updatePassword,
  updateProfile,
  updateShippingInfo,
} from "../../actions/userAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import MyOrder from "../../components/MyOrder";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
  UPDATE_SHIP_RESET,
} from "../../constants/userConstants";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyAccount() {
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
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [addressInfo, setAddressInfo] = useState("");
  const [cityInfo, setCityInfo] = useState("");
  const [stateInfo, setStateInfo] = useState("");
  const [countryInfo, setCountryInfo] = useState("");
  const [phoneNoInfo, setPhoneNoInfo] = useState("");

  let history = useHistory();

  function logoutUser() {
    dispatch(logout());
    setOpenSuccess(true);
    setSuccessAlert("Đăng xuất thành công");
    history.push("/");
  }

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      email,
    };
    dispatch(updateProfile(myForm));
  };

  const updateShippingInfoSubmit = (e) => {
    e.preventDefault();

    const shippingInfo = {
      city,
      state,
      country,
      address,
      phoneNo,
    };

    dispatch(updateShippingInfo(shippingInfo));
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (user && user.shippingInfo) {
      setCity(user.shippingInfo.city);
      setState(user.shippingInfo.state);
      setCountry(user.shippingInfo.country);
      setAddress(user.shippingInfo.address);
      setPhoneNo(user.shippingInfo.phoneNo);

      setCityInfo(user.shippingInfo.city);
      setStateInfo(user.shippingInfo.state);
      setCountryInfo(user.shippingInfo.country);
      setAddressInfo(user.shippingInfo.address);
      setPhoneNoInfo(user.shippingInfo.phoneNo);
    }
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      // setOpenSuccess(true);
      // setSuccessAlert("Cập nhật thành công");
      Swal.fire({
        // position: 'top-end',
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(loadUser());
      history.push("/my-account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      dispatch({
        type: UPDATE_SHIP_RESET,
      });
    }
  }, [dispatch, error, history, user, isUpdated]);

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Thông tin cá nhân" />;
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
          <div
            className="page-header text-center"
            style={{
              backgroundImage: "url('assets/images/page-header-bg.jpg')",
            }}
          >
            <div className="container">
              <h1 className="page-title">Tài khoản của tôi</h1>
            </div>
          </div>
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Tài khoản của tôi
                </li>
              </ol>
            </div>
          </nav>
          <div className="page-content">
            <div className="dashboard">
              <div className="container">
                <div className="row">
                  <aside className="col-md-4 col-lg-3">
                    <ul
                      className="nav nav-dashboard flex-column mb-3 mb-md-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="tab-dashboard-link"
                          data-toggle="tab"
                          href="#tab-dashboard"
                          role="tab"
                          aria-controls="tab-dashboard"
                          aria-selected="true"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="tab-orders-link"
                          data-toggle="tab"
                          href="#tab-orders"
                          role="tab"
                          aria-controls="tab-orders"
                          aria-selected="false"
                        >
                          Đơn hàng
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="tab-address-link"
                          data-toggle="tab"
                          href="#tab-address"
                          role="tab"
                          aria-controls="tab-address"
                          aria-selected="false"
                        >
                          Địa chỉ
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="tab-account-link"
                          data-toggle="tab"
                          href="#tab-account"
                          role="tab"
                          aria-controls="tab-account"
                          aria-selected="false"
                        >
                          Chi tiết tài khoản
                        </a>
                      </li>
                      <li className="nav-item">
                        <span
                          className="nav-link"
                          onClick={logoutUser}
                          style={{ cursor: "pointer" }}
                        >
                          Đăng xuất
                        </span>
                      </li>
                    </ul>
                  </aside>
                  {/* End .col-lg-3 */}

                  <div className="col-md-8 col-lg-9">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="tab-dashboard"
                        role="tabpanel"
                        aria-labelledby="tab-dashboard-link"
                      >
                        <p>
                          Xin chào{" "}
                          <span className="font-weight-normal text-dark">
                            {user.name}
                          </span>{" "}
                          (Không phải{" "}
                          <span className="font-weight-normal text-dark">
                            {user.name}
                          </span>
                          ?{" "}
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={logoutUser}
                          >
                            Đăng xuất
                          </span>
                          )
                          <br />
                          Từ giao diện tài khoản bạn có thể xem{" "}
                          <a
                            href="#tab-orders"
                            className="tab-trigger-link link-underline"
                          >
                            những đơn hàng gần đây
                          </a>
                          , quản lý{" "}
                          <a href="#tab-address" className="tab-trigger-link">
                            thông tin ship của bạn
                          </a>
                          , và{" "}
                          <a href="#tab-account" className="tab-trigger-link">
                            chỉnh sửa thông tin bản thân và tài khoản của bạn
                          </a>
                          .
                        </p>
                      </div>
                      {/* .End .tab-pane */}

                      <div
                        className="tab-pane fade"
                        id="tab-orders"
                        role="tabpanel"
                        aria-labelledby="tab-orders-link"
                      >
                        <MyOrder />
                      </div>
                      {/* .End .tab-pane */}

                      <div
                        className="tab-pane fade"
                        id="tab-address"
                        role="tabpanel"
                        aria-labelledby="tab-address-link"
                      >
                        <p>
                          Thông tin địa chỉ sẽ được dùng để thanh toán mặc định.
                        </p>

                        <div className="row">
                          <div className="col-lg-6">
                            <div className="card card-dashboard">
                              <div className="card-body">
                                <h3 className="card-title">
                                  Thông tin của bạn
                                </h3>
                                {/* End .card-title */}

                                <p>
                                  Họ và tên: {user.name}
                                  <br />
                                  Email của bạn: {user.email}
                                  <br />
                                  Địa chỉ: {addressInfo}, {countryInfo},{" "}
                                  {stateInfo}, {cityInfo}
                                  <br />
                                  Số điện thoại: {phoneNoInfo}
                                  <br />
                                  {/* <a href="#">
                                    Sửa <i className="icon-edit"></i>
                                  </a> */}
                                </p>
                              </div>
                              {/* End .card-body */}
                            </div>
                            {/* End .card-dashboard */}
                          </div>
                          {/* End .col-lg-6 */}

                          <div className="col-lg-6">
                            <div className="card card-dashboard">
                              <div className="card-body">
                                <h3 className="card-title">
                                  Địa chỉ giao hàng
                                </h3>
                                <form
                                  encType="multipart/form-data"
                                  onSubmit={updateShippingInfoSubmit}
                                >
                                  <label>Số điện thoại *</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                  />

                                  <label>Thành phố *</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                  />

                                  <label>Quận / Huyện *</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                  />

                                  <label>Xã / Phường *</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                  />

                                  <label>Địa chỉ <span style={{color: "red"}}>*</span></label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />

                                  <button
                                    type="submit"
                                    className="btn btn-outline-primary-2"
                                  >
                                    <span>LƯU THAY ĐỔI</span>
                                    <i className="icon-long-arrow-right"></i>
                                  </button>
                                </form>
                                {/* <a href="#">
                                  Sửa <i className="icon-edit"></i>
                                </a> */}
                              </div>
                              {/* End .card-body */}
                            </div>
                            {/* End .card-dashboard */}
                          </div>
                          {/* End .col-lg-6 */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* .End .tab-pane */}

                      <div
                        className="tab-pane fade"
                        id="tab-account"
                        role="tabpanel"
                        aria-labelledby="tab-account-link"
                      >
                        <form
                          encType="multipart/form-data"
                          onSubmit={updateProfileSubmit}
                        >
                          <label>Họ và tên *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <small className="form-text">
                            Tên của bạn sẽ được hiển thị ở phần tài khoản và
                            bình luận
                          </small>

                          <label>Địa chỉ email *</label>
                          <input
                            type="email"
                            className="form-control"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>LƯU THAY ĐỔI</span>
                            <i className="icon-long-arrow-right"></i>
                          </button>
                        </form>
                        <form
                          encType="multipart/form-data"
                          onSubmit={updatePasswordSubmit}
                        >
                          <label>Mật khẩu hiện tại *</label>
                          <input
                            type="password"
                            className="form-control"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />

                          <label>Mật khẩu mới *</label>
                          <input
                            type="password"
                            className="form-control"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />

                          <label>Xác nhận mật khẩu *</label>
                          <input
                            type="password"
                            className="form-control mb-2"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />

                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>ĐỔI MẬT KHẨU</span>
                            <i className="icon-long-arrow-right"></i>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default MyAccount;
