import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  addItemsToCartLocal,
  addToCart,
  deleteFromCart,
  getCart,
  removeItemsFromCart,
} from "../../actions/cartAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  ADD_TO_CART_RESET,
  REMOVE_CART_ITEM_RESET,
} from "../../constants/cartConstants";
import formatPrice from "../../ultils/formatPrice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cart() {
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
  const { cart, isDeleted, isUpdated, loading } = useSelector(
    (state) => state.cart
  );

  const { cartItems } = useSelector((state) => state.cartLocal);

  let history = useHistory();
  const dispatch = useDispatch();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      // alert("Sản phẩm trong kho không còn đủ");
      setOpenError(true);
      setErrorAlert("Sản phẩm trong kho không còn đủ");
      return;
    }
    dispatch(addToCart(id, 1));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty === 0) {
      dispatch(deleteFromCart(id));
      return;
    }
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, -1));
  };

  const deleteCartItems = (id) => {
    dispatch(deleteFromCart(id));
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(getCart());
      dispatch({ type: ADD_TO_CART_RESET });
    }
    if (isDeleted) {
      setOpenSuccess(true);
      setSuccessAlert("Xóa thanh công khỏi giỏ hàng");
      dispatch(getCart());
      dispatch({ type: REMOVE_CART_ITEM_RESET });
    }
  }, [dispatch, isUpdated, isDeleted]);

  //cart local
  const increaseQuantityLocal = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCartLocal(id, 1));
  };

  const decreaseQuantityLocal = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty === 0) {
      dispatch(removeItemsFromCart(id));
      return;
    }
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCartLocal(id, -1));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Giỏ hàng" />;
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
          >
            <div className="container">
              <h1 className="page-title">Giỏ hàng</h1>
            </div>
          </div>
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Giỏ hàng
                </li>
              </ol>
            </div>
          </nav>
          <div className="page-content">
            <div className="cart">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <table className="table table-cart table-mobile">
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Giảm giá</th>
                          <th>Giá</th>
                          <th>Số lượng</th>
                          <th>Tạm tính</th>
                          <th></th>
                        </tr>
                      </thead>

                      {user ? (
                        <tbody>
                          {cart &&
                            cart.cartItems.map((item) => (
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
                                    <span className="in-stock">
                                      Đang giảm giá
                                    </span>
                                  ) : (
                                    <span className="out-of-stock">Không</span>
                                  )}
                                </td>
                                <td className="price-col">
                                  {item.discountActive ? (
                                    <>
                                      <b>{formatPrice(item.priceSale)}</b>
                                      <br />
                                      <del>{formatPrice(item.price)}</del>
                                    </>
                                  ) : (
                                    <>{formatPrice(item.price)}</>
                                  )}
                                  {/* {formatPrice(item.price)} */}
                                </td>
                                <td className="quantity-col">
                                  <div className="cart-product-quantity">
                                    <div
                                      style={{
                                        border: "1px solid #d7d7d7",
                                        borderRadius: "3px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "40px",
                                        lineHeight: "30px",
                                        padding: "0 0.5rem",
                                        cursor: "pointer",
                                        width: "130px",
                                        zIndex: "9999",
                                      }}
                                    >
                                      <p
                                        style={{
                                          padding: "0 15px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          decreaseQuantity(
                                            item.product._id,
                                            item.quantity
                                          )
                                        }
                                      >
                                        -
                                      </p>
                                      <input
                                        style={{
                                          width: "30px",
                                          border: "none",
                                          textAlign: "center",
                                          height: "40px",
                                          lineHeight: "30px",
                                          outline: "none",
                                        }}
                                        type="text"
                                        value={item.quantity}
                                        readOnly
                                      />
                                      <p
                                        style={{
                                          padding: "0 15px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          increaseQuantity(
                                            item.product._id,
                                            item.quantity,
                                            item.product.Stock
                                          )
                                        }
                                      >
                                        +
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="total-col">
                                  {/* {item.product.discountActive ? (
                                    <>
                                      {formatPrice(
                                        (item.product.price -
                                          item.product.price *
                                            (item.product.discountPercent /
                                              100)) *
                                          item.quantity
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {formatPrice(
                                        item.product.price * item.quantity
                                      )}
                                    </>
                                  )} */}
                                  {formatPrice(item.quantity * item.priceSale)}
                                </td>
                                <td className="remove-col">
                                  <button
                                    className="btn-remove"
                                    onClick={() =>
                                      deleteCartItems(item.product._id)
                                    }
                                  >
                                    <i className="icon-close"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      ) : (
                        <tbody>
                          {cartItems &&
                            cartItems.map((item) => (
                              <tr key={item.product}>
                                <td className="product-col">
                                  <div className="product">
                                    <figure className="product-media">
                                      <Link to={`/product/${item.product}`}>
                                        <img src={item.image} alt={item.name} />
                                      </Link>
                                    </figure>

                                    <h3 className="product-title">
                                      <Link to={`/product/${item.product}`}>
                                        {item.name}
                                      </Link>
                                    </h3>
                                  </div>
                                </td>
                                <td className="price-col">
                                  {formatPrice(item.price)}
                                </td>
                                <td className="quantity-col">
                                  <div className="cart-product-quantity">
                                    <div
                                      style={{
                                        border: "1px solid #d7d7d7",
                                        borderRadius: "3px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "40px",
                                        lineHeight: "30px",
                                        padding: "0 0.5rem",
                                        cursor: "pointer",
                                        width: "130px",
                                        zIndex: "9999",
                                      }}
                                    >
                                      <p
                                        style={{
                                          padding: "0 15px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          decreaseQuantityLocal(
                                            item.product,
                                            item.quantity
                                          )
                                        }
                                      >
                                        -
                                      </p>
                                      <input
                                        style={{
                                          width: "30px",
                                          border: "none",
                                          textAlign: "center",
                                          height: "40px",
                                          lineHeight: "30px",
                                          outline: "none",
                                        }}
                                        type="text"
                                        value={item.quantity}
                                        readOnly
                                      />
                                      <p
                                        style={{
                                          padding: "0 15px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          increaseQuantityLocal(
                                            item.product,
                                            item.quantity,
                                            item.stock
                                          )
                                        }
                                      >
                                        +
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="total-col">
                                  {formatPrice(item.quantity * item.price)}
                                </td>
                                <td className="remove-col">
                                  <button
                                    className="btn-remove"
                                    onClick={() =>
                                      dispatch(
                                        removeItemsFromCart(item.product)
                                      )
                                    }
                                  >
                                    <i className="icon-close"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      )}
                    </table>

                    <div className="cart-bottom"></div>
                    {/* End .cart-bottom */}
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary summary-cart">
                      <h3 className="summary-title">Tổng giỏ hàng</h3>
                      {/* End .summary-title */}

                      <table className="table table-summary">
                        <tbody>
                          <tr className="summary-subtotal">
                            <td>Tạm tính:</td>
                            {user ? (
                              <td>{cart && formatPrice(cart.totalPrice)}</td>
                            ) : (
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
                            )}
                          </tr>
                          {/* End .summary-subtotal */}
                          <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                          </tr>

                          <tr className="summary-shipping-row">
                            <td>
                              <div className="custom-control custom-radio">
                                <input
                                  type="radio"
                                  id="free-shipping"
                                  name="shipping"
                                  className="custom-control-input"
                                  checked
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="free-shipping"
                                >
                                  Miễn phí vận chuyển
                                </label>
                              </div>
                              {/* End .custom-control */}
                            </td>
                            <td>{formatPrice(0)}</td>
                          </tr>
                          {/* End .summary-shipping-row */}

                          {/* <tr className="summary-shipping-row">
                        <td>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="standart-shipping"
                              name="shipping"
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="standart-shipping"
                            >
                              Standart:
                            </label>
                          </div>
                        </td>
                        <td>$10.00</td>
                      </tr>
                     

                      <tr className="summary-shipping-row">
                        <td>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              id="express-shipping"
                              name="shipping"
                              className="custom-control-input"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="express-shipping"
                            >
                              Express:
                            </label>
                          </div>
                        </td>
                        <td>$20.00</td>
                      </tr> */}

                          {/* <tr className="summary-shipping-estimate">
                        <td>
                          Estimate for Your Country
                          <br /> <a href="dashboard.html">Change address</a>
                        </td>
                        <td>&nbsp;</td>
                      </tr> */}

                          <tr className="summary-total">
                            <td>Tổng cộng:</td>
                            {user ? (
                              <td>{cart && formatPrice(cart.totalPrice)}</td>
                            ) : (
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
                            )}
                          </tr>
                        </tbody>
                      </table>

                      <a
                        href="/checkout"
                        className="btn btn-outline-primary-2 btn-order btn-block"
                      >
                        THANH TOÁN
                      </a>
                    </div>

                    <a
                      href="/products"
                      className="btn btn-outline-dark-2 btn-block mb-3"
                    >
                      <span>TIẾP TỤC MUA SẮM</span>
                      <i className="icon-refresh"></i>
                    </a>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Cart;
