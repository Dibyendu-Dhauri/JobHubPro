import { ReactNode, createContext, useState } from "react";

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

interface JobsContextType {
  jobs: JobDetail[];
  setJobs: React.Dispatch<React.SetStateAction<JobDetail[]>>;
}

export const JobsContext = createContext<JobsContextType | undefined>(undefined);

interface JobsContextProviderProps {
  children: ReactNode;
}
export const JobsContextProvider: React.FC<JobsContextProviderProps> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<JobDetail[]>([]);

  const contextValue: JobsContextType = {
    jobs,
    setJobs,
  };

  return (
    <JobsContext.Provider value={contextValue}>{children}</JobsContext.Provider>
  );
};
