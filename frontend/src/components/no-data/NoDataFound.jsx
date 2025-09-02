import React from "react";
import { MdOutlineSearchOff } from "react-icons/md";

const NoDataFound = ({ colSpan = 7, message = "No data found" }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center">
        <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
          {/* Icon */}
          <MdOutlineSearchOff className="w-12 h-12 text-gray-400" />

          {/* Text */}
          <p className="text-lg font-medium">{message}</p>
        </div>
      </td>
    </tr>
  );
};

export default NoDataFound;
