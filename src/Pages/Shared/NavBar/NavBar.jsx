import { Link, NavLink } from "react-router";
import Logo from "../../../Components/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import { FaArrowRight } from "react-icons/fa";

const NavBar = () => {
  const { user, loading, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then()
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send a Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/be-a-rider"}>Be a Rider</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage Areas</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm rounded-2xl mt-3 mb-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <span className="loading loading-ring loading-xl"></span>
          ) : user ? (
            <button onClick={handleLogout} className="btn">
              Logout{" "}
            </button>
          ) : (
            <div className="">
              <Link to={"/login"} className="btn">
                Sign In
              </Link>
            </div>
          )}
          <Link
            to={"/be-a-rider"}
            className="btn bg-primary text-secondary ml-3"
          >
            Be a Rider
          </Link>
          <Link className="btn-arrow">
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
