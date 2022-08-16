import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReviewsIcon from "@mui/icons-material/Reviews";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Sidebar(props) {
  const { handleHistory } = props;
  const { user, loading } = useSelector((state) => state.user);

  return (
    <List>
      <ListItem button onClick={() => handleHistory("dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Trang chủ" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("categories")}>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Danh mục" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("products")}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Sản phẩm" />
      </ListItem>
      {user.role === "admin" ? (
        <ListItem button onClick={() => handleHistory("users")}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Tài khoản" />
        </ListItem>
      ) : (
        ""
      )}
      <ListItem button onClick={() => handleHistory("reviews")}>
        <ListItemIcon>
          <ReviewsIcon />
        </ListItemIcon>
        <ListItemText primary="Đánh giá" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("orders")}>
        <ListItemIcon>
          <ShoppingBagIcon />
        </ListItemIcon>
        <ListItemText primary="Đơn hàng" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("contacts")}>
        <ListItemIcon>
          <ContactMailIcon />
        </ListItemIcon>
        <ListItemText primary="Liên hệ" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("blogs")}>
        <ListItemIcon>
          <NewspaperIcon />
        </ListItemIcon>
        <ListItemText primary="Tin tức" />
      </ListItem>
      <ListItem button onClick={() => handleHistory("banners")}>
        <ListItemIcon>
          <ViewCarouselIcon />
        </ListItemIcon>
        <ListItemText primary="Banner" />
      </ListItem>
    </List>
  );
}

export default Sidebar;
