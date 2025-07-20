import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";

export default function AuthLayout(props) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {props.children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* ===== Common Grid Shape Start ===== */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={50}
                  height={50}
                  src="/inx.webp"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-200 dark:text-white/60">
                Inventaix Inventory management software
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
