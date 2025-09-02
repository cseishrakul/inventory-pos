import React from "react";

const Loader = ({ colSpan = 7 }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          {/* Spinner */}
          <div className="">
            <img src="images/loader.gif" className="w-25" alt="" />
          </div>
          <p className="text-gray-600 text-sm font-medium">Loading data...</p>
        </div>
      </td>
    </tr>
  );
};

export default Loader;
