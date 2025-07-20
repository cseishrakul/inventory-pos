import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import Label from "../form/Label";
import axios from "axios";
import { CiWarning } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";
import { laravel_base_url, react_base_url } from "../../router/http";


export default function SignInForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(input);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(laravel_base_url + 'login', input)
      .then((res) => {
        // console.log(res.data);
        localStorage.email = res.data.email;
        localStorage.name = res.data.name;
        localStorage.photo = res.data.photo;
        localStorage.phone = res.data.phone;
        localStorage.token = res.data.token;
        window.location.href = react_base_url;
      })
      .catch((errors) => {
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors || {});
          const message = errors.response.data.message;
          if (message === "The provided creadentials are incorrect!") {
            setGeneralError(message);
            setErrors("");
          } else {
            setGeneralError("");
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <IoChevronBack className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
              {/* Google Icon */}
              <FaGoogle />
              Sign in with Google
            </button>
            <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-5 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
              {/* Facebook) Icon */}
              <FaFacebook />
              Sign in with Facebook
            </button>
          </div>

          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                Or
              </span>
            </div>
          </div>
          {generalError && (
            <div className="mb-4 p-3 rounded-md bg-red-100 border border-red-300 text-red-700 text-sm font-medium flex items-center gap-2">
              <CiWarning className="text-lg" />
              {generalError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <input
                  type="email"
                  name="email"
                  placeholder="info@gmail.com"
                  className="w-full px-4 py-2 text-sm border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                  value={input.email}
                  onChange={handleInput}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                    <CiWarning />
                    {errors.email[0]}
                  </p>
                )}
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={input.password}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 text-sm border rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    onChange={handleInput}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <FaEye className="text-gray-500 dark:text-gray-400 size-5" />
                    ) : (
                      <FaEyeSlash className="text-gray-500 dark:text-gray-400 size-5" />
                    )}
                  </span>
                </div>

                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1">
                    <CiWarning />
                    {errors.password[0]}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    id="keep-logged-in"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="w-4 h-4 text-brand-500 border-gray-300 rounded dark:bg-gray-900 dark:border-gray-700 focus:ring-brand-500"
                  />
                  <label
                    htmlFor="keep-logged-in"
                    className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400"
                  >
                    Keep me logged in
                  </label>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg transition flex justify-center items-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
