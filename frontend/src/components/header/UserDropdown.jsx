import { useState } from "react";
import DropdownItem from "../ui/dropdown/DropdownItem";
import Dropdown from "../ui/dropdown/Dropdown";
import { Link } from "react-router";
import { IoIosArrowDown } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { CiSettings, CiCircleAlert } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import Swal from "sweetalert2";
import axios from "axios";
import { laravel_base_url, react_base_url } from "../../router/http";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from admin panel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(laravel_base_url + "logout")
          .then((res) => {
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("photo");
            localStorage.removeItem("phone");
            localStorage.removeItem("token");
            window.location.href = react_base_url;
          })
          .catch((errors) => {
            // handle error if needed
            console.error(errors);
          });
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User" />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">
          {" "}
          {localStorage.name != undefined ? localStorage.name : null}{" "}
        </span>
        <IoIosArrowDown
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        {/* User Info */}
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {localStorage.name != undefined ? localStorage.name : null}{" "}
          </span>
          <span className="mt-0.5 block text-theme-md text-gray-500 dark:text-gray-400">
            {localStorage.email != undefined ? localStorage.email : null}{" "}
          </span>
        </div>

        {/* Options */}
        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <FiUser className="w-5 h-5 p-1 border border-gray-400 rounded-full text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-white" />
              Edit Profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <CiSettings className="w-5 h-5 p-1 border border-gray-400 rounded-full text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-white" />
              Account Settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="a"
              to="/support"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            >
              <CiCircleAlert className="w-5 h-5 p-1 border border-gray-400 rounded-full text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-white" />
              Support
            </DropdownItem>
          </li>
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <HiOutlineLogout className="w-5 h-5 p-1 border border-gray-400 rounded-full text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-white" />
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
