import { Link } from "react-router";
import errorIcon from "../../assets/error404.png";

const Error404 = () => {
  return (
    <div className="bg-white p-10 rounded-2xl  mb-10 ">
      <img src={errorIcon} alt="Error 404 Icon" className="mx-auto" />
      <div className="text-center">
        <Link to={'/'} className="btn btn-primary w-fit">Go Home</Link>
      </div>
    </div>
  );
};

export default Error404;
