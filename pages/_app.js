import App from "next/app";
import Layout from "../components/_App/Layout";
import baseUrl from "../utils/baseUrl";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import axios from "axios";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    // check cookie and setting user for each page component
    //  1. get cookie
    const { token } = parseCookies(ctx);
    // 2. if cookie existed, fetch user
    if (token) {
      try {
        const url = `${baseUrl}/api/account`;
        const payload = { headers: { Authorization: token } };
        const response = await axios.get(url, payload);
        const user = response.data;
        // 3. set user
        pageProps.user = user;
        ctx.user = user;
      } catch (err) {
        console.error("Error getting current user", err);
        // 1) Throw out invalid token
        destroyCookie(ctx, "token");
        // 2) Redirect to login
        redirectUser(ctx, "/login");
      }
    }
    // 3. if cookie not existed, leave to individual
    // page to decide redirect or not

    if (Component.getInitialProps) {
      pageProps = { ...pageProps, ...(await Component.getInitialProps(ctx)) };
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
