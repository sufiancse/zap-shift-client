import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import deliveryImg from "../../assets/agent-pending.png";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    // watch,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [serviceCenter, setServiceCenter] = useState([]);

  useEffect(() => {
    fetch("./serviceCenter.json")
      .then((data) => data.json())
      .then((data) => setServiceCenter(data));
  }, []);

  const regionsDuplicate = serviceCenter.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];
  // const senderRegion = watch("senderRegion");

  // explore useMemo useCallback
  const riderRegion = useWatch({ control, name: "region" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenter.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);

    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Parcel application has been submitted. Please wait patiently!",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="bg-white p-10 rounded-2xl mb-10">
      <h2 className="text-4xl font-bold">Be a Rider</h2>
      <p className="description  max-w-full md:max-w-[50%]">
        Be a Rider with AI-powered intelligence that guides every delivery,
        optimizes routes, boosts earnings, ensures safety, and helps riders work
        smarter every single day.
      </p>

      <div className="divider"></div>

      <form className="mb-10" onSubmit={handleSubmit(handleRiderApplication)}>
        {/* two columns */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* sender details */}
          <aside className="order-2 sm:order-1">
            <h2 className="content-title my-5">Tell us about yourself</h2>

            <fieldset className="fieldset">
              {/*  Name */}
              <label className="label text-sm font-semibold text-secondary">
                Your Name
              </label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.displayName}
                className="input w-full"
                placeholder="Name"
              />

              {/*  Driving License  */}
              <label className="label text-sm font-semibold text-secondary">
                Driving License Number
              </label>
              <input
                type="number"
                {...register("drivingLicense")}
                className="input w-full"
                placeholder="Driving license number"
              />

              {/*  email */}
              <label className="label text-sm font-semibold text-secondary">
                Your Email
              </label>
              <input
                type="text"
                {...register("email")}
                defaultValue={user?.email}
                readOnly
                className="input w-full"
                placeholder="Email"
              />

              {/*region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold text-secondary">
                  Your Region
                </legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a region</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* district */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-semibold text-secondary">
                  Your District
                </legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a district</option>
                  {districtsByRegion(riderRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* NID no */}
              <label className="label text-sm font-semibold text-secondary">
                NID No
              </label>
              <input
                type="number"
                {...register("nid")}
                className="input w-full"
                placeholder="NID"
              />

              {/* Phone no */}
              <label className="label text-sm font-semibold text-secondary">
                Phone Number
              </label>
              <input
                type="number"
                {...register("phoneNo")}
                className="input w-full"
                placeholder="Phone Number"
              />

              {/* Bike */}
              <label className="label text-sm font-semibold text-secondary">
                Bike Brand Model and Year
              </label>
              <input
                type="text"
                {...register("bikeDetails")}
                className="input w-full"
                placeholder="Bike Brand Model and Year"
              />

              {/* Bike registration no */}
              <label className="label text-sm font-semibold text-secondary">
                Bike Registration Number
              </label>
              <input
                type="number"
                {...register("bikeRegistrationNo")}
                className="input w-full"
                placeholder="Bike Registration Number"
              />

              {/* Tell Us About Yourself */}
              <label className="label text-sm font-semibold text-secondary">
                Tell Us About Yourself
              </label>
              <textarea
                type="textarea"
                {...register("aboutYourself")}
                className="textarea h-24 w-full"
                placeholder="Tell Us About Yourself"
              ></textarea>
            </fieldset>

            <div className="text-right">
              <button
                type="submit"
                className="btn bg-primary text-secondary font-bold text-lg mt-5"
              >
                Apply as a Rider
              </button>
            </div>
          </aside>

          {/* rider photo */}
          <aside className="order-1 sm:order-2 ">
            <img src={deliveryImg} alt="rider" className="mx-auto md:mr-0" />
          </aside>
        </section>
      </form>
    </div>
  );
};

export default Rider;
