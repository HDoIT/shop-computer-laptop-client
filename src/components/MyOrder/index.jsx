import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { clearErrors, myOrders } from "../../actions/orderAction";
import "./MyOrder.scss";

function MyOrder() {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: "100px", flex: 1 },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng sản phẩm",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      {orders ? (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={7}
            columnBuffer={5}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          {/* <Typography id="myOrdersHeading">{user.name}'s Orders</Typography> */}
        </div>
      ) : (
        <>
          <p>Chưa có đơn hàng nào được tạo.</p>
          <a href="/products" className="btn btn-outline-primary-2">
            <span>Đi xem Shop</span>
            <i className="icon-long-arrow-right"></i>
          </a>
        </>
      )}
    </>
  );
}

export default MyOrder;
