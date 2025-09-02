import { useState } from "react";

export default function CategoryPhotoModal({ photo, photoFull, heading }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <img
          src={photo}
          alt="Category"
          className="w-30 h-16 object-cover mx-auto rounded cursor-pointer"
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 mt-20 flex items-center justify-center bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl my-2"> {heading} Full Size Image </h2>
            <img
              src={photoFull}
              alt="Category Full"
              className="w-full h-100 rounded"
            />

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
