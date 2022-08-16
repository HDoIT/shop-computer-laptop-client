import React from "react";

let addBtn, cart;
const speed = 500,
  curveDelay = 300,
  position = "fixed"; // or absolute

function init() {
  addBtn = document.querySelectorAll("[data-addToCart]");
  cart = document.querySelector("#cart button");

  for (let btn of addBtn) {

    btn.addEventListener("click", addItem);
  }
}

function addItem(e) {
  let btnY =
      position === "fixed"
        ? e.currentTarget.getBoundingClientRect().top
        : e.currentTarget.offsetTop,
    btnX =
      position === "fixed"
        ? e.currentTarget.getBoundingClientRect().left
        : e.currentTarget.offsetLeft,
    flyingBtn = e.currentTarget.cloneNode();

  cart.classList.remove("addedCount");

  flyingBtn.classList.add("flyingBtn");
  flyingBtn.style.position = position;
  flyingBtn.style.top = `${btnY}px`;
  flyingBtn.style.left = `${btnX}px`;
  flyingBtn.style.opacity = "1";
  flyingBtn.style.transition = `all ${speed / 1000}s ease, top ${(speed +
    curveDelay) /
    1000}s ease, left ${speed / 1000}s ease, transform ${speed /
    1000}s ease ${(speed - 10) / 1000}s`;

  document.body.appendChild(flyingBtn);

  flyingBtn.style.top = `${cart.offsetTop + cart.offsetHeight - 16}px`;
  flyingBtn.style.left = `${cart.offsetLeft + cart.offsetWidth - 16}px`;
  flyingBtn.style.height = "1rem";
  flyingBtn.style.width = "1rem";
  flyingBtn.style.transform = "scale(0)";

  setTimeout(() => {
    flyingBtn.remove();
    storeItems();
  }, speed * 1.5);
}

function storeItems() {
  let itmsInCart = cart.getAttribute("data-count");
  cart.classList.add("addedCount");

  if (!itmsInCart) {
    cart.setAttribute("data-count", 1);
  } else {
    cart.setAttribute("data-count", parseInt(itmsInCart, 10) + 1);
  }
}

class index extends React.Component {
  componentDidMount() {
    init();
  }

  render() {
    return (
      <div>
        <header id="header-shop">
          <section id="cart">
            <button>
              <span className="fa fa-shopping-cart" />
            </button>
            <ul />
          </section>
        </header>
        <main id="grid-shop">
          <h1>Shop</h1>
          <article>
            <header>
              <div />
            </header>
            <footer>
              <button className="fa fa-plus" data-addtocart />
            </footer>
          </article>
        </main>
      </div>
    );
  }
}

export default index;
