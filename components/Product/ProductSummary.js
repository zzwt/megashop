import { Item, Label } from "semantic-ui-react";
import AddProductToCart from "./AddProductToCart";
function ProductSummary({
  _id,
  name,
  price,
  description,
  sku,
  mediaUrl,
  user,
}) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="large" src={mediaUrl} />

        <Item.Content style={{ marginTop: "1rem" }}>
          <Item.Header as="a">{name}</Item.Header>
          <Item.Meta>${price}</Item.Meta>
          <Label>Sku:{sku}</Label>
          <Item.Extra>
            <AddProductToCart productId={_id} user={user} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
