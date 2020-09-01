import { Menu, Container, Image, Icon } from "semantic-ui-react";

import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import { logoutUser } from "../../utils/auth.js";
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({ user }) {
  // const [user, setUser] = useState(false);
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path;
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Menu id="menu" fluid inverted style={{ borderRadius: "0px" }}>
      <Container text>
        <Link href="/">
          <Menu.Item header name="eshop" active={isActive("/")}>
            <Image
              src="/static/logo.svg"
              size="mini"
              style={{ marginRight: "1rem" }}
            ></Image>
            Mega Sale Shop
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item header name="cart" active={isActive("/cart")}>
            <Icon name="cart" size="large"></Icon> Cart
          </Menu.Item>
        </Link>
        {user && (user.role === "admin" || user.role === "root") && (
          <Link href="/create">
            <Menu.Item header name="create" active={isActive("/create")}>
              <Icon name="add" size="large"></Icon> Create
            </Menu.Item>
          </Link>
        )}
        {user ? (
          <React.Fragment>
            <Link href="/account">
              <Menu.Item header name="account" active={isActive("/account")}>
                <Icon name="user" size="large"></Icon> Account
              </Menu.Item>
            </Link>
            <Menu.Item
              header
              name="logout"
              active={isActive("/logout")}
              onClick={handleLogout}
            >
              <Icon name="sign out" size="large"></Icon> Logout
            </Menu.Item>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link href="/login">
              <Menu.Item header name="login" active={isActive("/login")}>
                <Icon name="sign in" size="large"></Icon> Login
              </Menu.Item>
            </Link>
            <Link href="/signup">
              <Menu.Item header name="signup" active={isActive("/signup")}>
                <Icon name="signup" size="large"></Icon> Signup
              </Menu.Item>
            </Link>
          </React.Fragment>
        )}
      </Container>
    </Menu>
  );
}

export default Header;
