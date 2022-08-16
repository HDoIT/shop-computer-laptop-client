import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import formatPrice from "../../ultils/formatPrice";
import Loader from "../Common/Loader";
import "./MyOrderDetail.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

function MyOrderDetail() {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const match = useParams();

  let history = useHistory();

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.id));
  }, [dispatch, error, match.id]);

  const cancelOrderSubmitHandler = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Bạn sẽ không thể quay trở lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hủy đơn hàng!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Hủy thành công!",
          "Đơn hàng của bạn đã được hủy.",
          "success"
        );
        const myForm = new FormData();

        myForm.set("status", "Canceled");

        dispatch(updateOrder(match.id, myForm));
        history.push("/my-account");
      }
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        // <MetaData title="Chi tiết đơn hàng" />
        <main className="main">
          <div
            className="page-header text-center"
            style={{
              backgroundImage: "url('assets/images/page-header-bg.jpg')",
            }}
          >
            <div className="container">
              <h1 className="page-title">Chi tiết đơn hàng</h1>
            </div>
          </div>
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/my-account">Đơn hàng của tôi</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Chi tiết đơn hàng
                </li>
              </ol>
            </div>
          </nav>
          <div className="page-content">
            <div className="container">
              <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                  <h3>Đơn hàng #{order && order._id}</h3>
                  <h4>Thông tin ship hàng</h4>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Họ và tên:</p>
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
                  <h4>Thông tin thanh toán</h4>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Phương thức thanh toán:</p>
                      <span>{order.paymentInfo && order.paymentInfo.type}</span>
                    </div>

                    <div>
                      <span>Trạng thái thanh toán:</span>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.type === "Đã thanh toán"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        <span> </span>
                        {order.paymentInfo && order.paymentInfo.status}
                      </p>
                    </div>

                    <div>
                      <p>Tổng đơn hàng:</p>
                      <span>
                        {order.totalPrice && formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>

                  <h4>Trạng thái đơn hàng</h4>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="orderDetailsCartItems">
                  <h4>Các sản phẩm trong giỏ hàng:</h4>
                  <table className="table table-cart table-mobile">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tạm tính</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <tr key={item.product}>
                            <td className="product-col">
                              <div className="product">
                                <figure className="product-media">
                                  <Link to={`/product/${item.product}`}>
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      style={{
                                        width: "5vmax",
                                      }}
                                    />
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
                            <td className="quantity-col">{item.quantity}</td>
                            <td className="total-col">
                              {formatPrice(item.quantity * item.price)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {order.orderStatus === "Processing" ? (
                  <form
                    className="updateOrderForm"
                    onSubmit={cancelOrderSubmitHandler}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                      Hủy đơn hàng
                    </Typography>

                    <div>
                      {/* <select onChange={(e) => setStatus(e.target.value)}>
                          <option value="">Chọn trạng thái</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select> */}
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      color="error"
                      variant="contained"
                      sx={{
                        marginTop: "10px",
                        fontSize: "1.5rem",
                        width: "20%",
                      }}
                      disabled={loading ? true : false}
                    >
                      Hủy đơn hàng
                    </Button>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default MyOrderDetail;
