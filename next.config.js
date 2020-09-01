// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      "mongodb+srv://admin:qaz,lp@cluster0.xttm9.mongodb.net/shop?retryWrites=true&w=majority",
    JWT_SECRET: "asdfasdfasdf",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dacr0umgu/image/upload",
    STRIPE_SECRET_KEY:
      "sk_test_51CRYPLI59dZsHpB4GQ7u1cDNQhCJWBIEBedDggKf4zyGqxeoveb4J7QBX6Eapu7uMyrl2Ymshpg78alSliWAin5E00NY78T89G",
    STRIPE_PUBLISH_KEY:
      "pk_test_51CRYPLI59dZsHpB4pf68LZRN2VEWKo51aCFheEiuqvFDuf52E33OB8rhbi7TOn2UXx8Ogqjw8ytJ91cqCjIcHLfa00wlllSjrv",
    CLOUD_NAME: "dacr0umgu",
  },
};
