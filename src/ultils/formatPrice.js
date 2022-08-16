function formatPrice(string) {
  return string.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export default formatPrice;
