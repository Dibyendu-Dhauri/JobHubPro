// import logo from "../assets/logo.svg";
import flag from "../assets/flag.jpg";
import rupees from "../assets/rupees.jpg";
import group from "../assets/group.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { JobsContext } from "../context/JobsContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const JobCard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { jobs, setJobs } = useContext(JobsContext)!;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/jobs");
        setJobs(res.data);
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
    fetchData();
  }, []);
  return (
    <>
      {jobs &&
        jobs.map((job) => (
          <div
            className="h-[136px] border-2 shadow-lg shadow-[rgba(255,32,32,0.25)] mx-32 my-12 py-4 px-6 flex justify-between"
            key={job._id}
          >
            <div className="flex  ">
              <div>
                <img src={job.logoUrl} alt="logo" className="w-10 h-10" />
              </div>
              <div className="flex flex-col justify-between ml-4">
                <p className="text-lg font-semibold">{job.title}</p>
                <div className="flex items-center">
                  <div className="flex items-center mr-4  flex-shrink-0">
                    <img src={group} alt="group" className="" />
                    <span className="ml-1 text-[#9C9C9C] font-[500]">
                      {"11-50"}
                    </span> 
                  </div>
                  <div className="flex items-center mr-4 flex-shrink-0 ">
                    <img src={rupees} alt="rupees" />
                    <span className="ml-1 text-[#9C9C9C] font-[500]">
                      {job.salary}
                    </span>
                  </div>
                  <div className="flex items-center mr-4 flex-shrink-0 ">
                    <img src={flag} alt="flag" />
                    <span className="ml-1 text-[#9C9C9C] font-[500]">
                      {job.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center  text-red font-[500] text-[15.1px] ">
                  <span className="mr-8">{job.workPlace}</span>
                  <span>{job.jobType}</span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col justify-between ">
              <div className="flex items-center ">
                {job.skills.map((skill, index) => (
                  <span
                    className=" bg-[#FFEEEE] rounded-sm font-[500] py-1 px-4 mx-2"
                    key={index}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="text-right">
                {/* if user login, then display edit button */}
                {user && (
                  <button
                    className="w-[154px] h-[36px] text-red border-2 mr-4 border-red rounded-lg  font-[500] text-lg"
                    onClick={() => navigate("/postjob", { state: job })}
                  >
                    {"Edit Job"}
                  </button>
                )}
                <button
                  className="w-[154px] h-[36px] bg-red rounded-lg text-white font-[500] text-lg"
                  onClick={() => navigate(`${"/details/"}${job._id}`)}
                >
                  {"View Details"}
                </button>
              </div>
            </div>
          </div>
        ))}
      <Toaster />
    </>
  );
};

export default JobCard;
