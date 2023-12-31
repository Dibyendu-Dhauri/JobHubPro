import { useState } from "react";
import jobPost from "../assets/jobPost.jpg";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function AddJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const editJob = location.state;
  // const { user } = useContext(AuthContext);
  const [newJob, setNewJob] = useState({
    companyName: editJob?.companyName || "",
    logoUrl: editJob?.logoUrl || "",
    title: editJob?.title || "",
    salary: editJob?.salary || "",
    jobType: editJob?.jobType || "",
    workPlace: editJob?.workPlace || "",
    location: editJob?.location || "",
    jobDescription: editJob?.jobDescription || "",
    about: editJob?.about || "",
    skills: editJob?.skills.join(",") || "",
    information: editJob?.information || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setNewJob({ ...newJob, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editJob) {
        await axios.put(`${"/api/jobs/edit/"}${editJob?._id}`, newJob, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      }
      if (!editJob) {
        await axios.post("/api/jobs/add", newJob, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      }
      setNewJob({
        companyName: "",
        logoUrl: "",
        title: "",
        salary: "",
        jobType: "",
        workPlace: "",
        location: "",
        jobDescription: "",
        about: "",
        skills: "",
        information: "",
      });

      if (editJob) {
        toast.success("Job is Updated", {
          position: "top-center",
        });
      }
      if (!editJob) {
        toast.success("Job is Created", {
          position: "top-center",
        });
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If it's an AxiosError, you can access response data
        toast.error(error.response?.statusText || "An error occurred", {
          position: "top-center",
        });
      } else {
        // Handle other types of errors or perform additional checks
        toast.error("Something went wrong", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <div className="flex  ">
      <div className="w-1/2 flex  flex-col my-6 mx-20">
        <div className=" ">
          <p className="text-5xl font-bold ">{"Add job description"}</p>
        </div>

        <form className="flex flex-col mt-12 " onSubmit={handleSubmit}>
          <div className="flex  ">
            <label className="text-2xl w-1/2">{"Company Name"}</label>
            <input
              type="text"
              placeholder="Enter Your company name here"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full"
              required
              id="companyName"
              value={newJob.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/2">{"Add logo URL"}</label>
            <input
              type="text"
              placeholder="Enter the link"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full"
              required
              id="logoUrl"
              value={newJob.logoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className=" text-2xl w-1/2">{"Job position"}</label>
            <input
              type="text"
              placeholder="Enter job position"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full"
              required
              id="title"
              value={newJob.title}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/2">{"Monthly salary"}</label>
            <input
              type="text"
              placeholder="Enter Amount in rupees"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full"
              required
              id="salary"
              value={newJob.salary}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/3 ">{"Job Type"}</label>
            <select
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md  "
              required
              id="jobType"
              value={newJob.jobType}
              onChange={handleChange}
            >
              <option>Select</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/3 ">{"Remote/office"}</label>
            <select
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md"
              required
              id="workPlace"
              value={newJob.workPlace}
              onChange={handleChange}
            >
              <option>Select</option>
              <option value="Remote">{"Remote"}</option>
              <option value="Office">{"Office"}</option>
            </select>
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/2">{"Location"}</label>
            <input
              type="text"
              placeholder="Enter Location"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full"
              required
              id="location"
              value={newJob.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/2">{"Job Description"}</label>
            <textarea
              placeholder="Type the job description"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full h-20 resize-none"
              required
              id="jobDescription"
              value={newJob.jobDescription}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/2">{"About Company"}</label>
            <textarea
              placeholder="Type about your company"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full h-20 resize-none"
              required
              id="about"
              value={newJob.about}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/2">{"Skills Required"}</label>
            <input
              type="text"
              placeholder="Enter the must have skills"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full"
              required
              id="skills"
              value={newJob.skills}
              onChange={handleChange}
            />
          </div>

          <div className="flex  ">
            <label className="text-2xl w-1/2">{"Information"}</label>
            <input
              type="text"
              placeholder="Enter the additional information"
              className="mb-4 border-2 border-gray-400 outline-none  p-2 rounded-md w-full"
              required
              id="information"
              value={newJob.information}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button
              className=" rounded-lg text-2xl text-gray-600 px-8 py-2 mr-4 border-gray-400 border-2"
              onClick={() => navigate("/")}
            >
              {"Cancel"}
            </button>
            <button
              className="bg-red rounded-lg text-2xl text-white px-6 py-2"
              type="submit"
            >
              {"+ Add job"}
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 relative">
        <div className="absolute   w-full h-32 flex items-end justify-center">
          <span className=" text-4xl text-white ">
            {"Recruiter add job details here"}
          </span>
        </div>
        <img
          src={jobPost}
          alt="RegisterImg"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <Toaster />
    </div>
  );
}
