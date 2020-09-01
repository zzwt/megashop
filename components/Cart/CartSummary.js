import { Header, Button, Icon, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import calculateCartTotal from "../../utils/calculateCartTotal";
function CartSummary({
  products = [],
  handleCheckout,
  success,
  onOpen,
  onClosed,
}) {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [total, setTotal] = useState({});
  useEffect(() => {
    setIsCartEmpty(products.length === 0);
    setTotal(calculateCartTotal(products));
  }, [products]);

  return (
    !success && (
      <Segment size="large" clearing>
        <strong>Subtotal:</strong>${total.cartTotal}
        <StripeCheckout
          name="Mega Shop"
          amount={total.stripeTotal}
          currency="AUD"
          local="au"
          stripeKey={process.env.STRIPE_PUBLISH_KEY}
          shippingAddress
          billingAddress
          zipCode={true}
          triggerEvent="onClick"
          token={handleCheckout}
          opened={onOpen}
          closed={onClosed}
        >
          <Button
            icon="cart"
            disabled={isCartEmpty || success}
            content="Checkout"
            floated="right"
            color="teal"
          />
        </StripeCheckout>
      </Segment>
    )
  );
}

export default CartSummary;
