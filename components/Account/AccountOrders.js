import {
  Header,
  Accordion,
  Icon,
  Label,
  Image,
  List,
  Segment,
  Button,
} from "semantic-ui-react";
import React, { useState } from "react";
import { useRouter } from "next/router";
function AccountOrders({ orders }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (event, data) => {
    console.log(data);
    setActiveIndex(data.index);
  };
  const renderProducts = (products) => {
    return products.map(({ product, quantity }, index) => {
      return (
        <List.Item key={index}>
          <Image size="mini" src={product.mediaUrl} />
          <List.Content verticalAlign="middle">
            <List.Header as="h4">{product.name}</List.Header>
            <List.Description>
              {quantity} x {product.price}
            </List.Description>
          </List.Content>
          <List.Content floated="right">
            <Label color="red" tag size="tiny">
              {product.sku}
            </Label>
          </List.Content>
        </List.Item>
      );
    });
  };

  const renderItems = () => {
    return orders.map((order, index) => {
      return (
        <React.Fragment key={index}>
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={handleClick}
          >
            <Icon name="dropdown" />
            <Label color="blue">{order.createdAt}</Label>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === index}>
            <Header as="h4">
              {`Total: ${order.total}`}
              <Label>
                <Icon name="mail"></Icon>
                {order.email}
              </Label>
            </Header>
            <List>{renderProducts(order.products)}</List>
          </Accordion.Content>
        </React.Fragment>
      );
    });
  };
  return orders.length === 0 ? (
    <Segment color="grey" icon inverted textAlign="center">
      <Icon name="copy outline" size="huge" />
      <Header as="h3" content="No Orders"></Header>
      <Button
        color="orange"
        content="View Products"
        onClick={() => {
          router.push("/");
        }}
      ></Button>
    </Segment>
  ) : (
    <>
      <Header content="Order History" icon="folder open"></Header>
      <Accordion fluid styled>
        {renderItems()}
      </Accordion>
    </>
  );
}

export default AccountOrders;
