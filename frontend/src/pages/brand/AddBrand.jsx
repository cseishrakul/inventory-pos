import React, { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { laravel_base_url, react_base_url } from "../../router/http";
import { FaSpinner } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import Swal from "sweetalert2";

import { MdToggleOn, MdToggleOff } from "react-icons/md";

const AddBrand = ({ value, onChange }) => {
  const [input, setInput] = useState({ status: "0" });
  const [status, setStatus] = useState("0");
  const [errors, setErrors] = useState([]);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleToggle = () => {
    const newStatus = status === "1" ? "0" : "1";
    setStatus(newStatus);

    setInput((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
  };
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

  const handleLogo = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setInput((prevState) => ({
          ...prevState,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrandCreate = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(laravel_base_url + "brand", input)
      .then((res) => {
        setLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
          customClass: {
            popup: "custom-swal-zindex",
          },
        });
        navigator("/all-brand");
      })
      .catch((errors) => {
        setLoading(false);
        if (errors.response.status == 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  return (
    <>
      <PageMeta
        title="Add Brand | Dashboard"
        description="This is add brand of inventaix company"
      />
      <PageBreadcrumb pageTitle={"Add Brand"} />
      <div className="border-2 border-indigo-500 rounded-lg p-10">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold">Add Brand</h5>
          <Link
            to="/all-brand"
            className="text-indigo-800 outline-2 outline-indigo-500 p-1 px-2 rounded-md hover:bg-indigo-500 hover:text-white"
          >
            Show Brand
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
                placeholder="Enter Brand Name"
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
                placeholder="Enter Slug"
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
                placeholder="Enter Brand Serial"
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
              <button
                type="button"
                onClick={() =>
                  setInput((prev) => ({
                    ...prev,
                    status: prev.status === "1" ? "0" : "1",
                  }))
                }
                className={`flex items-center gap-2 py-1 px-4 rounded-lg shadow-sm transition
                  ${
                    input.status === "1"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }
                `}
              >
                {input.status === "1" ? (
                  <>
                    <MdToggleOn className="text-green-600 text-3xl" /> Active
                  </>
                ) : (
                  <>
                    <MdToggleOff className="text-red-600 text-3xl" /> Inactive
                  </>
                )}
              </button>
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
                placeholder="Enter Brand Description"
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
                Logo:{" "}
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleLogo}
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              />

              <div className="">
                <img
                  src={input.logo}
                  alt=""
                  className="w-50 mt-3 rounded-lg"
                />
              </div>

              {errors.logo && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning />
                  {errors.logo[0]}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleBrandCreate}
              disabled={loading}
              className={`w-1/2 flex items-center justify-center gap-2 border-2 border-indigo-500 rounded-lg py-2 px-4 text-indigo-600 font-semibold transition duration-200 ease-in-out
      ${loading ? "cursor-not-allowed" : "hover:bg-indigo-500 hover:text-white"}
    `}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Adding Brand...
                </>
              ) : (
                "Add Brand"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBrand;
