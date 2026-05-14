import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <>
        {/* SAFE META (no title) */}
        <Helmet>
          <meta
            name="description"
            content="Please login to continue accessing this page on Velvyana."
          />
          <meta
            name="keywords"
            content="login required, velvyana login, authentication"
          />
        </Helmet>

        <Navigate
          to="/login"
          state={{ from: location }}
          replace
        />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;