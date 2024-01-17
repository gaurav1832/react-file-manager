import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" /> // Redirect to the login page if not authenticated
        )
      }
    />
  );
}
export default ProtectedRoute;
