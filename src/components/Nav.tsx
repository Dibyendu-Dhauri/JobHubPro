import Rectangle2 from "../assets/Rectangle 2.png";
import Rectangle3 from "../assets/Rectangle 3.png";
import Rectangle4 from "../assets/Rectangle 4.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import avatar from "../assets/avatar.jpg";

const Nav = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="bg-red rounded-b-[62px] h-[139px] relative flex items-center ">
      <img src={Rectangle2} alt="rectangle2" className="absolute bottom-0" />
      <img
        src={Rectangle3}
        alt="rectangle3"
        className="absolute top-0 left-[509px] "
      />
      <img src={Rectangle4} alt="rectangle4" className="absolute right-20" />
      <p className=" text-4xl text-white font-semibold absolute left-[79px]">
        <NavLink to={"/"}>{"Jobfinder"}</NavLink>
      </p>
      <div className=" absolute right-20">
        {user ? (
          <>
            <div className="flex">
              <span
                className="text-white font-semibold text-[23px] mr-6 underline"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                {"Logout"}
              </span>
              <span className="text-white font-semibold text-[23px]">
                {"Hello! Recruiter"}
              </span>
              <img
                src={avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full ml-4"
              />
            </div>
          </>
        ) : (
          <>
            <button className="mr-4 border-2 py-1 px-6 rounded-lg text-lg text-white font-semibold">
              <NavLink to={"/login"}>{"Login"}</NavLink>
            </button>
            <button className="bg-white text-red  py-1 px-4 font-semibold rounded-lg text-lg ">
              <NavLink to={"/register"}>{"Register"}</NavLink>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
