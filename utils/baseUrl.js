const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://megashop.parcelload.com'
    : 'http://localhost:3000';

export default baseUrl;
