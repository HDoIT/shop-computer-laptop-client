import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import formatPrice from "../../ultils/formatPrice";
import {
  clearErrors,
  deleteReviews,
  getAdminProduct,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DELETE_REVIEW_RESET,
  NEW_REVIEW_RESET,
} from "../../constants/productConstants";
import "./ProductDetail.scss";
import {
  addItemsToCartLocal,
  addToCart,
  getCart,
} from "../../actions/cartAction";
import { ADD_TO_CART_RESET } from "../../constants/cartConstants";
import Loader from "../../components/Common/Loader";
import moment from "moment";
import "moment/locale/vi";
import MetaData from "../../components/Layout/MetaData";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addToWishlist, getWishlist } from "../../actions/wishlistAction";
import { ADD_TO_WISHLIST_RESET } from "../../constants/wishlistConstants";
moment.locale("vi");

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const useStyles = makeStyles({
  root: {},
  reviewButton: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    cursor: "pointer",
    transition: "all 0.25s ease-in",
    "&:hover": {
      color: "#c96",
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();

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

  const [valueTab, setValueTab] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let match = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error: cartError, isUpdated } = useSelector((state) => state.cart);

  const { error: wishlistError, isUpdated: wishlistUpdated } = useSelector(
    (state) => state.wishlist
  );

  const { products } = useSelector((state) => state.productsAdmin);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (reviewError) {
      setOpenError(true);
      setErrorAlert(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      setOpenSuccess(true);
      setSuccessAlert("B??nh lu???n th??nh c??ng");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.id));
  }, [dispatch, match.id, reviewError, success]);

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = {
      rating,
      comment,
      productId: match.id,
    };
    dispatch(newReview(myForm));
    setOpen(false);
  };

  const deleteReviewHandler = (reviewId) => {
    let productId = match.id;
    dispatch(deleteReviews(reviewId, productId));
  };

  let history = useHistory();

  React.useEffect(() => {
    if (deleteError) {
      // alert(deleteError);
      setOpenError(true);
      setErrorAlert(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // alert("X??a b??nh lu???n th??nh c??ng");
      setOpenSuccess(true);
      setSuccessAlert("X??a b??nh lu???n th??nh c??ng");
      history.push(`/products`);
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, deleteError, history, isDeleted]);

  //Handle cart

  const handleIncrement = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const handleDecrement = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (cartError) {
      setOpenError(true);
      setErrorAlert(cartError);
      return;
    }
    dispatch(addToCart(product._id, quantity));
    // alert("Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng");
    setOpenSuccess(true);
    setSuccessAlert("Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng");
    // dispatch(getProductDetails(match.id));
  };

  const addToWishlistHandler = () => {
    if (wishlistError) {
      setOpenError(true);
      setErrorAlert(wishlistError);
      return;
    }
    dispatch(addToWishlist(product._id));
    setOpenSuccess(true);
    setSuccessAlert("Th??m s???n ph???m v??o danh s??ch y??u th??ch th??nh c??ng");
  };

  const addToCartLocalHandler = () => {
    dispatch(addItemsToCartLocal(match.id, quantity));
    // alert("Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng");
    setOpenSuccess(true);
    setSuccessAlert("Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng");
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(getCart());
      dispatch({ type: ADD_TO_CART_RESET });
    }
    if (wishlistUpdated) {
      dispatch(getWishlist());
      dispatch({ type: ADD_TO_WISHLIST_RESET });
    }
  }, [dispatch, isUpdated, wishlistUpdated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Chi ti???t s???n ph???m" />;
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
          <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
            <div className="container d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Trang ch???</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/products">S???n ph???m</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Chi ti???t s???n ph???m
                </li>
              </ol>
            </div>
            {/* End .container */}
          </nav>
          {/* End .breadcrumb-nav */}
          <div className="page-content">
            <div className="container">
              <div className="product-details-top">
                <div className="row">
                  <div className="col-md-6">
                    <div className="product-gallery product-gallery-vertical">
                      <div className="row">
                        <figure className="product-main-image">
                          <Zoom>
                            <img
                              id="product-zoom"
                              src={product.images && product.images[0].url}
                              alt={product && product.name}
                            />
                          </Zoom>
                        </figure>
                        {/* End .product-main-image */}

                        <div
                          id="product-zoom-gallery"
                          className="product-image-gallery"
                        >
                          {product.images &&
                            product.images.map((image, index) => (
                              <a
                                style={{
                                  height: "fit-content",
                                  paddingLeft:"1px",
                                  paddingRight:"1px",
                                  paddingTop:"1px",
                                }}
                                className="product-gallery-item active"
                                href="#!"
                                data-image={product.images[index].url}
                                data-zoom-image={product.images[index].url}
                              >
                                <Zoom>
                                  <img
                                      src={product.images[index].url}
                                      alt="product img1"
                                    />
                                </Zoom>
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="product-details">
                      <h1 className="product-title">
                        {product && product.name}
                      </h1>
                      {/* End .product-title */}

                      <div className="ratings-container">
                        <Rating
                          size="large"
                          value={product && product.ratings}
                          readOnly
                        />
                        <a className="ratings-text" href="#" id="review-link">
                          ( {product && product.numOfReviews} Reviews )
                        </a>
                      </div>
                      {/* End .rating-container */}
                      {product.discountActive ? (
                        <div className="product-price">
                          <span className="new-price">
                            {formatPrice(
                              product.price -
                                product.price * (product.discountPercent / 100)
                            )}
                          </span>
                          <span className="old-price">
                            <del>{formatPrice(product.price)}</del>
                          </span>
                        </div>
                      ) : (
                        <div className="product-price">
                          {product.price && formatPrice(product.price)}
                        </div>
                      )}

                      {/* End .product-price */}

                      <div className="product-content">
                        <p>{product.description} </p>
                      </div>
                      {/* End .product-content */}

                      {/* <div className="details-filter-row details-row-size">
                        <label htmlFor="size">Size:</label>
                        <div className="select-custom">
                          <select
                            name="size"
                            id="size"
                            className="form-control"
                          >
                            <option defaultValue="#">Select a size</option>
                            <option value="s">Small</option>
                            <option value="m">Medium</option>
                            <option value="l">Large</option>
                            <option value="xl">Extra Large</option>
                          </select>
                        </div>

                        <a href="#" className="size-guide">
                          <i className="icon-th-list"></i>size guide
                        </a>
                      </div> */}

                      <div className="product-content">
                        <p>Hi???n c??: {product.Stock} s???n ph???m </p>
                      </div>
                      {product && product.Stock > 0 ? (
                        <>
                          <div
                            style={{
                              marginTop: "1rem",
                              display: "flex",
                            }}
                            className="details-filter-row details-row-size"
                          >
                            <label htmlFor="qty">S??? l?????ng:</label>
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
                              {/* <span onClick={handleDecrement}>-</span> */}
                              <p
                                style={{ padding: "0 15px", cursor: "pointer" }}
                                onClick={handleDecrement}
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
                                value={quantity}
                                readOnly
                              />
                              <p
                                style={{ padding: "0 15px", cursor: "pointer" }}
                                onClick={handleIncrement}
                              >
                                +
                              </p>
                              {/* <span onClick={handleIncrement}>+</span> */}
                            </div>
                          </div>

                          <div className="product-details-action">
                            {user ? (
                              <p
                                className="btn-product btn-cart"
                                style={{
                                  cursor: "pointer",
                                  transition: "all 0.25s linear",
                                }}
                                onClick={addToCartHandler}
                              >
                                <span>Th??m v??o gi??? h??ng</span>
                              </p>
                            ) : (
                              <p
                                className="btn-product btn-cart"
                                style={{
                                  cursor: "pointer",
                                  transition: "all 0.25s linear",
                                }}
                                onClick={addToCartLocalHandler}
                              >
                                <span>Th??m v??o gi??? h??ng</span>
                              </p>
                            )}

                            <div className="details-action-wrapper">
                              <p
                                className="btn-product btn-wishlist"
                                title="Wishlist"
                                style={{
                                  cursor: "pointer",
                                  transition: "all 0.25s linear",
                                }}
                                onClick={addToWishlistHandler}
                              >
                                <span>Th??m v??o danh s??ch y??u th??ch</span>
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <div className="product-details-footer">
                        <div className="product-cat">
                          <span>Th????ng hi???u:</span>
                          <a href="#">
                            {product.category && product.category.name}
                          </a>
                        </div>
                        {/* End .product-cat */}

                        <div className="social-icons social-icons-sm">
                          <span className="social-label">Share:</span>
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
                            title="Pinterest"
                            target="_blank"
                          >
                            <i className="icon-pinterest"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={valueTab.toString()}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      centered
                    >
                      <Tab
                        label="Gi???i thi???u"
                        value="1"
                        sx={{
                          fontSize: "1.2rem",
                        }}
                      />
                      <Tab
                        label="Th??ng tin th??m"
                        value="2"
                        sx={{
                          fontSize: "1.2rem",
                        }}
                      />
                      <Tab
                        label={`????nh gi?? (${product && product.numOfReviews})`}
                        value="3"
                        sx={{
                          fontSize: "1.2rem",
                        }}
                      />
                    </TabList>
                  </Box>
                  <TabPanel
                    value="1"
                    className="product-desc-content"
                    sx={{
                      fontSize: "1.5rem",
                      lineHeight: "1.7",
                    }}
                  >
                    <h3 style={{ fontWeight: "bold" }}>Th??ng tin s???n ph???m</h3>
                    {/* <p>{product && product.moreDescription}</p> */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.moreDescription,
                      }}
                    />
                  </TabPanel>
                  <TabPanel
                    value="2"
                    className="product-desc-content"
                    sx={{
                      fontSize: "1.5rem",
                      lineHeight: "1.7",
                    }}
                  >
                    <h3 style={{ fontWeight: "bold" }}>Th??ng s??? th??m v??? m??y</h3>
                    <ul>
                      <li>
                        H??ng s???n xu???t: {product.category && product.category.name}
                      </li>
                      <li>M??n h??nh: {product && product.monitorSize} inch FHD</li>
                      <li>CPU: {product && product.CPU}</li>
                      <li>
                        Card m??n h??nh: {product && product.cardMonitor}
                      </li>
                      <li>RAM: {product && product.RAM}</li>
                      <li>H??? ??i???u h??nh: {product && product.operatingSystem}</li>
                      <li>B???o hi???m: 24 th??ng l???i h??? th???ng t???i LHDCom</li>
                      <li>B???o h??nh qu???c t???: 12 th??ng</li>
                    </ul>
                  </TabPanel>
                  <TabPanel
                    value="3"
                    className="product-desc-content"
                    sx={{
                      fontSize: "1.5rem",
                      lineHeight: "1.7",
                    }}
                  >
                    {isAuthenticated ? (
                      <p
                        onClick={submitReviewToggle}
                        className={classes.reviewButton}
                      >
                        Vi???t b??i ????nh gi??
                      </p>
                    ) : (
                      <p className={classes.reviewButton}>
                        Vui l??ng <a href="/login">????ng nh???p</a> ????? ????nh gi??
                      </p>
                    )}
                    <Dialog
                      aria-labelledby="simple-dialog-title"
                      open={open}
                      onClose={submitReviewToggle}
                    >
                      <DialogTitle
                        sx={{
                          fontSize: "1.8rem",
                        }}
                      >
                        G???i b??i ????nh gi??
                      </DialogTitle>
                      <DialogContent className="submitDialog">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                        />
                        <textarea
                          className="submitDialogTextArea"
                          cols="40"
                          rows="6"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <DialogActions>
                          <Button
                            onClick={submitReviewToggle}
                            color="warning"
                            sx={{
                              fontSize: "1.4rem",
                            }}
                          >
                            H???y
                          </Button>
                          <Button
                            onClick={reviewSubmitHandler}
                            color="primary"
                            sx={{
                              fontSize: "1.4rem",
                            }}
                          >
                            G???i
                          </Button>
                        </DialogActions>
                      </DialogContent>
                    </Dialog>
                    <h3 style={{ fontWeight: "bold" }}>
                      ????nh gi?? ({product && product.numOfReviews})
                    </h3>
                    <div className="review">
                      {product.reviews && product.reviews[0] ? (
                        product.reviews &&
                        product.reviews.map((review) => (
                          <div
                            className="row no-gutters"
                            // key={review._id}
                          >
                            <div className="col-auto">
                              <h4>
                                <a href="#">{review.name}</a>
                              </h4>
                              <div className="ratings-container">
                                <Rating
                                  size="large"
                                  value={review.rating}
                                  readOnly
                                />
                              </div>
                              <span className="review-date">
                                {review && moment(review.createAt).fromNow()}
                              </span>
                            </div>
                            {/* End .col */}
                            <div className="col">
                              <h4>Good, perfect size</h4>

                              <div className="review-content">
                                <p>{review.comment}</p>
                              </div>
                              {/* End .review-content */}
                              {(user && user._id) === review.user ? (
                                <div className="review-action">
                                  <span
                                    style={{
                                      fontSize: "1.5rem",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      deleteReviewHandler(review._id)
                                    }
                                  >
                                    <DeleteIcon /> X??a
                                  </span>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            {/* End .col-auto */}
                          </div>
                        ))
                      ) : (
                        <p>Ch??a c?? ????nh gi??</p>
                      )}
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
              <h2 className="title text-center mb-4">S???n ph???m li??n quan</h2>
              {/* End .title text-center */}
              {products ? (
                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={false}
                  autoPlaySpeed={20000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  // deviceType={this.props.deviceType}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {products &&
                    products
                      .filter((prod) => {
                        if (product.category) {
                          return (
                            product.category._id === prod.category._id &&
                            product._id !== prod._id
                          );
                        }
                      })
                      .map((prod) => (
                        <div
                          className="product product-7 text-center"
                          key={prod._id}
                        >
                          <figure className="product-media">
                            {prod.Stock <= 0 ? (
                              <span className="product-label label-out">
                                H???t h??ng
                              </span>
                            ) : (
                              ""
                            )}
                            <Link to={`/product/${prod._id}`}>
                              <img
                                src={prod.images[0].url}
                                alt={prod.name}
                                className="product-image"
                              />
                            </Link>

                            <div className="product-action-vertical">
                              <a
                                href="#"
                                className="btn-product-icon btn-wishlist btn-expandable"
                              >
                                <span>Th??m v??o danh s??ch y??u th??ch</span>
                              </a>
                            </div>

                            <div className="product-action">
                            <Link to={`/product/${prod._id}`} className="btn-product btn-cart">
                              <span style={{textTransform:"capitalize"}}>
                                Xem chi ti???t
                              </span>
                            </Link>
                            </div>
                          </figure>

                          <div className="product-body">
                            <div className="product-cat">
                              <a href="#">{prod.category.name}</a>
                            </div>
                            <h3 className="product-title">
                              <Link to={`/product/${prod._id}`}>
                                {prod.name}
                              </Link>
                            </h3>
                            <div className="product-price">
                              <span className="out-price">
                                {formatPrice(prod.price)}
                              </span>
                            </div>
                            <div className="ratings-container">
                              <Rating
                                size="large"
                                value={prod.ratings}
                                readOnly
                              />
                              <span className="ratings-text">
                                ( {prod.numOfReviews} Reviews )
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                </Carousel>
              ) : (
                ""
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default ProductDetail;
