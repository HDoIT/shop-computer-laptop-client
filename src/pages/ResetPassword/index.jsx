import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { clearErrors, resetPassword } from "../../actions/userAction";
import LockIcon from "@mui/icons-material/Lock";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./ResetPassword.scss";
import { Box, Button, Container, Paper } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ResetPassword() {
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
  let history = useHistory();
  const dispatch = useDispatch();
  let match = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = {
      password,
      confirmPassword,
    };

    // myForm.set("password", password);
    // myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.token, myForm));
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    if (success) {
      // alert("Cập nhật mật khẩu thành công");
      setOpenSuccess(true);
      setSuccessAlert("Cập nhật mật khẩu thành công");

      history.push("/login");
    }
  }, [dispatch, error, history, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Đặt lại mật khẩu" />
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
          <Container className="resetPasswordContainer">
            <Box className="resetPasswordBox">
              <Paper className="resetPasswordPaper" elevation={3}>
                <h4 className="resetPasswordHeading">Cập nhật mật khẩu</h4>

                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  <div>
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="Mật khẩu mới"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockIcon />
                    <input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="resetPasswordBtn"
                    variant="contained"
                  >
                    Cập nhật
                  </Button>
                </form>
              </Paper>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ResetPassword;
