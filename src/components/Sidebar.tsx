import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="sidebar">
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/your-collections">Your Collections</Link>
            </li>
            <li>
              <Link to="/new-collection">New Collection</Link>
            </li>
            <li>
              <Link to="/discover-collections">Discover Collections</Link>
            </li>
            <li>
              <Link to="/name-generator">Name Generator</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Already Registered</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
