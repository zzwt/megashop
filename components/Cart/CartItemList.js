import {
  Header,
  Button,
  Icon,
  Segment,
  Item,
  Message,
} from "semantic-ui-react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
function CartItemList({ user, products = [], removeCartItem, success }) {
  const router = useRouter();

  const renderProducts = () => {
    return products.map((cartItem) => {
      const { quantity, product } = cartItem;
      return (
        <Item key={product._id}>
          <Item.Image size="small" src={product.mediaUrl} />

          <Item.Content fluid="true">
            <Item.Header
              as="a"
              onClick={() => {
                router.push(`/product?_id=${product._id}`);
              }}
            >
              {product.name}
            </Item.Header>
            <Item.Meta>{`${quantity} x ${product.price}`}</Item.Meta>
            <Item.Extra>
              <Button
                floated="right"
                icon="close"
                onClick={() => removeCartItem(product._id)}
              ></Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    });
  };

  if (success) {
    return (
      <>
        <Message
          success
          header="Success!"
          content="Your order and payment has been accepted"
          icon="star outline"
        />
        <Button
          color="teal"
          onClick={() => {
            router.push("/orders");
          }}
        >
          View Order
        </Button>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <Segment color="teal" textAlign="center" inverted>
        <Header icon>
          <Icon name="cart" />
          <p>No Product in Your Cart. Add More.</p>
          <div>
            {user ? (
              <Button
                color="orange"
                onClick={() => {
                  router.push("/");
                }}
              >
                View Products
              </Button>
            ) : (
              <Button
                color="blue"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login to Add Products
              </Button>
            )}
          </div>
        </Header>
      </Segment>
    );
  } else {
    return <Item.Group divided>{renderProducts()}</Item.Group>;
  }
}

export default CartItemList;
