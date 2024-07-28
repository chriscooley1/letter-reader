import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Display from "./components/Display";
import Settings from "./components/Settings";
import History from "./components/History";
import ThemeSelector from "./components/ThemeSelector";
import FullScreenDisplay from "./components/FullScreenDisplay";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import { useTheme } from "./context/ThemeContext";
import "./App.css";

const App: React.FC = () => {
  const [sequence, setSequence] = React.useState<string[]>([]);
  const [speed, setSpeed] = React.useState<number>(500);
  const { theme } = useTheme();
  const location = useLocation();

  const handleUpdate = (newSequence: string[], newSpeed: number) => {
    setSequence(newSequence);
    setSpeed(newSpeed);
  };

  const handleLoad = (seq: string[]) => {
    setSequence(seq);
  };

  const shouldHideSidebar = location.pathname === '/fullscreen-display';

  return (
    <div className={`app-container ${theme.className}`}>
      {!shouldHideSidebar && <Sidebar />} {/* Conditionally render Sidebar */}
      <div style={{ flex: 1, marginLeft: shouldHideSidebar ? 0 : '250px' }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ThemeSelector />
                <Settings onUpdate={handleUpdate} userId={1} />
                <Display sequence={sequence} speed={speed} />
                <History onLoad={handleLoad} />
              </>
            }
          />
          <Route path="/fullscreen-display" element={<FullScreenDisplay />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <Router basename="/letter-reader/">
    <App />
  </Router>
);


export default AppWrapper;
