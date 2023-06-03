import React from "react";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className="min-h-[50vh] flex justify-center items-center">
      Page not found -&nbsp;
      <Link to={"/"} className="text-[#f00]">
        Back to home
      </Link>
    </div>
  );
}

export default index;
