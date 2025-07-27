import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Link } from "react-router";

const AddCategory = () => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    if (e.target.name == "name") {
      let slug = e.target.value;
      slug = slug.replaceAll(" ", "-");
      setInput((prevState) => ({
        ...prevState,
        slug: slug,
      }));
    }
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setInput((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryCreate = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <>
      <PageMeta
        title="Add Category | Dashboard"
        description="This is add category of inventaix company"
      />
      <PageBreadcrumb pageTitle={"Add Category"} />
      <div className="border-2 border-indigo-500 rounded-lg p-10">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold">Add Category</h5>
          <Link
            to="/all-category"
            className="text-indigo-800 outline-2 outline-indigo-500 p-1 px-2 rounded-md hover:bg-indigo-500 hover:text-white"
          >
            Show Category
          </Link>
        </div>
        <hr className="mt-5 border border-indigo-300" />

        <form action="">
          <div className="flex gap-10">
            <div className="my-5 w-1/2">
              <label
                htmlFor=""
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Name:{" "}
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInput}
                placeholder="Enter Category Name"
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning />
                  {errors.name[0]}
                </p>
              )}
            </div>
            <div className="my-5 w-1/2">
              <label
                htmlFor=""
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Slug:{" "}
              </label>
              <input
                type="text"
                name="slug"
                value={input.slug}
                onChange={handleInput}
                placeholder="Enter Slug Name"
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.slug && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning />
                  {errors.slug[0]}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mb-5 w-1/2">
              <label
                htmlFor=""
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Serial:{" "}
              </label>
              <input
                type="number"
                name="serial"
                value={input.serial}
                onChange={handleInput}
                placeholder="Enter Category Serial"
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.serial && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning />
                  {errors.serial[0]}
                </p>
              )}
            </div>
            <div className="mb-5 w-1/2">
              <label
                htmlFor=""
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Status:{" "}
              </label>
              <select
                name="status"
                value={input.status}
                onChange={handleInput}
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option disabled={true}>Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning />
                  {errors.status[0]}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mb-5 w-1/2">
              <label
                htmlFor=""
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Description:{" "}
              </label>
              <textarea
                name="description"
                value={input.description}
                onChange={handleInput}
                placeholder="Enter Category Description"
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning />
                  {errors.description[0]}
                </p>
              )}
            </div>
            <div className="mb-5 w-1/2">
              <label
                htmlFor=""
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Image:{" "}
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImage}
                placeholder="Enter Category Serial"
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              />

              <div className="">
                <img
                  src={input.image}
                  alt=""
                  className="w-50 mt-3 rounded-lg"
                />
              </div>

              {errors.image && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning />
                  {errors.image[0]}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={handleCategoryCreate}
              className="w-1/2 justify-center border-2 border-indigo-500 rounded-lg py-2 hover:bg-indigo-500 hover:text-white"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
