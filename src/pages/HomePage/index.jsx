import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearErrors,
  getAdminProduct,
  getNProducts,
} from "../../actions/productAction";
import { loadUser } from "../../actions/userAction";
import store from "../../store";
import formatPrice from "../../ultils/formatPrice";
// import Carousel from "react-elastic-carousel";
import Carousel from "react-multi-carousel";
import "./Homepage.scss";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import { CLEAR_ERRORS } from "../../constants/blogConstants";
import { getAllBlogs } from "../../actions/blogAction";
import moment from "moment";
import "moment/locale/vi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addToWishlist, getWishlist } from "../../actions/wishlistAction";
import { ADD_TO_CART_RESET } from "../../constants/cartConstants";
import { ADD_TO_WISHLIST_RESET } from "../../constants/wishlistConstants";
import { getAllBanners } from "../../actions/bannerAction";
import { width } from "@mui/system";
import FlyToCart from "../../components/FlyToCartAnimation/index";

moment.locale("vi");

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const responsive2 = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const responsive3 = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024
    },
    items: 3,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
  }

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HomePage() {
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

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.nProducts);

  const {
    banners,
    error: bannerErrors,
    loading: bannerLoading,
  } = useSelector((state) => state.banners);

  useEffect(() => {
    if (bannerErrors) {
      setOpenError(true);
      setErrorAlert(bannerErrors);
      dispatch(clearErrors());
    }
    dispatch(getAllBanners());
  }, [dispatch, bannerErrors]);

  const {
    blogs,
    loading: blogLoading,
    error: blogError,
  } = useSelector((state) => state.blogs);

  const {
    loading: allProductsLoading,
    error: allProductsError,
    products: allProducts,
  } = useSelector((state) => state.productsAdmin);

  const productSoldMax = allProducts.map(product => product.sold)
                                    .sort((a,b)=>a-b)
                                    .findLast((product=>product));

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }
    if (blogError) {
      setOpenError(true);
      setErrorAlert(blogError);
      dispatch(CLEAR_ERRORS());
    }
    dispatch(getNProducts());
    dispatch(getAdminProduct());
    dispatch(getAllBlogs());
  }, [dispatch, blogError, error]);

  return (
    <>
      {allProductsLoading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="LHD Computer" />;
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
          {bannerLoading ? (
            <Loader />
          ) : (
            <div
              className="intro-slider-container"
              style={{
                marginBottom: "100px",
                // width:"80%",
                // marginLeft:"10%",
              }}
            >
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container1"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                // deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {banners &&
                  banners[0] &&
                  banners[0].images.map((image) => (
                    <div className="slide">
                        <img
                        src={image.url}
                        alt="banner"
                        key={image.public_id}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}/>


                      </div>
                  ))}
              </Carousel>
            </div>
          )}
          <div className="container">
            <div className="heading heading-center mb-3">
              <img src="assets/images/title-img.png" style={{paddingLeft:"100px"}} data-aos="fade-right"/>
              <h2 className="title">Sản phẩm bán chạy</h2>
              {/* End .title */}
            </div>
            {/* End .heading */}
            {/*  */}
            <div className="tab-content tab-content-carousel">
              <div
                className="tab-pane p-0 fade show active"
                id="trending-all-tab"
                role="tabpanel"
                aria-labelledby="trending-all-link"
              >
                <div className="container">
                  <div className="row justify-content-center">
                    {allProducts &&
                      allProducts
                        .filter((product) => product.sold === productSoldMax)
                        .map((product,index) => {
                          return (
                            <div
                              className="col-6 col-md-4 col-lg-3"
                              key={product._id}
                              data-aos="zoom-in"
                              data-aos-easing="ease-in-back"
                              data-aos-delay={150*index}
                              data-aos-offset="0"
                            >
                              <div className="product product-7 text-center">
                                <figure className="product-media">
                                  <span className="product-label label-best-seller">
                                    Best Seller
                                  </span>
                                  <Link to={`/product/${product._id}`}>
                                    <img
                                      src={product.images[0].url}
                                      alt={product.name}
                                      className="product-image"
                                    />
                                    {product.images[1] ? (
                                      <img
                                        src={product.images[1].url}
                                        alt={product.name}
                                        className="product-image-hover"
                                      />
                                    ) : (
                                      <img
                                        src={product.images[0].url}
                                        alt={product.name}
                                        className="product-image-hover"
                                      />
                                    )}
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

                                  <div className="product-action">
                                    <Link
                                      to={`/product/${product._id}`}
                                      className="btn-product btn-cart"
                                    >
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
                                </figure>

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
                                    {/* {formatPrice(product.price)} */}
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
            {/* End .tab-content */}
          </div>
          <div className="mb-5 bg-light-2" style={{padding:"15px"}}>
            <h2 className="title text-center mb-2">
                  Thương hiệu độc quyền
            </h2>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode
              className=""
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsive3}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              <img src="assets/images/Our Exclusive Brands/brand-dell.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-acer.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-apple.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-asus.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-lenovo.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-razer.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-samsung.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-msi.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
              <img src="assets/images/Our Exclusive Brands/brand-hp.png" style={{width: '100%',padding:'0 100px 0 100px'}}/>
            </Carousel>
          </div>
          <hr style={{width:"60%"}}/>

          {/* End .mb-5 */}
          <div className="container">
            <div className="heading heading-center mb-3">
              <img src="assets/images/title-img2.png" style={{paddingLeft:"400px"}} data-aos="fade-left"/>
              <h2 className="title">Sản phẩm sale</h2>
              {/* End .title */}
            </div>
            {/* End .heading */}
            {/*  */}
            <div className="tab-content tab-content-carousel">
              <div
                className="tab-pane p-0 fade show active"
                id="trending-all-tab"
                role="tabpanel"
                aria-labelledby="trending-all-link"
              >
                <div className="container">
                  <div className="row justify-content-center">
                    {allProducts &&
                      allProducts
                        .filter((product) => product.discountActive === true)
                        .map((product,index) => {
                          return (
                            <div
                              className="col-6 col-md-4 col-lg-3"
                              key={product._id}
                              data-aos="zoom-in"
                              data-aos-easing="ease-in-back"
                              data-aos-delay={150*index}
                              data-aos-offset="0"
                            >
                              <div className="product product-7 text-center">
                                <figure className="product-media">
                                  <span className="product-label label-sale">
                                    sale
                                  </span>
                                  <Link to={`/product/${product._id}`}>
                                    <img
                                      src={product.images[0].url}
                                      alt={product.name}
                                      className="product-image"
                                    />
                                    {product.images[1] ? (
                                      <img
                                        src={product.images[1].url}
                                        alt={product.name}
                                        className="product-image-hover"
                                      />
                                    ) : (
                                      <img
                                        src={product.images[0].url}
                                        alt={product.name}
                                        className="product-image-hover"
                                      />
                                    )}
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

                                  <div className="product-action">
                                    <Link
                                      to={`/product/${product._id}`}
                                      className="btn-product btn-cart"
                                    >
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
                                </figure>

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
                                    {/* {formatPrice(product.price)} */}
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
            {/* End .tab-content */}
          </div>
          {/* End .container */}
          <div className="mb-5"></div>
          {/* End .mb-5 */}
          <div className="pt-4 pb-3 " style={{
          backgroundImage: "url('assets/images/page-middle2.jpg')",backgroundRepeat: "no-repeat, repeat",backgroundSize: "cover"
        }}>
            <div className="container middle-page">
              <div className="row justify-content-center">
                <div className="col-lg-2 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon" style={{backgroundColor:"#ee82ee", color:"white", padding:"10px", borderRadius:"50%"}}>
                    <i className="fas fa-medal"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title" style={{color: "#00FF00"}}>
                        Hàng chính hãng 100%
                      </h3>
                      {/* End .icon-box-title */}
                    </div>
                    {/* End .icon-box-content */}
                  </div>
                  {/* End .icon-box */}
                </div>
                <div className="col-lg-2 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon" style={{backgroundColor:"#ee82ee", color:"white", padding:"10px", borderRadius:"50%"}}>
                    <i className="fas fa-shipping-fast"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title" style={{color: "#00FF00"}}>
                        Miễn phí vận chuyển
                      </h3>
                      {/* End .icon-box-title */}
                    </div>
                    {/* End .icon-box-content */}
                  </div>
                  {/* End .icon-box */}
                </div>
                {/* End .col-lg-3 col-sm-6 */}

                <div className="col-lg-2 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon"  style={{backgroundColor:"#ee82ee", color:"white", padding:"10px", borderRadius:"50%"}}>
                      <i className="icon-rotate-left"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title"  style={{color: "#00FF00"}}>Cam kết hoàn tiền & Đổi trả</h3>
                      {/* End .icon-box-title */}
                    </div>
                    {/* End .icon-box-content */}
                  </div>
                  {/* End .icon-box */}
                </div>
                {/* End .col-lg-3 col-sm-6 */}

                <div className="col-lg-2 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon"  style={{backgroundColor:"#ee82ee", color:"white", padding:"10px", borderRadius:"50%"}}>
                      <i className="icon-unlock"></i>
                    </span>
                    <div className="icon-box-content" >
                      <h3 className="icon-box-title" style={{color: "	#00FF00"}}>Bảo mật thông tin 100% </h3>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-sm-6">
                  <div className="icon-box text-center">
                    <span className="icon-box-icon"  style={{backgroundColor:"#ee82ee", color:"white", padding:"10px", borderRadius:"50%"}}>
                      <i className="icon-headphones"></i>
                    </span>
                    <div className="icon-box-content">
                      <h3 className="icon-box-title" style={{color: "#00FF00"}}>Hỗ trợ 24/7</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6"></div>
          <div className="container">
            <img src="assets/images/title-img.png" style={{paddingLeft:"100px"}} data-aos="fade-right"/>
            <h2 className="title text-center mb-4">Sản phẩm mới</h2>

            <div className="products">
              <div className="row justify-content-center">
                {products &&
                  products.map((product,index) => {
                    return (
                      <div
                        className="col-6 col-md-4 col-lg-3"
                        key={product._id}
                        data-aos="zoom-in-left"
                        data-aos-easing="ease-in-sine"
                        data-aos-delay={100*index}
                        data-aos-offset="0"
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
                              {product.images[1] ? (
                                <img
                                  src={product.images[1].url}
                                  alt={product.name}
                                  className="product-image-hover"
                                />
                              ) : (
                                <img
                                  src={product.images[0].url}
                                  alt={product.name}
                                  className="product-image-hover"
                                />
                              )}
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

                            <div className="product-action">
                              <Link to={`/product/${product._id}`} className="btn-product btn-cart">
                                <span>
                                  <span style={{ textTransform: "uppercase" }}>
                                    C
                                  </span>
                                  lick để xem chi tiết
                                </span>
                              </Link>
                            </div>
                          </figure>

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
                                formatPrice(product.price)
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* End .row */}
            </div>
            {/* End .products */}

            <div className="more-container text-center mt-2">
              <a href="/products" className="btn btn-outline-dark-2 btn-more" style={{paddingTop:"15px"}}>
                <span>Xem thêm</span>
              </a>
            </div>
          </div>
          <div className="pb-3">
            <div className="container brands pt-5 pt-lg-7 ">
              <h2 className="title text-center mb-4">Daily POST</h2>

              <div
                className="owl-carousel owl-simple"
                data-toggle="owl"
                data-owl-options='{
                            "nav": false, 
                            "dots": false,
                            "margin": 30,
                            "loop": false,
                            "responsive": {
                                "0": {
                                    "items":2
                                },
                                "420": {
                                    "items":3
                                },
                                "600": {
                                    "items":4
                                },
                                "900": {
                                    "items":5
                                },
                                "1024": {
                                    "items":6
                                }
                            }
                        }'
              >
                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-hp.png" alt="Seiko" />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-acer.png" alt="Orient" />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-asus.png" alt="Bently" />
                </a>

                <a href="#" className="brand">
                  <img
                    src="assets/images/logo/brand-apple.png"
                    alt="Citizen"
                  />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-1.png" alt="OJ" />
                </a>

                <a href="#" className="brand">
                  <img src="assets/images/logo/brand-bulova.png" alt="Bulova" />
                </a>

                <a href="#" className="brand">
                  <img
                    src="assets/images/logo/brand-freelook.png"
                    alt="Freelock"
                  />
                </a>
              </div>
            </div>

            <div className="mb-5 mb-lg-7"></div>

            <div className="container newsletter">
              <div className="row">
                <div className="col-lg-6 banner-overlay-div">
                  <div className="banner banner-overlay" data-aos="flip-left"
                      data-aos-easing="ease-out-cubic"
                      data-aos-duration="2000">
                    <a href="#">
                      <img
                        src="assets/images/demos/demo-6/banners/banner-3.jpg"
                        alt="Banner"
                      />
                    </a>

                    <div className="banner-content banner-content-center" >
                      <h4 className="banner-subtitle text-white">
                        <a href="#">Limited time only.</a>
                      </h4>
                      <h3 className="banner-title text-white">
                        <a href="#">
                          End of Season
                          <br />
                          save 50% off
                        </a>
                      </h3>
                      <a
                        href="#"
                        className="btn btn-outline-white banner-link underline"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 d-flex align-items-stretch subscribe-div" data-aos="flip-right"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000"> 
                  <div className="cta cta-box">
                    <div className="cta-content">
                      <h3 className="cta-title">
                        Đăng ký để nhận thông tin mới nhất
                      </h3>
                      <p>Đăng ký ngay bây giờ </p>

                      <form action="#">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Nhập địa chỉ email của bạn"
                          aria-label="Email Adress"
                          required
                        />
                        <div className="text-center">
                          <button
                            className="btn btn-outline-dark-2"
                            type="submit"
                          >
                            <span>Đăng ký</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2"></div>
          <div className="container"></div>
          <div className="blog-posts mb-5">
            <div className="container">
              <h2 className="title text-center mb-4">Tin tức</h2>
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive2}
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
                {blogs &&
                  blogs.map((blog,index) => (
                    <article className="entry" key={blog._id} data-aos="fade-up"
                    data-aos-anchor-placement="bottom-bottom">
                      <figure className="entry-media">
                        <Link to={`/blog/${blog._id}`}>
                          <img
                            src={blog.image && blog.image.url}
                            alt={blog.name}
                            style={{ maxHeight: "150px" }}
                          />
                        </Link>
                      </figure>
                      {/* End .entry-media */}

                      <div className="entry-body text-center">
                        <div className="entry-meta">
                          <a href="#">
                            {moment(blog.createdAt).format("DD/MM/YYYY")}
                          </a>
                          , {blog.numOfReviews} Bình luận
                        </div>
                        {/* End .entry-meta */}

                        <h3 className="entry-title">
                          <Link to={`/blog/${blog._id}`}>{blog.name}</Link>
                        </h3>
                        {/* End .entry-title */}

                        <div className="entry-content">
                          <Link to={`/blog/${blog._id}`} className="read-more">
                            Đọc thêm
                          </Link>
                        </div>
                        {/* End .entry-content */}
                      </div>
                      {/* End .entry-body */}
                    </article>
                  ))}
              </Carousel>

              {/* End .owl-carousel */}
            </div>
            {/* End .container */}
          </div>
          {/*  End .blog-posts */}
          
        </main>
      )}
    </>
  );
}

export default HomePage;
