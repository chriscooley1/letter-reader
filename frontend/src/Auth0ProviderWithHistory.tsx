import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

interface Auth0ProviderWithHistoryProps {
  children: React.ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({ children }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: any) => {
    console.log("Redirect callback with appState:", appState);

    // Dynamically determine where to redirect after login
    let redirectTo = appState?.returnTo || "/your-collections"; // Default route after login

    // Additional fallback paths based on user logic (you can customize based on your needs)
    if (!appState?.returnTo) {
      const storedPath = localStorage.getItem("preLoginPath");
      if (storedPath) {
        redirectTo = storedPath;
      }
    }

    console.log("Redirecting to:", redirectTo);
    navigate(redirectTo);
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
