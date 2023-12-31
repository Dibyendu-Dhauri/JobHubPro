import JobCard from "../components/JobCard";
import JobFilter from "../components/JobFilter";
import Nav from "../components/Nav";
const Home = () => {
  return (
    <>
      <Nav />
      <JobFilter />
      <JobCard />
    </>
  );
};

export default Home;
