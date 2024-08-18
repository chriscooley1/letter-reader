import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return <div>Redirecting to login...</div>;
};

export default Login;
