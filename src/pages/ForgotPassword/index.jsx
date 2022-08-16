import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const useStyles = makeStyles({
  root: {
    fontSize: "100%",
  },
  forgotPasswordForm: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    marginBottom: "2rem",
  },
  forgotPasswordEmail: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  forgotPasswordBtn: {
    fontSize: "1.4rem !important",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ForgotPassword() {
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
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    if (message) {
      setOpenSuccess(true);
      setSuccessAlert(message);
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Quên mật khẩu" />;
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
              <h1 className="page-title">Quên mật khẩu</h1>
            </div>
          </div>
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/login">Đăng nhập</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Quên mật khẩu
                </li>
              </ol>
            </div>
          </nav>
          <MetaData title="Forgot Password" />
          <div className="container">
            <div className="forgotPasswordBox">
              <form
                className={classes.forgotPasswordForm}
                onSubmit={forgotPasswordSubmit}
              >
                <div className={classes.forgotPasswordEmail}>
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "200px", outline: "none" }}
                  />
                </div>

                <Button
                  type="submit"
                  variant="outlined"
                  color="warning"
                  className={classes.forgotPasswordBtn}
                >
                  Gửi
                </Button>
              </form>
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
}

export default ForgotPassword;
