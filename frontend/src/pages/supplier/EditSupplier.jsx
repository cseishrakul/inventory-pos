import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import { laravel_base_url, react_base_url } from "../../router/http";
import { FaSpinner } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import Swal from "sweetalert2";

import { MdToggleOn, MdToggleOff } from "react-icons/md";

const EditSupplier = ({ value, onChange }) => {
  const params = useParams();
  const [input, setInput] = useState({ status: "0" });
  const [status, setStatus] = useState("0");
  const [errors, setErrors] = useState([]);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const getSupplier = () => {
    axios.get(laravel_base_url + `supplier/${params.id}`).then((res) => {
      setInput(res.data.data);
      getDistricts(res.data.data.division_id);
      getAreas(res.data.data.district_id);
    });
  };

  const getDivisions = () => {
    axios.get(laravel_base_url + "divisions").then((res) => {
      setDivisions(res.data);
    });
  };
  const getDistricts = (division_id) => {
    axios.get(laravel_base_url + `districts/${division_id}`).then((res) => {
      setDistricts(res.data);
    });
  };
  const getAreas = (district_id) => {
    axios.get(laravel_base_url + `areas/${district_id}`).then((res) => {
      setAreas(res.data);
    });
  };

  const handleToggle = () => {
    const newStatus = status === "1" ? "0" : "1";
    setStatus(newStatus);

    setInput((prevState) => ({
      ...prevState,
      status: newStatus,
    }));
  };
  const handleInput = (e) => {
    if (e.target.name === "division_id") {
      setDistricts([]);
      setAreas([]);
      let division_id = parseInt(e.target.value);
      if (!isNaN(division_id)) {
        getDistricts(division_id);
      }
    } else if (e.target.name === "district_id") {
      setAreas([]);
      let district_id = parseInt(e.target.value);
      if (!isNaN(district_id)) {
        getAreas(district_id);
      }
      getAreas(e.target.value);
    }
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

  const handleSupplierUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(laravel_base_url + `supplier/${params.id}`, input)
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
        if (res.data.flag == undefined) {
          navigator("/all-supplier");
        }
      })
      .catch((errors) => {
        setLoading(false);
        if (errors.response.status == 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  useEffect(() => {
    getDivisions();
    getSupplier();
  }, []);

  return (
    <>
      <PageMeta
        title="Edit Supplier | Dashboard"
        details="Edit supplier with full details"
      />
      <PageBreadcrumb pageTitle={"Edit Supplier"} />

      <div className="border-2 border-indigo-500 rounded-lg p-10 space-y-6">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-semibold">Edit Supplier</h5>
          <Link
            to="/all-supplier"
            className="text-indigo-800 outline-2 outline-indigo-500 p-1 px-2 rounded-md hover:bg-indigo-500 hover:text-white"
          >
            Show Suppliers
          </Link>
        </div>
        <hr className="border-indigo-300" />

        <form className="space-y-6">
          {/* Company Name */}
          <div className="flex gap-10">
            <div className="mt-5 w-1/3">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Company Name:
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInput}
                placeholder="Enter Company Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning /> {errors.name[0]}
                </p>
              )}
            </div>

            <div className="mt-5 w-1/3">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Phone:
              </label>
              <input
                type="text"
                name="phone"
                value={input.phone}
                onChange={handleInput}
                placeholder="Enter Phone Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning /> {errors.phone[0]}
                </p>
              )}
            </div>

            <div className="mt-5 w-1/3">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleInput}
                placeholder="Enter Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning /> {errors.email[0]}
                </p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div className="flex flex-col gap-5">
            <label className="block text-md font-medium text-gray-700">
              Address:
            </label>

            {/* House/Road/Village */}
            <input
              type="text"
              name="address"
              value={input.address}
              onChange={handleInput}
              placeholder="House / Road / Village"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                <CiWarning /> {errors.address[0]}
              </p>
            )}

            {/* Division, City, Area */}
            <div className="flex gap-5">
              <select
                name="division_id"
                value={input.division_id}
                onChange={handleInput}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Division</option>
                {divisions.map((division, i) => (
                  <option key={i} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>

              <select
                name="district_id"
                value={input.district_id}
                onChange={handleInput}
                disabled={Object.keys(districts).length < 1}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-indigo-500
             disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <option value="">Select City</option>
                {districts.map((district, i) => (
                  <option key={i} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>

              <select
                name="area_id"
                value={String(input.area_id || "")}
                onChange={handleInput}
                disabled={areas.length < 1}
                className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-indigo-500
             disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <option value="">Select Area</option>
                {areas.map((area) => (
                  <option key={area.value} value={String(area.value)}>
                    {area.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Landmark */}
            <label className="block text-md font-medium text-gray-700 mb-1">
              Landmark:
            </label>
            <input
              type="text"
              name="landmark"
              value={input.landmark}
              onChange={handleInput}
              placeholder="Landmark / Nearby Point"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.landmark && (
              <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                <CiWarning /> {errors.landmark[0]}
              </p>
            )}
          </div>

          {/* details and Logo */}
          <div className="flex gap-10">
            <div className="w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Details:
              </label>
              <textarea
                name="details"
                value={input.details}
                onChange={handleInput}
                placeholder="Enter Supplier Details"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.details && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning /> {errors.details[0]}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Logo:
              </label>
              <input
                type="file"
                name="logo"
                onChange={handleLogo}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              />
              {input.display_logo && (
                <img
                  src={input.display_logo}
                  alt="Logo"
                  className="w-50 mt-3 rounded-lg"
                />
              )}
              {errors.logo && (
                <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                  <CiWarning /> {errors.logo[0]}
                </p>
              )}
            </div>
            {/* Status */}
            <div className="w-1/2">
              <label className="block text-md font-medium text-gray-700 mb-1">
                Status:
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
              }`}
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

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSupplierUpdate}
              disabled={loading}
              className={`w-1/2 flex items-center justify-center gap-2 border-2 border-indigo-500 rounded-lg py-2 px-4 text-indigo-600 font-semibold transition duration-200 ease-in-out ${
                loading
                  ? "cursor-not-allowed"
                  : "hover:bg-indigo-500 hover:text-white"
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Updating Supplier...
                </>
              ) : (
                "Update Supplier"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSupplier;
