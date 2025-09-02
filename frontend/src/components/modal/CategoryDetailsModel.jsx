import React from "react";

export default function CategoryDetailsModel({ category, onClose }) {
  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-50 mt-10 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-[750px] w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-10">
          {/* Images */}
          <div className="space-y-2">
            {category.photo_full && (
              <img
                src={category.photo_full}
                alt="Category full"
                className="w-80 rounded"
              />
            )}
          </div>
          {/* Details */}
          <div className="space-y-2 text-sm text-gray-700">
            
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
            <p>
              <strong>Slug:</strong> {category.slug}
            </p>
            <p>
              <strong>Serial:</strong> {category.serial}
            </p>
            <p>
              <strong>Status:</strong> {category.status}
            </p>
            <p>
              <strong>Description:</strong> {category.description}
            </p>
            <p>
              <strong>Created By:</strong> {category.created_by}
            </p>
            <p>
              <strong>Created At:</strong> {category.created_at}
            </p>
            <p>
              <strong>Updated At:</strong> {category.updated_at}
            </p>
          </div>
        </div>
        {/* Close button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
