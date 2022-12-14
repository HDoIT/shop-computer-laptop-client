import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartAction.js";
import { clearErrors, createOrder } from "../../actions/orderAction.js";
import { updateShippingInfo } from "../../actions/userAction.js";
import Loader from "../../components/Common/Loader/index.jsx";
import MetaData from "../../components/Layout/MetaData.jsx";
import { CREATE_ORDER_RESET } from "../../constants/orderConstants.js";
import { UPDATE_SHIP_RESET } from "../../constants/userConstants.js";
import formatPrice from "../../ultils/formatPrice.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./Checkout.scss";

const useStyles = makeStyles({
  root: {},
  accordionContainer: {
    background: "#f9f9f9 !important",
    border: "none !important",
    boxShadow: "none !important",
    padding: "0 !important",
  },
  radioButton: {},
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Checkout() {
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

  const classes = useStyles();
  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { error, isSubmit } = useSelector((state) => state.newOrder);
  const {
    error: errorProfile,
    isUpdated,
    loading: profileLoading,
  } = useSelector((state) => state.profile);
  const { cartItems, shippingInfo: shippingInfoLocal } = useSelector(
    (state) => state.cartLocal
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [comments, setComments] = useState("");

  const [payment, setPayment] = useState("Chuy???n kho???n ng??n h??ng");

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
    }
    if (!user && shippingInfoLocal) {
      setName(shippingInfoLocal.name);
      setEmail(shippingInfoLocal.email);
      setCity(shippingInfoLocal.city);
      setState(shippingInfoLocal.state);
      setCountry(shippingInfoLocal.country);
      setAddress(shippingInfoLocal.address);
      setPhoneNo(shippingInfoLocal.phoneNo);
    }
  }, [user, shippingInfoLocal]);

  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  const checkoutSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 7 || phoneNo.length > 11) {
      // alert("S??? ??i???n tho???i c???n t??? 8 -> 10 s???");
      setOpenError(true);
      setErrorAlert("S??? ??i???n tho???i c???n t??? 8 -> 10 s???");
      return;
    }

    if (user) {
      const shippingInfo = {
        city: city,
        state: state,
        country: country,
        address: address,
        phoneNo: phoneNo,
      };

      const cartItems1 = cart.cartItems.map((item) => {
        return {
          ...item,
          product: item.product._id,
        };
      });

      const order = {
        name: user.name,
        email: user.email,
        shippingInfo: shippingInfo,
        orderItems: cartItems1,
        user: user && user._id,
        itemsPrice: cart && cart.totalPrice,
        shippingPrice: 0,
        totalPrice: cart && cart.totalPrice,
        paymentInfo: {
          type: payment,
          status: "Ch??a thanh to??n",
        },
        orderComments: comments,
        // user: user,
      };

      if (order.paymentInfo.type === "Chuy???n kho???n b???ng Stripe") {
        sessionStorage.setItem("order", JSON.stringify(order));
        sessionStorage.setItem(
          "paidAt",
          JSON.stringify(new Date().toLocaleDateString("en-GB"))
        );

        dispatch(updateShippingInfo(shippingInfo));
        history.push("/payment");
      } else {
        sessionStorage.setItem("order", JSON.stringify(order));
        sessionStorage.setItem(
          "paidAt",
          JSON.stringify(new Date().toLocaleDateString("en-GB"))
        );

        order.paymentInfo.id = "abc";

        dispatch(updateShippingInfo(shippingInfo));
        dispatch(createOrder(order));
      }
    } else {
      const shippingInfo = {
        city: city,
        state: state,
        country: country,
        address: address,
        phoneNo: phoneNo,
      };

      const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      const order = {
        name: name,
        email: email,
        shippingInfo: shippingInfo,
        orderItems: cartItems,
        // user: user && user._id,
        itemsPrice: subtotal,
        shippingPrice: 0,
        totalPrice: subtotal,
        paymentInfo: {
          id: "abc",
          type: payment,
          status: "Ch??a thanh to??n",
        },
        orderComments: comments,
      };

      if (order.paymentInfo.type === "Chuy???n kho???n b???ng Stripe") {
        //L??u th??ng tin ship v??o user n???u ???? ????ng nh???p
        // Ch??a ????ng nh???p th?? l??u v??o localStorage
        dispatch(
          saveShippingInfo({
            name,
            email,
            address,
            city,
            state,
            country,
            phoneNo,
          })
        );
        sessionStorage.setItem("order", JSON.stringify(order));

        history.push("/payment");
      } else {
        //L??u th??ng tin ship v??o user n???u ???? ????ng nh???p
        // Ch??a ????ng nh???p th?? l??u v??o localStorage
        dispatch(
          saveShippingInfo({
            name,
            email,
            address,
            city,
            state,
            country,
            phoneNo,
          })
        );
        dispatch(createOrder(order));
      }
    }
  };

  useEffect(() => {
    if (errorProfile) {
      setOpenError(true);
      setErrorAlert(errorProfile);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_SHIP_RESET });
    }
  }, [dispatch, errorProfile, isUpdated]);

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    if (isSubmit) {
      // setOpenSuccess(true);
      // setSuccessAlert("T???o ????n h??ng th??nh c??ng");
      Swal.fire("Th??nh c??ng!", "T???o ????n h??ng th??nh c??ng!", "success");
      localStorage.removeItem("cartItems");
      history.push("/");
      dispatch({
        type: CREATE_ORDER_RESET,
      });
    }
  }, [dispatch, error, history, isSubmit]);

  return (
    <>
      {loading && cartLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Thanh to??n" />;
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
              <h1 className="page-title">Thanh to??n</h1>
            </div>
          </div>
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang ch???</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Thanh to??n
                </li>
              </ol>
            </div>
          </nav>
          <div className="page-content">
            <div className="checkout">
              <div className="container">
                <form encType="multipart/form-data" onSubmit={checkoutSubmit}>
                  <div className="row">
                    <div className="col-lg-9">
                      <h2 className="checkout-title">Th??ng tin thanh to??n</h2>

                      <label>H??? v?? t??n *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <label>?????a ch??? email *</label>
                      <input
                        type="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <label>S??? ??i???n tho???i *</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="S??? ??i???n tho???i"
                        required
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />

                      <div className="row">
                        <div className="col-sm-6">
                          <label>T???nh / Th??nh ph??? *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: H?? N???i"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>

                        <div className="col-sm-6">
                          <label>Qu???n / Huy???n *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: Nam T??? Li??m"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-6">
                          <label>X?? / Ph?????ng *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: Xu??n Ph????ng"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </div>

                        <div className="col-sm-6">
                          <label>?????a ch??? *</label>
                          <input
                            type="text"
                            className="form-control"
                            required
                            placeholder="VD: S??? 7 ng??ch 47 ng?? 80"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkout-create-acc"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkout-create-acc"
                        >
                          T???o m???t t??i kho???n m???i?
                        </label>
                      </div> */}

                      {/* <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="checkout-diff-address"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="checkout-diff-address"
                        >
                          Giao h??ng ?????n m???t ?????a ch??? kh??c?
                        </label>
                      </div> */}

                      <label>Th??ng tin b??? sung (T??y ch???n)</label>
                      <textarea
                        className="form-control"
                        cols="30"
                        rows="4"
                        placeholder="Ghi ch?? v??? ????n h??ng, v?? d???: th???i gian hay ch??? d???n ?????a ??i???m giao h??ng chi ti???t h??n"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      ></textarea>
                    </div>
                    <aside className="col-lg-3">
                      <div className="summary">
                        <h3 className="summary-title">????n h??ng c???a b???n</h3>

                        <table className="table table-summary">
                          <thead>
                            <tr>
                              <th>S???n ph???m</th>
                              <th>T???m t??nh</th>
                            </tr>
                          </thead>
                          {user ? (
                            <tbody>
                              {cart &&
                                cart.cartItems.map((item) => (
                                  <tr>
                                    <td>
                                      <Link to={`/product/${item.product._id}`}>
                                        {item.name} x {item.quantity}
                                      </Link>
                                    </td>
                                    <td>
                                      {item.discountActive
                                        ? formatPrice(
                                            item.quantity * item.priceSale
                                          )
                                        : formatPrice(
                                            item.quantity * item.price
                                          )}
                                    </td>
                                  </tr>
                                ))}
                              <tr className="summary-subtotal">
                                <td>T???m t??nh:</td>
                                <td>{cart && formatPrice(cart.totalPrice)}</td>
                              </tr>
                              <tr>
                                <td>Ph?? giao h??ng:</td>
                                <td>Mi???n ph??</td>
                              </tr>
                              <tr className="summary-total">
                                <td>T???ng c???ng:</td>
                                <td>{cart && formatPrice(cart.totalPrice)}</td>
                              </tr>
                            </tbody>
                          ) : (
                            <tbody>
                              {cartItems &&
                                cartItems.map((item) => (
                                  <tr>
                                    <td>
                                      <Link to={`/product/${item.product}`}>
                                        {item.name} x {item.quantity}
                                      </Link>
                                    </td>
                                    <td>
                                      {formatPrice(item.quantity * item.price)}
                                    </td>
                                  </tr>
                                ))}
                              <tr className="summary-subtotal">
                                <td>T???m t??nh:</td>
                                <td>
                                  {cartItems &&
                                    formatPrice(
                                      cartItems.reduce(
                                        (acc, item) =>
                                          acc + item.quantity * item.price,
                                        0
                                      )
                                    )}
                                </td>
                              </tr>
                              <tr>
                                <td>Ph?? giao h??ng:</td>
                                <td>Mi???n ph??</td>
                              </tr>
                              <tr className="summary-total">
                                <td>T???ng c???ng:</td>
                                <td>
                                  {cartItems &&
                                    formatPrice(
                                      cartItems.reduce(
                                        (acc, item) =>
                                          acc + item.quantity * item.price,
                                        0
                                      )
                                    )}
                                </td>
                              </tr>
                            </tbody>
                          )}
                        </table>

                        <div
                          className="accordion-summary"
                          id="accordion-payment"
                        >
                          <RadioGroup
                            name="controlled-radio-buttons-group"
                            value={payment}
                            onChange={handleChangePayment}
                          >
                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <FormControlLabel
                                  value="Chuy???n kho???n ng??n h??ng"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Chuy???n kho???n ng??n h??ng"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Gi??? l???i ID ????n h??ng khi thanh to??n. ????n h??ng
                                  c???a b???n s??? ???????c v???n chuy???n khi thanh to??n.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                              >
                                <FormControlLabel
                                  value="Tr??? ti???n m???t khi nh???n h??ng"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Tr??? ti???n m???t khi nh???n h??ng"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Thanh to??n khi nh???n h??ng ????? ho??n t???t.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                              >
                                <FormControlLabel
                                  value="Chuy???n kho???n b???ng Stripe"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Chuy???n kho???n b???ng Stripe"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Quisque volutpat mattis eros. Lorem ipsum
                                  dolor sit amet, consectetuer adipiscing elit.
                                  Donec odio. Quisque volutpat mattis eros.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordionContainer}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4a-content"
                                id="panel4a-header"
                              >
                                <FormControlLabel
                                  value="Chuy???n kho???n b???ng VNPAY"
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
                                        color: "#c96",
                                        "&.Mui-checked": {
                                          color: "#c96",
                                        },
                                      }}
                                    />
                                  }
                                  label="Chuy???n kho???n b???ng VNPAY"
                                  // className={classes.labelForm}
                                />
                              </AccordionSummary>
                              <AccordionDetails sx={{ padding: "0" }}>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                  Quisque volutpat mattis eros. Lorem ipsum
                                  dolor sit amet, consectetuer adipiscing elit.
                                  Donec odio. Quisque volutpat mattis eros.
                                  <img
                                    style={{
                                      margin: "0 5px",
                                    }}
                                    src="assets/images/payments-summary.png"
                                    alt="payments cards"
                                  />
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </RadioGroup>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-outline-primary-2 btn-order btn-block"
                        >
                          <span className="btn-text">?????t h??ng</span>
                          <span className="btn-hover-text">
                            Ti???n h??nh thanh to??n
                          </span>
                        </button>
                      </div>
                    </aside>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Checkout;
