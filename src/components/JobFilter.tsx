import { useState, useEffect, useContext } from "react";
import searchIcon from "../assets/searchIcon.jpg";
import cross from "../assets/cross.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { JobsContext } from "../context/JobsContext";
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
}

const JobFilter: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchSkills, setSearchSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const { setJobs } = useContext(JobsContext)!;
  const navigate = useNavigate();
  const handleClear = () => {
    setSearchSkills([]);
    setSearchTitle("");
  };
  const handleRemoveSkills = (skill: string) => {
    const updatedSkills = searchSkills.filter((item) => item !== skill);
    setSearchSkills(updatedSkills);
  };

  useEffect(() => {
    const getAllSkills = async () => {
      try {
        const res = await axios.get("/api/jobs");
        const uniqueSkills = new Set<string>();
       const data: JobDetail[] = res.data;
        data?.forEach((job) =>
          job.skills?.forEach((skill) => uniqueSkills.add(skill))
        );
        setAllSkills(Array.from(uniqueSkills));
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
    getAllSkills();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/jobs/filter", {
          params: {
            title: searchTitle,
            skills: searchSkills.join(","),
          },
        });
        const data: JobDetail[] = res.data;
        setJobs(data);
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
  }, [searchTitle, searchSkills]);

  return (
    <div className="min-h-[254px]  mt-12 mx-32 pt-8  shadow-lg shadow-rose px-20">
      <div className="border-2 flex items-center rounded-lg   py-2 ">
        <img src={searchIcon} alt="searchIcon" className="ml-4" />
        <input
          type="text"
          placeholder="Type any job title"
          className="ml-2 w-full mr-4 border-none outline-none bg-transparent text-lg"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>
      <div className="mt-6 flex justify-between">
        <div className="flex flex-wrap ">
          <select
            className="border-2 mb-2 border-[#CECECE] outline-none h-[46px]  w-[143px] rounded-md text-center text-[#9C9C9C] "
            value={searchSkills}
            onChange={(e) => {
              !searchSkills.includes(e.target.value)
                ? setSearchSkills((prev) => [...prev, e.target.value])
                : "";
            }}
          >
            <option>{"Select"}</option>
            {allSkills &&
              allSkills.map((skill, index) => (
                <option key={index} value={skill}>
                  {skill}
                </option>
              ))}
          </select>
          {searchSkills?.map((skill, index) => (
            <div
              key={index}
              className={`mx-2 bg-[#FFEEEE] flex items-center justify-between w-[133px] h-[46px]
          `}
            >
              <p className="text-center w-full">{skill}</p>
              <img
                src={cross}
                alt="CrossIcon"
                className="bg-[#FF6B6B] p-3 "
                onClick={() => handleRemoveSkills(skill)}
              />
            </div>
          ))}
        </div>
        {/* if user not login, then show clear */}
        {!user && (
          <p
            className="text-red font-semibold  text-end mt-2  cursor-pointer"
            onClick={handleClear}
          >
            {"Clear"}
          </p>
        )}

        {/* if user log in , display add Job button */}
        {user && (
          <button
            className="bg-red rounded-lg text-2xl text-white  h-[52px] w-[182px]"
            onClick={() => navigate("/postjob")}
          >
            {"+ Add job"}
          </button>
        )}
      </div>
      {/* if user log in , display clear */}
      {user && (
        <p
          className="text-red font-semibold  text-end mt-2 w-1/2 cursor-pointer "
          onClick={handleClear}
        >
          {"Clear"}
        </p>
      )}
      <Toaster />
    </div>
  );
};

export default JobFilter;
