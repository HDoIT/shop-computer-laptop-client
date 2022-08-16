import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getBlogDetails, newReviewBlog } from "../../actions/blogAction.js";
import { clearErrors } from "../../actions/blogAction.js";
import Loader from "../../components/Common/Loader";
import moment from "moment";
import "moment/locale/vi";
import MetaData from "../../components/Layout/MetaData";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { NEW_REVIEW_BLOG_RESET } from "../../constants/blogConstants.js";
moment.locale("vi");

const categoryOptions = ["Tin ICT", "Đồ chơi số", "Xem-Mua-Luôn"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BlogDetail() {
  let match = useParams();
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { blog, loading, error } = useSelector((state) => state.blogDetails);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReviewBlog
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.reviewBlog
  );

  const [comment, setComment] = useState("");

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      setOpenError(true);
      setErrorAlert(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      setOpenSuccess(true);
      setSuccessAlert("Bình luận thành công");
      dispatch({ type: NEW_REVIEW_BLOG_RESET });
    }

    dispatch(getBlogDetails(match.id));
  }, [dispatch, match.id, error, reviewError, success]);

  const reviewSubmitHandler = () => {
    const myForm = {
      comment,
      blogId: match.id,
    };

    dispatch(newReviewBlog(myForm));
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="main">
          <MetaData title="Chi tiết sản phẩm" />;
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
            style={{ backgroundImage: "url(assets/images/page-header-bg.jpg" }}
          >
            <div className="container">
              <h1 className="page-title">Tin tức</h1>
            </div>
            {/* End .container */}
          </div>
          {/* End .page-header */}
          <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/blog">Tin tức</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Chi tiết tin tức
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
                  <article className="entry single-entry">
                    <figure className="entry-media">
                      <img
                        src={blog.image && blog.image.url}
                        alt={blog.name}
                        style={{ maxHeight: "500px" }}
                      />
                    </figure>
                    {/* End .entry-media */}

                    <div className="entry-body">
                      <div className="entry-meta">
                        <span className="entry-author">
                          bởi <a href="#">{blog.user && blog.user.name}</a>
                        </span>
                        <span className="meta-separator">|</span>
                        <a href="#">
                          {moment(blog.createdAt).format("DD/MM/YYYY")}
                        </a>
                        <span className="meta-separator">|</span>
                        <a href="#">{blog.numOfReviews} Bình luận</a>
                      </div>
                      {/* End .entry-meta */}

                      <h2 className="entry-title">{blog.name}</h2>
                      {/* End .entry-title */}

                      <div className="entry-cats">
                        trong <a href="#">{blog.category}</a>
                      </div>

                      <div className="entry-content editor-content">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: blog.detail,
                          }}
                        />
                      </div>
                      {/* End .entry-content */}

                      <div className="entry-footer row no-gutters flex-column flex-md-row">
                        <div className="col-md-auto mt-2 mt-md-0">
                          <div className="social-icons social-icons-color">
                            <span className="social-label">
                              Chia sẻ tin tức:
                            </span>
                            <a
                              href="#"
                              className="social-icon social-facebook"
                              title="Facebook"
                              target="_blank"
                            >
                              <i className="icon-facebook-f"></i>
                            </a>
                            <a
                              href="#"
                              className="social-icon social-twitter"
                              title="Twitter"
                              target="_blank"
                            >
                              <i className="icon-twitter"></i>
                            </a>
                            <a
                              href="#"
                              className="social-icon social-pinterest"
                              title="Pinterest"
                              target="_blank"
                            >
                              <i className="icon-pinterest"></i>
                            </a>
                            <a
                              href="#"
                              className="social-icon social-linkedin"
                              title="Linkedin"
                              target="_blank"
                            >
                              <i className="icon-linkedin"></i>
                            </a>
                          </div>
                          {/* End .soial-icons */}
                        </div>
                        {/* End .col-auto */}
                      </div>
                      {/* End .entry-footer row no-gutters */}
                    </div>
                    {/* End .entry-body */}

                    <div
                      className="entry-author-details"
                      style={{
                        padding: "3rem 2rem 3rem",
                      }}
                    >
                      <figure className="author-media">
                        {/* <a href="#">
                          <img
                            src={blog.ú}
                            alt="User name"
                          />
                        </a> */}
                      </figure>
                      {/* End .author-media */}

                      <div className="author-body">
                        <div className="author-header row no-gutters flex-column flex-md-row">
                          <div className="col"></div>
                          <div className="col-auto mt-1 mt-md-0">
                            <a href="#" className="author-link">
                              Xem tất cả bài viết của{" "}
                              {blog.user && blog.user.name}{" "}
                              <i className="icon-long-arrow-right"></i>
                            </a>
                          </div>
                          {/* End .col */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .author-body */}
                    </div>
                    {/* End .entry-author-details*/}
                  </article>
                  {/* End .entry */}

                  {/* <nav className="pager-nav" aria-label="Page navigation">
                    <a
                      className="pager-link pager-link-prev"
                      href="#"
                      aria-label="Previous"
                      tabIndex="-1"
                    >
                      Previous Post
                      <span className="pager-link-title">
                        Cras iaculis ultricies nulla
                      </span>
                    </a>

                    <a
                      className="pager-link pager-link-next"
                      href="#"
                      aria-label="Next"
                      tabIndex="-1"
                    >
                      Next Post
                      <span className="pager-link-title">
                        Praesent placerat risus
                      </span>
                    </a>
                  </nav> */}

                  <div className="related-posts">
                    <h3 className="title">Bài viết liên quan</h3>

                    <div
                      className="owl-carousel owl-simple"
                      data-toggle="owl"
                      data-owl-options='{
                                        "nav": false, 
                                        "dots": true,
                                        "margin": 20,
                                        "loop": false,
                                        "responsive": {
                                            "0": {
                                                "items":1
                                            },
                                            "480": {
                                                "items":2
                                            },
                                            "768": {
                                                "items":3
                                            }
                                        }
                                    }'
                    >
                      <article className="entry entry-grid">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img
                              src="assets/images/blog/grid/3cols/post-1.jpg"
                              alt="image desc"
                            />
                          </a>
                        </figure>
                        {/* End .entry-media */}

                        <div className="entry-body">
                          <div className="entry-meta">
                            <a href="#">Nov 22, 2018</a>
                            <span className="meta-separator">|</span>
                            <a href="#">2 Comments</a>
                          </div>
                          {/* End .entry-meta */}

                          <h2 className="entry-title">
                            <a href="single.html">
                              Cras ornare tristique elit.
                            </a>
                          </h2>
                          {/* End .entry-title */}

                          <div className="entry-cats">
                            in <a href="#">Lifestyle</a>,
                            <a href="#">Shopping</a>
                          </div>
                          {/* End .entry-cats */}
                        </div>
                        {/* End .entry-body */}
                      </article>
                      {/* End .entry */}

                      <article className="entry entry-grid">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img
                              src="assets/images/blog/grid/3cols/post-2.jpg"
                              alt="image desc"
                            />
                          </a>
                        </figure>
                        {/* End .entry-media */}

                        <div className="entry-body">
                          <div className="entry-meta">
                            <a href="#">Nov 21, 2018</a>
                            <span className="meta-separator">|</span>
                            <a href="#">0 Comments</a>
                          </div>
                          {/* End .entry-meta */}

                          <h2 className="entry-title">
                            <a href="single.html">Vivamus ntulla necante.</a>
                          </h2>
                          {/* End .entry-title */}

                          <div className="entry-cats">
                            in <a href="#">Lifestyle</a>
                          </div>
                          {/* End .entry-cats */}
                        </div>
                        {/* End .entry-body */}
                      </article>
                      {/* End .entry */}

                      <article className="entry entry-grid">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img
                              src="assets/images/blog/grid/3cols/post-3.jpg"
                              alt="image desc"
                            />
                          </a>
                        </figure>
                        {/* End .entry-media */}

                        <div className="entry-body">
                          <div className="entry-meta">
                            <a href="#">Nov 18, 2018</a>
                            <span className="meta-separator">|</span>
                            <a href="#">3 Comments</a>
                          </div>
                          {/* End .entry-meta */}

                          <h2 className="entry-title">
                            <a href="single.html">
                              Utaliquam sollicitudin leo.
                            </a>
                          </h2>
                          {/* End .entry-title */}

                          <div className="entry-cats">
                            in <a href="#">Fashion</a>,<a href="#">Lifestyle</a>
                          </div>
                          {/* End .entry-cats */}
                        </div>
                        {/* End .entry-body */}
                      </article>
                      {/* End .entry */}

                      <article className="entry entry-grid">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img
                              src="assets/images/blog/grid/3cols/post-4.jpg"
                              alt="image desc"
                            />
                          </a>
                        </figure>
                        {/* End .entry-media */}

                        <div className="entry-body">
                          <div className="entry-meta">
                            <a href="#">Nov 15, 2018</a>
                            <span className="meta-separator">|</span>
                            <a href="#">4 Comments</a>
                          </div>
                          {/* End .entry-meta */}

                          <h2 className="entry-title">
                            <a href="single.html">
                              Fusce pellentesque suscipit.
                            </a>
                          </h2>
                          {/* End .entry-title */}

                          <div className="entry-cats">
                            in <a href="#">Travel</a>
                          </div>
                          {/* End .entry-cats */}
                        </div>
                        {/* End .entry-body */}
                      </article>
                      {/* End .entry */}
                    </div>
                    {/* End .owl-carousel */}
                  </div>
                  {/* End .related-posts */}

                  <div className="comments">
                    <h3 className="title">{blog.numOfReviews} Bình luận</h3>
                    {isAuthenticated ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.5rem",
                        }}
                      >
                        <textarea
                          cols="40"
                          rows="6"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          style={{ width: "70%", outline: "none" }}
                          placeholder="Bình luận"
                        />
                        <p
                          onClick={reviewSubmitHandler}
                          style={{
                            cursor: "pointer",
                            color: "#c96",
                            fontWeight: "bold",
                            padding: "20px",
                          }}
                          // className={classes.reviewButton}
                        >
                          Viết bài đánh giá
                        </p>
                      </div>
                    ) : (
                      <p>
                        Vui lòng <a href="/login">đăng nhập</a> để đánh giá
                      </p>
                    )}
                    <ul
                      style={{
                        marginTop: "2rem",
                      }}
                    >
                      {blog.reviews && blog.reviews[0] ? (
                        blog.reviews &&
                        blog.reviews.map((review) => (
                          <li>
                            <div className="comment" key={review._id}>
                              {/* <figure className="comment-media">
                                <a href="#">
                                  <img src={review.user} alt="User name" />
                                </a>
                              </figure> */}

                              <div className="comment-body">
                                <a href="#" className="comment-reply">
                                  Reply
                                </a>
                                <div className="comment-user">
                                  <h4>
                                    <a href="#">{review.name}</a>
                                  </h4>
                                  <span className="comment-date">
                                    {/* November 9, 2018 at 2:19 pm */}
                                    {moment(review.createAt).format(
                                      "DD-MM-YYYY, h:mm A"
                                    )}
                                  </span>
                                </div>
                                {/* End .comment-user */}

                                <div className="comment-content">
                                  <p>{review.comment}. </p>
                                </div>
                                {/* End .comment-content */}
                              </div>
                              {/* End .comment-body */}
                            </div>
                            {/* End .comment */}
                          </li>
                        ))
                      ) : (
                        <p>Chưa có đánh giá</p>
                      )}
                    </ul>
                  </div>
                  {/* End .comments */}
                </div>
                {/* End .col-lg-9 */}

                <aside className="col-lg-3">
                  <div className="sidebar">
                    <div className="widget widget-search">
                      <h3 className="widget-title">Tìm kiếm</h3>
                      {/* End .widget-title */}

                      <form action="#">
                        <label htmlFor="ws" className="sr-only">
                          Tìm kiếm trong tin tức
                        </label>
                        <input
                          type="search"
                          className="form-control"
                          name="ws"
                          id="ws"
                          placeholder="Tìm kiếm trong tin tức"
                          required
                        />
                        <button type="submit" className="btn">
                          <i className="icon-search"></i>
                          <span className="sr-only">Tìm kiếm</span>
                        </button>
                      </form>
                    </div>
                    {/* End .widget */}

                    <div className="widget widget-cats">
                      <h3 className="widget-title">Danh mục</h3>
                      {/* End .widget-title */}

                      <ul>
                        {categoryOptions.map((cate) => (
                          <li>
                            <a href="#">{cate}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* End .widget */}

                    {/* <div className="widget">
                      <h3 className="widget-title">Tin tức phổ biến</h3>

                      <ul className="posts-list">
                        <li>
                          <figure>
                            <a href="#">
                              <img
                                src="assets/images/blog/sidebar/post-1.jpg"
                                alt="post"
                              />
                            </a>
                          </figure>

                          <div>
                            <span>Nov 22, 2018</span>
                            <h4>
                              <a href="#">Aliquam tincidunt mauris eurisus.</a>
                            </h4>
                          </div>
                        </li>
                      </ul>
                    </div> */}
                    {/* End .widget */}

                    <div className="widget widget-banner-sidebar">
                      <div className="banner-sidebar-title">
                        ad box 280 x 280
                      </div>
                      {/* End .ad-title */}

                      <div className="banner-sidebar">
                        <a href="#">
                          <img
                            src="assets/images/blog/sidebar/banner.jpg"
                            alt="banner"
                          />
                        </a>
                      </div>
                      {/* End .banner-ad */}
                    </div>
                    {/* End .widget */}

                    <div className="widget widget-text">
                      <h3 className="widget-title">Về Blog</h3>
                      {/* End .widget-title */}

                      <div className="widget-text-content">
                        <p>Chia sẻ các kiến thức về máy tính, phụ kiện...</p>
                      </div>
                      {/* End .widget-text-content */}
                    </div>
                    {/* End .widget */}
                  </div>
                  {/* End .sidebar sidebar-shop */}
                </aside>
                {/* End .col-lg-3 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </div>
          {/* End .page-content */}
        </main>
      )}
    </>
  );
}

export default BlogDetail;
