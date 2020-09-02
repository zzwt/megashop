import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";
function Home({ products, totalPages }) {
  return (
    <>
      <ProductList products={products} totalPages={totalPages} />
    </>
  );
}
Home.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const pageSize = 9;
  const payload = { params: { page, pageSize } };
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url, payload);
  return response.data;
};

export default Home;
