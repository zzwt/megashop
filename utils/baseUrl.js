const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://megashop.joellu.site"
    : "http://localhost:3000";

export default baseUrl;
