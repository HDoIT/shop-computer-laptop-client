import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import formatPrice from "../../ultils/formatPrice";
import { getAllCategories } from "../../actions/categoryAction";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import "./Product.scss";
import MetaData from "../../components/Layout/MetaData";
import Loader from "../../components/Common/Loader";
import Button from "../../components/Common/Button";
import WavyLine from "../../components/Common/WavyLine";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addToWishlist, getWishlist } from "../../actions/wishlistAction";
import { ADD_TO_WISHLIST_RESET } from "../../constants/wishlistConstants";
import { padding } from "@mui/system";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Product() {
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
  const [close, setClose] = useState(false);
  const [category, setCategory] = useState("");
  const [ram, setRam] = useState("");
  const [cpu, setCpu] = useState("");
  const [machineSeries, setMachineSeries] = useState("");
  const [monitorSize, setMonitorSize] = useState([0, 100]);
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openBrand, setOpenBrand] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openCpu,setOpenCpu] = useState(true);
  const [openRam, setOpenRam] = useState(true);
  const [openSeries, setOpenSeries] = useState(true);
  const [openSize, setOpenSize] = useState(true);
  const [price, setPrice] = useState([0, 151]);
  const [value, setValue] = useState([0, 151]);

  // const numberWithCommas = (x) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // } 


  const handleClickOpenCpu = () => {
    setOpenCpu(!openCpu);
  };

  const handleClickOpenBrand = () => {
    setOpenBrand(!openBrand);
  };
  const handleClickOpenPrice = () => {
    setOpenPrice(!openPrice);
  };
  const handleClickOpenRam = () => {
    setOpenRam(!openRam);
  };
  const handleClickOpenSeries = () => {
    setOpenSeries(!openSeries);
  };
  const handleClickOpenSize = () => {
    setOpenSize(!openSize);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);


  let match = useParams();

  const data = useSelector((state) => state.products);
  const keyword = match && match.keyword;

  const dispatch = useDispatch();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice([value[0],value[1]]);
  };

  const resetHandle = (e)=>{
    setPrice([0,151]);
    setValue([0,151]);
  }

  const { error: wishlistError, isUpdated: wishlistUpdated } = useSelector(
    (state) => state.wishlist
  );

  const addToWishlistHandler = (id) => {
    if (wishlistError) {
      setOpenError(true);
      setErrorAlert(wishlistError);
      return;
    }
    dispatch(addToWishlist(id));
    setOpenSuccess(true);
    setSuccessAlert("Thêm sản phẩm vào danh sách yêu thích thành công");
  };

  useEffect(() => {
    if (wishlistError) {
      setOpenError(true);
      setErrorAlert(wishlistError);
      dispatch(clearErrors());
    }
    if (wishlistUpdated) {
      dispatch(getWishlist());
      dispatch({ type: ADD_TO_WISHLIST_RESET });
    }
  }, [dispatch, wishlistError, wishlistUpdated]);

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
    dispatch(
      getProduct(
        currentPage,
        category,
        price,
        sort,
        keyword,
        ram,
        cpu,
        machineSeries,
        monitorSize
      )
    );
  }, [
    dispatch,
    error,
    currentPage,
    category,
    price,
    sort,
    keyword,
    ram,
    cpu,
    machineSeries,
    monitorSize
  ]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Tất cả sản phẩm" />;
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
          
          <div className="page-header text-center">
            <div className="container">
              <WavyLine/>
              <h1 className="page-title">Sản phẩm</h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Sản phẩm
                </li>
              </ol>
            </div>
            {/* End .container */}
          </nav>
          {/* End .breadcrumb-nav */}
          <div className="page-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="toolbox">
                    <div className="toolbox-left">
                      {/* <div className="toolbox-info">
                    Đang xem{" "}
                    <span>
                      {resultPerPage} trong {productsCount}
                    </span>{" "}
                    Sản phẩm
                  </div> */}
                    </div>

                    <div className="toolbox-right">
                      <div className="toolbox-sort">
                        <label htmlFor="sortby">Sắp xếp theo:</label>
                        <div className="select-custom">
                          <select
                            name="sortby"
                            id="sortby"
                            className="form-control"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                          >
                            <option value="">Mới nhất</option>
                            <option value="sort=oldest">Cũ nhất</option>
                            <option value="sort=price">Giá: Thấp- Cao</option>
                            <option value="sort=-price">Giá: Cao- Thấp</option>
                          </select>
                        </div>
                      </div>
                      {/* End .toolbox-sort */}
                    </div>
                    {/* End .toolbox-right */}
                  </div>
                  {/* End .toolbox */}

                  <div className="products mb-3">
                    <div className="row justify-content-center">
                      {products ? (
                        products.map((product) => (
                          <div
                            className="col-6 col-md-4 col-lg-4"
                            key={product._id}
                          >
                            <div className="product product-7 text-center">
                              <figure className="product-media">
                                {product.discountActive ? (
                                  <span className="product-label label-sale">
                                    sale
                                  </span>
                                ) : (
                                  ""
                                )}
                                {product.Stock <= 0 ? (
                                  <span className="product-label label-out">
                                    Hết hàng
                                  </span>
                                ) : (
                                  ""
                                )}

                                <Link to={`/product/${product._id}`}>
                                  <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="product-image"
                                  />
                                </Link>

                                <div className="product-action-vertical">
                                  <p
                                    onClick={() =>
                                      addToWishlistHandler(product._id)
                                    }
                                    className="btn-product-icon btn-wishlist btn-expandable"
                                    style={{
                                      cursor: "pointer",
                                      transition: "all 0.25s linear",
                                    }}
                                  >
                                    <span>Thêm vào danh sách yêu thích</span>
                                  </p>
                                </div>
                                {/* End .product-action-vertical */}

                                <div className="product-action">
                                  <Link to={`/product/${product._id}`} className="btn-product btn-cart">
                                    <span>
                                      <span
                                        style={{ textTransform: "uppercase" }}
                                      >
                                        C
                                      </span>
                                      lick để xem chi tiết
                                    </span>
                                  </Link>
                                </div>
                                {/* End .product-action */}
                              </figure>
                              {/* End .product-media */}

                              <div className="product-body">
                                <div className="product-cat">
                                  <a href="#">{product.category.name}</a>
                                </div>
                                {/* End .product-cat */}
                                <h3 className="product-title">
                                  <Link to={`/product/${product._id}`}>
                                    {product.name}
                                  </Link>
                                </h3>
                                {/* End .product-title */}
                                <div className="product-price">
                                  {product.discountActive ? (
                                    <>
                                      <span className="new-price">
                                        {formatPrice(
                                          product.price -
                                          product.price *
                                          (product.discountPercent / 100)
                                        )}
                                      </span>
                                      <span className="old-price">
                                        <del>{formatPrice(product.price)}</del>
                                      </span>
                                    </>
                                  ) : (
                                    <span
                                      className="out-price"
                                      style={{
                                        color: "#c96",
                                      }}
                                    >
                                      {formatPrice(product.price)}
                                    </span>
                                  )}
                                </div>
                                {/* End .product-price */}
                                <div className="ratings-container">
                                  {/* <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            ></div>
                          </div> */}
                                  <Rating
                                    size="large"
                                    value={product.ratings}
                                    readOnly
                                  />
                                  {/* End .ratings */}
                                  <span className="ratings-text">
                                    ( {product.numOfReviews} Reviews )
                                  </span>
                                </div>
                                {/* End .rating-container */}
                              </div>
                              {/* End .product-body */}
                            </div>
                            {/* End .product */}
                          </div>
                        ))
                      ) : (
                        <p>Không có sản phẩm nào</p>
                      )}
                    </div>
                  </div>
                  {/* End .products */}

                  {resultPerPage < filteredProductsCount && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Trang sau"
                        prevPageText="Trang trước"
                        firstPageText="Trang đầu"
                        lastPageText="Trang cuối"
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  )}
                </div>
                {/* End .col-lg-9 */}
                <aside className="col-lg-3 order-lg-first" style={{backgroundColor:"#fff"}}>
                  <div className="sidebar sidebar-shop">
                    <div className="widget widget-clean">
                      <label style={{border:"1px solid #ddd", padding:"4px 25% 4px 25%",textTransform:"uppercase",fontWeight:"bold"}}>Lọc sản phẩm</label>
                      {/* <a href="#" className="sidebar-filter-clear">
                        Xóa trường
                      </a> */}
                    </div>
                    {/* End .widget widget-clean */}

                    {/* <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <p
                          role="button"
                          onClick={handleClickOpenType}
                          style={{
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "1.6rem",
                            color: "black",
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "10px",
                          }}
                        >
                          Loại
                          {openType ? (
                            <ExpandLess fontSize="large" />
                          ) : (
                            <ExpandMore fontSize="large" />
                          )}
                        </p>
                      </h3> */}
                      {/* End .widget-title */}

                      {/* <Collapse
                        className="collapse show"
                        id="widget-5"
                        in={openType}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="widget-body">
                          <div className="filter-items">
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="type-1"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setType("Laptop");
                                      setPrice([0, 40]);
                                      setMachineSeries("");
                                      setCategory("");
                                      setMonitorSize([0, 43]);
                                    } else {
                                      setType("");
                                    }
                                  }}
                                  checked={type === "Laptop"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="type-1"
                                >
                                  Laptop
                                </label>
                              </div>
                            </div> */}
                            {/* End .filter-item */}

                            {/* <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="type-2"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setType("PC");
                                      setPrice([0, 40]);
                                      setCategory("");
                                      setMachineSeries("");
                                      setMonitorSize([0, 43]);
                                    } else {
                                      setType("");
                                    }
                                  }}
                                  checked={type === "PC"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="type-2"
                                >
                                  PC
                                </label>
                              </div>
                            </div> */}
                            {/* End .filter-item */}
                          {/* </div>
                        </div>
                      </Collapse>
                    </div> */}

                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <p
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-1"
                          onClick={handleClickOpenBrand}
                          style={{
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "1.6rem",
                            color: "black",
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "10px",
                          }}
                        >
                          Thương hiệu
                          {openBrand ? (
                            <ExpandLess fontSize="large" />
                          ) : (
                            <ExpandMore fontSize="large" />
                          )}
                        </p>
                      </h3>
                      {/* End .widget-title */}

                      <Collapse
                        className="collapse show"
                        id="widget-1"
                        in={openBrand}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="widget-body">
                          <div className="filter-items">
                            {categories &&
                              categories.map((cat) => {
                                return (
                                  <div className="filter-item" key={cat._id}>
                                    <div className="custom-control custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={`${cat._id}`}
                                        onClick={(e) => {
                                          if (e.target.checked) {
                                            setCategory(cat._id);
                                            // setPrice([0, 40]);
                                            // setRam("");
                                            // setMachineSeries("");
                                            // setMonitorSize([0, 43]);
                                          } else {
                                            setCategory("");
                                          }
                                        }}
                                        checked={
                                          category === cat._id ? true : false
                                        }
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor={`${cat._id}`}
                                      >
                                        {cat.name}
                                      </label>
                                    </div>
                                    {/* End .custom-checkbox */}
                                    {/* <span className="item-count">3</span> */}
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <p
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-2"
                          onClick={handleClickOpenPrice}
                          style={{
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "1.6rem",
                            color: "black",
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "10px",
                          }}
                        >
                          Mức giá
                          {openPrice ? (
                            <ExpandLess fontSize="large" />
                          ) : (
                            <ExpandMore fontSize="large" />
                          )}
                        </p>
                      </h3>
                      {/* End .widget-title */}

                      <Collapse
                        className="collapse show"
                        id="widget-2"
                        in={openPrice}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="widget-body">
                          <div className="filter-items">
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="price-2"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([0, 10]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setPrice([0, 151]);
                                    }
                                  }}
                                  checked={price[0] === 0 && price[1] === 10}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="price-2"
                                >
                                  Dưới 10 triệu
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="price-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([10, 15]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setPrice([0, 151]);
                                    }
                                  }}
                                  checked={price[0] === 10 && price[1] === 15}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="price-3"
                                >
                                  Từ 10 triệu - 15 triệu
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="price-4"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([15, 20]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setPrice([0, 151]);
                                    }
                                  }}
                                  checked={price[0] === 15 && price[1] === 20}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="price-4"
                                >
                                  Từ 15 triệu - 20 triệu
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="price-5"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([20, 50]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setPrice([0, 151]);
                                    }
                                  }}
                                  checked={price[0] === 20 && price[1] === 50}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="price-5"
                                >
                                  Từ 20 triệu - 50 triệu
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="price-6"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setPrice([50, 151]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setPrice([0, 151]);
                                    }
                                  }}
                                  checked={price[0] === 50 && price[1] === 151}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="price-6"
                                >
                                  Trên 50 triệu
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <p
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-4"
                          onClick={handleClickOpenRam}
                          style={{
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "1.6rem",
                            color: "black",
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "10px",
                          }}
                        >
                          RAM
                          {openRam ? (
                            <ExpandLess fontSize="large" />
                          ) : (
                            <ExpandMore fontSize="large" />
                          )}
                        </p>
                      </h3>
                      {/* End .widget-title */}

                      <Collapse
                        className="collapse show"
                        id="widget-4"
                        in={openRam}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="widget-body">
                          <div className="filter-items">
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="ram-1"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRam("4GB");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setRam("");
                                    }
                                  }}
                                  checked={ram === "4GB"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="ram-1"
                                >
                                  4GB
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="ram-2"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRam("8GB");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setRam("");
                                    }
                                  }}
                                  checked={ram === "8GB"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="ram-2"
                                >
                                  8GB
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="ram-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRam("16GB");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setRam("");
                                    }
                                  }}
                                  checked={ram === "16GB"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="ram-3"
                                >
                                  16GB
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="ram-4"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRam("32GB");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setRam("");
                                    }
                                  }}
                                  checked={ram === "32GB"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="ram-4"
                                >
                                  32GB
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}
                            {/*  */}
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="ram-5"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRam("64GB");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setRam("");
                                    }
                                  }}
                                  checked={ram === "64GB"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="ram-5"
                                >
                                  64GB
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="ram-6"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setRam("128GB");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setRam("");
                                    }
                                  }}
                                  checked={ram === "128GB"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="ram-6"
                                >
                                  {`>`} 64GB
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <p
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-4"
                          onClick={handleClickOpenCpu}
                          style={{
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "1.6rem",
                            color: "black",
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "10px",
                          }}
                        >
                          CPU
                          {openCpu ? (
                            <ExpandLess fontSize="large" />
                          ) : (
                            <ExpandMore fontSize="large" />
                          )}
                        </p>
                      </h3>
                      {/* End .widget-title */}

                      <Collapse
                        className="collapse show"
                        id="widget-4"
                        in={openCpu}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="widget-body">
                          <div className="filter-items">
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-1"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Intel Celeron/Pentium");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Intel Celeron/Pentium"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-1"
                                >
                                  Intel Celeron/Pentium
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-2"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Intel Core i3");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Intel Core i3"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-2"
                                >
                                  Intel Core i3
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Intel Core i5");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Intel Core i5"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-3"
                                >
                                  Intel Core i5
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-4"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Intel Core i7");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Intel Core i7"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-4"
                                >
                                  Intel Core i7
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}
                            {/*  */}
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-5"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Intel Core i9");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Intel Core i9"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-5"
                                >
                                  Intel Core i9
                                </label>
                              </div>
                              {/* End .custom-checkbox */}
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-6"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("AMD Ryzen 3");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "AMD Ryzen 3"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-6"
                                >
                                  AMD Ryzen 3
                                </label>
                              </div>
                            </div>

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-7"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Intel Xeon");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Intel Xeon"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-7"
                                >
                                  Intel Xeon
                                </label>
                              </div>
                            </div>

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-8"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("AMD Ryzen 5");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "AMD Ryzen 5"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-8"
                                >
                                  AMD Ryzen 5
                                </label>
                              </div>
                            </div>

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-9"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("AMD Ryzen 7");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "AMD Ryzen 7"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-9"
                                >
                                  AMD Ryzen 7
                                </label>
                              </div>
                            </div>

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-10"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("AMD Ryzen 9");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "AMD Ryzen 9"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-10"
                                >
                                  AMD Ryzen 9
                                </label>
                              </div>
                            </div>

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-11"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Microsoft SQ2");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Microsoft SQ2"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-11"
                                >
                                  Microsoft SQ2
                                </label>
                              </div>
                            </div>

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-12"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Apple M1");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Apple M1"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-12"
                                >
                                  Apple M1
                                </label>
                              </div>
                            </div>

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cpu-13"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setCpu("Apple M2");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setMachineSeries("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setCpu("");
                                    }
                                  }}
                                  checked={cpu === "Apple M2"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="cpu-13"
                                >
                                  Apple M2
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <p
                          role="button"
                          onClick={handleClickOpenSeries}
                          style={{
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "1.6rem",
                            color: "black",
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "10px",
                          }}
                        >
                          Dòng máy
                          {openSeries ? (
                            <ExpandLess fontSize="large" />
                          ) : (
                            <ExpandMore fontSize="large" />
                          )}
                        </p>
                      </h3>
                      {/* End .widget-title */}

                      <Collapse
                        className="collapse show"
                        id="widget-5"
                        in={openSeries}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="widget-body">
                          <div className="filter-items">
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="Series-1"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMachineSeries("Laptop Gaming");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setMachineSeries("");
                                    }
                                  }}
                                  checked={machineSeries === "Laptop Gaming"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="Series-1"
                                >
                                  Laptop Gaming
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="Series-2"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMachineSeries("Đồ Họa, Kiến Trúc");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setMachineSeries("");
                                    }
                                  }}
                                  checked={machineSeries === "Đồ Họa, Kiến Trúc"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="Series-2"
                                >
                                  Đồ Họa, Kiến Trúc
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="Series-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMachineSeries("Phổ Thông, Văn Phòng");
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMonitorSize([0, 43]);
                                    } else {
                                      setMachineSeries("");
                                    }
                                  }}
                                  checked={machineSeries === "Phổ Thông, Văn Phòng"}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="Series-3"
                                >
                                  Phổ Thông, Văn Phòng
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <p
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-7"
                          onClick={handleClickOpenSize}
                          style={{
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "1.6rem",
                            color: "black",
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "10px",
                          }}
                        >
                          Kích thước màn hình
                          {openSize ? (
                            <ExpandLess fontSize="large" />
                          ) : (
                            <ExpandMore fontSize="large" />
                          )}
                        </p>
                      </h3>
                      {/* End .widget-title */}

                      {/* Size mặt */}
                      <Collapse
                        className="collapse show"
                        id="widget-7"
                        in={openSize}
                        timeout="auto"
                        unmountOnExit
                      >
                        <div className="widget-body">
                          <div className="filter-items">
                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="monitor-1"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMonitorSize([11, 12]);
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                    } else {
                                      setMonitorSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    monitorSize[0] === 11 && monitorSize[1] === 12
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="monitor-1"
                                >
                                  {/* {`<`}30 mm */}Từ 11 inch - 12 inch
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="monitor-2"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMonitorSize([12, 13]);
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                    } else {
                                      setMonitorSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    monitorSize[0] === 12 && monitorSize[1] === 13
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="monitor-2"
                                >
                                  Từ 12 inch - 13 inch
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="monitor-3"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMonitorSize([13, 14]);
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                    } else {
                                      setMonitorSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    monitorSize[0] === 13 && monitorSize[1] === 14
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="monitor-3"
                                >
                                  Từ 13 inch - 14 inch
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="monitor-4"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMonitorSize([14, 15]);
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                    } else {
                                      setMonitorSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    monitorSize[0] === 14 && monitorSize[1] === 15
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="monitor-4"
                                >
                                  Từ 14 inch - 15 inch
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="monitor-5"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMonitorSize([15, 16]);
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                    } else {
                                      setMonitorSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    monitorSize[0] === 15 && monitorSize[1] === 16
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="monitor-5"
                                >
                                  Từ 15 inch - 16 inch
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="monitor-6"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMonitorSize([15.6, 15.6]);
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                    } else {
                                      setMonitorSize([0, 43]);
                                    }
                                  }}
                                  checked={
                                    monitorSize[0] === 15.6 && monitorSize[1] === 15.6
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="monitor-6"
                                >
                                  15.6 inch
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}

                            <div className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="monitor-7"
                                  onClick={(e) => {
                                    if (e.target.checked) {
                                      setMonitorSize([17, 34]);
                                      // setPrice([0, 40]);
                                      // setCategory("");
                                      // setRam("");
                                      // setMachineSeries("");
                                    } else {
                                      setMonitorSize([11.6, 17]);
                                    }
                                  }}
                                  checked={
                                    monitorSize[0] === 17 && monitorSize[1] === 34
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="monitor-7"
                                >
                                  {`>`} 17 inch
                                </label>
                              </div>
                            </div>
                            {/* End .filter-item */}
                          </div>
                        </div>
                      </Collapse>
                    </div>

                    <div className="widget widget-collapsible">
                      <h3 className="widget-title">
                        <a
                          data-toggle="collapse"
                          href="#widget-5"
                          role="button"
                          aria-expanded="true"
                          aria-controls="widget-5"
                        >
                          Giá
                        </a>
                      </h3>
                      {/* End .widget-title */}

                      <div className="collapse show" id="widget-5">
                        <div className="widget-body">
                          <div className="filter-price">
                            <div className="filter-price-text">
                              Khoảng giá: (triệu)
                              <Slider
                                value={value}
                                aria-labelledby="range-slider"
                                onChange={(e)=> setValue(e.target.value)}
                                min={0}
                                max={151}
                                valueLabelDisplay="auto"
                                sx={{ mt: 3,color:"#228B22" }}
                              />
                              <form onSubmit={priceHandler}>
                                <div className="row">
                                  <div className="col-6">
                                    <input type="text" value={`${formatPrice(value[0]*1000000)}`}  style={{width:"100px"}}></input>
                                    <span style={{paddingLeft:"13px", fontWeight:"bold"}}>-</span>
                                  </div>
                                  <div className="col-6">
                                    <input type="text" value={`${formatPrice(value[1]*1000000)}`} style={{width:"100px"}}></input>
                                  </div>
                                </div>

                                <div className="row" style={{paddingTop:"20px"}}>
                                  <div className="col-6">
                                    <Button type="submit" textBtn="Lọc"></Button>
                                  </div>
                                  <div className="col-6">
                                    <Button type="reset" textBtn="Reset" onClick={resetHandle} />
                                  </div>
                                </div>
                              </form>


                            </div>
                            {/* End .filter-price-text */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default Product;
