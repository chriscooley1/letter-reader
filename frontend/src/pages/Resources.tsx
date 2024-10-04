import React from "react";
import { useTheme } from "../context/ThemeContext";

const Resources: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex min-h-screen w-full flex-col items-center pl-[250px] ${theme.isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-3xl font-bold mb-4">Resources</h1>
      {/* Add your resources content here */}
    </div>
  );
};

export default Resources;
