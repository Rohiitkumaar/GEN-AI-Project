import Loader from "../../Loader.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader/>
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
