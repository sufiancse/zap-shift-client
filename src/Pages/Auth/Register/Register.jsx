import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const handleRegister = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // 1.store the image and get photo url
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          //   update user to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then(() => console.log("okk"))
            .catch((err) => console.log(err));
        });

        navigate(from);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-center headings pt-5">Create an Account</h1>
      <p className="description text-center">Register with ZapShift</p>
      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset ">
          {/* name field*/}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Enter Your Name"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-600">Name is required.</p>
          )}

          {/* photo */}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Photo"
          />

          {errors.photo?.type === "required" && (
            <p className="text-red-600">Photo is required.</p>
          )}

          {/* email field*/}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Enter Your Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-600">Email is required.</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/,
            })}
            className="input"
            placeholder="******"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              Password must be 6 characters or longer.
            </p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-600 ">
              Password must contain at least one uppercase letter, one lowercase
              letter, one number, and one special character.
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-primary text-secondary font-bold text-lg mt-4 max-w-xs w-full">
            Register
          </button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            state={location?.state}
            className="font-bold text-blue-600 hover:underline"
          >
            Login Now
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Register;
