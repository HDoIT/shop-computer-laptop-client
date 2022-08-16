import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { makeStyles } from "@mui/styles";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";
import MetaData from "../../components/Layout/MetaData";
import { CREATE_ORDER_RESET } from "../../constants/orderConstants";
import "./Payment.scss";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const useStyles = makeStyles({
  root: {},
  divFlex: {
    display: "flex",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Payment() {
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
  const orderInfo = JSON.parse(sessionStorage.getItem("order"));

  const classes = useStyles();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  let history = useHistory();

  const { shippingInfo, cartItems } = useSelector((state) => state.cartLocal);
  const { user } = useSelector((state) => state.user);
  const { error, isSubmit } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice / 299),
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: orderInfo.name,
            email: orderInfo.email,
            address: {
              line1: orderInfo.shippingInfo.address,
              city: orderInfo.shippingInfo.city,
              state: orderInfo.shippingInfo.state,
              // postal_code: shippingInfo.pinCode,
              // country: orderInfo.shippingInfo.country,
              country: "VN",
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderInfo.paymentInfo = {
            id: result.paymentIntent.id,
            type: "Chuyển khoản bằng Stripe",
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(orderInfo));

          // history.push("/");
        } else {
          // alert("Có vấn đề khi thanh toán ");
          setOpenError(true);
          setErrorAlert("Có vấn đề khi thanh toán ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error);
    }
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    if (isSubmit) {
      Swal.fire("Thành công!", "Tạo đơn hàng thành công!", "success");
      localStorage.removeItem("cartItems");
      history.push("/");
      dispatch({
        type: CREATE_ORDER_RESET,
      });
    }
  }, [dispatch, error, isSubmit, history]);

  return (
    <main className="main">
      <MetaData title="Thanh toán tiền" />;
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
      <div className="container">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <h2>Thông tin thẻ</h2>
          <div>
            <CreditCardIcon /> Số thẻ
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon /> Ngày thẻ
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon /> CVC
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            // value={`Trả - ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="btn btn-outline-primary-2"
            style={{
              marginTop: "10px",
            }}
          />
        </form>
      </div>
    </main>
  );
}

export default Payment;
