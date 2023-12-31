import { useState, useContext } from "react";
import authImg from "../assets/authImg.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("user is logedin", {
        position: "top-center",
        // duration: 5000,
      });
      // Set timeout for navigation
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // If it's an AxiosError, you can access response data
        toast.error(error.response?.data?.message, {
          position: "top-center",
        });
      } else {
        // Handle other types of errors or perform additional checks
        toast.error("An unknown error occurred", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="flex   ">
      <div className="w-1/2 flex  flex-col my-24 mx-20">
        <div className=" ">
          <p className="text-5xl font-bold ">{"Already have an account?"}</p>
          <p className="text-2xl font-semibold mt-4">
            Your personal job finder is here
          </p>
        </div>
        <div className="flex flex-col">
          <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md"
              value={loginData.email}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <button
              className="mt-6 w-[277px] h-[63px] bg-red rounded-lg text-2xl font-bold text-white"
              type="submit"
            >
              {"Sign IN"}
            </button>
          </form>
        </div>
        <div className="mt-6 flex">
          <p className="text-gray-600">{"Don’t have an account?"}</p>
          <span className="ml-2 underline font-semibold cursor-pointer">
            <Link to={"/register"}>{"Sign Up"}</Link>
          </span>
        </div>
      </div>
      <div className="w-1/2 relative">
        <div className="absolute   w-full h-32 flex items-end justify-center">
          <span className=" text-4xl text-white ">
            {"Your Personal Job Finder"}
          </span>
        </div>
        <img
          src={authImg}
          alt="authImg"
          // loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <Toaster />
    </div>
  );
}
