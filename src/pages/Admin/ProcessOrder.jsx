import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getOrderDetails, updateOrder } from "../../actions/orderAction";
import { clearErrors } from "../../actions/productAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import formatPrice from "../../ultils/formatPrice";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../actions/userAction.js";


const drawerWidth = 240;
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles({
  root: {
    fontSize: "100%",
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const sexOptions = ["Nam", "Nữ"];
const roleOptions = ["admin", "staff", "user"];

export default function ProcessOrder() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");
  const { user } = useSelector((state) => state.user);

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
  const theme = useTheme();

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const { user: userNow } = useSelector((state) => state.user);
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  let history = useHistory();
  const dispatch = useDispatch();
  let match = useParams();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      setOpenError(true);
      setErrorAlert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      // alert("Cập nhật đơn hàng thành công");
      setOpenSuccess(true);
      setSuccessAlert("Cập nhật đơn hàng thành công");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.id));
  }, [dispatch, error, match.id, isUpdated, updateError]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.id, myForm));
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logOutUser() {
    dispatch(logout());
    // alert("Đăng xuất thành công");
    setOpenSuccess(true);
    setSuccessAlert("Đăng xuất thành công");
    history.push("/");
  }

  return (
    <Box sx={{ display: "flex" }} className={classes.root}>
      <MetaData title="Admin - Thông tin đơn hàng" />;
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
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundColor:"rgb(200, 255, 147)", color:"#000"}}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"    b v
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              LHD Computer
            </Typography>
          </div>
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span>Hi, {user.name}</span>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.avatar.url} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
               anchorEl={anchorElUser}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorElUser)}
               onClose={handleCloseUserMenu}
             >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/"><p><HomeIcon /> Trang chủ</p></Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to={`/admin/user/${user._id}`}><p><AccountBoxIcon /> Hồ sơ</p></Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <p onClick={logOutUser}> <LogoutIcon />  Đăng xuất</p>
                </MenuItem>
            </Menu>
            <div style={{borderLeft:"1px solid #666",padding:"5px 0 5px 15px"}}>
              <Link to="/admin/chat">
                <ChatIcon sx={{fontSize: 30,color:"#000"}}/>
              </Link>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Sidebar handleHistory={handleHistory} />
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <h3 id="productListHeading">Cập nhật đơn hàng</h3>
              <p className="cancelText" onClick={() => history.push('/admin/orders')}>Hủy</p>
            </div>
        {loading ? (
          <Loader />
        ) : (
          <div
            className="confirmOrderPage"
            style={{
              display: order.orderStatus === "Delivered" ? "block" : "grid",
            }}
          >
            <div>
              <Grid container spacing={2} className="confirmshippingArea">
                <Grid item xs={12} md={6}>
                  <Typography variant="h4">Địa chỉ giao hàng</Typography>
                  <div className="orderDetail">
                    <div>
                      <p>Họ tên:</p>
                      <span>{order.name}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.country}, ${order.shippingInfo.state}, ${order.shippingInfo.city}`}
                      </span>
                    </div>
                  </div>
                  <Typography variant="h4">Thanh toán</Typography>
                  <div className="orderDetail">
                    <div>
                      <p>Trạng thái</p>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </p>
                    </div>

                    <div>
                      <p>Tổng tiền:</p>
                      <span>
                        {order.totalPrice && formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>

                  <Typography variant="h4">Trạng thái đơn hàng</Typography>
                  <div className="orderDetail">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="confirmCartItems">
                    <Typography variant="h4">Giỏ hàng:</Typography>
                    <div className="confirmCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt={item.name} />
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>{" "}
                            <span>
                              {item.quantity} X {formatPrice(item.priceSale)} ={" "}
                              <b>
                                {formatPrice(item.priceSale * item.quantity)}
                              </b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display:
                        order.orderStatus === "Delivered" ? "none" : "block",
                    }}
                  >
                    <form
                      className="updateOrderForm"
                      onSubmit={updateOrderSubmitHandler}
                    >
                      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                        Trạng thái đơn hàng
                      </Typography>

                      <div>
                        <AccountTreeIcon />
                        {/* <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Chọn trạng thái</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select> */}
                        <FormControl sx={{ width: "50%" }}>
                          <InputLabel id="select-label">Trạng thái</InputLabel>
                          <Select
                            labelId="select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Trạng thái"
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {order.orderStatus === "Processing" && (
                              <MenuItem value="Shipped">Shipped</MenuItem>
                            )}
                            {order.orderStatus === "Shipped" && (
                              <MenuItem value="Delivered">Delivered</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </div>

                      <Button
                        id="createProductBtn"
                        type="submit"
                        variant="contained"
                        sx={{
                          marginTop: "10px",
                          fontSize: "1.5rem",
                          width: "20%",
                        }}
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                      >
                        Xử lý
                      </Button>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </div>
            {/*  */}
          </div>
        )}
      </Main>
    </Box>
  );
}
