import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearErrors, getAllBlogs } from "../../actions/blogAction";
import Loader from "../../components/Common/Loader";
import MetaData from "../../components/Layout/MetaData";
import moment from "moment";
import "moment/locale/vi";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import './Blog.scss';
moment.locale("vi");

const categoryOptions = ["Tin ICT", "Đồ chơi số", "Mua-Ngay-Luôn"];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Blog() {
  const { blogs, loading, error } = useSelector((state) => state.blogs);

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

  let match = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setOpenError(true);
      setErrorAlert(error);
      dispatch(clearErrors());
    }

    dispatch(getAllBlogs());
  }, [dispatch, error]);

  return (
    <main className="main">
      <MetaData title="Tin tức" />;
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
        style={{
          backgroundImage: "url('assets/images/page-header-bg.jpg')",
        }}
      >
        <div className="container">
          <h1 className="page-title">Tin tức</h1>
        </div>
      </div>
      
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Tin tức
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {blogs &&
                    blogs.map((blog) => (
                      <article className="entry entry-list">
                        <div className="blog-card">
                          <div className="meta">
                            <div className="photo" style={{backgroundImage: `url(${blog.image.url})`}}></div>
                            <ul className="details">
                              <li className="author"> <i className="fas fa-user"></i>  <a href="#">{blog.user.name}</a></li>
                              <li className="date"><i className="fas fa-calendar-alt"></i>  {moment(blog.createdAt).format("DD/MM/YYYY")}</li>
                              <li className="tags">
                                <i className="fas fa-comment-alt"></i>  {blog.numOfReviews} Comments
                              </li>
                            </ul>
                          </div>
                          <div className="description">
                            <h1>
                              <Link to={`/blog/${blog._id}`}>
                                  {blog.name}
                              </Link>
                            </h1>
                            <h2>trong <a href="#">{blog.category}</a></h2>
                            <p>{blog.description} ... </p>
                            <p className="read-more">
                              <Link to={`/blog/${blog._id}`}>
                                    read more
                              </Link>
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                </>
              )}
            </div>

            <aside className="col-lg-3">
              <div className="sidebar">
                <div className="widget widget-search">
                  <h3 className="widget-title">Tìm kiếm</h3>

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
                      <span className="sr-only">Search</span>
                    </button>
                  </form>
                </div>

                <div className="widget widget-cats">
                  <h3 className="widget-title">Danh mục</h3>

                  <ul>
                    {categoryOptions.map((cate) => (
                      <li>
                        <a href="#">{cate}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="widget widget-banner-sidebar">
                  <div className="banner-sidebar-title">ad box 280 x 280</div>

                  <div className="banner-sidebar banner-overlay">
                    <a href="#">
                      <img
                        src="assets/images/blog/sidebar/banner.jpg"
                        alt="banner"
                      />
                    </a>
                  </div>
                </div>

                <div className="widget widget-text">
                  <h3 className="widget-title">Về Blog</h3>

                  <div className="widget-text-content">
                    <p>Chia sẻ các kiến thức về máy tính, phụ kiện,...</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Blog;
