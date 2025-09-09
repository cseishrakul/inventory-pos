import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { laravel_base_url } from "../../router/http";
import { FaSpinner } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import Swal from "sweetalert2";

const EditBrand = () => {
  const params = useParams();
  const navigator = useNavigate();

  const [input, setInput] = useState({
    name: "",
    slug: "",
    serial: "",
    description: "",
    image: "",
    status: "0",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value.replaceAll(" ", "-").toLowerCase();
      setInput((prevState) => ({
        ...prevState,
        name: e.target.value,
        slug: slug,
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // ✅ Handle toggle for status
  const handleToggle = () => {
    setInput((prevState) => ({
      ...prevState,
      status: prevState.status === "1" ? "0" : "1",
    }));
  };

  // ✅ Handle image upload preview
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

  // ✅ Get category data
  const getBrand = () => {
    axios.get(laravel_base_url + `brand/${params.id}`).then((res) => {
      setInput({
        ...res.data.data,
        status: res.data.data.status?.toString() || "0",
      });
    });
  };

  // ✅ Submit update
  const handleBrandUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(laravel_base_url + `brand/${params.id}`, input)
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
        if (errors.response?.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <>
      <PageMeta
        title="Edit Brand | Dashboard"
        description="This is Edit Brand of inventaix company"
      />
      <PageBreadcrumb pageTitle={"Edit Brand"} />

      <div className="border-2 border-indigo-500 rounded-lg p-10">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold">Edit Brand</h5>
          <Link
            to="/all-brand"
            className="text-indigo-800 outline-2 outline-indigo-500 p-1 px-2 rounded-md hover:bg-indigo-500 hover:text-white"
          >
            Show Brand
          </Link>
        </div>
        <hr className="mt-5 border border-indigo-300" />

        <form onSubmit={handleBrandUpdate}>
          <div className="flex gap-10">
            {/* Name */}
            <div className="my-5 w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Name:
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
                  <CiWarning /> {errors.name[0]}
                </p>
              )}
            </div>

            {/* Slug */}
            <div className="my-5 w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Slug:
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
                  <CiWarning /> {errors.slug[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-10">
            {/* Serial */}
            <div className="mb-5 w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Serial:
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
                  <CiWarning /> {errors.serial[0]}
                </p>
              )}
            </div>

            {/* Status Toggle */}
            <div className="mb-5 w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-2">
                Status:
              </label>
              <button
                type="button"
                onClick={handleToggle}
                className={`flex items-center gap-2 px-4 py-2 w-full rounded-lg shadow-sm border transition
                  ${
                    input.status === "1"
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-red-100 text-red-700 border-red-300"
                  }
                `}
              >
                {input.status === "1" ? (
                  <>
                    <MdToggleOn className="text-2xl" /> Active
                  </>
                ) : (
                  <>
                    <MdToggleOff className="text-2xl" /> Inactive
                  </>
                )}
              </button>
              {errors.status && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning /> {errors.status[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-10">
            {/* Description */}
            <div className="mb-5 w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Description:
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
                  <CiWarning /> {errors.description[0]}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="mb-5 w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Logo:
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleLogo}
                className="w-full px-4 py-2 border border-grey-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              />
              {input.logo || input.logo_preview ? (
                <div>
                  <img
                    src={input.logo ? input.logo : input.logo_preview}
                    alt="preview"
                    className="w-50 mt-3 rounded-lg"
                  />
                </div>
              ) : null}
              {errors.logo && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning /> {errors.logo[0]}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 flex items-center justify-center gap-2 border-2 border-indigo-500 rounded-lg py-2 px-4 text-indigo-600 font-semibold transition duration-200 ease-in-out
                ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:bg-indigo-500 hover:text-white"
                }
              `}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Updating Brand...
                </>
              ) : (
                "Update Brand"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBrand;
