import { redirectUser } from "../../utils/auth";

const Auth = (Component, requiredRole = "user") => {
  // role is either "user", "admin", "root"
  const requireAuth = (props) => {
    return <Component {...props} />;
  };

  requireAuth.getInitialProps = (ctx) => {
    // if no user existed, redirect
    if (!ctx.user) redirectUser(ctx, "/login");

    if (privilegeIsLower(ctx.user.role, requiredRole)) redirectUser(ctx, "/");

    let pageProps;
    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }
    return pageProps;
  };
  return requireAuth;
};

const privilegeIsLower = (userRole, requiredRole) => {
  switch (userRole) {
    case "user":
      return requiredRole === "admin" || requiredRole === "root" ? true : false;
    case "admin":
      return requiredRole === "root" ? true : false;
    case "root":
      return false;
  }
};

export default Auth;
