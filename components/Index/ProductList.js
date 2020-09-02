import { Card, Image } from "semantic-ui-react";
import ProductPagination from "./ProductPagination";

function ProductList({ products, totalPages }) {
  const renderProducts = () => {
    return products.map((product) => {
      return (
        <Card
          key={product._id}
          href={`/product?_id=${product._id}`}
          fluid
          color="teal"
        >
          <Image src={product.mediaUrl} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>${product.price}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });
  };

  return (
    <>
      <Card.Group itemsPerRow="3" centered>
        {renderProducts()}
      </Card.Group>
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

export default ProductList;
