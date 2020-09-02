import Auth from "../components/_app/Auth";
import AccountHeader from "../components/Account/AccountHeader";
import AccountOrders from "../components/Account/AccountOrders";
import AccountPermissions from "../components/Account/AccountPermissions";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { parseCookies } from "nookies";
function Account({ user, orders }) {
  return (
    <>
      <AccountHeader user={user} />
      <AccountOrders orders={orders} />
      {user.role === "root" && <AccountPermissions />}
    </>
  );
}
Account.getInitialProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { orders: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/orders`;
  const response = await axios.get(url, payload);
  return response.data;
};

export default Auth(Account);
