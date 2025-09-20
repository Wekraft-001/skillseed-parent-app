import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Star, Rocket } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import Logo from "../assets/logo.svg";

const Signup = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const [register, setRegister] = useState(initialValues);
  const { firstName, lastName, email, phoneNumber, password } = register;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleRegistration = () => {
    setLoading(true);
    setErrorMessage(null);
    const url = `${apiURL}/auth/register`;
    const payload = {
      ...register,
      role: "parent",
    };
    axios
      .post(url, payload)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Registeration Successful!");
          setRegister(initialValues);
          navigate("/signin");
        }
        console.log(response, "response from creating data");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(`There was an error creating this profile:`, error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiURL}/auth/google`;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <ToastContainer />
      <div className="min-h-[100vh] bg-[#F5F7FA] flex items-center justify-center p-6">
        <div
          id="signup-container"
          className="bg-white rounded-2xl shadow-lg w-full max-w-[500px] p-8 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#FFC107] rounded-full opacity-10"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#1A73E8] rounded-full opacity-10"></div>

          {/* Header */}
          <div id="signup-header" className="text-center mb-8">
            <img
              src={Logo}
              alt="Welcome"
              className="w-[100px] h-[100px] rounded-full mx-auto"
            />
            <h1 className="text-2xl font-bold text-[#0A1F44]">
              Join SkillSeed
            </h1>
            <p className="text-gray-500 mt-2">
              Create an account to start your child's journey
            </p>
          </div>

          {/* Signup Form */}
          <form
            id="signup-form"
            className="space-y-6"
            onSubmit={handleSubmit(handleRegistration)}
          >
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] focus:ring-opacity-20 outline-none transition"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] focus:ring-opacity-20 outline-none transition"
                  placeholder="Enter your last name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] focus:ring-opacity-20 outline-none transition"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Phone Number
              </label>
              <PhoneInput
                country={"rw"}
                value={phoneNumber}
                onChange={(phone) =>
                  setRegister({ ...register, phoneNumber: phone })
                } // ✅ capture the value
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: false,
                }}
                inputClass="!w-full !pl-16 !pr-4 !py-3 !rounded-full !border !border-gray-200 !focus:border-[#1A73E8] !focus:ring-2 !focus:ring-[#1A73E8] !focus:ring-opacity-20 !outline-none"
                containerClass="!w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#0A1F44]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-[#1A73E8] focus:ring-2 focus:ring-[#1A73E8] focus:ring-opacity-20 outline-none transition"
                  placeholder="Create a password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute top-0 inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-sm leading-5 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <IoIosEye size={25} />
                  ) : (
                    <IoIosEyeOff size={25} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A73E8] hover:bg-blue-600 text-white py-3 rounded-full transition duration-200 flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Rocket className="w-5 h-5" />
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center my-4">OR</div>
          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 py-3 rounded-full transition duration-200 flex items-center justify-center gap-3 cursor-pointer"
          >
            <FcGoogle size={24} />
            Sign up with Google
          </button>
          {/* Additional Options */}
          <div id="signup-footer" className="mt-6 text-center">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#1A73E8] hover:underline cursor-pointer"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute top-20 right-4 text-[#FFC107] text-xl">
            <Star className="w-5 h-5" />
          </div>
          <div className="absolute bottom-12 left-4 text-[#1A73E8] text-xl">
            <Rocket className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
