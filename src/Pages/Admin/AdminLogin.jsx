import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
        <img src="logo.jpg" alt="logo" className="w-12 md:w-14" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-400">
          Selamat Datang Admin
        </h1>

        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-3">
            <CiMail />
            <input
              type="email"
              placeholder="Email account"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          <div className="w-full flex items-center bg-gray-800 p-2 rounded-xl gap-3 relative">
            <FaFingerprint />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password account"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
            {showPassword ? (
              <FaRegEye
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        </div>

        <button className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base">
          Login Goblok
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
