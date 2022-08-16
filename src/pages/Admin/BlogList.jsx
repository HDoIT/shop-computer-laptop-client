import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Button } from "@mui/material";
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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteBlog, getAllBlogs } from "../../actions/blogAction";
import { clearErrors } from "../../actions/productAction";
import MetaData from "../../components/Layout/MetaData";
import { DELETE_BLOG_RESET } from "../../constants/blogConstants";
import "./Admin.scss";
import Sidebar from "./components/Sidebar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Loader from "../../components/Common/Loader";
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

export default function BlogList() {
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
  const { user } = useSelector((state) => state.user);
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { loading, error, blogs } = useSelector((state) => state.blogs);

  const { error: deleteError, isDeleted } = useSelector((state) => state.blog);

  let history = useHistory();

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHistory = (his) => {
    history.push(`/admin/${his}`);
  };

  const deleteBlogHandler = (id) => {
    dispatch(deleteBlog(id));
  };

  React.useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      setOpenError(true);
      setErrorAlert(deleteError);
      dispatch(clearErrors);
    }

    if (isDeleted) {
      // alert("Xóa tin tức thành công");
      setOpenSuccess(true);
      setSuccessAlert("Xóa tin tức thành công");
      history.push("/admin/blogs");
      dispatch({ type: DELETE_BLOG_RESET });
    }

    dispatch(getAllBlogs());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Tiêu đề",
      minWidth: 280,
      flex: 1,
    },
    {
      field: "desc",
      headerName: "Giới thiệu",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "category",
      headerName: "Danh mục",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "user",
      headerName: "Người đăng",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <React.Fragment>
            <Link to={`/admin/blog/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() => {
                confirmAlert({
                  title: "Xác nhận",
                  message: "Bạn có muốn xóa tin tức này?",
                  buttons: [
                    {
                      label: "Có",
                      onClick: () => {
                        deleteBlogHandler(params.getValue(params.id, "id"));
                      },
                    },
                    {
                      label: "Không",
                      onClick: () => {
                        return;
                      },
                    },
                  ],
                });
              }}
            >
              <DeleteIcon />
            </Button>
          </React.Fragment>
        );
      },
    },
  ];

  const rows = [];

  blogs &&
    blogs.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        desc: item.description,
        // image: item.image.url,
        user: item.user.name,
        category: item.category,
      });
    });

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
      <MetaData title="Admin - Danh mục" />;
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
        {/* <Divider /> */}
      </Drawer>
      {loading ? (
        <Loader />
      ) : (
        <Main open={open}>
          <DrawerHeader />
          <h3 id="productListHeading">Tất cả tin tức</h3>
          <div dir="rtl" className="addButton">
            <span>Thêm tin tức</span>
            <IconButton href="/admin/newBlog">
              <AddIcon />
            </IconButton>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Main>
      )}
    </Box>
  );
}
