import axios from "axios";
import ProductSummary from "../components/Product/ProductSummary";
import ProductAttributes from "../components/Product/ProductAttributes";
import baseUrl from "../utils/baseUrl";
function Product({ product, user }) {
  return (
    <>
      <ProductSummary {...product} user={user} />
      <ProductAttributes {...product} user={user} />
    </>
  );
}

Product.getInitialProps = async ({ query }) => {
  const url = `${baseUrl}/api/product`;
  const response = await axios.get(url, { params: { _id: query._id } });
  return { product: response.data };
};

export default Product;
