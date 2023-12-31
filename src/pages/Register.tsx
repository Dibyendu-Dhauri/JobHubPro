import { useState, useContext } from "react";
import authImg from "../assets/authImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", registerData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("User has been created.",{
        position: "top-center"
      })
      setTimeout(()=>{
        navigate("/");
      },1000)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // If it's an AxiosError, you can access response data
        toast.error(error.response?.data?.message || "An error occurred", {
          position: "top-center",
        });
      } else {
        // Handle other types of errors or perform additional checks
        toast.error("An Unknown error occurred", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="flex   ">
      <div className="w-1/2 flex  flex-col mt-24 mx-20">
        <div className=" ">
          <p className="text-5xl font-bold ">Create an account</p>
          <p className="text-2xl font-semibold mt-4">
            Your personal job finder is here
          </p>
        </div>
        <div className="flex flex-col">
          <form className="flex flex-col mt-12" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md"
              required
              value={registerData.userName}
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  userName: e.target.value,
                }))
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md"
              required
              value={registerData.email}
              onChange={(e) =>
                setRegisterData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <input
              type="tel"
              placeholder="Mobile"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md"
              required
              value={registerData.mobile}
              onChange={(e) =>
                setRegisterData((prev) => ({ ...prev, mobile: e.target.value }))
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md"
              required
              value={registerData.password}
              onChange={(e) =>
                setRegisterData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />

            <div className="flex mt-4">
              <input type="checkbox" required />
              <p className="text-gray-600 ml-2">
                By creating an account, I agree to our terms of use and privacy
                policy
              </p>
            </div>

            <div className="mt-6">
              <button
                className="bg-red rounded-lg text-2xl text-white px-6 py-2"
                type="submit"
              >
                {"Create Account"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 flex">
          <p className="text-gray-600">{"Already have an account?"}</p>
          <span className="ml-2 underline font-semibold">
            <Link to={"/login"}>{"Sign In"}</Link>
          </span>
        </div>
      </div>
      <div className="w-1/2 relative ">
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
