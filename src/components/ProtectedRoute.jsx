import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const isLoggedin = localStorage.getItem("authToken");

  useEffect(
    function () {
      if (!isLoggedin) navigate("/login");
    },
    [isLoggedin, navigate]
  );
  if (isLoggedin) return children;
}

export default ProtectedRoute;
