const baseUrl =
  process.NODE_ENV === "production"
    ? "https://aaaaaa"
    : "http://localhost:3000";

export default baseUrl;
