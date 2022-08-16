import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Autocomplete, Avatar, Button, Grid, TextField } from "@mui/material";
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
import { clearErrors } from "../../actions/productAction";
import { getUserDetails, updateUser, updateShippingInfo } from "../../actions/userAction";
import MetaData from "../../components/Layout/MetaData";
import { UPDATE_USER_RESET,
        UPDATE_SHIP_RESET } from "../../constants/userConstants";
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
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    fontSize: "100%",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

const roleOptions = ["admin", "staff", "user"];

export default function UpdateUser() {
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
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const { user: userNow } = useSelector((state) => state.user);
  const { loading, error, user } = useSelector((state) => state.userDetails);

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

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  let history = useHistory();
  const dispatch = useDispatch();
  let match = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setphoneNo] = useState("");

  const [inputRoleValue, setInputRoleValue] = useState(roleOptions[2]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  const userId = match.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (user && user.shippingInfo) {

      setCity(user.shippingInfo.city);
      setState(user.shippingInfo.state);
      setCountry(user.shippingInfo.country);
      setAddress(user.shippingInfo.address);
      setphoneNo(user.shippingInfo.phoneNo);

    }
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
      // alert("Cập nhật tài khoản thành công");
      setOpenSuccess(true);
      setSuccessAlert("Cập nhật tài khoản thành công");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
      dispatch({
        type: UPDATE_SHIP_RESET,
      });
    }
  }, [dispatch, error, history, isUpdated, userId, user, updateError]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const shippingInfo = {
        city,
        state,
        country,
        address,
        phoneNo,
    };
  


    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    myForm.set("shippingInfo",shippingInfo);

    dispatch(updateUser(userId, myForm));
    
  };

  return (
    <Box sx={{ display: "flex" }} className={classes.root}>
      <MetaData title="Admin - Chỉnh sửa tài khoản" />;
      <CssBaseline />
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
            <span>Hi, {userNow.name}</span>
            <Tooltip title={`Open settings ${userNow.role}`}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userNow.name} src={userNow.avatar.url} />
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
                  <Link to={`/admin/user/${userNow._id}`}><p><AccountBoxIcon /> Hồ sơ</p></Link>
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
        {/* <Divider /> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <h3 id="productListHeading">Chỉnh sửa tài khoản</h3>
        <form
          className="flexDiv"
          encType="multipart/form-data"
          onSubmit={updateUserSubmitHandler}
        >
          <Grid container spacing={2}>
            {/* <div className="flexDiv"> */}
            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Họ và tên</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                type="text"
                label="Họ và tên"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                sx={{ width: "50%" }}
              />
            </Grid>
            {/* </div> */}

            {/* <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Giới tính</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <Autocomplete
                value={sex}
                onChange={(event, newValue) => {
                  setSex(newValue);
                }}
                inputValue={inputSexValue}
                onInputChange={(event, newInputValue) => {
                  setInputSexValue(newInputValue);
                }}
                id="controllable-sex"
                options={sexOptions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Giới tính" />
                )}
              />
            </Grid> */}

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Email</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                inputProps={{
                  type: "email",
                }}
                label="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ width: "50%" }}
              ></TextField>
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Quyền</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <Autocomplete
                value={role}
                onChange={(event, newValue) => {
                  setRole(newValue);
                }}
                inputValue={inputRoleValue}
                onInputChange={(event, newInputValue) => {
                  setInputRoleValue(newInputValue);
                }}
                id="controllable-role"
                options={roleOptions}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Quyền" />
                )}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Thành phố</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>

              <TextField
                type="text"
                label="Thành phố"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                variant="outlined"
                sx={{ width: "50%" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Quận / Huyện</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                type="text"
                label="Quận / Huyện"
                value={state}
                onChange={(e) => setState(e.target.value)}
                variant="outlined"
                sx={{ width: "50%" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Xã / Phường</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                type="text"
                label="Xã / Phường"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                variant="outlined"
                sx={{ width: "50%" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Địa chỉ</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                type="text"
                label="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                sx={{ width: "50%" }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={4}
              md={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <p>Số điện thoại</p>
            </Grid>
            <Grid item xs={12} sm={8} md={10}>
              <TextField
                type="text"
                label="Số điện thoại"
                required
                value={phoneNo}
                onChange={(e) => setphoneNo(e.target.value)}
                variant="outlined"
                sx={{ width: "50%" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                id="createProductBtn"
                type="submit"
                variant="contained"
                disabled={loading ? true : false}
                sx={{
                  marginBottom: "50px",
                }}
              >
                Cập nhật tài khoản
              </Button>
            </Grid>
          </Grid>
        </form>
      </Main>
    </Box>
  );
}
