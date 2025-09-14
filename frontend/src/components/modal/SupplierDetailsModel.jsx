import React, { useEffect } from "react";

export default function SupplierDetailsModal({ supplier, onClose }) {
  if (!supplier) return null;

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-xl shadow-2xl p-8 max-w-[750px] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Logo */}
        <div className="flex items-center gap-6 border-b pb-4 mb-4">
          {supplier.logo_full && (
            <img
              src={supplier.logo_full}
              alt="Supplier Logo"
              className="w-20 h-20 rounded-full border-4 border-indigo-200 shadow-md object-cover"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {supplier.name}
            </h2>
            <p className="text-sm text-gray-500">{supplier.details}</p>
          </div>
        </div>

        {/* Content in Two Columns */}
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
          {/* Supplier Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Supplier Information
            </h3>
            <p>
              <strong>Email:</strong> {supplier.email}
            </p>
            <p>
              <strong>Phone:</strong> {supplier.phone}
            </p>
            <p>
              <strong>Status:</strong> {supplier.status}
            </p>
            <p>
              <strong>Created By:</strong> {supplier.created_by}
            </p>
            <p>
              <strong>Created At:</strong> {supplier.created_at}
            </p>
            <p>
              <strong>Updated At:</strong> {supplier.updated_at}
            </p>
          </div>

          {/* Address Info */}
          {supplier.address && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                Address Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                <p>
                  <strong>Address:</strong> {supplier.address.address}
                </p>
                <p>
                  <strong>Landmark:</strong> {supplier.address.landmark}
                </p>
                <p>
                  <strong>Division:</strong> {supplier.address.division}
                </p>
                <p>
                  <strong>District:</strong> {supplier.address.district}
                </p>
                <p>
                  <strong>Area:</strong> {supplier.address.area}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Close button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
