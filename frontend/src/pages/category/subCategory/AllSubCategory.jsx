import React, { useEffect, useState } from "react";
import axios from "axios";
import { laravel_base_url } from "../../../router/http";
import CategoryPhotoModal from "../../../components/modal/CategoryPhotoModal";
import CategoryDetailsModel from "../../../components/modal/CategoryDetailsModel";
import Pagination from "react-js-pagination";
import { Link } from "react-router";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../../components/loader/Loader";
import NoDataFound from "../../../components/no-data/NoDataFound";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

const AllSubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [input, setInput] = useState({
    order_by: "serial",
    per_page: 10,
    direction: "asc",
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getSubCategories = (pageNumber = 1) => {
    setLoading(true);
    axios
      .get(
        laravel_base_url +
          `sub-category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setSubCategories(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemsCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSubCategories();
  }, []);

  const handleSubCategoryDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Sub Category will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(laravel_base_url + `sub-category/${id}`)
          .then((res) => {
            getSubCategories();
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

  return (
    <>
      <PageMeta
        title="All Sub Category | Dashboard"
        description="This is all subcategory of inventaix company"
      />
      <PageBreadcrumb pageTitle={"All Sub Category"} />
      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
         Sub Category List
        </h2>

        {/* Search + Filters */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Search
            </label>
            <input
              type="search"
              name="search"
              value={input.search}
              onChange={handleInput}
              placeholder="Enter Category Name"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Order By
            </label>
            <select
              name="order_by"
              value={input.order_by}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="name">Name</option>
              <option value="created_at">Created At</option>
              <option value="updated_at">Updated At</option>
              <option value="serial">Serial</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Direction
            </label>
            <select
              name="direction"
              value={input.direction}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Per Page
            </label>
            <select
              name="per_page"
              value={input.per_page}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => getSubCategories(1)}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition disabled:opacity-50"
            >
              <FaSearch />
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-md">
              <tr>
                <th className="py-3 px-4 text-left">SL</th>
                <th className="py-3 px-4 text-left">Photo</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Created By</th>
                <th className="py-3 px-4 text-left">Date Time</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <Loader colSpan={7} />
              </tbody>
            ) : (
              <tbody>
                {Object.keys(subCategories).length > 0
                  ? subCategories.map((category, index) => (
                      <tr
                        key={category.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4">{startFrom + index}</td>
                        <td className="py-3 px-4">
                          <CategoryPhotoModal
                            photo={category.photo}
                            photoFull={category.photo_full}
                            heading={category.name}
                          />
                        </td>
                        <td className="py-3 px-4">{category.name}</td>
                        <td className="py-3 px-4">{category.category_name}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              category.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {category.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{category.created_by}</td>
                        <td className="py-3 px-4">
                          {category.updated_at === "Not Updated Yet"
                            ? category.created_at
                            : category.updated_at}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 justify-center">
                            {/* View */}
                            <button
                              onClick={() => setSelectedSubCategory(category)}
                              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                            >
                              <FaEye />
                            </button>

                            {/* Edit */}
                            <Link to={`/edit-sub-category/${category.id}`}>
                              <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition">
                                <FaEdit />
                              </button>
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => handleSubCategoryDelete(category.id)}
                              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : <NoDataFound />}
              </tbody>
            )}
          </table>
        </div>

        {/* Pagination */}
        <nav className="mt-6 flex justify-center">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            onChange={getSubCategories}
            firstPageText="First"
            prevPageText="Previous"
            nextPageText="Next"
            lastPageText="Last"
            itemClass="inline-block mx-1"
            linkClass="px-3 py-1 border rounded hover:bg-gray-200"
            activeClass="bg-indigo-600 text-white border-indigo-600"
          />
        </nav>
      </div>

      {/* Details modal */}
      {selectedSubCategory && (
        <CategoryDetailsModel
          category={selectedSubCategory}
          onClose={() => setSelectedSubCategory(null)}
        />
      )}
    </>
  );
};

export default AllSubCategory;
