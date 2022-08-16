import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  deleteFromCart,
  getCart,
  removeItemsFromCart,
} from "../../../actions/cartAction.js";
import { logout } from "../../../actions/userAction.js";
import { REMOVE_CART_ITEM_RESET } from "../../../constants/cartConstants.js";
import formatPrice from "../../../ultils/formatPrice.js";
import Loader from "../../Common/Loader/index.jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getWishlist } from "../../../actions/wishlistAction.js";
import './Header.scss';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Header() {
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");
  const [successAlert, setSuccessAlert] = useState("");

  const [hiddenMenu,setHiddenMenu] = useState(true);

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
  const [keyword, setKeyword] = useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cart, isDeleted, loading } = useSelector((state) => state.cart);

  const { wishlist, loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  const { cartItems } = useSelector((state) => state.cartLocal);

  let history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProduct(category));
  // }, [dispatch, category]);

  function logoutUser() {
    dispatch(logout());
    // alert("Đăng xuất thành công");
    setOpenSuccess(true);
    setSuccessAlert("Đăng xuất thành công");
    history.push("/");
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  const deleteCartItems = (id) => {
    dispatch(deleteFromCart(id));
  };

  const deleteCartItemsLocal = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  useEffect(() => {
    dispatch(getCart());
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getCart());
      dispatch({ type: REMOVE_CART_ITEM_RESET });
    }
  }, [dispatch, isDeleted]);

  let toggleCartItems = localStorage.getItem("cartItems");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (toggleCartItems) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [toggleCartItems]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="page-wrapper">
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
          <header className="header header-6">
            <div className="header-top">
              <div className="container">
                <div className="header-left">
                  <ul className="top-menu top-link-menu d-none d-md-block">
                    <li>
                      <a href="#">Links</a>
                      <ul>
                        <li>
                          <a href="tel:#">
                            <i className="icon-phone"></i>Call: +0123 456 789
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="header-right">
                  <div className="social-icons social-icons-color">
                    <a
                      href="https://www.facebook.com"
                      className="social-icon social-facebook"
                      title="Facebook"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-facebook-f"></i>
                    </a>
                    <a
                      href="https://twitter.com"
                      className="social-icon social-twitter"
                      title="Twitter"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-twitter"></i>
                    </a>
                    <a
                      href="https://www.pinterest.com/"
                      className="social-icon social-pinterest"
                      title="Instagram"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-pinterest-p"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      className="social-icon social-instagram"
                      title="Pinterest"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-instagram"></i>
                    </a>
                  </div>
                  <ul className="top-menu top-link-menu">
                    <li>
                      <a href="#">Links</a>
                      <ul>
                        <li>
                          {isAuthenticated ? (
                            <p
                              onClick={logoutUser}
                              style={{ cursor: "pointer" }}
                            >
                              <i className="icon-user"></i>Đăng xuất
                            </p>
                          ) : (
                            <a href="/login">
                              <i className="icon-user"></i>Đăng nhập/Đăng ký
                            </a>
                          )}
                        </li>
                      </ul>
                    </li>
                  </ul>

                  {isAuthenticated ? (
                    <div className="header-dropdown">
                      <a href="/my-account" style={{ cursor: "pointer" }}>
                        Tài khoản
                      </a>
                      <div className="header-menu">
                        <ul>
                          <li>
                            <Link to="/my-account">Hồ sơ</Link>
                          </li>
                          {user.role === "staff" || user.role === "admin" ? (
                            <li>
                              <Link to="/admin/dashboard">Dashboard Admin</Link>
                            </li>
                          ) : (
                            ""
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="header-middle">
              <div className="container">
                <div className="header-left">
                  <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
                    <form onSubmit={searchSubmitHandler}>
                      <div className="header-search-wrapper search-wrapper-wide">
                        <input
                          type="search"
                          className="form-control"
                          name="q"
                          id="q"
                          placeholder="Tìm kiếm sản phẩm ..."
                          required
                          onChange={(e) => setKeyword(e.target.value)}
                          style={{minWidth:"400px"}}
                        />
                        <button className="btn btn-primary" type="submit" >
                          <i className="icon-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="header-logo">
                  <a href="/" className="logo">
                    <img
                      src="/logo.png"
                      alt="Logo"
                      width="300"
                    />
                  </a>
                </div>

                <div className="header-right">
                  {isAuthenticated ? (
                    <Link to="/wishlist" className="wishlist-link">
                      <i className="icon-heart-o"></i>
                      <span className="wishlist-count">
                        {wishlist ? wishlist.wishlistItems.length : `0`}
                      </span>
                      <span className="wishlist-txt">Danh sách yêu thích</span>
                    </Link>
                  ) : (
                    ""
                  )}

                  {user ? (
                    <div className="dropdown cart-dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-display="static"
                      >
                        <i className="icon-shopping-cart"></i>
                        <span className="cart-count">
                          {cart ? cart.cartItems.length : `0`}
                        </span>
                        <span className="cart-txt">
                          {cart && formatPrice(cart.totalPrice)}
                        </span>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-cart-products">
                          {cart &&
                            cart.cartItems.map((item) => (
                              <div className="product" key={item._id}>
                                <div className="product-cart-details">
                                  <h4 className="product-title">
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>
                                  </h4>

                                  <span className="cart-product-info">
                                    <span className="cart-product-qty">
                                      {item.quantity}
                                    </span>{" "}
                                    x{" "}
                                    {item.discountActive
                                      ? formatPrice(item.priceSale)
                                      : formatPrice(item.price)}
                                  </span>
                                </div>

                                <figure className="product-image-container">
                                  <Link
                                    to={`/product/${item.product}`}
                                    className="product-image"
                                  >
                                    <img src={item.image} alt={item.name} />
                                  </Link>
                                </figure>
                                <p
                                  className="btn-remove"
                                  title="Xóa sản phẩm"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteCartItems(item.product._id)
                                  }
                                >
                                  <i className="icon-close"></i>
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className="dropdown-cart-total">
                          <span>Tổng cộng</span>

                          <span className="cart-total-price">
                            {cart && formatPrice(cart.totalPrice)}
                          </span>
                        </div>

                        <div className="dropdown-cart-action">
                          <a
                            href="/cart"
                            className="btn btn-outline-primary-2"
                            style={{
                              "&:hover": {
                                color: "#c96 !important",
                              },
                            }}
                          >
                            Giỏ hàng
                          </a>
                          <a
                            href="/checkout"
                            className="btn btn-outline-primary-2"
                          >
                            <span>Thanh toán</span>
                            <i className="icon-long-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown cart-dropdown">
                      <a
                        href="#"
                        className="dropdown-toggle"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-display="static"
                      >
                        <i className="icon-shopping-cart"></i>
                        <span className="cart-count">
                          {/* {cartItems && cartItems.length} */}
                          {toggle ? cartItems.length : `0`}
                        </span>
                        <span className="cart-txt">
                          {/* {cart && formatPrice(cart.totalPrice)} */}
                        </span>
                      </a>

                      <div className="dropdown-menu dropdown-menu-right">
                        <div className="dropdown-cart-products">
                          {cartItems &&
                            toggle &&
                            cartItems.map((item) => (
                              <div className="product" key={item.product}>
                                <div className="product-cart-details">
                                  <h4 className="product-title">
                                    <Link to={`/product/${item.product}`}>
                                      {item.name}
                                    </Link>
                                  </h4>

                                  <span className="cart-product-info">
                                    <span className="cart-product-qty">
                                      {item.quantity}
                                    </span>{" "}
                                    x {formatPrice(item.price)}
                                  </span>
                                </div>

                                <figure className="product-image-container">
                                  <Link
                                    to={`/product/${item.product}`}
                                    className="product-image"
                                  >
                                    <img src={item.image} alt={item.name} />
                                  </Link>
                                </figure>
                                <p
                                  className="btn-remove"
                                  title="Xóa sản phẩm"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    deleteCartItemsLocal(item.product)
                                  }
                                >
                                  <i className="icon-close"></i>
                                </p>
                              </div>
                            ))}
                        </div>

                        <div className="dropdown-cart-total">
                          <span>Tổng cộng</span>

                          <span className="cart-total-price">
                            {/* {cart && formatPrice(cart.totalPrice)} */}
                          </span>
                        </div>

                        <div className="dropdown-cart-action">
                          <a
                            href="/cart"
                            className="btn btn-outline-primary-2"
                            style={{
                              "&:hover": {
                                color: "#c96 !important",
                              },
                            }}
                          >
                            Giỏ hàng
                          </a>
                          <a
                            href="/checkout"
                            className="btn btn-outline-primary-2"
                          >
                            <span>Thanh toán</span>
                            <i className="icon-long-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="header-bottom sticky-header" style={{background:"#999999"}}>
              <div className="container">
                <div className="header-left">
                  <nav className="main-nav">
                    <ul className="menu sf-arrows" style={{background:"#313131",width:"210%"}}>
                      <li className="megamenu-container">
                        <a href="/" className="">
                          Trang chủ
                        </a>
                      </li>
                      <li>
                        <a
                          href="/products"
                        >
                          Sản phẩm
                        </a>
                      </li>

                      <li>
                        <a href="/blog" className="">
                          Tin tức
                        </a>
                      </li>
                      <li>
                        <a href="/about" className="">
                          Về chúng tôi
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="">
                          Kết nối
                        </a>
                      </li>
                      <li>
                        <a href="/faq" className="">
                          F.A.Q
                        </a>
                      </li>
                    </ul>
                  </nav>

                  <button className="mobile-menu-toggler">
                      <nav className={(hiddenMenu ?"hidden":"")+"menu"}>
                        <ul className="menu sf-arrows" style={{background:"#313131",width:"170%"}}>
                          <li className="megamenu-container">
                            <a href="/" className="">
                              Trang chủ
                            </a>
                          </li>
                          <li>
                            <a
                              href="/products"
                            >
                              Sản phẩm
                            </a>
                          </li>

                          <li>
                            <a href="/blog" className="">
                              Tin tức
                            </a>
                          </li>
                          <li>
                            <a href="/about" className="">
                              Về chúng tôi
                            </a>
                          </li>
                          <li>
                            <a href="/contact" className="">
                              Kết nối
                            </a>
                          </li>
                          <li>
                            <a href="/faq" className="">
                              F.A.Q
                            </a>
                          </li>
                        </ul>
                    </nav>
                    <span onClick={()=>setHiddenMenu(!hiddenMenu)}>{hiddenMenu ? <i className="icon-bars"></i>: <i className="icon-times"></i>}</span>
                  </button>
                </div>

              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
}

export default Header;
