import { GiMoebiusTriangle } from "react-icons/gi";
import { FiArrowDown, FiArrowUp, FiUsers } from "react-icons/fi";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
          <FiUsers className="text-gray-800 size-6" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <span className="bg-emerald-100 flex p-1 rounded-lg text-emerald-500">
            {/* <ArrowUpIcon /> */}
            <FiArrowUp className="mt-1" />
            11.01%
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" /> */}
          <GiMoebiusTriangle className="text-gray-800 size-6" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>
          <span className="bg-red-100 flex p-1 rounded-lg text-red-500">
            {/* <ArrowUpIcon /> */}
            <FiArrowDown className="mt-1" />
            9.05%
          </span>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
