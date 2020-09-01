const { Segment, Divider } = require("semantic-ui-react");
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { useState } from "react";
import cookie from "js-cookie";
import { catchErrors } from "../utils/catchErrors";

function Cart({ products, user }) {
  const [cartProducts, setCartProducts] = useState(products);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const removeCartItem = async (productId) => {
    try {
      const url = `${baseUrl}/api/cart`;
      const token = cookie.get("token");
      const payload = {
        params: { productId },
        headers: { Authorization: token },
      };
      const response = await axios.delete(url, payload);
      setCartProducts(response.data);
    } catch (error) {
      console.error(error);
      catchErrors(error, window.alert);
    }
  };

  const onOpen = () => {
    setLoading(true);
  };

  const onClosed = () => {
    console.log("on closed");
    setLoading(false);
  };

  const handleCheckout = async (paymentData) => {
    setProcessingPayment(true);
    try {
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get("token");
      const payload = {
        paymentData,
      };
      await axios.post(url, payload, { headers: { Authorization: token } });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      catchErrors(error, window.alert);
    } finally {
      setProcessingPayment(false);
    }
  };

  return (
    <>
      <Segment loading={loading || processingPayment}>
        <CartItemList
          removeCartItem={removeCartItem}
          user={user}
          products={cartProducts}
          success={success}
        />
        <Divider />
        <CartSummary
          products={cartProducts}
          handleCheckout={handleCheckout}
          success={success}
          onOpen={onOpen}
          onClosed={onClosed}
        />
      </Segment>
    </>
  );
}

Cart.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return { products: [] };
  }
  const url = `${baseUrl}/api/cart`;

  const payload = {
    headers: { Authorization: token },
  };
  const response = await axios.get(url, payload);
  console.log(response.data);
  return { products: response.data };
};

export default Cart;
