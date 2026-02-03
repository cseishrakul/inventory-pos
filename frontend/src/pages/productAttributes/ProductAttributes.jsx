import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  FaEdit,
  FaEye,
  FaPlusCircle,
  FaPlusSquare,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import { CiWarning } from "react-icons/ci";
import axios from "axios";
import Swal from "sweetalert2";
import { laravel_base_url } from "../../router/http";
import { MdToggleOff, MdToggleOn } from "react-icons/md";
import NoDataFound from "../../components/no-data/NoDataFound";
import Loader from "../../components/loader/Loader";

const ProductAttributes = () => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({ name: "", status: "1" });
  const [errors, setErrors] = useState({});
  const [attributes, setAttributes] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [modalTitle, setModalTitle] = useState("Add");
  const [valueModalTitle, setValueModalTitle] = useState("Add");
  const [showValueModal, setShowValueModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modelValue, setModalValue] = useState([]);
  const [modelValueShow, setModelValueShow] = useState(false);

  /* ================= INPUT HANDLER ================= */
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /* ================= FETCH ATTRIBUTES ================= */
  const getAttributes = () => {
    setIsFetching(true);

    axios
      .get(laravel_base_url + "attribute")
      .then((res) => {
        setAttributes(res.data.data || []);
      })
      .catch(() => setAttributes([]))
      .finally(() => setIsFetching(false));
  };

  /* ================= CREATE ================= */
  const handleAttributeCreate = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrors({});

    axios
      .post(laravel_base_url + "attribute", input)
      .then((res) => {
        closeModal();
        getAttributes();

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.msg || "Attribute Added",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal-zindex",
          },
        });
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        }
      })
      .finally(() => setIsSaving(false));
  };

  /* ================= UPDATE ================= */
  const handleAttributeUpdate = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrors({});

    axios
      .put(`${laravel_base_url}attribute/${input.id}`, input)
      .then((res) => {
        closeModal();
        getAttributes();

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.msg || "Attribute Updated",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal-zindex",
          },
        });
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        }
      })
      .finally(() => setIsSaving(false));
  };

  /* ================= MODAL HANDLER ================= */
  const handleModal = (attribute = null) => {
    if (attribute) {
      setModalTitle("Update");
      setIsEditMode(true);
      setInput({
        id: attribute.id,
        name: attribute.name,
        status: attribute.status === "Active" ? "1" : "0",
      });
    } else {
      setModalTitle("Add");
      setIsEditMode(false);
      setInput({ name: "", status: "1" });
    }

    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setInput({ name: "", status: "1" });
    setErrors({});
  };

  /* ================= DELETE ================= */
  const handleAttributeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This attribute will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${laravel_base_url}attribute/${id}`)
          .then((res) => {
            getAttributes();

            Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: res.data.msg || "Attribute deleted",
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                popup: "custom-swal-zindex",
              },
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Something went wrong while deleting.",
            });
          });
      }
    });
  };

  const handleValueCreateModal = (id) => {
    setValueModalTitle("Add");
    setIsEditMode(false);
    setShowValueModal(true);
    setInput({ status: 1, attribute_id: id });
  };

  const handleAttributeValueCreate = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setErrors({});

    axios
      .post(laravel_base_url + "attribute-value", input)
      .then((res) => {
        setShowValueModal(false);
        setInput({ name: "", status: "1" });
        getAttributes();

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: res.data.msg || "Attribute Value Added",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "custom-swal-zindex",
          },
        });
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors);
        }
      })
      .finally(() => setIsSaving(false));
  };

  const handleValueDetailModal = (value) => {
    setModalValue(value);
    setModelValueShow(true);
  };

  const handleValueDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Value will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(laravel_base_url + `attribute-value/${id}`)
          .then((res) => {
            getAttributes();
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
          })
          .catch((errors) => {
            // handle error if needed
            console.error(errors);
          });
      }
    });
  };

  const handleValueEditModal = (value) => {
    setIsEditMode(true);
    setModelValueShow(true);
    setValueModalTitle("Update");
    setInput({ status: value.status_original, name: value.name, id: value.id });
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    getAttributes();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <>
      <PageMeta
        title="Product Attributes | Dashboard"
        description="This is Profile Dashboard page"
      />
      <PageBreadcrumb pageTitle="Product Attributes" />

      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Product Attributes</h2>

          <button
            onClick={() => handleModal()}
            className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white"
          >
            <FaPlusCircle /> Add Attribute
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">SL</th>
                <th className="p-3">Name</th>
                <th className="p-3">Value</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created By</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {isFetching ? (
              <tbody>
                <Loader colSpan={4} />
              </tbody>
            ) : (
              <tbody>
                {attributes.length ? (
                  attributes.map((attr, i) => (
                    <tr key={attr.id} className="border-t">
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3">{attr.name}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {attr.value?.map((value, valIndex) => (
                            <div
                              key={valIndex}
                              className="group relative
                   px-3 py-1 rounded-full text-xs font-medium
                   bg-indigo-100 text-indigo-700
                   transition-colors duration-300 ease-in-out
                   hover:bg-indigo-200"
                            >
                              {value.name}
                              <div
                                className="absolute -top-2 -right-2 flex gap-1
                     opacity-0 scale-90
                     transition-all duration-300 ease-in-out
                     group-hover:opacity-100
                     group-hover:scale-100"
                              >
                                <button
                                  onClick={() => handleValueDetailModal(value)}
                                  className="p-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                                >
                                  <FaEye size={10} />
                                </button>

                                <button
                                  onClick={() => handleValueEditModal(value)}
                                  className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                                >
                                  <FaEdit size={10} />
                                </button>

                                <button
                                  onClick={() => handleValueDelete(value.id)}
                                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                                >
                                  <FaTrash size={10} />
                                </button>
                              </div>
                            </div>
                          ))}

                          <button
                            onClick={() => handleValueCreateModal(attr.id)}
                            className="flex items-center justify-center
                 w-7 h-7 rounded-full
                 bg-green-600 text-white
                 transition-all duration-300 ease-in-out
                 hover:bg-green-700 hover:scale-105"
                            title="Add Value"
                          >
                            <FaPlusSquare size={14} />
                          </button>
                        </div>
                      </td>

                      <td className="p-3">{attr.status}</td>
                      <td className="p-3">{attr.created_by}</td>
                      <td className="p-3 flex gap-3 items-center justify-center">
                        <button
                          onClick={() => handleModal(attr)}
                          className="p-2 bg-green-100 text-green-600 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleAttributeDelete(attr.id)}
                          className="p-2 bg-red-100 text-red-600 rounded"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NoDataFound />
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

          <div className="relative bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              {modalTitle} Attribute
            </h3>

            <form
              onSubmit={
                isEditMode ? handleAttributeUpdate : handleAttributeCreate
              }
            >
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInput}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg
                             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex gap-1">
                    <CiWarning /> {errors.name[0]}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={() =>
                    setInput((p) => ({
                      ...p,
                      status: p.status === "1" ? "0" : "1",
                    }))
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded ${
                    input.status === "1"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {input.status === "1" ? (
                    <MdToggleOn size={30} />
                  ) : (
                    <MdToggleOff size={30} />
                  )}
                  {input.status === "1" ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-indigo-600 text-white rounded"
                >
                  {isSaving ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    `${modalTitle}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ================= Attribute Value MODAL ================= */}
      {showValueModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

          <div className="relative bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">
              {valueModalTitle} Attribute Value
            </h3>

            <form
              onSubmit={
                isEditMode ? handleValueEditModal : handleAttributeValueCreate
              }
            >
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInput}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg
                             focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex gap-1">
                    <CiWarning /> {errors.name[0]}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={() =>
                    setInput((p) => ({
                      ...p,
                      status: p.status === "1" ? "0" : "1",
                    }))
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                    input.status === "1"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {input.status === "1" ? (
                    <MdToggleOn size={30} />
                  ) : (
                    <MdToggleOff size={30} />
                  )}
                  {input.status === "1" ? "Active" : "Inactive"}
                </button>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowValueModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {isSaving ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    `${valueModalTitle}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= Attribute Value MODAL Show ================= */}
      {modelValueShow && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />

          <div className="relative bg-white w-full max-w-md rounded-xl p-6">
            <div className="flex justify-between">
              {" "}
              <h3 className="text-lg font-semibold mb-4">Value Details</h3>
              <button
                type="button"
                onClick={() => setModelValueShow(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                <GiCrossMark />
              </button>
            </div>
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
              <tbody>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600 w-1/3">
                    ID
                  </th>
                  <td className="px-4 py-2 text-gray-800">{modelValue.id}</td>
                </tr>

                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Name
                  </th>
                  <td className="px-4 py-2 text-gray-800">{modelValue.name}</td>
                </tr>

                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Status
                  </th>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
            ${
              modelValue.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
                    >
                      {modelValue.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Created At
                  </th>
                  <td className="px-4 py-2 text-gray-800">
                    {modelValue.created_at}
                  </td>
                </tr>

                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-600">
                    Updated At
                  </th>
                  <td className="px-4 py-2 text-gray-800">
                    {modelValue.updated_at}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductAttributes;
