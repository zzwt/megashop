const calculateCartTotal = (products) => {
  const total = products.reduce((prev, cartItem) => {
    return prev + cartItem.quantity * cartItem.product.price;
  }, 0);
  return {
    cartTotal: ((total * 100) / 100).toFixed(2),
    stripeTotal: Number((total * 100).toFixed(2)),
  };
};
export default calculateCartTotal;
