import { Header, Button, Modal, Icon } from "semantic-ui-react";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
function ProductAttributes({ description, _id, user }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const onClick = () => {
    setOpen(true);
  };

  const onDelete = async () => {
    const url = `${baseUrl}/api/product`;
    await axios.delete(url, { params: { _id } });
    router.push("/");
    setOpen(false);
  };
  return (
    <>
      <Header as="h4">About this product</Header>
      <p>{description}</p>
      {user && (user.role === "admin" || user.role === "root") && (
        <Button
          negative
          icon="trash"
          content="Delete Product"
          onClick={onClick}
        />
      )}
      <Modal
        closeIcon
        open={open}
        onClose={() => setOpen(false)}
        dimmer="blurring"
      >
        <Header icon="trash" content="Delete Confirmation" />
        <Modal.Content>
          <p>Do you want to delete the product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" onClick={() => onDelete()}>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProductAttributes;
