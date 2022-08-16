import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../components/Common/Loader";
import { deleteFromWishlist, getWishlist } from "../../actions/wishlistAction";
import formatPrice from "../../ultils/formatPrice";
import {
  ADD_TO_WISHLIST_RESET,
  REMOVE_WISHLIST_ITEM_RESET,
} from "../../constants/wishlistConstants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Wishlist() {
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

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [close, setClose] = useState([]);

  const { wishlist, isDeleted, isUpdated, loading } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    if (wishlist && wishlist.wishlistItems) {
      setClose(wishlist.wishlistItems);
    }
  }, [wishlist]);

  let history = useHistory();
  const dispatch = useDispatch();

  const deleteWishlistItems = (id) => {
    dispatch(deleteFromWishlist(id));
  };

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (isUpdated) {
      dispatch(getWishlist());
      dispatch({ type: ADD_TO_WISHLIST_RESET });
    }
    if (isDeleted) {
      dispatch(getWishlist());
      dispatch({ type: REMOVE_WISHLIST_ITEM_RESET });
    }
  }, [dispatch, isUpdated, isDeleted]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: "url('assets/images/page-header-bg.jpg')",
            }}
          >
            <div className="container">
              <h1 className="page-title">Danh sách yêu thích</h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Danh sách yêu thích
                </li>
              </ol>
            </div>
            {/* End .container */}
          </nav>

          <div className="page-content">
            <div className="container">
              {close.length !== 0 ? (
                <table className="table table-wishlist table-mobile">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giảm giá</th>
                      <th>Giá tiền</th>
                      <th>Trạng thái</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {wishlist &&
                      wishlist.wishlistItems.map((item) => (
                        <tr key={item.product._id}>
                          <td className="product-col">
                            <div className="product">
                              <figure className="product-media">
                                <Link to={`/product/${item.product._id}`}>
                                  <img src={item.image} alt={item.name} />
                                </Link>
                              </figure>

                              <h3 className="product-title">
                                <Link to={`/product/${item.product._id}`}>
                                  {item.name}
                                </Link>
                              </h3>
                            </div>
                          </td>
                          <td className="price-col">
                            {item.product.discountActive ? (
                              <span className="in-stock">Đang giảm giá</span>
                            ) : (
                              <span className="out-of-stock">Không</span>
                            )}
                          </td>
                          <td className="price-col">
                            {item.product.discountActive ? (
                              <>
                                <b>
                                  {formatPrice(
                                    item.product.price -
                                      item.product.price *
                                        (item.product.discountPercent / 100)
                                  )}
                                </b>
                                <br />
                                <del>{formatPrice(item.product.price)}</del>
                              </>
                            ) : (
                              <>{formatPrice(item.product.price)}</>
                            )}
                          </td>
                          <td className="stock-col">
                            {item.product.Stock ? (
                              <span className="in-stock">Còn hàng</span>
                            ) : (
                              <span className="out-of-stock">Hết hàng</span>
                            )}
                          </td>
                          <td className="action-col">
                            <Link to={`/product/${item.product._id}`}>
                              <button className="btn btn-block btn-outline-primary-2">
                                Xem chi tiết
                              </button>
                            </Link>
                          </td>
                          <td className="remove-col">
                            <button
                              className="btn-remove"
                              onClick={() =>
                                deleteWishlistItems(item.product._id)
                              }
                            >
                              <i className="icon-close"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <h3
                  style={{
                    fontSize: "2rem !important",
                    marginBottom: "2rem",
                  }}
                >
                  Không có sản phẩm yêu thích nào
                </h3>
              )}
              {/* End .table table-wishlist */}
              <div className="wishlist-share">
                <div className="social-icons social-icons-sm mb-2">
                  <label className="social-label">Share on:</label>
                  <a
                    href="#"
                    className="social-icon"
                    title="Facebook"
                    target="_blank"
                  >
                    <i className="icon-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    title="Twitter"
                    target="_blank"
                  >
                    <i className="icon-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    title="Instagram"
                    target="_blank"
                  >
                    <i className="icon-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    title="Youtube"
                    target="_blank"
                  >
                    <i className="icon-youtube"></i>
                  </a>
                  <a
                    href="#"
                    className="social-icon"
                    title="Pinterest"
                    target="_blank"
                  >
                    <i className="icon-pinterest"></i>
                  </a>
                </div>
                {/* End .soial-icons */}
              </div>
              {/* End .wishlist-share */}
            </div>
            {/* End .container */}
          </div>
          {/* End .page-content */}
        </main>
      )}
    </>
  );
}

export default Wishlist;
