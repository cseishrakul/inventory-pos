import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import axios from "axios";
import { laravel_base_url } from "../../router/http";
import Pagination from "react-js-pagination";
import { Link } from "react-router";
import { FaEdit, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import NoDataFound from "../../components/no-data/NoDataFound";
import CategoryPhotoModal from '../../components/modal/CategoryPhotoModal';
import SupplierDetailsModal from "../../components/modal/SupplierDetailsModel";

const AllSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [input, setInput] = useState({
    order_by: "created_at",
    per_page: 10,
    direction: "desc",
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getSuppliers = (pageNumber = 1) => {
    setLoading(true);
    axios
      .get(
        laravel_base_url +
          `supplier?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setSuppliers(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemsCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleSupplierDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Supplier will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(laravel_base_url + `supplier/${id}`)
          .then((res) => {
            getSuppliers();
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
        title="All Supplier | Dashboard"
        description="This is all supplier of inventaix company"
      />
      <PageBreadcrumb pageTitle={"All Supplier"} />
      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Supplier List
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
              placeholder="Enter supplier Name"
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
              <option value="phone">Phone</option>
              <option value="email">Email</option>
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
              onClick={() => getSuppliers(1)}
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
                <th className="py-3 px-4 text-left">Logo</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Created By</th>
                <th className="py-3 px-4 text-left">Date Time</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <Loader colSpan={9} />
              </tbody>
            ) : (
              <tbody>
                {Object.keys(suppliers).length > 0
                  ? suppliers.map((supplier, index) => (
                      <tr
                        key={supplier.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4">{startFrom + index}</td>
                        <td className="py-3 px-4">
                          <CategoryPhotoModal
                            photo={supplier.logo}
                            photoFull={supplier.logo_full}
                            heading={supplier.name}
                          />
                        </td>
                        <td className="py-3 px-4">{supplier.name}</td>
                        <td className="py-3 px-4">{supplier.phone}</td>
                        <td className="py-3 px-4">{supplier.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              supplier.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {supplier.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{supplier.created_by}</td>
                        <td className="py-3 px-4">
                          {supplier.updated_at === "Not Updated Yet"
                            ? supplier.created_at
                            : supplier.updated_at}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 justify-center">
                            {/* View */}
                            <button
                              onClick={() => setSelectedSupplier(supplier)}
                              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                            >
                              <FaEye />
                            </button>

                            {/* Edit */}
                            <Link to={`/edit-supplier/${supplier.id}`}>
                              <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition">
                                <FaEdit />
                              </button>
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => handleSupplierDelete(supplier.id)}
                              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : <NoDataFound colSpan={9} />}
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
            onChange={getSuppliers}
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
      {selectedSupplier && (
        <SupplierDetailsModal
          supplier={selectedSupplier}
          onClose={() => setSelectedSupplier(null)}
        />
      )}
    </>
  );
};

export default AllSupplier;
