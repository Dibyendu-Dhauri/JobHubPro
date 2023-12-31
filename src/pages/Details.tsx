import Nav from "../components/Nav";
import dollar from "../assets/dollar.jpg";
import calender from "../assets/calender.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
interface JobDetail {
  _id: string;
  companyName: string;
  logoUrl: string;
  title: string;
  salary: string;
  jobType: string;
  workPlace: string;
  location: string;
  jobDescription: string;
  about: string;
  skills: string[];
  information: string;
  updatedAt: string;
}
export default function Details() {
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;
  const [jobDetails, setJobDetails] = useState<JobDetail | null>(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${"/api/jobs/details/"}${jobId}`);
        setJobDetails(res.data);
      } catch (error: unknown) {
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
  }, [jobId]);

  const convertTime = (updateTime: string | undefined ) => {
    if (!updateTime) {
      return null; // or handle it accordingly based on your requirements
    }
    const futureDate = new Date(updateTime);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate.getTime() - futureDate.getTime();

    // Convert milliseconds to days
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return differenceInDays;
  };

  return (
    <div className="bg-[#FFEFEF] pb-10">
      <div className="relative h-[300px] ">
        <Nav />
        <div className="bg-white right-40 left-40  absolute top-28 flex items-center justify-center  ">
          <p className=" py-4 font-semibold text-[29px] text-center ">
            {jobDetails?.title} {jobDetails?.workPlace} {jobDetails?.jobType}{" "}
            {"at"} {jobDetails?.companyName}
          </p>
        </div>
      </div>
      <div className="bg-white mx-44  p-10 ">
        <div className="text-[#999999] text-[20px] font-500 flex items-center">
          <span className="mr-4">
        {`${convertTime(jobDetails?.updatedAt)} days ago`}
          </span>
          <span className="mr-4"> {"."}</span>
          <span className="mr-4">{jobDetails?.jobType}</span>

          <img
            src={jobDetails?.logoUrl}
            alt="logo"
            className="mr-4 w-10 h-10"
          />
          <span>{jobDetails?.companyName}</span>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-[48px]">{jobDetails?.title}</p>
            {user && (
              <button
                className="w-[154px] h-[54px] text-white bg-red  mr-4  rounded-lg  font-[700] text-[21px]"
                onClick={() => navigate("/postjob", { state: jobDetails })}
              >
                {"Edit Job"}
              </button>
            )}
          </div>
          <span className="font-semibold text-lg text-red">
            {jobDetails?.location}
          </span>
        </div>
        <div className="mt-12 flex">
          <div className="flex flex-col mr-8">
            <div className="flex mb-4">
              <img src={dollar} alt="money" />
              <span className="font-400 text-[#999999] ml-2">{"Stipend"}</span>
            </div>
            <div>
              <span className="text-[#595959] font-500">
                {jobDetails?.salary}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex mb-4">
              <img src={calender} alt="calendar" />
              <span className="font-400 text-[#999999] ml-2">{"Duration"}</span>
            </div>
            <div>
              <span className="text-[#595959] font-500">
                {jobDetails?.jobType}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="font-bold text-[24px]">{"About Company"}</p>
          <p className="mt-8 text-[#595959] font-400 text-[20px]">
            {jobDetails?.about}
          </p>
        </div>

        <div className="mt-12">
          <p className="font-bold text-[24px]">{"About the  job/internship"}</p>
          <p className="mt-8 text-[#595959] font-400 text-[20px]">
            {jobDetails?.jobDescription}
          </p>
        </div>

        <div className="mt-12">
          <p className="font-bold text-[24px]">{"Skill(s) required"}</p>
          <div className="mt-8 text-[#595959] font-[400] text-[24px]">
            {jobDetails?.skills?.map((skill, index) => (
              <span
                className="mr-2 bg-[#FFEEEE]  px-4 py-2 rounded-full text-center"
                key={index}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <p className="font-bold text-[24px]">{"Additional Information"}</p>
          <p className="mt-8 text-[#595959] font-400 text-[20px]">
            {jobDetails?.information}
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
