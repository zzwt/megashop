import { Input } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { catchErrors } from "../../utils/catchErrors";

function AddProductToCart({ productId, user }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [success]);

  const addToCart = async () => {
    setLoading(true);
    const url = `${baseUrl}/api/cart`;
    const payload = {
      quantity,
      productId,
      userId: user._id,
    };
    try {
      await axios.put(url, payload);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  const onValueChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <>
      <Input
        type="number"
        min="1"
        step="1"
        value={quantity}
        action={
          !user
            ? {
                color: "twitter",
                icon: "signup",
                content: "Signup to Purchase",
                onClick: () => {
                  router.push("/signup");
                },
              }
            : success
            ? {
                disabled: loading,
                color: "twitter",
                icon: "check",
                content: "Product Added",
              }
            : {
                disabled: loading,
                color: "orange",
                icon: "plus cart",
                content: "Add to Cart",
                onClick: addToCart,
                loading: loading,
              }
        }
        placeholder="Quantity"
        onChange={onValueChange}
      />
    </>
  );
}

export default AddProductToCart;
