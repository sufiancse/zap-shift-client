import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then(() => navigate(from))
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-center headings pt-5">Welcome Back</h1>
      <p className="description text-center">Login with ZapShift</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          {/* email field*/}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-600">Email is required</p>
          )}

          {/* password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
            Value={"aA@1234"}
          />

          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              Password must be 6 characters or longer
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn bg-primary font-bold text-lg text-secondary mt-4">
            Login
          </button>
        </fieldset>
        <p>
          Don't have an account?{" "}
          <Link
            to={"/register"}
            state={location?.state}
            className="font-bold text-blue-600 hover:underline"
          >
            Register Now
          </Link>
        </p>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Login;
