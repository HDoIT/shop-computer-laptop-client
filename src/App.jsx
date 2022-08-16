import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { loadUser } from "./actions/userAction";
import "./App.css";
import MyOrderDetail from "./components/MyOrderDetail";
import NotFound from "./components/NotFound";
import AdminRoute from "./components/Route/AdminRoute";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import PublicRoute from "./components/Route/PublicRoute";
import About from "./pages/About";
import BannerList from "./pages/Admin/BannerList";
import BlogList from "./pages/Admin/BlogList";
import CategoryList from "./pages/Admin/CategoryList";
import ContactList from "./pages/Admin/ContactList";
import Dashboard from "./pages/Admin/Dashboard";
import NewBanner from "./pages/Admin/NewBanner";
import NewBlog from "./pages/Admin/NewBlog";
import NewCategory from "./pages/Admin/NewCategory";
import NewProduct from "./pages/Admin/NewProduct";
import OrderList from "./pages/Admin/OrderList";
import ProcessOrder from "./pages/Admin/ProcessOrder";
import ProductList from "./pages/Admin/ProductList";
import ProductReviews from "./pages/Admin/ProductReviews";
import ReplyContact from "./pages/Admin/ReplyContact";
import UpdateBanner from "./pages/Admin/UpdateBanner";
import UpdateBlog from "./pages/Admin/UpdateBlog";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import UpdateUser from "./pages/Admin/UpdateUser";
import UserList from "./pages/Admin/UserList";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import MyAccount from "./pages/MyAccount";
import Payment from "./pages/Payment";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import ResetPassword from "./pages/ResetPassword";
import Wishlist from "./pages/Wishlist";
import store from "./store";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    // const token = localStorage.getItem("token");

    // const config = {
    //   headers: {
    //     Authorization: `token ${token}`,
    //   },
    // };

    const { data } = await axios.get(
      "https://laptop-app-lhd.herokuapp.com/api/v1/stripeapikey"
      // config
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/products" component={Product} />
          <PublicRoute exact path="/products" component={Product} />
          <PublicRoute exact path="/product/:id" component={ProductDetail} />
          <PublicRoute path="/products/:keyword" component={Product} />

          <PublicRoute exact path="/about" component={About} />
          <PublicRoute exact path="/faq" component={FAQ} />
          <PublicRoute exact path="/contact" component={Contact} />

          <PublicRoute exact path="/blog" component={Blog} />
          <PublicRoute exact path="/blog/:id" component={BlogDetail} />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/categories"
            component={CategoryList}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/users"
            component={UserList}
          />
          <AdminRoute
            exact
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
          />
          <AdminRoute
            exact
            path="/admin/orders"
            isAdmin={true}
            component={OrderList}
          />
          <AdminRoute
            exact
            path="/admin/contacts"
            isAdmin={true}
            component={ContactList}
          />
          <AdminRoute
            exact
            path="/admin/blogs"
            isAdmin={true}
            component={BlogList}
          />
          <AdminRoute
            exact
            path="/admin/banners"
            isAdmin={true}
            component={BannerList}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/newProduct"
            component={NewProduct}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={UpdateProduct}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/newCategory"
            component={NewCategory}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/category/:id"
            component={UpdateCategory}
          />
          <AdminRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />
          <AdminRoute
            exact
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
          />
          <AdminRoute
            exact
            path="/admin/contact/:id"
            isAdmin={true}
            component={ReplyContact}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/newBlog"
            component={NewBlog}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/blog/:id"
            component={UpdateBlog}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/newBanner"
            component={NewBanner}
          />
          <AdminRoute
            isAdmin={true}
            exact
            path="/admin/banner/:id"
            component={UpdateBanner}
          />

          <PublicRoute exact path="/login" component={Login} />
            <ProtectedRoute exact path="/my-account" component={MyAccount} />
          <PublicRoute
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />
          <ProtectedRoute exact path="/order/:id" component={MyOrderDetail} />

          <ProtectedRoute exact path="/wishlist" component={Wishlist} />

          <PublicRoute exact path="/cart" component={Cart} />
          <PublicRoute exact path="/checkout" component={Checkout} />

          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PublicRoute exact path="/payment" component={Payment} />
            </Elements>
          )}
          <PublicRoute component={NotFound} />
        </Switch>
        {/* <button id="scroll-top" title="Back to Top">
          <i className="icon-arrow-up"></i>
        </button> */}
        <ScrollToTop smooth />

        {/* <!-- Mobile Menu --> */}
        <div className="mobile-menu-overlay"></div>
        {/* <!-- End .mobil-menu-overlay --> */}
      </Router>
    </div>
  );
}

export default App;
