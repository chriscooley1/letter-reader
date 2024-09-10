import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage"; // Keeping LandingPage eager-loaded
import { useTheme } from "./context/ThemeContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import Auth0ProviderWithHistory from "./Auth0ProviderWithHistory";
import ErrorBoundary from "./components/ErrorBoundary";

import FullScreenDisplay from "./pages/FullScreenDisplay/FullScreenDisplay";
import YourCollections from "./pages/YourCollections/YourCollections";
import NewCollection from "./pages/NewCollection/NewCollection";
import DiscoverCollections from "./pages/DiscoverCollections/DiscoverCollections";
import CollectionSetup from "./pages/CollectionSetup/CollectionSetup";
import CollectionFinalStep from "./pages/CollectionFinalStep/CollectionFinalStep";
import NameGenerator from "./pages/NameGenerator/NameGenerator";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings/Settings";
import MyAccount from "./pages/MyAccount/MyAccount";

const App: React.FC = () => {
  const { theme } = useTheme();
  const [hideSidebar, setHideSidebar] = React.useState<boolean>(false);
  const location = useLocation();

  React.useEffect(() => {
    // Hide sidebar on the LandingPage
    setHideSidebar(location.pathname === "/");
  }, [location.pathname]);

  const handleFullScreenDisplay = (hide: boolean) => {
    console.log("Setting hideSidebar to:", hide);
    setHideSidebar(hide);
  };

  // Reset sidebar visibility whenever navigating away from fullscreen
  React.useEffect(() => {
    if (location.pathname !== "/fullscreen-display") {
      setHideSidebar(false); // Ensure the sidebar reappears on route change
    }
  }, [location.pathname]);

  console.log("Rendering App, hideSidebar state:", hideSidebar);

  return (
    <Auth0ProviderWithHistory>
      <ErrorBoundary>
        <div className={`app-container ${theme.className}`}>
          <Navbar />
          <div className="layout">
            {!hideSidebar && <Sidebar />}
            <div className={`main-content ${hideSidebar ? "without-sidebar" : "with-sidebar"}`}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="/fullscreen-display"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute
                        element={
                          <FullScreenDisplay
                            onEnterFullScreen={() => handleFullScreenDisplay(true)}
                            onExitFullScreen={() => handleFullScreenDisplay(false)}
                          />
                        }
                      />
                    </Suspense>
                  }
                />
                <Route
                  path="/your-collections"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<YourCollections />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/new-collection"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<NewCollection />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/discover-collections"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<DiscoverCollections />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/collection-setup"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<CollectionSetup />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/collection-final-step"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<CollectionFinalStep />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/name-generator"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<NameGenerator />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<Resources />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<Settings />} />
                    </Suspense>
                  }
                />
                <Route
                  path="/my-account"
                  element={
                    <Suspense fallback={<div>Loading...</div>}>
                      <PrivateRoute element={<MyAccount />} />
                    </Suspense>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </Auth0ProviderWithHistory>
  );
};

export default App;
