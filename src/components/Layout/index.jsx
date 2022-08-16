import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout(props) {
  return (
    <>
      <Header />
        <div>{props.children}</div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
