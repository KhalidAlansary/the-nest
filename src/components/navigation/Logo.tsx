import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="h-8 w-8 bg-nest-primary rounded-full"></div>
      <span className="text-2xl font-bold text-nest-dark">The Nest</span>
    </Link>
  );
};

export default Logo;
